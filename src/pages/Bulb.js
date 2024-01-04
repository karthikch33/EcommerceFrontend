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
                {serverCondition?.status === 201?<label htmlFor="">Server Is On</label>:<label htmlFor="">Waiting For Server Connection
                <LoadingDots/>
                </label>}
                {serverCondition?.status === 201?<div className={`bulb on`} ></div>:<div className={`bulb off`} ></div>}
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
