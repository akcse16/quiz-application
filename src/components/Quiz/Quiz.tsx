import React, { Fragment, useEffect, useState } from "react";
import Button from "../global/Button";
import axios from "axios";
import QuizItem from "./QuizItem";

import Loader from "../global/Loader";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "../global/ConfirmationModal";
import { shuffleArray } from "../../utils";
import Header from "../global/Header";
const Quiz = () => {
	const navigate = useNavigate();
	const quizData = useStore((state: any) => state.quizData);
	const setQuizData = useStore((state: any) => state.setQuizData);
	const activeQuestion = useStore((state: any) => state.activeQuestion);
	const setActiveQuestion = useStore((state: any) => state.setActiveQuestion);
	const result = useStore((state: any) => state.result);
	const setResult = useStore((state: any) => state.setResult);

	const [isLoading, setIsLoading] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const totalquestion = quizData?.length;
	const questionVisited =
		Object.values(result).filter((item: any) => item.isVisited).length || 0;
	const questionAttempted =
		Object.values?.(result)?.filter((item: any) => item.ans)?.length || 0;
	const unattemptedQuestion = totalquestion - +questionAttempted;

	const getQuizData = () => {
		setIsLoading(true);
		axios
			.get("https://opentdb.com/api.php?amount=15")
			.then((res) => {
				let tempData = res?.data?.results;
				tempData = tempData.map((item: any, index: number) => {
					item.id = index;
					const options = [item.correct_answer, ...item.incorrect_answers];
					shuffleArray(options);

					return { ...item, options };
				});
				setQuizData(tempData);
				tempData.map((item: any) => {
					setResult(item.id, { ans: "", isVisited: false, ...item });
				});
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getQuizData();
	}, []);

	console.log(result);

	const handleResult = (id: number, selectedAnswer: string = "") => {
		setResult(id, { ans: selectedAnswer, isVisited: true });
	};

	const handleQuesAction = (id: number, action: string) => {
		switch (action) {
			case "prev":
				if (id > 0) {
					setActiveQuestion(id - 1);
				}
				break;
			case "next":
				if (id < 14) {
					setActiveQuestion(id + 1);
				} else {
					setShowConfirmationModal(true);
				}
				break;
			default:
				setActiveQuestion(id);
				break;
		}
		handleResult(id, result[id]?.ans);
	};

	const handleSubmitAssignment = () => {
		navigate("/report", { replace: true });
	};
	return (
		<div className="quiz-container">
			<Header title={"Quiz Exam"} />
			{isLoading ? (
				<Loader />
			) : (
				<div className="quiz_wrapper">
					<div style={{ flex: 1 }}>
						<QuizItem
							item={quizData[activeQuestion]}
							handleResult={handleResult}
						/>
						{activeQuestion > 0 && (
							<Button
								btnTxt="Prev"
								btnClass="prev_btn"
								type={"submit"}
								onClick={() => handleQuesAction(activeQuestion, "prev")}
							/>
						)}
						<Button
							btnTxt="Next"
							btnClass="next_btn"
							type={"submit"}
							onClick={() => handleQuesAction(activeQuestion, "next")}
						/>
					</div>
					<div className="questions_nav">
						<ul className="summary">
							<li className="total">Total: {totalquestion} </li>
							<li className="orange">Visited:{questionVisited} </li>
							<li className="green">
								<>Answered: {questionAttempted}</>
							</li>
							<li className="grey">Not-Answered:{unattemptedQuestion} </li>
						</ul>
						<div className="nav_inner">
							{quizData?.map((item: any) => {
								return (
									<span
										onClick={() => handleQuesAction(item.id, "move")}
										key={item.id}
										className={
											result[item.id]?.ans?.length
												? "attempt"
												: result[item.id]?.isVisited
												? "visited"
												: item.id === activeQuestion
												? "active"
												: ""
										}
									>
										{item.id + 1}
									</span>
								);
							})}
						</div>
					</div>
				</div>
			)}
			{showConfirmationModal && (
				<ConfirmationModal
					className="log_out_modal"
					title={"Are you sure"}
					desc="have you reckecked your answers and really wants to submit? "
					btnTxt={"Yes, Submit"}
					onSubmit={() => handleSubmitAssignment()}
					onClose={() => setShowConfirmationModal(false)}
				/>
			)}
		</div>
	);
};

export default Quiz;
