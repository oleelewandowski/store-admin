import { redirect } from "next/navigation";

import Navbar from "@/components/components/nav/navbar";
import { checkUserAuth } from "@/lib/auth-utils";
import prismadb from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  checkUserAuth(userId);

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId!,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
