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
    const { name, value } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    isRequired([name, value, params.storeId]);

    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error(`[SIZES_ROUTE_POST_ERROR]: ${error}`);
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

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error(`[SIZES_ROUTE_GET_ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
