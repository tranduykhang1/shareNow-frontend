import React, { useEffect, useRef } from "react";

import animation from "assets/Animation/success-animation.json";
import Lottie from "lottie-web";

const style = {
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  background: 'linear-gradient(rgb(202 202 202 / 50%),rgb(202 202 202 / 50%))',
  borderRadius: 4,
  padding: 10,
  zIndex: 1000
};

export default function SuccessAnimation() {
  const containerRef = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
    });
  }, []);

  return (
    <div style={style}>
      <div ref={containerRef} style={{height:100, width: 100}} ></div>
    </div>
  );
}
