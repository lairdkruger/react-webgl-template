import React, { forwardRef, useMemo, useState } from "react"
import { EffectComposer, Noise } from "@react-three/postprocessing"
import { useSpring, animated } from "@react-spring/web"
import { extend, useFrame, useLoader } from "@react-three/fiber"

import { GammaCorrectionEffect, BlendFunction } from "postprocessing"
import { TextureLoader } from "three"

// Custom shader effects
import { GradientMapEffect } from "./GradientMapEffect"

// Effects from postprocessing have to be forward ref'd
export const GammaCorrection = forwardRef(({ gamma = 0.45 }, ref) => {
	const effect = useMemo(() => {
		const options = {
			gamma: gamma, // magic number that corrects effect composer's color management
		}
		return new GammaCorrectionEffect(options)
	}, [gamma])
	return <primitive ref={ref} object={effect} dispose={null} />
})

export default function Effects(props) {
	const [gradientMapMix, setGradientMapMix] = useState(false)

	const [spring, api] = useSpring(() => ({
		gradientMapMix: 0,
		onRest: () => {
			setGradientMapMix((state) => !state)
		},

		config: {
			mass: 1,
			tension: 16,
			friction: 10,
			clamp: true,
		},
	}))

	useFrame(() => {
		api.start({ gradientMapMix: gradientMapMix ? 0 : 1 })
		console.log(spring.gradientMapMix.get())
	})

	const gradientMap = useLoader(TextureLoader, "/textures/chrome4.jpg")

	const effects = useMemo(() => {
		return ({ gradientMapMix }) => (
			<EffectComposer>
				{/* <DepthOfField focusDistance={0.2} focalLength={0.5} bokehScale={10} /> */}
				<GradientMapEffect
					blendFunction={BlendFunction.NORMAL}
					gradientMap={gradientMap}
					mapAmount={gradientMapMix}
				/>

				<Noise blendFunction={BlendFunction.SCREEN} premultiply={true} opacity={0.5} />

				<GammaCorrection gamma={0.45} />
			</EffectComposer>
		)
	}, [gradientMap])

	// extend effects so that they can be animated with springs
	const AnimatedEffects = animated(effects)

	extend(AnimatedEffects)

	return <AnimatedEffects gradientMapMix={spring.gradientMapMix.get()} />
}
