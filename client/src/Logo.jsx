import Lottie from "lottie-react";
import LogoAnimationData from "./lottie/Logo.json";
import './index.css';

export default function Logo() {
 

  return (
    <div className="p-4 flex items-center m-0 font-montserrat">
      <h1 className="text-3xl font-bold  myLogo">E-Commerce Website</h1>
      <Lottie animationData={LogoAnimationData} height={100} width={100} />
    </div>
  );
}
