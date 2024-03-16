import React from 'react';

const LoadingPage = (props) => {
    const {height} = props
  return (
    <div className='loader-container d-flex align-items-center flex-column justify-content-center' style={{height:height}}>
       <div class="spinner">
    </div>
    <p className='fs-1 text-center'>Loading....</p>
        </div>
  );
};

export default LoadingPage;
