import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { hashSync } from 'bcrypt'
import { Attribute, Package } from '../../decorators'
import { RPackage, RId, RShorttext } from '../../class/FrontTypes'

@Package(new RPackage('User package'))
@ObjectType()
@Entity({ name: 'User' })
export default class User extends BaseEntity {
  private _name: string
  private _email: string
  private _role: string
  private _password: string

  constructor(name: string, email: string, password: string, confirm: string, role = 'default') {
    if (password === confirm) {
      super()
      this.Name = name
      this.Email = email
      this.Role = role
      this.Password = password ? hashSync(password, 10) : ''
    } else {
      throw new Error('password:match')
    }
  }

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext('Enter the name here'))
  @Field()
  @Column({ unique: true })
  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column({ unique: true })
  public get Email(): string {
    return this._email
  }
  public set Email(val: string) {
    this._email = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Password(): string {
    return this._password
  }
  public set Password(val: string) {
    this._password = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Role(): string {
    return this._role
  }
  public set Role(val: string) {
    this._role = val
  }
}
