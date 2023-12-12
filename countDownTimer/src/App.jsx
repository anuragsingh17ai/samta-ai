import React, { useState, useRef, useEffect } from 'react';
import './App.css'

const App = () => {
  // initially set to 2 hours in seconds 
  const [time, setTime] = useState(7200);
  
  const [isRunning, setIsRunning] = useState(false);

  const countdownRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  
  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(7200); 
  };

  const handleInputChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setTime(isNaN(newTime) ? 0 : newTime);
  };

  useEffect(() => {
    if (isRunning) {
      countdownRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countdownRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdownRef.current);
    }
    return () => {
      clearInterval(countdownRef.current);
    };
  }, [isRunning]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <label>
          Set Timer (initial 2 hr in seconds):{' '}
          <input type="number" value={time} onChange={handleInputChange} disabled={isRunning} />
        </label>
      </div>
      <div>
        <p>Current Countdown Time in min : {formatTime(time)}</p>
      </div>
      <div>
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
