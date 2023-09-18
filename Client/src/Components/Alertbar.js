import React from 'react'
import Alert from 'react-bootstrap/Alert';

function Alertbar({Variant, Msg}) {
  return (
   <>
   <Alert variant={Variant} className='mx-5 my-3'>
          {Msg}
        </Alert>
   </>
  )
}

export default Alertbar;