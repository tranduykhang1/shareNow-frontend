import React, { useRef, useEffect } from "react";

import lottie from "lottie-web";
import animation from "assets/Animation/loading-animation.json";

const style = {
	loadingContainer: {
		height: 30,
		width: 30,
		margin: '10px auto 0 auto'
	},
};

const Loading = () => {
	const loadingRef = useRef(null);
	useEffect(() => {
		lottie.loadAnimation({
			container: loadingRef.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animation,
		});
	}, []);

	return <div ref={loadingRef} style={style.loadingContainer}></div>;
};

export default Loading;
