import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

class QuizList extends Component {

	constructor() {
		super();
		this.state = {
			quiz: [],
		}
	}

	componentDidMount() {
		browserHistory.push('/');
		const request1 = new Request('http://localhost:8080/allQuiz');
				fetch(request1)
					.then(response => response.json())
						.then(data => this.setState({quiz:data}));
	}

	render() {
		return (
			<div>
				<table border="1">
					<thead>
						<tr>
							<th>Category</th>
							<th>Name Of Quiz</th>
						</tr>
					</thead>
					<tbody>{this.state.quiz.map(function(item,key){
						return (
							<tr id={item.id}>
								<td>{item.category}</td>
								<td>{item.quizname}</td>
								<td><Link to={"/quiz/" + item.id } > Take Quiz </Link></td>
							</tr>
						)
					})}
					</tbody>
				</table>
			</div>
		)
	}
}
export default QuizList