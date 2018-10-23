import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Package, Attribute } from '..'
import  { RPackage, RId, RShorttext } from '../../class/FrontTypes'
import Page from '../Page/PageModel'
import Example from '../Example/ExampleModel'

@Package(new RPackage())
@ObjectType()
@Entity({name: 'Culture'})
export default class Culture extends BaseEntity {
  private _pages: Page[]
  private _langCode: string
  private _countryCode: string
  private _examples: Example[]

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get LangCode(): string {
    return this._langCode
  }
  public set LangCode(val: string) {
    this._langCode = val
  }

  @Attribute(new RShorttext())
  @Field()
  @Column()
  public get CountryCode(): string {
    return this._countryCode
  }
  public set CountryCode(val: string) {
    this._countryCode = val
  }

  @Attribute(new RShorttext(null, true, true, false))
  @Field()
  public get CultureInfo(): string {
    return `${this._langCode.toLowerCase()}-${this._countryCode.toUpperCase()}`
  }

  @Field(type => [Page])
  @OneToMany(type => Page, page => page.Culture)
  public get Pages(): Page[] {
    return this._pages
  }
  public set Pages(val: Page[]) {
    this._pages = val
  }

  @Field(type => [Example])
  @OneToMany(type => Example, culture => culture.Culture)
  public get Examples(): Example[] {
    return this._examples
  }
  public set Examples(val: Example[]) {
    this._examples = val
  }
}
 