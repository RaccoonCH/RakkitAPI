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
  constructor (name: string, text: string) {
    super()
    this.name = name
    this.text = text
  }

  @Attribute(new RakkitFrontID())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Attribute(new RakkitFrontShortText('Enter the name'))
  @Field()
  @Column()
  name: string

  @Attribute(new RakkitFrontShortText('Enter your text'))
  @Field()
  @Column()
  text: string
}
 