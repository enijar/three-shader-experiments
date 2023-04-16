import React from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import Portal from "@/components/portal/portal";

export default function Home() {
  const lightRef = React.useRef<THREE.SpotLight>(null);
  // @ts-ignore
  useHelper(lightRef, THREE.SpotLightHelper);

  return (
    <>
      <Portal />
      <ambientLight intensity={0.3} />
      <spotLight ref={lightRef} position={[5, 5, 5]} color="#ffffff" angle={THREE.MathUtils.degToRad(20)} intensity={0.3} />
    </>
  );
}
