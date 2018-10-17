import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Culture from '../culture/model'

@Entity()
export default class Lang extends BaseEntity {
  constructor (name, real, short) {
    super()
    this.name = name
    this.real = real
    this.short = short
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  real: string
  
  @Column()
  short: string

  @OneToMany(type => Culture, culture => culture.lang)
  cultures: Culture[]
}
