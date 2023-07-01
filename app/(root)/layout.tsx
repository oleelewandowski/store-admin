import prismadb from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";

import { checkUserAuth } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

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
