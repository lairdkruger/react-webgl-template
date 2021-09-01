const GradientMapShader = `

	uniform float mapAmount;
	uniform sampler2D gradientMap;

	float desaturate(in vec3 inColor) {
		return ((inColor.r + inColor.g + inColor.b) / 3.0);
	}

	void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

		float lightness = desaturate(inputColor.rgb);
		vec4 gradientImage = texture2D(gradientMap, vec2(lightness, 0.0));

		vec4 texel = texture2D(gradientMap, uv);

		vec4 finalColor = mix(vec4(gradientImage), vec4(inputColor), mapAmount);

		outputColor = vec4(finalColor.rgb, inputColor.a);
	
	}
`

export { GradientMapShader }
