import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import prismadb from "@/lib/prisma-db";
import { ProductColumn } from "@/components/components/products/columns";
import ProductsClient from "@/components/components/products/products-client";

interface ProductsPageProps {
  params: { storeId: string };
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
