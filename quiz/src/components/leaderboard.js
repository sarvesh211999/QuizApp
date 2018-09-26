import React, { Component } from 'react';

class LeaderBoard extends Component {

constructor(){
	super()
	this.state = {
		data: [],
		total: [],
		categories:[],
		category: null
	}
	this.changeCat = this.changeCat.bind(this)
}

changeCat(event){
	console.log(event.target.value)
	this.state.category = event.target.value
	this.forceUpdate()
}

componentDidMount() {
	const request = new Request('http://localhost:8080/allCategory')
	fetch(request)
		.then(response => response.json())
			.then(data => this.setState({categories:data}))

	const request1 = new Request('http://localhost:8080/allScore')
	fetch(request1)
		.then(response => response.json())
			.then(data => {
				this.setState({data:data})

			})
	const request2 = new Request('http://localhost:8080/totalScore')
	fetch(request2)
		.then(response => response.json())
			.then(data => {
				this.setState({total:data})

			})
	
}

render() {
	var self = this;
	console.log(self.state.category)
		return (
			<div>
					<h2>Leaderboard</h2>
				<div>
					<h3>Category Leaderboard</h3>
					<select className="catLeader" onClick={this.changeCat}>
					{
						this.state.categories.map(function(item,key){
							return(
								<option>{item.category}</option>
							)
						})
					}
				  </select>
				  <div id="show">
					
						<table class="table table-striped table-bordered table-hover table-condensed">
						<thead>
				      <tr>
				        <th>Firstname</th>
				        <th>Score</th>
				      </tr>
				    </thead>
				    <tbody>
						{this.state.data.map(function(item,key){
							if(self.state.category == item.Category)
							{
							return (
								<tr>
								<td> {item.Name}</td>
								<td> {item.Score}</td>
								</tr>
								)
						}
						}

						)
						}
						</tbody>
						</table>
					
					</div>

				</div>
				<div>
					<h3>Overall Leaderboard</h3>
					<table class="table table-striped table-bordered table-hover table-condensed">
						<thead>
				      <tr>
				        <th>Firstname</th>
				        <th>Score</th>
				      </tr>
				    </thead>
				    <tbody>
					{
					this.state.total.map(function(item,key){

							return (
								<tr>
								<td> {item.Name}</td>
								<td> {item.Score}</td>
								</tr>
								)

						}

						)
				}
				</tbody>
				</table>
				</div>

			</div>
		);
	}	
}

export default LeaderBoard