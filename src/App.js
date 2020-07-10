import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import IdleTimer from "react-idle-timer";
import Modal from "react-modal";

function App() {
  const [remainingSeconds, setRemainingSeconds] = useState(3);
  const [isLogged, setisLogged] = useState(true);
  const openModal = useRef(false);
  const idleTimer = useRef(null);

  let timer = null;
  let interval = null;

  const onIdle = () => {
    console.log('idle time')
    //idleTimer.current.pause();
    openModal.current = true;
    timer = setTimeout(logout, 10000);
    interval = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);
  };

  const onActive = () => {
    console.log("On Active ", new Date());
  };

  const logout = () => {
    openModal.current = false;
    setisLogged(false);

    clearInterval(interval);
    clearTimeout(timer);
  };

  const continueFun = () => {
    openModal.current = false;
    idleTimer.current.reset();

    clearTimeout(timer);
    clearInterval(interval);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        Hello {isLogged && "Anand"}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <IdleTimer
        ref={idleTimer}
        onIdle={onIdle}
        onActive={onActive}
        timeout={3000}
        stopOnIdle={true}
      />

      <Modal isOpen={openModal.current}>
        <header>Warning!</header>
        <p>
          Your session times out in {remainingSeconds} seconds. Please click on
          'Continue' button to extend the session.
        </p>
        <div>
          <button onClick={continueFun}>CONTINUE</button>
          <button onClick={logout}>LOGOUT</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
