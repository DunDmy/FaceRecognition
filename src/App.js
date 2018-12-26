import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

/*API for clarifai*/
const app = new Clarifai.App({
  apiKey: 'be39f425f71043928cb02e6923e795f4'
});

const practiclesOptions = {
  particles: {
   number:{
    value:100,
    density: {
      enable: true,
      value_area: 1000
    }
   }
 }
}
/* need state to update*/
/* also need a state to signin - use route */
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
/* test front and back end
  componentDidMount() {
      fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(console.log)
  }
*/

  loadUser = (data) => {
    this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
  }
 //image box
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // return box object, box around the face
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

// state box
  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }
  /*event listener*/ 
  onInputChange = (event) =>{
    this.setState({input:event.target.value})
    console.log(event.target.value);
  }

  /*clicking API from Clarifai*/
  onButtonSubmit = () =>{
    //console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
    //take response, calc face location, and display it on the screen
    .then(response => {
      if (response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({
          id:this.state.user.id
        })
        })
          .then(response => response.json())
          .then(count =>{
            //update count
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
      
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
      // do something with response
      // use this for class
    .catch(err => console.log(err));
  
}

  //set the route to home. then passed to render() Signin component. Signin.js take onRouteChange function
  // and executes on Click
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false});
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  // box={this.state.box} passing the state of the box to the image
  // this.state.route == 'signin' checks if used signed in
  // ? => trure    : => then return
  // need route for signin with condition ? and :
  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={practiclesOptions}
            />
       
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ?<div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition  box={box} imageUrl={imageUrl}/>
          </div>
         :(
            route === 'signin'
            ?<Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
         
         
        }
      </div>
    );
  }
}

export default App;
