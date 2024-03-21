import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ServodClient } from './generated/service_pb_service';
import { ConnectRequest } from "./generated/service_pb";

const servod_service = new ServodClient('http://localhost:8080', undefined);

function connect() {
    const connect_request = new ConnectRequest();
    connect_request.setBoardName("brox");

    servod_service.connect(connect_request, (error, responseMessage) => {
        console.log('CPU  @ ' + responseMessage?.getCpuUartPty());
        console.log('CR50 @ ' + responseMessage?.getCr50UartPty());
        console.log('EC   @ ' + responseMessage?.getEcUartPty());
    })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a onClick={connect}>
          Run
        </a>
      </header>
    </div>
  );
}

export default App;
