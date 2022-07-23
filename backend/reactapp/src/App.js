import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
} from "reactstrap";


function App() {
	
	const [request, setRequest] = useState()


	useEffect(() => {
		async function loadData() {
				var rawResponse = await fetch('/ocr');
				var response = await rawResponse.json();
				setRequest(response.text)
				
			}
			loadData()
	  }, []);

	  console.log("request", request)



	return (
		<div>
			<p>{request}</p>
		</div>
	);
}

export default App;
