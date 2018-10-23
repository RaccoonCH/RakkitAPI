import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Package, Attribute } from '../../decorators'
import { RPackage, RId, RShorttext, RObject } from '../../class/FrontTypes'
import Culture from '../Culture/CultureModel'
import Example from '../Example/ExampleModel'

@Package(new RPackage())
@InputType('PageInput')
@ObjectType()
@Entity({name: 'Page'})
export default class Page extends BaseEntity {
  private _title: string
  private _model: string
  private _content: string
  private _url: string
  private _culture: Culture
  private _example: Example

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext())
  @Field(type => Example, {nullable: true})
  @ManyToOne(type => Example, example => example.Pages)
  public get Example(): Example {
    return this._example
  }
  public set Example(val: Example) {
    this._example = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Title(): string {
    return this._title
  }
  public set Title(val: string) {
    this._title = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column('simple-json')
  public get Model(): string {
    return this._model
  }
  public set Model(val: string) {
    this._model = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column('simple-json')
  public get Content(): string {
    return this._content
  }
  public set Content(val: string) {
    this._content = val
  }

  @Attribute(new RObject('CultureInfo'))
  @Field(type => Culture, {nullable: true})
  @ManyToOne(type => Culture, culture => culture.Pages)
  public get Culture(): Culture {
    return this._culture
  }
  public set Culture(val: Culture) {
    this._culture = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Url(): string {
    return this._url
  }
  public set Url(val: string) {
    this._url = val
  }
}
