import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertex from "@/shaders/portal/vertex.glsl";
import fragment from "@/shaders/portal/fragment.glsl";

export default function Portal() {
  const portalRef = React.useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null);
  const boxRef = React.useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null);

  useFrame((state, delta) => {
    const portal = portalRef.current;
    if (portal === null) return;
    portal.material.uniforms.uTime.value += delta;
    const box = boxRef.current;
    if (box === null) return;
    const speed = 3;
    const t = (1 + Math.sin(portal.material.uniforms.uTime.value * speed)) / 2;
    box.position.z = THREE.MathUtils.mapLinear(t, 0, 1, -1, 1);
  });

  const uniforms = React.useMemo(() => {
    return THREE.UniformsUtils.merge([
      THREE.UniformsLib["common"],
      THREE.UniformsLib["aomap"],
      THREE.UniformsLib["lightmap"],
      THREE.UniformsLib["emissivemap"],
      THREE.UniformsLib["envmap"],
      THREE.UniformsLib["fog"],
      THREE.UniformsLib["lights"],
      {
        uTime: { value: 0 },
        uOpacity: { value: 0.85 },
        uAmplitude: { value: 0.1 },
        uFrequency: { value: 2.5 },
        uSpeed: { value: 1 },
        uColorStart: { value: new THREE.Color("#f65dac") },
        uColorEnd: { value: new THREE.Color("#8327c0") },
      },
    ]);
  }, []);

  const key = React.useMemo(() => {
    return vertex + fragment + JSON.stringify(uniforms);
  }, [vertex, fragment, uniforms]);

  return (
    <>
      <mesh ref={boxRef} position={[0, 0, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="crimson" />
      </mesh>

      <mesh ref={portalRef}>
        <circleGeometry args={[1, 64]} />
        <shaderMaterial key={key} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} side={THREE.DoubleSide} lights={true} transparent={true} extensions={{ derivatives: true, fragDepth: true, drawBuffers: true, shaderTextureLOD: true }} />
      </mesh>
    </>
  );
}
