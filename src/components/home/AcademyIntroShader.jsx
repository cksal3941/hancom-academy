import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// three.js 계열 의존성을 메인 번들에서 분리하기 위해
// AcademyIntroSection에서 React.lazy로만 import한다.
export default function AcademyIntroShader() {
  return (
    <ShaderGradientCanvas style={{ width: '100%', height: '100%' }}>
      <ShaderGradient
        animate="on"
        axesHelper="off"
        brightness={1}
        cAzimuthAngle={180}
        cDistance={2.8}
        cPolarAngle={80}
        cameraZoom={9.1}
        color1="#2a3f8f"
        color2="#5689F1"
        color3="#0a1440"
        destination="onCanvas"
        embedMode="off"
        envPreset="city"
        format="gif"
        fov={45}
        frameRate={10}
        gizmoHelper="hide"
        grain="on"
        lightType="3d"
        pixelDensity={1}
        positionX={0}
        positionY={0}
        positionZ={0}
        range="disabled"
        rangeEnd={40}
        rangeStart={0}
        reflection={0.1}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        shader="defaults"
        type="waterPlane"
        uAmplitude={0}
        uDensity={1.5}
        uFrequency={0}
        uSpeed={0.3}
        uStrength={1.5}
        uTime={8}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}
