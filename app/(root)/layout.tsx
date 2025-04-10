import MobileNav from "@/components/ui/MobileNav";
import SideBar from "@/components/ui/SideBar"
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn={firstName:"Zyad", LastName:"Yakan"}
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
