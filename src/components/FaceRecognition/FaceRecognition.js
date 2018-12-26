import React from 'react';
import './FaceRecognition.css';
// passing ImageUrl-image, box - faceBox
const FaceRecognition = ({imageUrl, box}) => {
	return (
		//react Tilt.js for nice logos
		<div>
			<div className = 'center ma'>
				<div className='absolute mt2'>
					<img id='inputimage' alt='' src= {imageUrl}  width='500xp' heigh='auto'/>
					<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;