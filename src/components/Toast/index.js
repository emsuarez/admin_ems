import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (props) => {
	console.log("yooo", props);
	const { message } = props;

	//https://fkhadra.github.io/react-toastify/prevent-duplicate
	useEffect(() => {
		/*toast(message, {
			toastId: message
		  });*/
		toast(message);
		setTimeout(() => {
		props.clearToast();
		}, 5000);
		
	}, []);

	return (
		<div>
		<ToastContainer message={message} />
		</div>
	);
};

export default Toast;
