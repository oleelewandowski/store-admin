import prismadb from "@/lib/prisma-db";
import BillboardForm from "@/components/components/billboards/billboard-form";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
