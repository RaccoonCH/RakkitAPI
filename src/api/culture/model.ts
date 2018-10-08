import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import PageContent from '../page/Models/PageContent'
import Lang from '../lang/model'

@Entity()
export default class Culture extends BaseEntity {
  constructor (name, lang) {
    super()
    this.name = name
    this.lang = lang
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(type => Lang, lang => lang.cultures)
  lang: Lang

  @OneToMany(type => PageContent, pageContent => pageContent.culture)
  pageContents: PageContent[]
}
 