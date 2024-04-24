import { useState, useEffect } from 'react';
import './App.css';
import arrowUpImage from './assets/arrow-up.png';
import arrowDownImage from './assets/arrow-down.png';

function App() {
  const [passengerCount, setPassengerCount] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [nextFloor, setNextFloor] = useState(1);
  const [targetFloor, setTargetFloor] = useState(1);
  const [isGoingUp, setIsGoingUp] = useState(true);
  const [displayedFloor, setDisplayedFloor] = useState(1);
  const [liftMoving, setLiftMoving] = useState(false);

  const numberOfFloors = 12;

  const dots = Array.from({ length: numberOfFloors }, (_, index) => (
    <span key={index} className="dot"
      id={`dot-${index}`} >
    </span>
  ));

  const floors = Array.from({ length: numberOfFloors }, (_, index) => numberOfFloors - index).map(floorNumber => (
    <button key={floorNumber}
      id={`button-${floorNumber}`}
      className="square" onClick={() => floorBtnClick(floorNumber)}
      disabled={liftMoving}>
      {floorNumber < 10 ? `0${floorNumber}` : floorNumber}
    </button>
  ));

  useEffect(() => {
    if (currentFloor < targetFloor) {
      setIsGoingUp(true);
    } else if (currentFloor > targetFloor) {
      setIsGoingUp(false);
    }
  }, [currentFloor, targetFloor]);

  function floorBtnClick(floorNumber) {
    if (passengerCount <= 0 || liftMoving) {
      alert("There is no passenger or the lift is already moving");
      return;
    }

    setTargetFloor(floorNumber);
    setLiftMoving(true);
    const buttons = document.getElementsByClassName("square");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("pressed");
    }

    const movingUp = currentFloor < floorNumber;

    const sequence = movingUp
      ? Array.from({ length: floorNumber - currentFloor }, (_, index) => currentFloor + index + 1)
      : Array.from({ length: currentFloor - floorNumber }, (_, index) => currentFloor - index - 1);

    sequence.forEach((floor, index) => {
      setTimeout(() => {
        setDisplayedFloor(floor);
        if (index === sequence.length - 1) {
          setCurrentFloor(floorNumber);
          setLiftMoving(false);
        }
      }, (index + 1) * 1000);
    });

    setTimeout(() => {
      setNextFloor(floorNumber);
    }, (sequence.length) * 1000);

    const pressedButton = document.getElementById(`button-${floorNumber}`);
    pressedButton.classList.add("pressed");
    sendData(floorNumber)
  }

  function sendData(floorNumber) {
    const requestData = {
      passenger_count: passengerCount,
      from_floor: currentFloor,
      to_floor: floorNumber
    };

    fetch('http://localhost:5000/api/lift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Elevator </h1>
      <div className="app">
        <div className="floor-wrapper">
          {dots}
        </div>
        <div className="floor">
          <div>
            Number of Passenger <br />
            <input type="number" className="passenger-input"
              placeholder="Number of passenger" min="0" max="10"
              value={passengerCount} onChange={(e) => { setPassengerCount(e.target.value) }} />
          </div>
          <div className="floor-display-wrapper">
            <div className="floor-number">
              {displayedFloor < 10 ? `0${displayedFloor}` : displayedFloor}
            </div>
            <div className="floor-arrow">
              {isGoingUp ?
                <img src={arrowUpImage} alt="Up side" />
                :
                <img src={arrowDownImage} alt="Down side" />
              }
            </div>
          </div>
          <div className="floor-btn-wrapper">
            {floors}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
