import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Package, Attribute } from '..'
import RakkitFrontShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'
import RakkitFrontID from '../../types/FrontTypes/types/other/RakkitFrontID'
import RakkitPackage from '../../types/FrontTypes/RakkitPackage'
import Culture from '../Culture/CultureModel'
import RakkitFrontObject from '../../types/FrontTypes/types/other/RakkitFrontObject';
import Example from '../Example/ExampleModel';

@Package(new RakkitPackage())
@InputType('PageInput')
@ObjectType()
@Entity({name: 'Page'})
export default class Page extends BaseEntity {
  private _id: number
  private _title: string
  private _model: string
  private _content: string
  private _culture: Culture
  private _url: string
  private _example: Example

  @Attribute(new RakkitFrontShortText())
  @Field(type => Example, {nullable: true})
  @ManyToOne(type => Example, example => example.Pages)
  public get Example(): Example {
    return this._example
  }
  public set Example(val: Example) {
    this._example = val
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
  public get Title(): string {
    return this._title
  }
  public set Title(val: string) {
    this._title = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field()
  @Column('simple-json')
  public get Model(): string {
    return this._model
  }
  public set Model(val: string) {
    this._model = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field()
  @Column('simple-json')
  public get Content(): string {
    return this._content
  }
  public set Content(val: string) {
    this._content = val
  }

  @Attribute(new RakkitFrontObject('CultureInfo'))
  @Field(type => Culture)
  @ManyToOne(type => Culture, culture => culture.Pages)
  public get Culture(): Culture {
    return this._culture
  }
  public set Culture(val: Culture) {
    this._culture = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field()
  @Column()
  public get Url(): string {
    return this._url
  }
  public set Url(val: string) {
    this._url = val
  }
}
 