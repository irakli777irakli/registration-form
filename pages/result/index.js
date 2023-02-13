import InfoSide from '@/components/InfoPage/InfoSide'
import { useGlobalContext } from '../../context'
import React, { useEffect } from 'react'
import ZadniBtn from '@/components/ZadniBtn/ZadniBtn';

function Result() {
  
  const {successPopUp,setSuccessPopUp} = useGlobalContext();
  useEffect(()=>{},[successPopUp]);
    return (
    <div className='resume'>
            <div style={{position:"absolute",left:"5%",top:"5%"}}>
            <ZadniBtn />
            </div>
            <InfoSide isResume={true}/>
            {successPopUp && <div className="popUp">
              <span className='close-popUp' onClick={() => setSuccessPopUp(false)}>X</span>
              <p className="popup-text">რეზიუმე წარმატებით გაიგზავნა 🎉</p>
            </div>}
      
    </div>
  )
}
export default Result