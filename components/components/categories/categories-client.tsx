"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  CategoryColumn,
  columns,
} from "@/components/components/categories/columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const createCategory = () => router.push(`/${params.storeId}/categories/new`);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />
        <Button onClick={() => createCategory()}>
          <Plus className='w-4 h-4 mr-2' />
          Add New Category
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filtersKey='name' />
      <Heading title='API' description='API calls for Categories' />
      <ApiList entityIdName='categoryId' entityName='categories' />
    </>
  );
};

export default CategoriesClient;
