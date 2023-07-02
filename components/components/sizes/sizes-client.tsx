"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "@/components/components/sizes/columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const createSize = () => router.push(`/${params.storeId}/sizes/new`);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => createSize()}>
          <Plus className='w-4 h-4 mr-2' />
          Add New Size
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filtersKey='name' />
      <Heading title='API' description='API calls for Sizes' />
      <ApiList entityIdName='sizeId' entityName='sizes' />
    </>
  );
};

export default SizesClient;
