import { useGlobalContext } from '@/context';
import { georgianCheck, phoneNumberChecker } from '@/utils/helper';
import { useEffect, useState } from 'react';
import Hero from './Hero';
import styles from './Validation.module.css';

function ReusebleForm({fieldType,inputName,inputPlaceholder,specStyle, onlyTextArea = false}) {

  const {generalInfo,setGeneralInfo} = useGlobalContext();

  function errorSuccess(validState) {
    if(validState){
      return generalInfo[inputName][1] = true;
      
    }else{
      return generalInfo[inputName][1] = false;
  
    }
  }
  
  function displayInfo(e,iName) {
    // dynammically update values in state, dictionary hack
  let value =   generalInfo[iName][0] = e.target.value;
  // use arra ot store, input value and it's state `error or success`.
  // implement email and number s tmr
  let state;
  let isGeo;
  if(iName === "name"){
    isGeo = georgianCheck(value);
    state = errorSuccess(isGeo)
  }
  else if(iName === "surname"){
    isGeo = georgianCheck(value);
    state = errorSuccess(isGeo)
  }
  else if(iName === "photo"){
   if(value !== undefined){
    errorSuccess(true)
   }else{
    errorSuccess(false);
   }
  }
  else if(iName === "email"){
    const isCorrectEmail = value.includes("@redberry.ge");
    const isEmpty = value.split('').every((el)=> el !== " ");
    if(isEmpty && isCorrectEmail){
      state = errorSuccess(isCorrectEmail);
    }else{
      state = errorSuccess(false);
    }
    
  }
  else if(iName === "phoneNumber"){
   const {isValidNumber,finalOutput} = phoneNumberChecker(value);
    state = errorSuccess(isValidNumber);
    if(finalOutput){
      value = generalInfo[iName][0] = finalOutput;
    }
  }
  
  setGeneralInfo({...generalInfo,state});
  setGeneralInfo({...generalInfo,value});
    
  
  }


  useEffect(()=>{},[generalInfo])

  return (
   <>
   {onlyTextArea ? 
   
   <textarea className={styles[specStyle]} cols={10} rows={10}
   placeholder={inputPlaceholder} value={generalInfo[inputName][0]} name={inputName} onChange={(e) => displayInfo(e,inputName)} />
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