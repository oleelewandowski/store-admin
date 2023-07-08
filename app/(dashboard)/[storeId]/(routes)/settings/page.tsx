import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma-db";
import { checkUserAuth } from "@/lib/auth-utils";
import SettingsForm from "@/components/components/settings/settings-form";

interface SettingsPageProps {
  params: { storeId: string };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
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
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
