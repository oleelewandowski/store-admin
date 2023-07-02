import prismadb from "@/lib/prisma-db";
import SizeForm from "@/components/components/sizes/size-form";

interface SizePageProps {
  params: { sizeId: string };
}

const SizePage: React.FC<SizePageProps> = async ({ params }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
