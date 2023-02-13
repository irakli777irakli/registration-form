import { useGlobalContext } from '@/context';
import { georgianCheck, phoneNumberChecker } from '@/utils/helper';
import { useEffect, useState } from 'react';

import styles from './Validation.module.css';

function ReusebleForm({maxLength,fieldType,inputName,inputPlaceholder,specStyle, onlyTextArea = false,acceptance}) {

  const {generalInfo,setGeneralInfo,getFromLC,exprerience,setExperience} = useGlobalContext();

  function errorSuccess(validState,index) {
    if(validState){
      return generalInfo[inputName][index] = true;
      
    }else{
      return generalInfo[inputName][index] = false;
  
    }
  }
  
  function displayInfo(e,iName) {
    // dynammically update values in state, dictionary hack
  let value =   generalInfo[iName][0] = iName === "photo" ? e.target.files[0]
  :  e.target.value;
  // use arra ot store, input value and it's state `error or success`.
  // implement email and number s tmr
  let state,isGeo,isOveralValueEmpty;

 
  isOveralValueEmpty = (value?.length > 0 || iName === "photo" )? errorSuccess(true,2) : errorSuccess(false,2); 
  
  if(iName === "name"){
    isGeo = georgianCheck(value);
    state = errorSuccess(isGeo,1)
  }
  else if(iName === "surname"){
    isGeo = georgianCheck(value);
    state = errorSuccess(isGeo,1)
  }
  else if(iName === "photo"){
    const fr = new FileReader();
    // you are reading value from state
    // console.log(value)
    fr.readAsDataURL(value);

    fr.addEventListener("load",() => {
      // assigning freader value to state and refferencing it to `newVal`
      // saving only happens inside `this` eventListener
      try{
        
      const newVal =  generalInfo[iName][0] =  fr.result;
      // console.log(newVal)
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
      
      errorSuccess(true,1);
    }else{
      errorSuccess(false,1);
    }
    return;
    }
  else if(iName === "email"){
    const isCorrectEmail = value.includes("@redberry.ge");
    const isEmpty = value.split('').every((el)=> el !== " ");
    if(isEmpty && isCorrectEmail){
      state = errorSuccess(isCorrectEmail,1);
    }else{
      state = errorSuccess(false,1);
    }
    
  }
  else if(iName === "phoneNumber"){
   const {isValidNumber,finalOutput} = phoneNumberChecker(value);
    state = errorSuccess(isValidNumber,1);
    if(finalOutput){
      value = generalInfo[iName][0] = finalOutput;
    }
  }
  setGeneralInfo({...generalInfo,isOveralValueEmpty})
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
  
    <div style={{position:"relative",width:"100%"}}>
      <input 
       maxLength={maxLength}
      className={`${styles[specStyle]} 
      ${generalInfo[inputName][2] ? generalInfo[inputName][1] ? `${styles.border_success}` : `${styles.border_error}` : null}`}
      accept={acceptance}
          type={`${fieldType}`}
          placeholder={inputPlaceholder}
          value={fieldType === "file" ? "" : generalInfo[inputName][0]}
          id={fieldType === "file" ? "file" : null} 
          name={inputName} onChange={(e) => displayInfo(e,inputName)} />
      {fieldType === "file" && 
      <label htmlFor="file" className={styles.file_label}>ატვირთვა</label>}
      {generalInfo[inputName][2] ? (generalInfo[inputName][1] ?
       <span className={specStyle === "full_input" ? `${styles.success} ${styles.success_left}`  : styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>)
      : null
      }
      
      
    </div>
  
  }
      
      </>
  )
}

export default ReusebleForm