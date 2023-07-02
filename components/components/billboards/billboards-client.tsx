"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  BillboardColumn,
  columns,
} from "@/components/components/billboards/columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardsClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const createBillboard = () =>
    router.push(`/${params.storeId}/billboards/new`);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />
        <Button onClick={() => createBillboard()}>
          <Plus className='w-4 h-4 mr-2' />
          Add New Billboard
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filtersKey='label' />
      <Heading title='API' description='API calls for Billboards' />
      <ApiList entityIdName='billboardId' entityName='billboards' />
    </>
  );
};

export default BillboardsClient;
