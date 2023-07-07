import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "@/components/components/nav/main-nav";
import StoreSwitcher from "@/components/components/store-switcher/store-switcher";
import { checkUserAuth } from "@/lib/auth-utils";
import prismadb from "@/lib/prisma-db";
import { ModeToggle } from "@/components/components/mode-toogle/mode-toggle";

const Navbar = async () => {
  const { userId } = auth();

  checkUserAuth(userId);

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId!,
    },
  });

  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='flex items-center ml-auto space-x-4'>
          <ModeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
