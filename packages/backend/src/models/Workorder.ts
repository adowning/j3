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
  WorkorderType,
  WorkorderPriority,
  WorkorderStatus,
} from "@/constants/workorder";
import { Project, User, Comment } from "@/models";

@ObjectType()
@Entity()
class Workorder extends BaseEntity {
  static validations = {
    title: [is.required(), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(WorkorderType))],
    status: [is.required(), is.oneOf(Object.values(WorkorderStatus))],
    priority: [is.required(), is.oneOf(Object.values(WorkorderPriority))],
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
  type: WorkorderType;

  @Field(() => String)
  @Column("varchar")
  status: WorkorderStatus;

  @Field(() => String)
  @Column("varchar")
  priority: WorkorderPriority;

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
  @ManyToOne(() => Project, (project) => project.workorders)
  project: Project;

  @Field()
  @Column("integer")
  projectId: number;

  @Field(() => [Comment], { defaultValue: [] })
  @OneToMany(() => Comment, (comment) => comment.workorder)
  comments: Comment[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.workorders)
  @JoinTable()
  users: User[];

  @Field(() => [ID])
  @RelationId((workorder: Workorder) => workorder.users)
  userIds: string[];

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };
}

export default Workorder;
