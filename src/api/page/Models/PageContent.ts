import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import Page from './Page'
import Culture from '../../culture/model'

@Entity()
export default class PageContent extends BaseEntity {
  constructor (culture, content, page) {
    super()
    this.culture = culture
    this.content = content
    this.page = page
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  content: string

  @ManyToOne(type => Culture, culture => culture.pages)
  culture: Culture

  @ManyToOne(type => Page, page => page.contents)
  page: Page
}
