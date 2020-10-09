import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
} from "typeorm";
import is from "@/utils/validations";
import { User, Issue, WarehouseBoardItem } from "@/models";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  static validations = {
    body: [is.required(), is.maxLength(50000)],
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  body: string;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field()
  @Column("uuid")
  userId: string;

  @Field()
  @Column("integer")
  issueId: number;

  @Field()
  @Column("integer")
  warehouseBoardItemId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Field(() => Issue)
  @ManyToOne(() => Issue, (issue) => issue.comments, { onDelete: "CASCADE" })
  issue: Issue;

  @Field(() => WarehouseBoardItem)
  @ManyToOne(
    () => WarehouseBoardItem,
    (warehouseBoardItem) => warehouseBoardItem.comments,
          {
          onDelete: "CASCADE",
        }
  )
  warehouseBoardItem: WarehouseBoardItem;
}

export default Comment;
