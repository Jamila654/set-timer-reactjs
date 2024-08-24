import React, { useState, useEffect } from "react";
import "./timer.css";

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const formatTime = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  const updateTime = (unit, setUnit) => {
    const increment = () => setUnit((prev) => (prev + 1) % (unit === 24 ? 24 : 60));
    const decrement = () => setUnit((prev) => (prev - 1 + (unit === 24 ? 24 : 60)) % (unit === 24 ? 24 : 60));

    return (
      <div className="flex flex-col items-center cursor-pointer">
        <div onClick={increment}>▲</div>
        <div>{formatTime(unit)}</div>
        <div onClick={decrement}>▼</div>
      </div>
    );
  };

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prev) => prev - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(id);
          setIsRunning(false);
        }
      }, 1000);
      setTimerId(id);
      return () => clearInterval(id);
    }
  }, [isRunning, hours, minutes, seconds]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(timerId);
  };

  return (
    <div className="timer w-[80%] sm:w-[40%] h-[500px] bg-white rounded-lg shadow-xl shadow-cyan-950 flex flex-col items-center justify-between">
      <h1 className="heading text-lg sm:text-4xl text-nowrap mt-5">Set A Timer</h1>
      <div className="time-heading w-full flex items-center justify-around text-nowrap text-gray-500">
        <h3>Hours</h3>
        <h3>Minutes</h3>
        <h3>Seconds</h3>
      </div>
      <div className="set-timer w-full flex items-center justify-around text-nowrap text-blue-700 text-lg sm:text-4xl">
        <div className="flex">
          {updateTime(hours, setHours)}
          <div className=" self-center">:</div>
          {updateTime(minutes, setMinutes)}
          <div className=" self-center">:</div>
          {updateTime(seconds, setSeconds)}
        </div>
      </div>
      <div className="w-full h-16 border-2 rounded-lg flex">
        <div
          className="start w-[50%] h-16 text-gray-500 flex items-center justify-center cursor-pointer hover:text-blue-700 sm:text-4xl text-lg"
          onClick={handleStart}
        >
          Start
        </div>
        <div>
          <img src="/dash-lg.svg" alt="" className="rotate-90 h-16" />
        </div>
        <div
          className="stop w-[50%] h-16 text-gray-500 flex items-center justify-center cursor-pointer hover:text-blue-700 sm:text-4xl text-lg"
          onClick={handleStop}
        >
          Stop
        </div>
      </div>
    </div>
  );
}


