import React from 'react';
import videoUrl from '../../assets/video/videoBackground.mp4'

const videoBackground = () => {
	return (
		<video
			autoPlay
			muted
			loop
			style={{
				position: "fixed",
				width: "100%",
				left: 0,
				top: 0,
				zIndex: -1
			}}
		// style={{
		// 	position: fixed;
		// 	width: 70%;
		// 	left: 50%;
		// 	transform: translate(-50%);
		// 	top: 0;
		// 	z-index: -1;
		// }}
		>
			<source src={videoUrl} type="video/mp4" />
		</video>
	)
}

export default (videoBackground)