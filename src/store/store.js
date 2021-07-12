import create from 'zustand'

const useStore = create((set) => ({
	language: 'en',
	setLanguage: (i) => set({ language: i }),

	openMenu: false,
	setOpenMenu: (i) => set({ openMenu: i }),

	openTimeline: false,
	setOpenTimeline: (i) => set({ openTimeline: i }),

	breakpoints: { small: 556, medium: 557, large: 1080 }, // This needs to be consistent with _variables.scss
}))

export default useStore
