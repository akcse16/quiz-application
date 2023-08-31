import { create } from "zustand";

const useStore = create((set) => ({
	quizData: [],
	setQuizData: (quizData: []) => {
		set((state: any) => ({
			quizData: quizData,
		}));
	},
	result: [],
	setResult: (result: []) => {
		set((state: any) => ({
			result: result,
		}));
	},
	activeQuestionIndex: 0,
	setActiveQuestionIndex: (activeQuestionIndex: number) => {
		set((state: any) => ({
			activeQuestionIndex: activeQuestionIndex,
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
