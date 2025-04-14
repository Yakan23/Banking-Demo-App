import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar"
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
const RootLayout=async  ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  const loggedIn = await getLoggedInUser()
  if (!loggedIn) redirect("/sign-in")
  return (
      <main className="flex h-screen w-full">
      <SideBar
        user={loggedIn}
      />

      <div className="flex size-full flex-col">

        <div className="root-layout">
          <Image src="/icons/logo.svg" width={34} height={34} alt='Horizon Logo' />
          <div>
            <MobileNav user={loggedIn} />
          </div>

        </div>
          {children}
      </div>
    </main>
  );
}

export default RootLayout;
