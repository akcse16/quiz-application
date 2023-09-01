import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import { removeLocalStorage } from "../../utils";
import Header from "../global/Header";

const Report = () => {
	const navigate = useNavigate();
	const result = useStore((state: any) => state.result);
	console.log(result);
	useEffect(() => {
		return () => {};
	}, []);
	const handlePageClose = () => {
		removeLocalStorage("isLogin");
		navigate("/");
	};
	window.addEventListener("beforeunload", handlePageClose);

	window.addEventListener("popstate", handlePageClose);

	// Clean up event listeners when the component unmounts

	const totalquestion = Object.keys(result)?.length;
	const correctAnswerCount = Object.values(result).filter(
		(item: any) => item.ans === item.correct_answer
	).length;
	const notAnswerCount = Object.values(result).filter(
		(item: any) => !item.ans
	).length;
	const inCorrectAnswerCount = Object.values(result).filter(
		(item: any) => item.ans && item.ans != item.correct_answer
	).length;
	return (
		<>
			<Header title={" Score Card"} showTimer={false} />
			<div className="report_page">
				<h3>Your quiz has been submitted</h3>
				<div className="card">
					<div className="col">
						<span>{totalquestion}</span>
						Total <br /> Questions
					</div>
					<div className="col">
						<span style={{ background: "green" }}>{correctAnswerCount}</span>
						Correct <br /> Answers
					</div>
					<div className="col">
						<span style={{ background: "red" }}>{inCorrectAnswerCount}</span>
						Wrong <br /> Answers
					</div>
					<div className="col">
						<span style={{ background: "grey" }}>{notAnswerCount}</span>
						Not <br /> Answers
					</div>
				</div>

				<table>
					<tr>
						<th></th>
						<th>Question</th>
						<th>Your Response</th>
						<th>Correct Answer</th>
					</tr>
					{Object.values(result).map((item: any) => {
						return (
							<tr key={item.id}>
								<td>{item.id + 1}</td>
								<td align="center">{item?.question}</td>
								<td
									className={
										item.ans
											? item.ans === item.correct_answer
												? "correct"
												: "incorrect"
											: "not_attempt"
									}
								>
									{item?.ans || "Not Attempted"}
								</td>
								<td>{item?.correct_answer}</td>
							</tr>
						);
					})}
				</table>

				<b>Notes:</b>
				<ul className="notes">
					<li>
						<span className="green"></span> indicates that your answer is
						correct.
					</li>
					<li>
						<span className="red"></span>indicates that your answer is
						Incorrect.
					</li>
					<li>
						<span className="grey"></span> indicates that your have not attempt
						the question
					</li>
				</ul>
			</div>
		</>
	);
};

export default Report;
