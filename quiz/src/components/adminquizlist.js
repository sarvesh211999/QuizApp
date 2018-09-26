import React , { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';

class AdminQuizList extends Component {
	constructor() {
		super();
		this.state = {
			quiz: [],
		}
	}

	componentDidMount() {
		// browserHistory.push('/');
		const request1 = new Request('http://localhost:8080/allQuiz');
				fetch(request1)
					.then(response => response.json())
						.then(data => this.setState({quiz:data}));
	}

	delete(event) {
		var id = event.target.value
		console(id)
		const request = new Request('http://localhost:8080/deletequiz/' + id)
		fetch(request)
	}

	render() {
		var self = this
		return (
			<div>
				<table className="table table-striped table-bordered table-hover table-condensed">
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
								<td><Link to={"/adminquiz/" + item.id } > Edit Quiz </Link></td>
								<td><button id={`delete${item.id}`} onClick={self.delete}>Delete Quiz</button></td>
							</tr>
						)
					})}
					</tbody>
				</table>
			</div>
		)
	}
}
export default AdminQuizList