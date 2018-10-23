import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Field, ObjectType, ID, InputType } from 'type-graphql'
import { Attribute, Package } from '../../decorators'
import { RPackage, RShorttext, RId } from '../../class/FrontTypes'
import Page from '../Page/PageModel'
import Culture from '../Culture/CultureModel'

@Package(new RPackage())
@InputType('ExampleInput')
@ObjectType()
@Entity()
export default class Example extends BaseEntity {
  private _name: string
  private _text: string
  private _pages: Page[]
  private _example: Culture

  constructor (name: string, text: string) {
    super()
    this.Name = name
    this.Text = text
  }

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Field(type => Culture, {nullable: true})
  @ManyToOne(type => Culture, culture => culture.Examples)
  public get Culture(): Culture {
    return this._example
  }
  public set Culture(val: Culture) {
    this._example = val
  }

  @Field(type => [Page], {nullable: true})
  @OneToMany(type => Page, page => page.Example)
  public get Pages(): Page[] {
    return this._pages
  }
  public set Pages(val: Page[]) {
    this._pages = val
  }

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
}
