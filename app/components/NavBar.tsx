import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav>
      <Image
        src="/images/turnerscars_logo.png"
        alt="logo"
        width={100}
        height={100}
      />
      <Link href="/">Find Similar Car</Link>
    </nav>
  );
};
export default NavBar;
