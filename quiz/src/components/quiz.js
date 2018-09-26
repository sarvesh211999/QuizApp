import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import $ from 'jquery';


class Quiz extends Component {
	constructor() {
    super();
    this.state = {
      data: [],
      quizname: null,
      category: null,
    }
    this.checkAns = this.checkAns.bind(this)
  }


  checkAns() {
  	// score left to post a backend
  	var score = 0
  	var correct = 0
  	var incorrect = 0 
  	var unattempted = 0
  	for(var i=1 ;i<=this.state.data.length ; i++){
  		if($('.'+ i +':checked').length == 0){
  			unattempted += 1
  		}
  		else if($('.'+ i +':checked').length > 1 ){
  			var ans = ""
  			$('.'+ i +':checked').each(function () {
  					ans += String($(this).val())
            // console.log($(this).val());
        });
        if(ans == this.state.data[i - 1].answer){
	  			score += 10
	  			correct +=1
	  		}
  		}
  		else{
  			var ans = String($('.'+ i +':checked').val());
  			if(ans == this.state.data[i - 1].answer){
	  			score += 10
	  			correct +=1
	  		}
  			// console.log($('.'+ i +':checked').val())
  		}

  		
  	}

  	incorrect = this.state.data.length - unattempted - correct


  	let jsonObject ={}
  	jsonObject["userid"]=parseInt(sessionStorage.getItem("id"));
  	jsonObject["quizname"]=this.state.quizname;
  	jsonObject["score"]=score;
    jsonObject["attempted"]=1;


  	fetch('http://localhost:8080/addScore',{
  		method: 'POST',
  		body: JSON.stringify(jsonObject),
  	})

  	var elem = document.querySelector(".check")
  	elem.parentNode.removeChild(elem);

  	var element = document.querySelector(".answer")
  	var node = null
  	var h2 = document.createElement("h2")
  	h2.appendChild(document.createTextNode("Result"))
  	element.appendChild(h2);
  	node = document.createTextNode("Score: " + score);
  	element.appendChild(node);
  	element.appendChild(document.createElement('br'));
  	node = document.createTextNode("Corrected: " + correct);
  	element.appendChild(node);
  	element.appendChild(document.createElement('br'));
  	node = document.createTextNode("Incorrect: " + incorrect);
  	element.appendChild(node);
  	element.appendChild(document.createElement('br'));
  	node = document.createTextNode("Unattempted: " + unattempted);
  	element.appendChild(node);
  	element.appendChild(document.createElement('br'));

  	}

	componentDidMount(){
		const request = new Request('http://127.0.0.1:8080/getQuiz/' + this.props.match.params.id);
    fetch(request)
      .then(response => response.json())
        .then(data => {
        	this.setState({data: data})
        	this.setState({quizname:data[0].quizname})
       });
	}
		
	render() {
		var self=this;
		return (
			<div>
				{this.state.quizname}
					{this.state.data.map(function(item,key){
						if(String(item.answer).split('').length > 1){
							return( 
								<div>
									<div>{item.question}</div>
									<span>{item.option1}  </span><input type="checkbox" className={key + 1} name={key + 1} value="1" /><br/>
									<span>{item.option2}  </span><input type="checkbox" className={key + 1} name={key + 1} value="2"/><br/>
									<span>{item.option3}  </span><input type="checkbox" className={key + 1} name={key + 1} value="3"/><br/>
									<span>{item.option4}  </span><input type="checkbox" className={key + 1} name={key + 1} value="4"/><br/>
									<br/>
								</div>

							)
						}
						else{
						return( 
								<div>
									<div>{item.question}</div>
									<span>{item.option1}  </span><input type="radio" className={key + 1} name={key + 1} value="1"/><br/>
									<span>{item.option2}  </span><input type="radio" className={key + 1} name={key + 1} value="2"/><br/>
									<span>{item.option3}  </span><input type="radio" className={key + 1} name={key + 1} value="3"/><br/>
									<span>{item.option4}  </span><input type="radio" className={key + 1} name={key + 1} value="4"/><br/>
									<br/>
								</div>

							)
						}
				})}
				<button className="check" onClick={this.checkAns}>Submit Quiz </button>
				<div className="answer"> 
				</div>
			</div>
		)
	}
}
export default Quiz