import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Attribute, Package } from '../../decorators'
import { RPackage, RId, RShorttext } from '../../class/FrontTypes'

@Package(new RPackage('_MODEL_ package'))
@ObjectType()
@Entity({ name: '_MODEL_' })
export default class _MODEL_ extends BaseEntity {
  private _name: string

  @Attribute(new RId())
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public readonly Id: number

  @Attribute(new RShorttext('Enter the name here'))
  @Field()
  @Column()
  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }
}
