"use client";

import Spline from "@splinetool/react-spline";

export function Background() {
  return (
    <div className="background-object mb--100 -z-100 height-100 left-0">
      <Spline
        className="spline"
        scene="https://prod.spline.design/2OJLJwr1DEbd6Bb4/scene.splinecode"
      />
    </div>
  );
}
