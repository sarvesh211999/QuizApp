import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import Login from './components/login'

ReactDOM.render((
	<Router>
		<Switch>
			<Route exact path="/" component={App}/>
			<Route exact path="/login" component={Login}/>
		</Switch>
	</Router>

	), document.getElementById('root'));

registerServiceWorker();
