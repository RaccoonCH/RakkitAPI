import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'
import { Attribute, Package } from '../../decorators'
import { RShorttext, RId } from '../../class/FrontTypes'

@Package({ name: 'Example' })
@ObjectType()
@Entity({ name: 'Example' })
export default class ExampleModel extends BaseEntity {
  private _name: string
  private _text: string

  constructor (name: string, text: string) {
    super()
    this.Name = name
    this.Text = text
  }

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Text(): string {
    return this._text
  }
  public set Text(val: string) {
    this._text = val
  }

  @Field()
  public get nameToUppercase(): string {
    return this.Name.toUpperCase()
  }
}
