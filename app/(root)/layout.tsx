import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma-db";
import { checkUserAuth } from "@/lib/auth-utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  checkUserAuth(userId);

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId!,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
