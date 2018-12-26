import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return (
		//react Tilt.js for nice logos
		//npm intall --save react-tilt
		//also using Tilt library to display a brain logo
		<div className = 'ma4 mt0'>
			<Tilt className="Tilt br2 center shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
 				<div className="Tilt-inner pa3"> 
 					<img style={{paddingTop: '5px'}} alt='logo' src={brain}/> 
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;