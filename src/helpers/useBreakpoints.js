import { useState, useEffect } from "react"
import useStore from "../store/store"
import useWindowSize from "./useWindowSize"

// Returns "small", "medium" or "large" based on breakpoints from _variables.scss
export default function useBreakpoints() {
	const windowSize = useWindowSize()
	const breakpoints = useStore((state) => state.breakpoints)
	const [breakpoint, setBreakpoint] = useState(null)

	useEffect(() => {
		if (windowSize.width <= breakpoints.small) {
			setBreakpoint("small")
		} else if (
			windowSize.width > breakpoints.medium &&
			windowSize.width < breakpoints.large
		) {
			setBreakpoint("medium")
		} else {
			setBreakpoint("large")
		}
	}, [windowSize, breakpoints])

	return breakpoint
}
