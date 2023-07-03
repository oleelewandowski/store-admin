"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  ProductColumn,
  columns,
} from "@/components/components/products/columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductsClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const createProduct = () => router.push(`/${params.storeId}/products/new`);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button onClick={() => createProduct()}>
          <Plus className='w-4 h-4 mr-2' />
          Add New Product
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filtersKey='name' />
      <Heading title='API' description='API calls for Products' />
      <ApiList entityIdName='productId' entityName='products' />
    </>
  );
};

export default ProductsClient;
