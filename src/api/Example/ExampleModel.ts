import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'
import { Attribute, Package } from '..'
import RakkitPackage from '../../types/FrontTypes/RakkitPackage'
import RakkitFrontShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'
import RakkitFrontID from '../../types/FrontTypes/types/other/RakkitFrontID'

@Package(new RakkitPackage('The example Rakkit Package'))
@ObjectType()
@Entity()
export default class Example extends BaseEntity {
  private _id: number
  private _name: string
  private _text: string

  constructor (name: string, text: string) {
    super()
    this.Name = name
    this.Text = text
  }

  @Attribute(new RakkitFrontID())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public get Id(): number {
    return this._id
  }
  public set Id(val: number) {
    this._id = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field()
  @Column()
  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field()
  @Column()
  public get Text(): string {
    return this._text
  }
  public set Text(val: string) {
    this._text = val
  }
}
 