import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Field } from 'type-graphql';
import { Attribute } from '..';
import RakkitShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'

@Entity()
export default class example extends BaseEntity {
  constructor (name: string, text: string) {
    super()
    this.name = name
    this.text = text
  }

  @PrimaryGeneratedColumn()
  id: number

  @Attribute(new RakkitShortText('Enter the name'))
  @Field()
  @Column()
  name: string

  @Attribute(new RakkitShortText('Enter your text'))
  @Field()
  @Column()
  text: string
}
 