import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
// Render the App component to the DOM

//Supporting rinkeby chain(4)
const supportedChainIds = [4];

//including type of wallet we want to support
//Metamask-injected wallet
const connectors = {
  injected: {},
};

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
