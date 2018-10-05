import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import PageContent from './PageContent'

@Entity()
export default class Page extends BaseEntity {
  constructor (name, model) {
    super()
    this.name = name
    this.model = model
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  model: string

  @OneToMany(type => PageContent, pageContent => pageContent.page)
  contents: PageContent[]
}
