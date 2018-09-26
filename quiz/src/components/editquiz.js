import React, { Component } from 'react';

class EditQuiz extends Component {
	constructor() {
    super();
    this.state = {
      data: [],
      quizname: null,
      category: null,
    }
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
  }

	componentDidMount(){
		const request = new Request('http://127.0.0.1:8080/getQuiz/' + this.props.match.params.id);
    fetch(request)
      .then(response => response.json())
        .then(data => {
        	this.setState({data: data})
        	this.setState({quizname:data[0].quizname})
       });

    // document.getElementById("id").checked = false;
	}

	delete(val){
		fetch('http://localhost:8080/deleteQues/' + val)
		var elem = document.querySelector("#question" + val).parentNode
		elem.parentElement.removeChild(elem)
	}

	update(val){

		let jsonObject = {}
		jsonObject["id"] = val;
		jsonObject["quizname"] = this.state.quizname
		jsonObject["category"] = this.state.data[0].category
		var elem = document.querySelector("#question" + val).parentNode
		jsonObject["question"] = elem.childNodes[0].value
		jsonObject["option1"] = elem.childNodes[2].value
		jsonObject["option2"] = elem.childNodes[5].value
		jsonObject["option3"] = elem.childNodes[8].value
		jsonObject["option4"] = elem.childNodes[11].value
		var answer = ""
		for(var i= 3 ;i<=13;i+=3){
			if(elem.childNodes[i].checked)
				answer +=elem.childNodes[i].value
		}
		jsonObject["answer"] = parseInt(answer)

		fetch('http://localhost:8080/updateQues',{
			method:'POST',
			body: JSON.stringify(jsonObject)
		})
		.then((response) => {
			if(response.status == 200){
				alert("Saved")
			}
		})

	}
		
	render() {
		var self=this;
		return (
			<div>
				{this.state.quizname}
					{this.state.data.map(function(item,key){

							return( 
								<div>
									<input type="text" name="question" defaultValue={item.question} required/><br />
									<input type="text" name="option1" defaultValue={item.option1} required/><input type="checkbox" className={key + 1} name="checkbox" value="1" defaultChecked={true && String(item.answer).split('').indexOf("1")!=-1}/><br/>
									<input type="text" name="option2" defaultValue={item.option2} required/><input type="checkbox" className={key + 1} name="checkbox" value="2" defaultChecked={true && String(item.answer).split('').indexOf("2")!=-1}/><br/>
									<input type="text" name="option3" defaultValue={item.option3} required/><input type="checkbox" className={key + 1} name="checkbox" value="3" defaultChecked={true && String(item.answer).split('').indexOf("3")!=-1}/><br/>
									<input type="text" name="option4" defaultValue={item.option4} required/><input type="checkbox" className={key + 1} name="checkbox" value="4" defaultChecked={true && String(item.answer).split('').indexOf("4")!=-1}/><br/>
									<br/>
									<button className="delQues" id={`question${item.id}`} onClick={() => self.delete(item.id)}>Delete Question</button>
									<br/>
									<button className="updQues" id={`delete${item.id}`} onClick={() => self.update(item.id)}>Save Question</button>

								</div>

							)

				})}
				<div className="answer"> 
				</div>
			</div>
		)
	}
}
export default EditQuiz