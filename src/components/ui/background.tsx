"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";


import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Spline from "@splinetool/react-spline";

export function Background() {

  return (
    <div className="background-object left-0 mb--100 -z-100 height-100">
      <Spline
            className="spline"
            scene='https://prod.spline.design/2OJLJwr1DEbd6Bb4/scene.splinecode'
        />
    </div>
  );
}

