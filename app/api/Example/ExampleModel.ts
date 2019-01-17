import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, ID, InputType } from "type-graphql";
import { Attribute, Package } from "@decorators";
import { RShorttext, RId } from "@types";

@Package({ name: "Example" })
@ObjectType()
@InputType("ExmapleInput")
@Entity({ name: "Example" })
export default class ExampleModel extends BaseEntity {
  private _name: string;
  private _text: string;

  constructor (name: string, text: string) {
    super();
    this.Name = name;
    this.Text = text;
  }

  @Attribute(new RId())
  @Field(type => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  readonly Id: number;

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  @Column()
  get Name(): string {
    return this._name;
  }
  set Name(val: string) {
    this._name = val;
  }

  @Attribute(new RShorttext())
  @Field({ nullable: true })
  @Column()
  get Text(): string {
    return this._text;
  }
  set Text(val: string) {
    this._text = val;
  }
}
