import {
  Resolver,
  Arg,
  Query,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { WarehouseBoardItem } from "@/models";
import {
  findEntityOrThrow,
  createEntity,
  updateEntity,
  deleteEntity,
} from "@/utils/typeorm";
import { IsAuth } from "@/middlewares/isAuth";
import { ErrorInterceptor } from "@/middlewares/errorInterceptor";
import {
  WarehouseBoardItemCreateInput,
  WarehouseBoardItemUpdateInput,
} from "@/gql/types";
import { GQLContext } from "../types/context";

const calculateListPosition = async ({
  projectId,
  status,
}: Partial<WarehouseBoardItem>): Promise<number> => {
  const warehouseBoardItems = await WarehouseBoardItem.find({
    projectId,
    status,
  });

  const listPositions = warehouseBoardItems.map(
    ({ listPosition }) => listPosition
  );

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};

@Resolver()
class warehouseBoardItemResolver {
  @UseMiddleware([IsAuth, ErrorInterceptor])
  @Query(() => [WarehouseBoardItem])
  async getProjectwarehouseBoardItems(
    @Ctx() ctx: GQLContext,
    @Arg("searchTerm", () => String, { nullable: true })
    searchTerm: string | null
  ): Promise<WarehouseBoardItem[]> {
    const { projectId } = ctx.req.currentUser;
    let whereSQL = "warehouseBoardItem.projectId = :projectId";

    if (searchTerm) {
      whereSQL +=
        " AND (warehouseBoardItem.title ILIKE :searchTerm OR warehouseBoardItem.descriptionText ILIKE :searchTerm)";
    }

    const warehouseBoardItems = await WarehouseBoardItem.createQueryBuilder(
      "warehouseboarditems"
    )
      .select()
      .where(whereSQL, { projectId, searchTerm: `%${searchTerm}%` })

      .getMany();
    console.log(warehouseBoardItems);
    return warehouseBoardItems;
  }

  @UseMiddleware([IsAuth, ErrorInterceptor])
  @Query(() => WarehouseBoardItem)
  async getWarehouseBoardItemWithUsersAndComments(
    @Arg("warehouseBoardItemId", () => Int) warehouseBoardItemId: number
  ): Promise<WarehouseBoardItem> {
    const warehouseBoardItem = await findEntityOrThrow(
      WarehouseBoardItem,
      warehouseBoardItemId,
      {
        relations: ["users", "comments", "comments.user"],
      }
    );

    return warehouseBoardItem;
  }

  @UseMiddleware([IsAuth, ErrorInterceptor])
  @Mutation(() => WarehouseBoardItem)
  async createWarehouseBoardItem(
    @Arg("warehouseBoardItem")
    warehouseBoardItemInput: WarehouseBoardItemCreateInput
  ): Promise<WarehouseBoardItem> {
    const listPosition = await calculateListPosition(warehouseBoardItemInput);
    const warehouseBoardItem = await createEntity(WarehouseBoardItem, {
      ...warehouseBoardItemInput,
      listPosition,
    });
    return warehouseBoardItem;
  }
  @UseMiddleware([IsAuth, ErrorInterceptor])
  @Mutation(() => WarehouseBoardItem)
  async updateWarehouseBoardItem(
    @Arg("warehouseBoardItem")
    warehouseBoardItemInput: WarehouseBoardItemUpdateInput,
    @Arg("id") warehouseBoardItemId: number
  ): Promise<WarehouseBoardItem> {
    const warehouseBoardItem = await updateEntity(
      WarehouseBoardItem,
      warehouseBoardItemId,
      warehouseBoardItemInput
    );
    return warehouseBoardItem;
  }
  @UseMiddleware([IsAuth, ErrorInterceptor])
  @Mutation(() => Boolean)
  async deleteWarehouseBoardItem(
    @Arg("id") warehouseBoardItemId: number
  ): Promise<Boolean> {
    await deleteEntity(WarehouseBoardItem, warehouseBoardItemId);
    return true;
  }
}

export default warehouseBoardItemResolver;
