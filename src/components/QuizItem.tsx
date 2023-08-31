import React from "react";
import useStore from "../store/useStore";
interface QuizItemProps {
	item: any;
	// setSelectedAnswer?: any;
	// selectedAnswer?: string;
	// activeQuestionIndex: number;
}
const QuizItem = (props: QuizItemProps) => {
	const { item } = props;
	const activeQuestionIndex = useStore(
		(state: any) => state.activeQuestionIndex
	);
	const selectedAnswer = useStore((state: any) => state.selectedAnswer);
	const setSelectedAnswer = useStore((state: any) => state.setSelectedAnswer);

	return (
		<>
			<div className="quiz_item">
				<span className="question_no">{activeQuestionIndex + 1}</span>
				<div>
					<div className="ques">{item?.question}</div>
					<ul className="options">
						{item?.options.map((value: string, index: number) => {
							return (
								<li
									className={
										selectedAnswer === value
											? "option_inner active"
											: "option_inner"
									}
									key={index}
									onClick={() => setSelectedAnswer(value)}
								>
									{value}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default QuizItem;
