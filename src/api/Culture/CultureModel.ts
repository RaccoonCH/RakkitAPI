import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Package, Attribute } from '..'
import RakkitFrontShortText from '../../types/FrontTypes/types/text/RakkitFrontShortText'
import RakkitFrontID from '../../types/FrontTypes/types/other/RakkitFrontID'
import RakkitPackage from '../../types/FrontTypes/RakkitPackage'
import Page from '../Page/PageModel'

@Package(new RakkitPackage())
@InputType('cultureInput')
@ObjectType()
@Entity({name: 'Culture'})
export default class Culture extends BaseEntity {
  private _pages: Page[]
  private _id: number
  private _langCode: string
  private _countryCode: string

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
  public get LangCode(): string {
    return this._langCode
  }
  public set LangCode(val: string) {
    this._langCode = val
  }

  @Attribute(new RakkitFrontShortText())
  @Field({nullable: true})
  @Column()
  public get CountryCode(): string {
    return this._countryCode
  }
  public set CountryCode(val: string) {
    this._countryCode = val
  }

  @Attribute(new RakkitFrontShortText(null, true, true, false))
  @Field({nullable: true})
  public get CultureInfo(): string {
    return `${this._langCode.toLowerCase()}-${this._countryCode.toUpperCase()}`
  }

  @Field(type => [Page], {nullable: true})
  @OneToMany(type => Page, page => page.Culture)
  public get Pages(): Page[] {
    return this._pages
  }
  public set Pages(val: Page[]) {
    this._pages = val
  }
}
 