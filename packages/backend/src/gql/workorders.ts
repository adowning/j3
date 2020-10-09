import {
  Resolver,
  Arg,
  Query,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { Workorder } from "@/models";
import {
  findEntityOrThrow,
  createEntity,
  updateEntity,
  deleteEntity,
} from "@/utils/typeorm";
import { IsAuth } from "@/middlewares/isAuth";
import { ErrorInterceptor } from "@/middlewares/errorInterceptor";
import { WorkorderCreateInput, WorkorderUpdateInput } from "@/gql/types";
import { GQLContext } from "../types/context";

const calculateListPosition = async ({
  projectId,
  status,
}: Partial<Workorder>): Promise<number> => {
  const workorders = await Workorder.find({ projectId, status });

  const listPositions = workorders.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};

@Resolver()
class WorkorderResolver {
  @UseMiddleware([IsAuth, ErrorInterceptor])
  @Query(() => [Workorder])
  async getProjectWorkorders(
    @Ctx() ctx: GQLContext,
    @Arg("searchTerm", () => String, { nullable: true })
    searchTerm: string | null
  ): Promise<Workorder[]> {
    // const { projectId } = ctx.req.currentUser;
    // let whereSQL = "workorder.projectId = :projectId";

    // if (searchTerm) {
    //   whereSQL +=
    //     " AND (workorder.title ILIKE :searchTerm OR workorder.descriptionText ILIKE :searchTerm)";
    // }

    const workorders = await Workorder.createQueryBuilder("workorders")
      .select()
      .getMany();
    console.log(workorders);
    return workorders;
  }

  // @UseMiddleware([IsAuth, ErrorInterceptor])
  // @Query(() => Workorder)
  // async getWorkorderWithUsersAndComments(
  //   @Arg('workorderId', () => Int) workorderId: number
  // ): Promise<Workorder> {
  //   const workorder = await findEntityOrThrow(Workorder, workorderId, {
  //     relations: ['users', 'comments', 'comments.user']
  //   })

  //   return workorder
  // }

  // @UseMiddleware([IsAuth, ErrorInterceptor])
  // @Mutation(() => Workorder)
  // async createWorkorder(
  //   @Arg('workorder') workorderInput: WorkorderCreateInput
  // ): Promise<Workorder> {
  //   const listPosition = await calculateListPosition(workorderInput)
  //   const workorder = await createEntity(Workorder, {
  //     ...workorderInput,
  //     listPosition
  //   })
  //   return workorder
  // }
  // @UseMiddleware([IsAuth, ErrorInterceptor])
  // @Mutation(() => Workorder)
  // async updateWorkorder(
  //   @Arg('workorder') workorderInput: WorkorderUpdateInput,
  //   @Arg('id') workorderId: number
  // ): Promise<Workorder> {
  //   const workorder = await updateEntity(Workorder, workorderId, workorderInput)
  //   return workorder
  // }
  // @UseMiddleware([IsAuth, ErrorInterceptor])
  // @Mutation(() => Boolean)
  // async deleteWorkorder(@Arg('id') workorderId: number): Promise<Boolean> {
  //   await deleteEntity(Workorder, workorderId)
  //   return true
  // }
}

export default WorkorderResolver;
