import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Package, Attribute } from '../../decorators'
import  { RPackage, RId, RShorttext } from '../../class/FrontTypes'
import Page from '../Page/PageModel'
import Example from '../Example/ExampleModel'

@Package(new RPackage())
@ObjectType()
@Entity({ name: 'Culture' })
export default class Culture extends BaseEntity {
  private langCode: string
  private countryCode: string
  private pages: Page[]

  @Attribute(new RId())
  @Field(type => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  @Column()
  public get LangCode(): string {
    return this.langCode
  }
  public set LangCode(val: string) {
    this.langCode = val
  }

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  @Column()
  public get CountryCode(): string {
    return this.countryCode
  }
  public set CountryCode(val: string) {
    this.countryCode = val
  }

  @Attribute(new RShorttext(null, true, true, false))
  @Field({ nullable: true })
  public get CultureInfo(): string {
    return `${this.langCode.toLowerCase()}-${this.countryCode.toUpperCase()}`
  }

  @Field(type => [Page], { nullable: true })
  @OneToMany(type => Page, page => page.Culture)
  public get Pages(): Page[] {
    return this.pages
  }
  public set Pages(val: Page[]) {
    this.pages = val
  }
}
