import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Package, Attribute } from '../../decorators'
import { RId, RShorttext, RObject } from '../../class/FrontTypes'
import CultureModel from '../Culture/CultureModel'

@Package({ name: 'Page' })
@InputType('PageInput')
@ObjectType()
@Entity({ name: 'Page' })
export default class PageModel extends BaseEntity {
  private _title: string
  private _model: string
  private _content: string
  private _url: string
  private _culture: CultureModel

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get Title(): string {
    return this._title
  }
  public set Title(val: string) {
    this._title = val
  }

  @Attribute(new RShorttext(), { isInHeader: false })
  @Field()
  @Column('simple-json')
  public get Model(): string {
    return this._model
  }
  public set Model(val: string) {
    this._model = val
  }

  @Attribute(new RShorttext(), { isInHeader: false })
  @Field()
  @Column('simple-json')
  public get Content(): string {
    return this._content
  }
  public set Content(val: string) {
    this._content = val
  }

  @Attribute(new RObject('CultureInfo'))
  @Field(type => CultureModel, { nullable: true })
  @ManyToOne(type => CultureModel, cultureModel => cultureModel.Pages)
  public get Culture(): CultureModel {
    return this._culture
  }
  public set Culture(val: CultureModel) {
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
