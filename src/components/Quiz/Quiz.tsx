import { useEffect, useState } from "react";
import classnames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "../global/Button";
import Loader from "../global/Loader";
import useStore from "../../store/useStore";

import ConfirmationModal from "../global/ConfirmationModal";
import { shuffleArray } from "../../utils";
import Header from "../global/Header";
import QuizItem from "./QuizItem";

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

	/* The code is calculating various statistics related to the quiz questions. */
	const totalQuestions = quizData?.length;
	const questionVisited =
		Object.values(result).filter((item: any) => item.isVisited).length || 0;
	const questionAttempted =
		Object.values?.(result)?.filter((item: any) => item.ans)?.length || 0;
	const unattemptedQuestion = totalQuestions - +questionAttempted;

	/**
	 * The function `getQuizData` retrieves quiz data from an API, shuffles the options, and sets the quiz
	 * data and initial results in the state.
	 */
	const getQuizData = () => {
		setIsLoading(true);
		axios
			.get("https://opentdb.com/api.php?amount=15")
			.then((res) => {
				let tempData = res?.data?.results;
				tempData = tempData.map((item: any, index: number) => {
					item.id = index + 1;
					const options = [item.correct_answer, ...item.incorrect_answers];
					shuffleArray(options);

					return { ...item, options };
				});
				setQuizData(tempData);
				tempData.forEach((item: any) => {
					if (item.id === 1) {
						setResult(item.id, { ans: "", isVisited: true, ...item });
						return;
					}
					setResult(item.id, { ans: "", isVisited: false, ...item });
				});
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getQuizData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * The handleResult function updates the result for a given id with the selected answer and marks it
	 * as visited.
	 * @param {number} id - The `id` parameter is a number that represents the identifier of the result.
	 * @param {string} [selectedAnswer] - The `selectedAnswer` parameter is a string that represents the
	 * answer selected by the user. It is optional and has a default value of an empty string.
	 */
	const handleResult = (id: number, selectedAnswer: string = "") => {
		setResult(id, { ans: selectedAnswer, isVisited: true });
	};

	/**
	 * The function `handleQuesAction` handles the actions of moving to the previous or next question in
	 * a quiz, and updates the active question accordingly.
	 * @param {number} id - The `id` parameter represents the current question's ID or index in the quiz.
	 * @param {string} action - The `action` parameter is a string that represents the action to be
	 * performed. It can have one of the following values: "prev", "next", or any other value.
	 */
	const handleQuesAction = (id: number, action: string) => {
		switch (action) {
			case "prev":
				id > 1 && setActiveQuestion(id - 1);
				break;
			case "next":
				id < quizData.length
					? setActiveQuestion(id + 1)
					: setShowConfirmationModal(true);
				break;
			default:
				setActiveQuestion(id);
				break;
		}

		handleResult(id, result[id]?.ans);
	};

	/**
	 * The function handleSubmitAssignment navigates to the "/report" page.
	 */
	const handleSubmitAssignment = () => {
		navigate("/report", { replace: true });
	};

	const isLastQuestion = activeQuestion === quizData.length;

	return (
		<div className="quiz-container">
			<Header title={"Quiz Exam"} />
			{isLoading ? (
				<Loader />
			) : (
				<div className="quiz_wrapper">
					<div style={{ flex: 1 }}>
						<QuizItem
							item={
								quizData.filter((item: any) => item.id === activeQuestion)[0]
							}
							handleResult={handleResult}
						/>
						{activeQuestion > 1 && (
							<Button
								btnTxt="Prev"
								btnClass="prev_btn"
								type={"submit"}
								onClick={() => handleQuesAction(activeQuestion, "prev")}
							/>
						)}
						<Button
							btnTxt={isLastQuestion ? "Finish" : "Next"}
							btnClass="next_btn"
							type={"submit"}
							onClick={() => handleQuesAction(activeQuestion, "next")}
						/>
					</div>
					<div className="questions_nav">
						<ul className="summary">
							<li className="total">Total: {totalQuestions} </li>
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
										className={classnames({
											attempted: result[item.id]?.ans?.length,
											visited: result[item.id]?.isVisited,
											active: item.id === activeQuestion,
										})}
									>
										{item.id}
									</span>
								);
							})}
						</div>
					</div>
				</div>
			)}
			<ConfirmationModal
				className="confirmation_modal"
				title="Are you sure"
				show={showConfirmationModal}
				desc="Did you recheck your answers and are you sure you want to submit them?"
				btnTxt={"Yes, Submit"}
				onSubmit={() => handleSubmitAssignment()}
				onClose={() => setShowConfirmationModal(false)}
			/>
		</div>
	);
};

export default Quiz;
