import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { NoToneMapping } from "three"
import Box from "../components/WebGL/Box"
import Lighting from "../components/WebGL/Lighting"
import Effects from "../postprocessing/Effects"
import "./HomeScene.scss"

export default function HomeScene() {
	return (
		<div className="canvas-container">
			<Canvas
				concurrent
				colorManagement={false}
				onCreated={({ gl }) => {
					gl.toneMapping = NoToneMapping
				}}
				camera={{ near: 0.1, far: 21 }}
				gl={{ antialias: true }}
			>
				<Lighting />
				<Box position={[-1.2, 0, 0]} />
				<Box position={[1.2, 0, 0]} />

				<Suspense fallback={null}>
					<Effects />
				</Suspense>
			</Canvas>
		</div>
	)
}
