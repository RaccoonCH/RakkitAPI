import RakkitShortText from '../../types/FrontTypes/Text/RakkitShortText'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import PageContent from '../page/Models/PageContent'
import Lang from '../lang/model'
import { Attribute, Package } from '../index'
import { RakkitPackage } from '../../types/FrontTypes/RakkitPackage'
import { Field, Query, ObjectType } from 'type-graphql'

@Entity()
@Package(new RakkitPackage('Hello'))
@ObjectType()
export default class Culture extends BaseEntity {
  constructor (name: string, lang: Lang) {
    super()
    this.name = name
    this.lang = lang
  }

  @Attribute(new RakkitShortText('yo'))
  @PrimaryGeneratedColumn()
  id: number
  
  @Attribute(new RakkitShortText('yo'))
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  test: string

  @Attribute(new RakkitShortText('yo'))
  @ManyToOne(type => Lang, lang => lang.cultures)
  lang: Lang

  @OneToMany(type => PageContent, pageContent => pageContent.culture)
  pageContents: PageContent[]
}
 