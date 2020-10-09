import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationId,
  BeforeInsert,
  BeforeUpdate,
  Entity,
} from "typeorm";
import { ObjectType, ID, Field, Int, Float } from "type-graphql";
import striptags from "striptags";
import is from "@/utils/validations";
import {
  WarehouseBoardItemType,
  WarehouseBoardItemPriority,
  WarehouseBoardItemStatus,
} from "@/constants/warehouseboarditem";
import { Project, User, Comment } from "@/models";

@ObjectType()
@Entity()
class WarehouseBoardItem extends BaseEntity {
  static validations = {
    title: [is.required(), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(WarehouseBoardItemType))],
    status: [is.required(), is.oneOf(Object.values(WarehouseBoardItemStatus))],
    priority: [
      is.required(),

      is.oneOf(Object.values(WarehouseBoardItemPriority)),
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
    ],
    listPosition: is.required(),
    reporterId: is.required(),
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar")
  title: string;

  @Field(() => String)
  @Column("varchar")
  type: WarehouseBoardItemType;

  @Field(() => String)
  @Column("varchar")
  status: WarehouseBoardItemStatus;

  @Field(() => String)
  @Column("varchar")
  priority: WarehouseBoardItemPriority;

  @Field(() => Float)
  @Column("double precision")
  listPosition: number;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  descriptionText: string | null;

  @Field(() => Int, { nullable: true })
  @Column("integer", { nullable: true })
  estimate: number | null;

  @Field(() => Int, { nullable: true })
  @Column("integer", { nullable: true })
  timeSpent: number | null;

  @Field(() => Int, { nullable: true })
  @Column("integer", { nullable: true })
  timeRemaining: number | null;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field()
  @Column("uuid")
  reporterId: string;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.warehouseBoardItems)
  project: Project;

  @Field()
  @Column("integer")
  projectId: number;

  @Field(() => [Comment], { defaultValue: [] })
  @OneToMany(() => Comment, (comment) => comment.warehouseBoardItem)
  comments: Comment[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.warehouseBoardItems)
  @JoinTable()
  users: User[];

  @Field(() => [ID])
  @RelationId(
    (warehouseBoardItem: WarehouseBoardItem) => warehouseBoardItem.users
  )
  userIds: string[];

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };
}

export default WarehouseBoardItem;
