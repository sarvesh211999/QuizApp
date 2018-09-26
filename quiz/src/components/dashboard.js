import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import AddCategory from './addCategory';
import AddQuiz from './addQuiz';
import Home from './home';
import QuizList from './quizList';
import Quiz from './quiz';
import Profile from './profile'
import LeaderBoard from './leaderboard'
import AdminUser from './adminuser'
import AdminQuizList from './adminquizlist'
import EditQuiz from './editquiz'

class Dashboard extends Component {

	render() {
		return (
			<Router>
        <div style={{width: 1000, margin: '0 auto'}}>

            <Link to='/quiz'> Take Quiz </Link><br />
            {sessionStorage.getItem("isAdmin")==="1" && <Link to='/addCategory'> Add Category </Link>}{sessionStorage.getItem("isAdmin")==="1" &&<br />}
            {sessionStorage.getItem("isAdmin")==="1" && <Link to='/addQuiz'> Add Quiz </Link>}{sessionStorage.getItem("isAdmin")==="1" &&<br />}
            <Link to='/profile'> View Profile </Link><br />
            <Link to='/leaderboard'> LeaderBoard </Link><br />
            <Link to='/allUser'> View All Users </Link><br />
            {sessionStorage.getItem("isAdmin")==="1" && <Link to='/adminquiz'> Edit Quizes </Link>}{sessionStorage.getItem("isAdmin")==="1" &&<br />}

          <hr/>
          <Switch>
	          <Route path='/home' component={Home} />
	          {sessionStorage.getItem("isAdmin")==="1" && <Route path='/addCategory' component={AddCategory} />}
            {sessionStorage.getItem("isAdmin")==="1" && <Route path='/addQuiz' component={AddQuiz} />}
            <Route exact path='/quiz' component={QuizList} />
            {sessionStorage.getItem("isAdmin")==="1" && <Route exact path='/adminquiz' component={AdminQuizList} />}
            {sessionStorage.getItem("isAdmin")==="1" && <Route path='/adminquiz/:id' component={EditQuiz} />}
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/profile' component={Profile} />
            <Route path='/leaderboard' component={LeaderBoard} />
            {sessionStorage.getItem("isAdmin")==="1" && <Route path='/allUser' component={AdminUser} />}

	         </Switch>
        </div>
      </Router>


		);
	}
}

export default Dashboard;