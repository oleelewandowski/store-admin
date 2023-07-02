"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import { ColorColumn, columns } from "@/components/components/colors/columns";

interface ColorsClientProps {
  data: ColorColumn[];
}

const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const createColor = () => router.push(`/${params.storeId}/colors/new`);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Colors (${data.length})`}
          description='Manage colors for your store'
        />
        <Button onClick={() => createColor()}>
          <Plus className='w-4 h-4 mr-2' />
          Add New Color
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filtersKey='name' />
      <Heading title='API' description='API calls for Colors' />
      <ApiList entityIdName='colorId' entityName='colors' />
    </>
  );
};

export default ColorsClient;
