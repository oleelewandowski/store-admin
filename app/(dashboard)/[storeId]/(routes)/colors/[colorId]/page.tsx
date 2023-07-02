import prismadb from "@/lib/prisma-db";
import ColorForm from "@/components/components/colors/color-form";

interface ColorPageProps {
  params: { colorId: string };
}

const ColorPage: React.FC<ColorPageProps> = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
