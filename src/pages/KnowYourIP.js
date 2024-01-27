import React, { useEffect, useState } from 'react'

const KnowYourIP = () => {
  const [ipAddress, setIPAddress] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))
  }, []);
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      minHeight:"80vh"
    },
    heading: {
      color: '#333',
      fontFamily: 'Arial, sans-serif',
    },
  };
  

  return (
    <div className="containerIP">
      <div className="glow-box">
        <h1 className="heading">Your IP Address is: {ipAddress}</h1>
      </div>
    </div>
  )
}
export default KnowYourIP;