export default function Lighting() {
	return (
		<group>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
		</group>
	)
}
