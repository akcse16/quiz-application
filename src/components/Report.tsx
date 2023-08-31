import React from "react";
import useStore from "../store/useStore";

const Report = () => {
	const getQuizReport = () => {};
	const result = useStore((state: any) => state.result);

	return (
		<div className="report_page">
			<h1>Result Page</h1>

			<b>Notes:</b>
			<ul className="notes">
				<li>
					<span className="green"></span> indicates that your answer is correct.
				</li>
				<li>
					<span className="red"></span>indicates that your answer is Incorrect.
				</li>
				<li>
					<span className="grey"></span> indicates that your have not attempt
					the question
				</li>
			</ul>
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
		</div>
	);
};

export default Report;
