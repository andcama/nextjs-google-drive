import Image from "next/image";


const Header = () => {
    return (
      <header>
        <Image  src="/drive_logo.png" width={65} height={50} alt="Drive logo" />
        <h1> Drive </h1>
      </header>
    );
  }
  
  export default Header;