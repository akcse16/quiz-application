import { object } from "yup";
import { create } from "zustand";

const useStore = create((set) => ({
	quizData: [],
	setQuizData: (quizData: []) => {
		set((state: any) => ({
			quizData: quizData,
		}));
	},
	result: {},
	setResult: (id: number, params: {}) => {
		set((state: any) => ({
			result: {
				...state.result,
				[id]: { ...state.result[id], ...params },
			},
		}));
	},

	activeQuestion: 0,
	setActiveQuestion: (activeQuestion: number) => {
		set((state: any) => ({
			activeQuestion: activeQuestion,
		}));
	},
	selectedAnswer: "",
	setSelectedAnswer: (selectedAnswer: string) => {
		set((state: any) => ({
			selectedAnswer: selectedAnswer,
		}));
	},
}));

export default useStore;
