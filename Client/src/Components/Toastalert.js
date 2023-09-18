import React from 'react'
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useTask } from '../Context/TaskStates';

function Toastalert() {
  // eslint-disable-next-line
    const [position, setPosition] = useState('bottom-end');
    const Taskstates = useTask();
    const {toast, closeToast} = Taskstates;
    return (
      <>
      {toast && 
      <div style = {{position:"fixed", bottom:"110px", right:"-120px", zIndex:"1", width:"500px"}}><ToastContainer
          className="p-3"
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Todo</strong>
              <div><button onClick = {closeToast} style = {{background:"none", border:"none"}}><strong>X</strong></button></div>
            </Toast.Header>
            <Toast.Body>{toast.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
        </div>}
        
      </>
    );
}

export default Toastalert