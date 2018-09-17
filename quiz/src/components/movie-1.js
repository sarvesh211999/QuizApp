import React, { Component } from 'react';

var data = [
		{"Ques":"asd" ,"Q1":"A1", "Q2":"A2" , "Q3":"A3" ,"Q4":"A4"},
		{ "Ques":"asd" ,"Q1":"A1", "Q2":"A2" , "Q3":"A3" ,"Q4":"A4"},
		{ "Ques":"asd" ,"Q1":"A1", "Q2":"A2" , "Q3":"A3" ,"Q4":"A4"},
		{ "Ques":"asd" ,"Q1":"A1", "Q2":"A2" , "Q3":"A3" ,"Q4":"A4"},
		{ "Ques":"asd" ,"Q1":"A1", "Q2":"A2" , "Q3":"A3" ,"Q4":"A4"},
		{ "Ques":"asd" ,"Q1":"A1", "Q2":"A2" , "Q3":"A3" ,"Q4":"A4"},
	]

const Movie1 = () => (
	<div>
	  <div> Movie 1 Quiz </div>
	  <form>
	  	<div>{data.map(function(item, key) {
               return (
                  <ul>
                      <li>{item["Ques"]}</li>
                      <li>{item.Q1}</li>
                      <li>{item.Q2}</li>
                      <li>{item.Q3}</li>
                  </ul>
                )
             })}
      </div>
	  </form>
	</div>
);

export default Movie1;