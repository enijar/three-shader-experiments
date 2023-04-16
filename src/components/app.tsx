import React from "react";
import { Route, Routes } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Home from "@/pages/home";

export default function App() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <React.Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </React.Suspense>
    </Canvas>
  );
}
