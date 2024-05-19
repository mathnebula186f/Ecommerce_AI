import Lottie from "lottie-react";
import BackGroundImageAnimationData from "./lottie/BackGroundImage.json";

export default function BackGroundImage() {
  
  return (
    <div className="opacity-30">
      <Lottie
        animationData={BackGroundImageAnimationData}
        height={500}
        width={500}
        size={100}
        className="text-center w-full opacity-0 "
      />
    </div>
  );
}
