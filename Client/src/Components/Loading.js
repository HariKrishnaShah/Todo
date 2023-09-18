import React from 'react'
import simage from './spin.gif'

const Loading = ()=>
{
    return (
      <div className = "m-5" style = {{position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", zIndex:"99"}}>
        <img src = {simage} alt = "loading"/>
        <br />
        <br />
        <strong>Loading</strong>
      </div>
    )
  }


export default Loading;
