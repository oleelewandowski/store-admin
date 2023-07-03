"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "@/components/components/orders/columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrdersClient: React.FC<OrderClientProps> = ({ data }) => (
  <>
    <Heading
      title={`Orders (${data.length})`}
      description='Manage orders for your store'
    />
    <Separator />
    <DataTable columns={columns} data={data} filtersKey='products' />
  </>
);
export default OrdersClient;
