import { format } from "date-fns";

import prismadb from "@/lib/prisma-db";
import { CategoryColumn } from "@/components/components/categories/columns";
import CategoryClient from "@/components/components/categories/categories-client";

interface BillboardsPageProps {
  params: { storeId: string };
}

const CategoriesPage: React.FC<BillboardsPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
