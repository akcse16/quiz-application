import React from "react";
import useStore from "../../store/useStore";
import Header from "../global/Header";

const Report = () => {
	const getQuizReport = () => {};
	const result = useStore((state: any) => state.result);

	return (
		<>
			<Header title={" Score Card"} showTimer={false} />
			<div className="report_page">
				<h3>Your quiz has been submitted</h3>
				<div className="card">
					<div className="col">
						<span>15</span>
						Total <br /> Questions
					</div>
					<div className="col">
						<span style={{ background: "green" }}>10</span>
						Correct <br /> Answers
					</div>
					<div className="col">
						<span style={{ background: "red" }}>10</span>
						Wrong <br /> Answers
					</div>
				</div>

				<table>
					<tr>
						<th></th>
						<th>Question</th>
						<th>Your Response</th>
						<th>Correct Answer</th>
					</tr>
					{result.map((item: any, index: number) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td align="center">{item?.ques}</td>
								<td
									className={
										item.answer
											? item.answer === item.correctAnswer
												? "correct"
												: "incorrect"
											: "not_attempt"
									}
								>
									{item?.answer || "Not Attempted"}
								</td>
								<td>{item?.correctAnswer}</td>
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
