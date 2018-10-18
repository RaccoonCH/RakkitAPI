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
  @Attribute(new RakkitFrontID())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Attribute(new RakkitFrontShortText('Enter the name here'))
  @Field()
  @Column()
  name: string
}
 