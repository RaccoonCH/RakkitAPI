import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Package, Attribute } from "@decorators";
import { RId, RShorttext } from "@types";
import Page from "@api/Page/PageModel";

@Package({ name: "Culture" })
@ObjectType()
@Entity({ name: "Culture" })
export default class CultureModel extends BaseEntity {
  private _langCode: string;
  private _countryCode: string;
  private _pages: Page[];

  @Attribute(new RId())
  @Field(type => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  readonly Id: number;

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  @Column()
  get LangCode(): string {
    return this._langCode;
  }
  set LangCode(val: string) {
    this._langCode = val;
  }

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  @Column()
  get CountryCode(): string {
    return this._countryCode;
  }
  set CountryCode(val: string) {
    this._countryCode = val;
  }

  @Field(type => [Page], { nullable: true })
  @OneToMany(type => Page, page => page.Culture)
  get Pages(): Page[] {
    return this._pages;
  }
  set Pages(val: Page[]) {
    this._pages = val;
  }

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  get CultureInfo(): string {
    return `${this._langCode.toLowerCase()}-${this._countryCode.toUpperCase()}`;
  }
}
