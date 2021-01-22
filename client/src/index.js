import React from "react";
import ReactDom from "react-dom";

import App from "./app";

ReactDom.render(<App />, document.querySelector("#root")); //just injecting App in the div with class name root in index.html file
