import React, { Component } from 'react';
import '../css/style.css'
import $ from 'jquery';

class Login extends Component {

	constructor() {
		super();
		this.registerSubmit = this.registerSubmit.bind(this);
	}

	registerSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch('http://localhost:8080/signup', {
      method: 'POST',
      mode: "no-cors",
      body:data,
    });
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
			          
			          <form onSubmit={this.registerSubmit}>
			          
			          <div className="top-row">
			            <div className="field-wrap">
			              <label>
			                First Name<span className="req">*</span>
			              </label>
			              <input type="text" name="firstname" required autoComplete="off" />
			            </div>
			        
			            <div className="field-wrap">
			              <label>
			                Last Name<span className="req">*</span>
			              </label>
			              <input type="text" name="lastname" required autoComplete="off"/>
			            </div>
			          </div>

			          <div className="field-wrap">
			            <label>
			              Email Address<span className="req">*</span>
			            </label>
			            <input type="email" name="email" required autoComplete="off"/>
			          </div>
			          
			          <div className="field-wrap">
			            <label>
			              Set A Password<span className="req">*</span>
			            </label>
			            <input type="password" name="password" required autoComplete="off"/>
			          </div>
			          
			          <button className="button button-block">Get Started </button>
			          
			          </form>

			        </div>
        
			        <div id="login">   
			          <h1>Welcome Back!</h1>
			          
			          <form action="/" method="post">
			          
			            <div className="field-wrap">
			            <label>
			              Email Address<span className="req">*</span>
			            </label>
			            <input type="email"required autoComplete="off"/>
			          </div>
			          
			          <div className="field-wrap">
			            <label>
			              Password<span className="req">*</span>
			            </label>
			            <input type="password"required autoComplete="off"/>
			          </div>
			          
			          <p className="forgot"><a href="#">Forgot Password?</a></p>
			          
			          <button className="button button-block">Log In</button>
			          
			          </form>

			        </div>
        
   		   </div>
      
				</div> 
			</div>
    );
  }
}

export default Login;