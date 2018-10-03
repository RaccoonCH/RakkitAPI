import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class example extends BaseEntity {
  constructor (name) {
    super()
    this.name = name
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string  
}
 