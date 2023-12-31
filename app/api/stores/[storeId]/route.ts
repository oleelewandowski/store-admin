import prismadb from "@/lib/prisma-db";
import { isRequired } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    isRequired([name, params.storeId]);

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId!,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(`[STORE_ROUTE_PATCH_ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    isRequired([params.storeId]);

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId: userId!,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(`[STORE_ROUTE_DELETE_ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
