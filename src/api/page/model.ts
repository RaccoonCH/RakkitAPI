import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  test: string
}
