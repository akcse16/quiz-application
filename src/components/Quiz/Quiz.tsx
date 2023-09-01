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
	const activeQuestionIndex = useStore(
		(state: any) => state.activeQuestionIndex
	);
	const setActiveQuestionIndex = useStore(
		(state: any) => state.setActiveQuestionIndex
	);
	const selectedAnswer = useStore((state: any) => state.selectedAnswer);
	const setSelectedAnswer = useStore((state: any) => state.setSelectedAnswer);
	const result = useStore((state: any) => state.result);
	const setResult = useStore((state: any) => state.setResult);
	const [isLoading, setIsLoading] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const getQuizData = () => {
		setIsLoading(true);
		axios
			.get("https://opentdb.com/api.php?amount=15")
			.then((res) => {
				let tempData = res?.data?.results;
				tempData = tempData.map((item: any) => {
					const options = [item.correct_answer, ...item.incorrect_answers];
					shuffleArray(options);
					return { ...item, options };
				});
				setQuizData(tempData);
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

	const prefilledAnswer = (id: number) => {
		let index = result.findIndex((item: any) => item.id === id);
		if (index != -1) {
			setSelectedAnswer(result[index].answer);
		} else {
			setSelectedAnswer("");
		}
	};

	const getActiveQuestion = (index: number) => {
		prefilledAnswer(index);
		if (index < 15) {
			setActiveQuestionIndex(index);
		} else {
			setActiveQuestionIndex(index - 1);
		}
	};
	const handleNext = () => {
		let tempData = {
			id: activeQuestionIndex,
			ques: quizData[activeQuestionIndex]?.["question"],
			answer: selectedAnswer,
			isAttempt: selectedAnswer ? true : false,
			correctAnswer: quizData[activeQuestionIndex]?.["correct_answer"],
		};

		let index = result.findIndex((item: any) => item.id === tempData.id);
		if (index != -1) {
			result[index].answer = selectedAnswer;
		} else {
			setResult([...result, tempData]);
		}
		setSelectedAnswer("");
		if (activeQuestionIndex === 14) {
			setShowConfirmationModal(true);
		} else {
			getActiveQuestion(activeQuestionIndex + 1);
		}
	};
	const handlePrev = () => {
		getActiveQuestion(activeQuestionIndex - 1);
	};
	const handleSubmitAssignment = () => {
		navigate("/report");
	};

	return (
		<div className="quiz-container">
			<Header title={"Quiz Exam"} />
			{isLoading ? (
				<Loader />
			) : (
				<div className="quiz_wrapper">
					<div style={{ flex: 1 }}>
						<QuizItem item={quizData[activeQuestionIndex]} />
						{activeQuestionIndex > 0 && (
							<Button
								btnTxt="Prev"
								btnClass="prev_btn"
								type={"submit"}
								onClick={handlePrev}
							/>
						)}
						<Button
							btnTxt="Next"
							btnClass="next_btn"
							type={"submit"}
							onClick={handleNext}
						/>
					</div>
					<div className="questions_nav">
						<ul className="summary">
							<li>Total:10 </li>
							<li>Attempt:10 </li>
							<li>Remaining:10 </li>
						</ul>
						<div className="nav_inner">
							{quizData?.map((item: any, index: number) => {
								return (
									<span
										onClick={() => getActiveQuestion(index)}
										key={index}
										className={
											// result[index]?.isAttempt
											// ? "attempt"
											// :
											index === activeQuestionIndex ? "visited" : ""
										}
									>
										{index + 1}
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
