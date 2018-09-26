import React , { Component } from 'react';
import { withRouter } from 'react-router-dom'
import $ from 'jquery'


class AddQuiz extends Component {

	constructor() {
		super();
		this.state = {
			data: [],
			submitted: false,

		}
		this.addQuestion = this.addQuestion.bind(this)
		this.addQuiz = this.addQuiz.bind(this)
	}

	componentDidMount() {

		const request = new Request('http://localhost:8080/allCategory');
		fetch(request)
			.then(response => response.json())
				.then(data => this.setState({data:data}));
	}

	addQuiz(){
		this.setState({submitted:true})	
		var name = document.querySelector('.questionNam').value
		var category = document.querySelector('.category').value
		fetch('http://localhost:8080/addQuiz/'+name+'/'+category,{
			method:'POST'
		})


	}

	addQuestion(event) {
		event.preventDefault();
		var element = document.querySelector('.addQuestion');
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
			jsonObject.answer = checked;

			fetch('http://localhost:8080/addQuestion',{
				method: 'POST',
				body: JSON.stringify(jsonObject),
			})

			$('input:checkbox').removeAttr('checked');

			var elres = document.querySelectorAll('.input')
			for(var i=0;i<elres.length;i++){
				elres[i].value = ""
			}
			var chcbox = document.querySelectorAll('input[name=checkbox]')

			for(var i=0;i<chcbox.length;i++){
				chcbox[i].checked = false
			}

			var element = document.querySelector("#question").insertRow(0)
			var r1 = element.insertCell(0);
			r1.innerHTML = jsonObject.question
			r1 = element.insertCell(1);
			r1.innerHTML = jsonObject.option1
			r1 = element.insertCell(2);
			r1.innerHTML = jsonObject.option2
			r1 = element.insertCell(3);
			r1.innerHTML = jsonObject.option3
			r1 = element.insertCell(4);
			r1.innerHTML = jsonObject.option4

	}

	render() {

		if(this.state.submitted == true ){
			this.state.submitted == false 
			return(
				<h3>Quiz Added </h3>
				// <Link to='/dashboard'>Go Back To Dashboard</Link>
			)
		}

		return (
			<div>
			<form className="quizForm" onSubmit={this.addQuiz}>
				<p> Category </p>
				<select name="category" className="category">
					{this.state.data.map(function(item, key) {
	               return (
	                      <option value={item.category}>{item.category}</option>
	                )
	             })}

				</select>
				<p> Quiz Name </p>
					<input type="text" className="questionNam" name="quizname"/>
				<div className="question"> 
					<p> Question </p>
						<input type="text" className="input" name="question" required/><br/>
					<p>Option 1 </p>
						<input type="text" className="input" name="option1" /><input type="checkbox" name="checkbox" value="1"/><br/>
					<p>Option 2 </p>
						<input type="text" className="input" name="option2" /><input type="checkbox" name="checkbox" value="2"/><br/>
					<p>Option 3 </p>
						<input type="text" className="input" name="option3" /><input type="checkbox" name="checkbox" value="3"/><br/>
					<p>Option 4 </p>
						<input type="text" className="input" name="option4" /><input type="checkbox" name="checkbox" value="4"/><br/>
					</div>
				<button type="button" onClick={this.addQuestion}> Add Question </button>
				<button onClick={this.addQuiz}> Submit </button>
			</form>
			<div className="added">
				<h3>Questions Added </h3>
				<table id="question" className="table table-hover">
					<thead>
						<th>Question</th>
						<th>Option1</th>
						<th>Option2</th>
						<th>Option3</th>
						<th>Option4</th>
					</thead>
				</table>
			</div>
			</div>
		)
	}
};

export default AddQuiz;