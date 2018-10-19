import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Package, Attribute } from '..'
import RakkitFrontShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'
import RakkitFrontID from '../../types/FrontTypes/types/other/RakkitFrontID'
import RakkitPackage from '../../types/FrontTypes/RakkitPackage'

@Package(new RakkitPackage('_MODEL_ package'))
@ObjectType()
@Entity({name: '_MODEL_'})
export default class _MODEL_ extends BaseEntity {
  private _id: number
  private _name: string

  @Attribute(new RakkitFrontID())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public get Id(): number {
    return this._id
  }
  public set Id(val: number) {
    this._id = val
  }

  @Attribute(new RakkitFrontShortText('Enter the name here'))
  @Field()
  @Column()
  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }
}
 