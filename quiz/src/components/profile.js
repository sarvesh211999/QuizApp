import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

class Profile extends Component {

	constructor() {
		super();
		this.state = {
			data: [],
			name: sessionStorage.getItem("username"),
			userid: sessionStorage.getItem("id")
		}
	}

	componentDidMount(){

		fetch('http://localhost:8080/getScore/'+this.state.userid)
			.then(response => response.json())
				.then(data => {
					console.log(data)
					this.setState({data:data})
				})
	}

	render() {
		return(
			<div>
			<h2> Name : {this.state.name} </h2>
			<hr />

			<table className="table table-striped">
					<thead>
						<tr>
							<th>QuizName</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>{this.state.data.map(function(item,key){
						if(item.attempted == 1)
						return (
							<tr >
								<td>{item.quizname}</td>
								<td>{item.score}</td>
							</tr>
						)
					})}
					</tbody>
			</table>

			</div>
		)
	}


}

export default Profile