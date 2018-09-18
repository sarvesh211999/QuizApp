import React , { Component } from 'react';


class AddQuiz extends Component {

	constructor() {
		super();
		this.state = {
			data: []
		}
	}

	componentDidMount() {

		const request = new Request('http://localhost:8080/allCategory');
		fetch(request)
			.then(response => response.json())
				.then(data => this.setState({data:data}));
	}

	addQuiz(event) {
		event.preventDefault();
		const formData = new FormData(document.querySelector('.quizForm'));
		let jsonObject ={}

		function getCheckedBoxes(chkboxName) {
			  var checkboxes = document.getElementsByName(chkboxName);
			  var checkboxesChecked = [];

			  for (var i=0; i<checkboxes.length; i++) {
			     if (checkboxes[i].checked) {
			        checkboxesChecked.push(checkboxes[i]);
			     }
			  }

			  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
			}

			var checkedBoxes = getCheckedBoxes("checkbox");
			var checked = ""
			checkedBoxes.forEach(function(item){
				checked += item.value;
			})
			checked = parseInt(checked,10)
			console.log(checked,typeof checked)

			for (const [key, value]  of formData.entries()) {
	    	jsonObject[key] = value;
			}

			delete jsonObject.category;
			jsonObject.answer = checked;
			console.log(jsonObject)
			


			console.log(JSON.stringify(jsonObject));
	};

	addQuestion(event) {
		event.preventDefault();
		var element = document.querySelector('.addQuestion');
	}

	render() {

		return (
			<div>
			<form className="quizForm" onSubmit={this.addQuiz}>
				<select name="category">
					{this.state.data.map(function(item, key) {
	               return (
	                      <option value={item.id}>{item.category}</option>
	                )
	             })}

				</select>
				<p> Quiz Name </p>
					<input type="text" name="quizname"/>
				<div className="question"> 
					<p> Question </p>
						<input type="text" name="question"/><br/>
					<p>Option 1 </p>
						<input type="text" name="option1" /><input type="checkbox" name="checkbox" value="1"/><br/>
					<p>Option 2 </p>
						<input type="text" name="option2" /><input type="checkbox" name="checkbox" value="2"/><br/>
					<p>Option 3 </p>
						<input type="text" name="option3" /><input type="checkbox" name="checkbox" value="3"/><br/>
					<p>Option 4 </p>
						<input type="text" name="option4" /><input type="checkbox" name="checkbox" value="4"/><br/>
					</div>
				<button onClick={this.addQuestion}> Add Question </button>
				<button> Submit </button>
			</form>
			</div>
		)
	}
};

export default AddQuiz;