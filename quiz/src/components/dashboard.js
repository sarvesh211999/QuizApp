import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import AddCategory from './addCategory';
import AddQuiz from './addQuiz';
import Home from './home';
import Quizzes from './quiz';

class Dashboard extends Component {
	render() {
		return (
			<Router>
        <div style={{width: 1000, margin: '0 auto'}}>
          <ul>
            <li><Link to='/home'> Home </Link></li>
            <li><Link to='/quizlist'> Take Quiz </Link></li>

            {/*<li><Link to='/addCategory'> Add Category </Link></li>
            <li><Link to='/addQuiz'> Add Quiz </Link></li>*/}
          </ul>
          <hr/>
          <Switch>
	          <Route path='/home' component={Home} />
	          <Route path='/addCategory' component={AddCategory} />
            <Route path='/addQuiz' component={AddQuiz} />
            <Route path='/quizlist' component={Quizzes} />

	         </Switch>
        </div>
      </Router>


		);
	}
}

export default Dashboard;