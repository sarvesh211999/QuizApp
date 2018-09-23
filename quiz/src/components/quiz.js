import React, { Component } from 'react';
import $ from 'jquery';


class Quiz extends Component {
	constructor() {
    super();
    this.state = {
      data: [],
      quizname: null,
    }
    this.checkAns = this.checkAns.bind(this)
  }

  checkAns() {
  	// score left to post a backend
  	var score = 0
  	for(var i=1 ;i<=this.state.data.length ; i++){
  		if($('.'+ i +':checked').length > 1 ){
  			var ans = ""
  			$('.'+ i +':checked').each(function () {
  					ans += String($(this).val())
            // console.log($(this).val());
        });
  		}
  		else{
  			var ans = String($('.'+ i +':checked').val());
  			// console.log($('.'+ i +':checked').val())
  		}

  		if(ans == this.state.data[i - 1].answer){
  			score += 10
  		}
  	}
  	console.log(score)

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
									<span>{item.option4}  </span><input type="radio" className={key + 1} Name={key + 1} value="4"/><br/>
									<br/>
								</div>

							)
						}
				})}
				<button onClick={this.checkAns}>Submit Quiz </button>
			</div>
		)
	}
}
export default Quiz