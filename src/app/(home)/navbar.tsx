

import Link from "next/link"
import Image from "next/image"
import SearchInput from "./search-input"
import {UserButton,OrganizationSwitcher} from "@clerk/clerk-react"



const HomeNavbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={26} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}
export default HomeNavbar