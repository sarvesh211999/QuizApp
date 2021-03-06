import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import style from '../css/style.css';
import $ from 'jquery';
import Dashboard from './dashboard';
import Home from './home';
import NotFound from './NotFound';

sessionStorage.setItem('isLoggedIn', false);

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
};

const styleLogOut = {
	color : "#919d89",
	position : "absolute",
	top: "0.8vw",
	right: "0.5vw",
	cursor: "pointer"
}

const AuthStatus = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
			<li style={styleLogOut} onClick={() => {
        AuthService.logout(() => {
        	history.push('/')
        	window.AppComponent.handler()
      })
      }}>Sign out</li>
  ) : (
  	<span>&nbsp;</span>
  )
));

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

var func = function(){
	console.log(AuthService.isAuthenticated)
	if(!AuthService.isAuthenticated){
	return (
			<li><Link to='/login'> Login </Link></li>
	)
	}

}

class Login extends Component {


	constructor() {
		super();
		this.state = {
    	redirectToPreviousRoute: false,
  	};
		this.registerSubmit = this.registerSubmit.bind(this);
	}
	login = (event) => {
		var flag = 0;
		var self = this;
		event.preventDefault();
		 const formData = new FormData(document.querySelector('.login'));
    let jsonObject ={}

    for (const [key, value]  of formData.entries()) {
      jsonObject[key] = value;
    }

    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(jsonObject),
      }).then((resp) => resp.json()).
        then(function(data){
          if(data.status=="Failure"){
          	alert("Email Not Registered");
          	flag = 1;
          }
          else if(data.status=="Wrong Password"){
          	alert("Email or Password Is Incorret");
          }
          else {
          	AuthService.authenticate(() => {
				      self.setState({ redirectToPreviousRoute: true });
				    });
          	sessionStorage.setItem("id",data.userid)
          	sessionStorage.setItem("isAdmin",data.role)
          	console.log(sessionStorage.getItem("isAdmin"),sessionStorage.getItem("isAdmin")=="1")
          	sessionStorage.setItem("username",data.username)
          }
        })    
  };

	registerSubmit(event) {
		event.preventDefault();
		const formData = new FormData(document.querySelector('.signup'));
		let jsonObject ={}

		for (const [key, value]  of formData.entries()) {
    	jsonObject[key] = value;
		}


		fetch('http://localhost:8080/signup', {
     method: 'POST',
     body: JSON.stringify(jsonObject),
   	}).then(response=>{
   		alert("User Registered")
   	})
		// const data = this.getFormDataAsJSON(form);
		// console.log(data)

	}

	componentDidMount(){

				$('.form').find('input, textarea').on('keyup blur focus', function (e) {
		  			var $this = $(this),
		  	    label = $this.prev('label');

					  if (e.type === 'keyup') {
							if ($this.val() === '') {
				          label.removeClass('active highlight');
				        } else {
				          label.addClass('active highlight');
				        }
				    } else if (e.type === 'blur') {
				    	if( $this.val() === '' ) {
				    		label.removeClass('active highlight'); 
							} else {
						    label.removeClass('highlight');   
							}   
				    } else if (e.type === 'focus') {
				      
				      if( $this.val() === '' ) {
				    		label.removeClass('highlight'); 
							} 
				      else if( $this.val() !== '' ) {
						    label.addClass('highlight');
							}
				    }

				});

				$('.tab a').on('click', function (e) {
				  var target = null;
				  e.preventDefault();
				  
				  $(this).parent().addClass('active');
				  $(this).parent().siblings().removeClass('active');
				  
				  target = $(this).attr('href');

				  $('.tab-content > div').not(target).hide();
				  
				  $(target).fadeIn(600);
				  
				});
	}

  render() {

	  const { from } = this.props.location.state || { from: { pathname: "/home" } };
	  const { redirectToPreviousRoute } = this.state;
	  if (redirectToPreviousRoute) {
			  this.props.handler()
	      return <Redirect to={from} />;
	  }

    return (
    	<div>
    		<div className="form">
            <ul className="tab-group">
			        <li className="tab active"><a href="#signup">Sign Up</a></li>
			        <li className="tab"><a href="#login">Log In</a></li>
			      </ul>
      
     			<div className="tab-content">
			        <div id="signup">   
			          <h1>Sign Up for Free</h1>
			          
			          <form className="signup" onSubmit={this.registerSubmit}>
			          
			          <div className="top-row">
			            <div className="field-wrap">
			              <label>
			                First Name<span className="req">*</span>
			              </label>
			              <input className="forminput" type="text" name="firstname" required autoComplete="off" />
			            </div>
			        
			            <div className="field-wrap">
			              <label>
			                Last Name<span className="req">*</span>
			              </label>
			              <input className="forminput" type="text" name="lastname" required autoComplete="off"/>
			            </div>
			          </div>

			          <div className="field-wrap">
			            <label>
			              Email Address<span className="req">*</span>
			            </label>
			            <input className="forminput"  type="email" name="email" required autoComplete="off"/>
			          </div>
			          
			          <div className="field-wrap">
			            <label>
			              Set A Password<span className="req">*</span>
			            </label>
			            <input className="forminput" type="password" name="password" required autoComplete="off"/>
			          </div>
			          
			          <button className="button button-block">Get Started </button>
			          
			          </form>

			        </div>
        
			        <div id="login">   
			          <h1>Welcome Back!</h1>
			          
			         <form className="login" onSubmit={this.login}>
			          
			            	<div className="field-wrap">
			            	<label>
			             	 Email Address<span className="req">*</span>
			            	</label>
			          	  <input className="forminput" type="email" name="email" required autoComplete="off"/>
			        	  </div>
			          
			          	<div className="field-wrap">
			           	 <label>
			           	   Password<span className="req">*</span>
			           	 </label>
			           	 <input className="forminput" type="password" name="password" required autoComplete="off"/>
			          	</div>
			          
			         	 <p className="forgot"><a href="#">Forgot Password?</a></p>
			          
			          
			         	<button className="button button-block" >Log In</button>
			         	 </form>
			          {/*<button onClick={this.login}>Log in</button>*/}

			        </div>
        
   		   </div>
      
				</div> 
			</div>
    );
  }
}

class App extends Component {


	constructor(props){
		super(props);
		this.state = {
			flag: true
		};
		this.handler = this.handler.bind(this)
		window.AppComponent = this;
	}

	handler = function() {
		if(this.state.flag == false){
			this.setState({flag:true})	
		}
		else{
			this.setState({flag:false})		
		}
		
		console.log(this.state.flag)
	}


  render() {
    return (
    	<Router>
        <div>
         <nav class="navbar navbar-inverse">
				  <div class="container-fluid">
				    <div class="navbar-header">
				      <a class="navbar-brand" href="/home">Quiz Portal</a>
				    </div>
				    <ul class="nav navbar-nav">
					    <li><Link to='/home'> Home </Link></li>
	            <li><Link to='/dashboard'> Dashboard </Link></li>
				    </ul>
				    <ul class="nav navbar-nav navbar-right">
				      {this.state.flag && <li><Link to='/login'><span class="glyphicon glyphicon-log-in"></span> Login </Link></li>}
        			<AuthStatus />
				    </ul>
				  </div>
				</nav> 
          <Switch>
	          <Route path='/home' component={Home} />
	          <Route path='/login' render={(props) => <Login {...props} handler={this.handler} />} />
	          <SecretRoute path='/dashboard' component={Dashboard}/>
	         </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
