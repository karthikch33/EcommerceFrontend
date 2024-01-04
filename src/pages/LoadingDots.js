import React, { useEffect, useState } from 'react';

const LoadingDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const addDot = (index) => {
      setDots((prevDots) => prevDots + '.');
      setTimeout(() => {
        if (index < 3) {
          addDot(index + 1);
        }
        if(index === 3)
        {
            setDots('.')
            addDot(1)
        }
      }, 1000); // Wait for 1000 milliseconds (1 second) before adding the next dot
    };

    addDot(1);
  }, []); // Empty dependency array means this effect runs once after the initial render

  return <div className='d-inline'>{dots}</div>;
};

export default LoadingDots;