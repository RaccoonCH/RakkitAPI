import { LoginArgs, LoginResponse, GetableUser, RegisterArgs, UserArgs, UpdateArgs, DeleteArgs } from './Types'
import { Query, Resolver, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { OrmInterface, ErrorHelper } from '../../class/App'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { Context } from 'apollo-server-core'
import UserModel from './UserModel'

const userOrmInterface = new OrmInterface(UserModel)

@Resolver(UserModel)
export default class UserController {
  //#region GraphQL
  @Query(returns => LoginResponse)
  async login(@Args() { Name, Password } : LoginArgs): Promise<LoginResponse> {
    const user: UserModel = await userOrmInterface.ComposeQuery({
      Name
    }).getOne()
    const notFoundError = ErrorHelper.getError('user', 'notfound')
    if (user) {
      if (await compare(Password, user.Password)) {
        // Send the JWT Token
        const token = sign({
          Id: user.Id,
          Name: user.Name,
          Email: user.Email,
          Role: user.Role
        }, process.env.SecretKey)
        return {
          Token: token,
          User: new GetableUser(user)
        }
      } else {
        throw new Error(notFoundError)
      }
    } else {
      throw new Error(notFoundError)
    }
  }

  // @Authorized()
  @Query(returns => [GetableUser])
  async users(@Args() { where, last, skip, conditionOperator, orderBy, first, limit }: UserArgs) {
    return await userOrmInterface.ComposeQuery(where, {
      first,
      conditionOperator,
      orderBy,
      limit,
      last,
      skip
    }).getMany()
  }

  @Mutation(returns => GetableUser)
  async register(@Args() { Name, Email, Password, Confirm }: RegisterArgs): Promise<GetableUser> {
    if (Name && Email && Password && Confirm) {
      const user = new UserModel(Name, Email, Password, Confirm)
      try {
        await user.save()
        return new GetableUser(user)
      } catch (err) {
        if (err.code === ErrorHelper.duplicateError) {
          throw new Error(ErrorHelper.getError('user', 'exists'))
        } else {
          throw new Error(ErrorHelper.getError('server', 'error'))
        }
      }
    } else {
      throw new Error(ErrorHelper.getError('input', 'fill'))
    }
  }

  @Authorized()
  @Mutation(returns => String)
  async deleteUser(@Args() { Id } : DeleteArgs) {
    try {
      await UserModel.delete(Id)
      return 'ok'
    } catch (err) {
      throw new Error(ErrorHelper.getError('db', 'error'))
    }
  }

  @Mutation(returns => GetableUser)
  async updateUser(
    @Args() { Id, Email, Name, Role, Password, Confirm } : UpdateArgs,
    @Ctx() context: Context
  ) {
    const loggedUser: GetableUser = context.user
    if (loggedUser.Role === process.env.DefaultRequiredRole || loggedUser.Id === Id) {
      if (Id && Email && Name && Role && Password && Confirm) {
        const newUser = new UserModel(Name, Email, Password, Confirm, Role)
        try {
          const userToUpdate = await UserModel.findOne(Id)
          // Cannot set role if you are not admin
          if (userToUpdate.Role !== process.env.DefaultRequiredRole) {
            newUser.Role = userToUpdate.Role
          }
          return await UserModel.save(UserModel.merge(userToUpdate, newUser))
        } catch (err) {
          if (err.code === ErrorHelper.duplicateError) {
            throw new Error(ErrorHelper.getError('user', 'exist'))
          } else {
            throw new Error(ErrorHelper.getError('server', 'error'))
          }
        }
      } else {
        throw new Error(ErrorHelper.getError('input', 'fill'))
      }
    } else {
      throw new Error(ErrorHelper.getError('server', 'unauthorized'))
    }
  }
  //#endregion

  //#region REST
  //#endregion
}
