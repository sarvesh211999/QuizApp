import React, { Component } from 'react';
import { BrowserRouter as Router, Link,Switch,Route } from 'react-router-dom';
import Login from './login';

class App extends Component {
  render() {
    return (
    	<div>
    			<Link to={'/login'}>Login</Link>
    			"asdsa"
	    </div>
    );
  }
}

export default App;
