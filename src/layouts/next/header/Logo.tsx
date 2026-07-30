import Image from "next/image"
import Link from "next/link"
import logoUrl from "@/assets/logos/app-logo.png"

const Logo = () => (
  <div className="flex shrink-0 items-center justify-center px-1 py-2 sm:p-4">
    <Link href="/" className="header-logo__link block shrink-0">
      <Image src={logoUrl} alt="Shopella home" className="block h-10 w-auto shrink-0 sm:h-12" />
    </Link>
  </div>
)

export default Logo
