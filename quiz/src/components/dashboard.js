import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import AddCategory from './addCategory';
import AddQuiz from './addQuiz';
import Home from './home';
import QuizList from './quizList';
import Quiz from './quiz';

class Dashboard extends Component {
  componentDidMount(){
    console.log(this.props.authProp)
  } 
	render() {
		return (
			<Router>
        <div style={{width: 1000, margin: '0 auto'}}>
          <ul>
            <li><Link to='/home'> Home </Link></li>
            <li><Link to='/quiz'> Take Quiz </Link></li>
            <li><Link to='/addCategory'> Add Category </Link></li>
            <li><Link to='/addQuiz'> Add Quiz </Link></li>
          </ul>
          <hr/>
          <Switch>
	          <Route path='/home' component={Home} />
	          <Route path='/addCategory' component={AddCategory} />
            <Route path='/addQuiz' component={AddQuiz} />
            <Route exact path='/quiz' component={QuizList} />
            <Route path='/quiz/:id' component={Quiz} />
	         </Switch>
        </div>
      </Router>


		);
	}
}

export default Dashboard;