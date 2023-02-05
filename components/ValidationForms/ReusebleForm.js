import { useGlobalContext } from '@/context';
import { georgianCheck } from '@/utils/helper';
import { useEffect, useState } from 'react';
import Hero from './Hero';
import styles from './Validation.module.css';

function ReusebleForm({fieldType,inputName,inputPlaceholder,specStyle, onlyTextArea = false}) {

  const {generalInfo,setGeneralInfo} = useGlobalContext();



  function errorSuccess(isGeo,iName) {
    if(isGeo){
      return generalInfo[inputName][1] = true;
      
    }else{
      return generalInfo[inputName][1] = false;
  
    }
  }
  
  function displayInfo(e,iName) {
  
    // dynammically update values in state, dictionary hack
  const value =   generalInfo[iName][0] = e.target.value;
  let state;
  if(iName === "name"){
    let isGeo = georgianCheck(value);
    state = errorSuccess(isGeo)
  }else if(iName === "surname"){
    let isGeo = georgianCheck(value);
    state = errorSuccess(isGeo)
  }else if(iName === "aboutMe"){
    let isGeo = georgianCheck(value);
    state = errorSuccess(isGeo)
  }
  
  setGeneralInfo({...generalInfo,state});
  setGeneralInfo({...generalInfo,value});
    
  
  }


  useEffect(()=>{},[generalInfo])

  return (
   <>
   {onlyTextArea ? 
   
   <textarea className={styles[specStyle]} cols={10} rows={10}
   placeholder={inputPlaceholder} value={generalInfo[inputName]} name={inputName} onChange={(e) => displayInfo(e,inputName)} />
    :
  
    <div style={{position:"relative",widows:"100%"}}>
    <input className={styles[specStyle]}  type={`${fieldType}`}  placeholder={inputPlaceholder} value={generalInfo[inputName][0]} name={inputName} onChange={(e) => displayInfo(e,inputName)} />
      {generalInfo[inputName][1] ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>}
      
      
    </div>
  
  }
      
      </>
  )
}

export default ReusebleForm