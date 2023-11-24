import React, { useEffect, useState } from 'react'

const Color = (props) => {
  const {colorlist,setColor} = props
  const [selectedItem,setSelectedItem] = useState(null)
  
    const completeTwoActions = (color)=>{
      setColor(color?._id)
      setSelectedItem(color)
    }

    // console.log(colorlist?.title);

    useEffect(()=>{
      if(typeof setColor === 'function')
      setColor(Array.isArray(colorlist) && colorlist[0]?._id)
      setSelectedItem(Array.isArray(colorlist) && colorlist[0])
    },[colorlist,setColor])

  return (
    <>
           <ul className={`colors`} >
            {
              Array.isArray(colorlist) && colorlist?.map((color,i)=>{
                let currentcolor = color?.title ? color?.title : "red"
                return <li className={selectedItem === color ? "border-animation" :""} style={{backgroundColor:currentcolor}}  onClick={()=>completeTwoActions(color)} key={i}></li>
              })
            }
            </ul>
            {!Array.isArray(colorlist) && <p style={{backgroundColor:colorlist?.title ? colorlist?.title : "red",height:"30px",width:"30px",borderRadius:"50%"}}></p>}
    </>
  )
}

export default Color