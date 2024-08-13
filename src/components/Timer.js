import React, { useState, useEffect } from 'react';

const Timer = () => {
  const endDate = new Date('2024-12-31T23:59:59'); // Replace with your fixed end date

  const [timer, setTimer] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const currentTime = new Date();
    let timeDiff = endDate - currentTime;

    if (timeDiff < 0) {
      // If the end date has passed, set the timer to 0
      return 0;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    timeDiff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= minutes * (1000 * 60);

    const seconds = Math.floor(timeDiff / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Run this effect only once on component mount

  return (
    <div>
        <div className="discount-till d-flex align-items-center  gap-10">
        <p className="mb-0">
          <b>{timer.days} days</b>
        </p>
        <div className="d-flex gap-10 align-items-center">
          <span className="badge rounded-circle p-3  bg-danger" style={{ padding: '2vw' }}>{timer.hours}H</span>:      
          <span className="badge rounded-circle p-3 bg-danger" style={{ padding: '2vw' }}>{timer.minutes}M</span>:
          <span className="badge rounded-circle p-3 bg-danger" style={{ padding: '2vw' }}>{timer.seconds}S</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
