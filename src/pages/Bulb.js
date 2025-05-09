import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverOnOrOff } from '../features/server/serverSlice';
import LoadingDots from './LoadingDots';

const Bulb = () => {
  const dispatch =useDispatch()
  useEffect(() => {
    yourFunction()
    const intervalId = setInterval(yourFunction, 50000); 
    return () => clearInterval(intervalId);
  }, []); 

  
  const yourFunction = () => {
    dispatch(serverOnOrOff());
  };

  const {serverCondition} = useSelector(state=>state.server)

  return (
    <>
    <div className="container-xxl text-center">
        <div className="row">
            <div className="col-12 d-flex justify-content-end ">
                {serverCondition?.status === 201?<label htmlFor="" className='server-white'>Connected</label>:<label htmlFor="" className='server-white'>Reconnecting
                <LoadingDots/>
                </label>}
                {serverCondition?.status === 201?<div className='mt-2'>
                <input id="checkbox" type="checkbox" />
<label class="switch" for="checkbox">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="slider">
    <path
      d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
    ></path>
  </svg>
</label>

                </div>:<div className={`bulb off`} ></div>}
             </div>
        </div>
             <div className="row">
                <div className="col-12 d-flex justify-content-end">
             <label htmlFor="" className='' style={{fontSize:"10px"}}></label>
                </div>
            </div>
    </div>
    </>
  );
};

export default Bulb;
