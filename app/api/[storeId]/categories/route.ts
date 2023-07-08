import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma-db";
import { isRequired } from "@/lib/utils";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    isRequired([name, billboardId, params.storeId]);

    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(`[CATEGORIES_ROUTE_POST_ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    isRequired([params.storeId]);

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(`[CATEGORIES_ROUTE_GET_ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
