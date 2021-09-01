import React, { forwardRef, useMemo } from "react"
import { Uniform } from "three"
import { Effect } from "postprocessing"
import { GradientMapShader } from "./GradientMapShader"

const fragmentShader = GradientMapShader

let _uGradientMap
let _uMapAmount

// Effect implementation
class GradientMapEffectImpl extends Effect {
	constructor({ blendFunction, gradientMap, mapAmount } = {}) {
		super("GradientMapEffect", fragmentShader, {
			blendFunction,
			uniforms: new Map([
				["gradientMap", new Uniform(gradientMap)],
				["mapAmount", new Uniform(mapAmount)],
			]),
		})

		_uGradientMap = gradientMap
		_uMapAmount = mapAmount
	}

	update() {
		this.uniforms.get("gradientMap").value = _uGradientMap
		this.uniforms.get("mapAmount").value = _uMapAmount
	}
}

// Effect component
export const GradientMapEffect = forwardRef(({ blendFunction, gradientMap, mapAmount }, ref) => {
	const effect = useMemo(
		() => new GradientMapEffectImpl({ blendFunction, gradientMap, mapAmount }),
		[blendFunction, gradientMap, mapAmount]
	)
	return <primitive ref={ref} object={effect} dispose={null} />
})
