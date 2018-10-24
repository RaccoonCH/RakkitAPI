import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'test' })
export class Test extends BaseEntity {
  constructor(text: string, index: number) {
    super()
    this.Text = text
    this.Index = index
  }

  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Column()
  public Text: string

  @Column()
  public Index: number
}
