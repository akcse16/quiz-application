import React from "react";
import useStore from "../../store/useStore";
interface QuizItemProps {
	item: any;
	handleResult: (activeQuestion: number, value: string) => void;
}
const QuizItem = (props: QuizItemProps) => {
	
	const { item, handleResult } = props;
	const activeQuestion = useStore((state: any) => state.activeQuestion);
	const result = useStore((state: any) => state.result);

	return (
		<>
			<div className="question_header">
				<span className="question_no">
					<b>Question no: </b>
					{activeQuestion}
				</span>
				<div className="right">
					<span>
						<b>Category: </b> {item?.category}
					</span>
					<span>
						<b>Difficulty Level: </b> {item?.difficulty}
					</span>
				</div>
			</div>
			<div className="quiz_item">
				<div>
					<div className="ques">{item?.question}</div>
					<ul className="options">
						{item?.options.map((value: string, index: number) => {
							return (
								<li
									className={
										result[activeQuestion]?.ans === value
											? "option_inner active"
											: "option_inner"
									}
									key={index}
									onClick={() => handleResult(activeQuestion, value)}
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
