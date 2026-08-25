import Image from "next/image";
import realConnectionLabLogo from "../../public/assets/realConnectionLabLogo.png";

export default function BrandLogo() {
  return (
    <Image
      className="brand-logo"
      src={realConnectionLabLogo}
      alt=""
      width={44}
      height={44}
      priority
    />
  );
}
