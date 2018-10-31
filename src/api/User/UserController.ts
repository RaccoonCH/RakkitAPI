import { Query, Resolver, Args, Mutation, Arg, Authorized } from 'type-graphql'
import UserModel from './UserModel'
import { OrmInterface } from '../../class/App'
import { LoginArgs, LoginResponse, GetableUser, RegisterArgs } from './Types'
import { sign } from 'jsonwebtoken'
import { Response, Request } from 'express'
import { compare } from 'bcrypt'

const userOrmInterface = new OrmInterface(UserModel)

@Resolver(UserModel)
export default class UserController {
  //#region GraphQL
  @Query(returns => LoginResponse)
  async login(@Args() { name, password } : LoginArgs): Promise<LoginResponse> {
    const user: UserModel = await userOrmInterface.ComposeQuery({
      name
    }).getOne()
    if (user) {
      if (await compare(password, user.Password)) {
        const token = sign({
          Id: user.Id,
          Name: user.Name,
          Email: user.Email,
          Role: user.Role
        }, process.env.SecretKey)
        return {
          token,
          user: new GetableUser(user)
        }
      } else {
        throw new Error('not:found')
      }
    } else {
      throw new Error('not:found')
    }
  }

  @Mutation(Returns => GetableUser)
  async register(@Args() { Name, Email, Password, Confirm }: RegisterArgs): Promise<GetableUser> {
    if (Name && Email && Password && Confirm) {
      if (Password === Confirm) {
        const user = new UserModel(Name, Email, Password)
        try {
          await user.save()
          return new GetableUser(user)
        } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            throw new Error('user:exist')
          } else {
            throw new Error('server:error')
          }
        }
      } else {
        throw new Error('password:match')
      }
    } else {
      throw new Error('fill')
    }
  }
  //#endregion

  //#region REST
  //#endregion
}
