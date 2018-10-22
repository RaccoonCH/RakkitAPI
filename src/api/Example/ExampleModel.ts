import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Field, ObjectType, ID, InputType } from 'type-graphql'
import { Attribute, Package } from '..'
import RakkitPackage from '../../types/FrontTypes/RakkitPackage'
import RakkitFrontShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'
import RakkitFrontID from '../../types/FrontTypes/types/other/RakkitFrontID'
import Page from '../Page/PageModel'
import Culture from '../Culture/CultureModel';

@Package(new RakkitPackage())
@InputType('ExampleInput')
@ObjectType()
@Entity()
export default class Example extends BaseEntity {
  private _id: number
  private _name: string
  private _text: string
  private _pages: Page[]
  private _example: Culture

  constructor (name: string, text: string) {
    super()
    this.Name = name
    this.Text = text
  }

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

  @Attribute(new RakkitFrontID())
  @Field(type => ID, {nullable: true})
  @PrimaryGeneratedColumn()
  public get Id(): number {
    return this._id
  }
  public set Id(val: number) {
    this._id = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field({nullable: true})
  @Column()
  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field({nullable: true})
  @Column()
  public get Text(): string {
    return this._text
  }
  public set Text(val: string) {
    this._text = val
  }
}
 