'use client'

import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

//Internal Imports
import { sidebarLinks } from "@/constants";

//For Mobile devices
export default function BottomBar() {
  const router=useRouter()
  const pathname=usePathname() 
  
  return (
    <section className="bottombar">
      <div className="bottombar_conatiner">
      {
          sidebarLinks.map((links) => {
            /*Link which are active means-> on which link user is currently at */
            const isActive = (pathname.includes(links.route) && links.route.length > 1) || pathname === links.route //links.route.length > 1 to avoid home url '/'
            return (
              /*Map side bar link */
              <Link
                href={links.route}
                key={links.label}
                className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
                <Image
                  src={links.imgURL}
                  alt={links.label}
                  width={24}
                  height={24} />
                <p className="text-subtle-medium text-light-1 max-sm:hidden">{links.label.split(/\s+/)[0]}</p> {/*Only on larger devices */}
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}
