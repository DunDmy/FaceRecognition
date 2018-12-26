import React from 'react';

// this code comes from tachyon Signin. just google it http://tachyons.io/components/forms/sign-in/index.html
// http://tachyons.io/components/cards/product-card/index.html box for Signin
// () => onRouteChange('home') air function. Make sure that action happens only when clicked
// add 'extends React.Component', turn it into a class(delete const and add class instead, and add render

//const Signin extends React.Component = ({onRouteChange}) => {

  class Signin extends React.Component {

    // need to create constructor for state
    // pass in propety = props to constructor so we can you it in our code
    constructor(props){
      super(props);
      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
    }

    //gets the emails
    onEmailChange = (event) => {
      this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
    }

    //When you signin
    onSubmitSignIn = () => {
      //sending data to server
      //check fetch, JSON
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          email:this.state.signInEmail,
          password:this.state.signInPassword
        })
      })
        .then(response => response.json())
        .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
      // console.log(this.state);
     // this.props.onRouteChange('home');
    }

    render(){
      // need this, so you dont have to type this.props.onRouteChange
      const{ onRouteChange } = this.props;
	     return (
  	     <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  
                      type="email" 
                      name="email-address"  
                      id="email-address"
                      onChange={this.onEmailChange}/>
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                      <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}/>
                      </div>
                 </fieldset>
                 <div className="">
                  <input 
                    // need to add this.props after when Front + Back end
                    onClick ={this.onSubmitSignIn}
                    //onClick={() => onRouteChange('home')}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"
                  />
                </div>
                <div className="lh-copy mt3">
            <p onClick = {() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
        </div>
      </div>
  </main>
	  </article>
	);
  }
}

export default Signin;