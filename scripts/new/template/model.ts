import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Package, Attribute } from '..'
import RakkitShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'
import RakkitPackage from '../../types/FrontTypes/RakkitPackage'

@Package(new RakkitPackage('_MODEL_ package'))
@ObjectType()
@Entity()
export default class _MODEL_ extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Attribute(new RakkitShortText('Enter the name here'))
  @Field()
  @Column()
  name: string
}
 