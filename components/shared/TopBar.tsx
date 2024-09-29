import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex item-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden text-gradient_purple-blue">STUCO</p>
      </Link>

      <div className="flex item-center gap-1">
        <div className="block md:hidden"> 
          <SignedIn>{/*code within will only appear if user is signed-in && only for small devices */}
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src="/assets/logout.svg" alt="sign-out" height={24} width={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4"
            }
          }} />
          
      </div>
    </nav>
  )
}
