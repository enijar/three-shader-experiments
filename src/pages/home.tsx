import React from "react";
import * as THREE from "three";
import Portal from "@/components/portal/portal";

export default function Home() {
  return (
    <>
      <Portal />
      <ambientLight intensity={0.3} />
      <rectAreaLight position={[0, 0, -0.1]} color="#8327c0" intensity={10} width={1.5} height={1.5} rotation-x={THREE.MathUtils.degToRad(180)} />
      <rectAreaLight position={[0, 0, -0.1]} color="#f65dac" intensity={2.5} width={1.5} height={1.5} rotation-x={THREE.MathUtils.degToRad(180)} />
    </>
  );
}
