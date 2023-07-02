import { format } from "date-fns";

import prismadb from "@/lib/prisma-db";
import { SizeColumn } from "@/components/components/sizes/columns";
import SizesClient from "@/components/components/sizes/sizes-client";

interface SizesPageProps {
  params: { storeId: string };
}

const SizesPage: React.FC<SizesPageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
