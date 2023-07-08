import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma-db";
import { isRequired } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    isRequired([name]);

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(`[STORES_ROUTE_POST_ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
