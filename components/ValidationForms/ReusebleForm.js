import { useGlobalContext } from '@/context';
import { georgianCheck, phoneNumberChecker } from '@/utils/helper';
import { useEffect, useState } from 'react';

import styles from './Validation.module.css';

function ReusebleForm({fieldType,inputName,inputPlaceholder,specStyle, onlyTextArea = false,acceptance}) {

  const {generalInfo,setGeneralInfo,getFromLC,exprerience,setExperience} = useGlobalContext();

  function errorSuccess(validState) {
    if(validState){
      return generalInfo[inputName][1] = true;
      
    }else{
      return generalInfo[inputName][1] = false;
  
    }
  }
  
  function displayInfo(e,iName) {
    // dynammically update values in state, dictionary hack
  let value =   generalInfo[iName][0] = iName === "photo" ? e.target.files[0]
  :  e.target.value;
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
    const fr = new FileReader();
    // you are reading value from state
    fr.readAsDataURL(value);

    fr.addEventListener("load",() => {
      // assigning freader value to state and refferencing it to `newVal`
      // saving only happens inside `this` eventListener
      try{
      const newVal =  generalInfo[iName][0] =  fr.result;
      setGeneralInfo({...generalInfo,newVal});
      localStorage.setItem("generalP",JSON.stringify(generalInfo));
      }
      catch(e){
        alert("photo sized more than 1mb can not be uploaded");
        // get back to current state values using LC
        getFromLC();
      }
    });
   
    if(value){
      
      errorSuccess(true);
    }else{
      errorSuccess(false);
    }
    return;
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
  localStorage.setItem("generalP",JSON.stringify(generalInfo))
    
  // console.log(generalInfo)
  }


  useEffect(()=>{},[generalInfo])

  return (
   <>
   {onlyTextArea ? 
   
   <textarea className={styles[specStyle]} cols={10} rows={10}
   placeholder={inputPlaceholder} value={generalInfo[inputName][0]} name={inputName} onChange={(e) => displayInfo(e,inputName)} />
    :
  
    <div style={{position:"relative",widows:"100%"}}>
    <input className={styles[specStyle]}
    accept={acceptance}
      type={`${fieldType}`}
        placeholder={inputPlaceholder}
         value={fieldType === "file" ? "" : generalInfo[inputName][0]} 
         name={inputName} onChange={(e) => displayInfo(e,inputName)} />
      {generalInfo[inputName][1] ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>}
      
      
    </div>
  
  }
      
      </>
  )
}

export default ReusebleForm