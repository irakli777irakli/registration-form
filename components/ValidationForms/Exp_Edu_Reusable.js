import { useGlobalContext } from '@/context'
import React, { useEffect } from 'react'
import styles from './Validation.module.css';

function Exp_Edu_Reusable({ whichPage,fieldType,inputName,inputPlaceholder,specStyle, onlyTextArea = false}) {

    const {experienceAndEducation,setExperienceAndEducation} = useGlobalContext();

    useEffect(()=> {

    },[experienceAndEducation])

    function displayFielsText(e){
      e.preventDefault();
      const updatedValue = experienceAndEducation[whichPage].map((el) => {
        if(el.id === 0){
          let newVall = el[inputName][0] = e.target.value;
          // let newVallWithotSpaces = newVall
          const valueLength = newVall.split('').filter((ch) => ch !== " ");

          if(fieldType=== "date"){
            Math.floor(new Date(newVall).getTime() / 1000);
            // implement date validation
          }

          if(valueLength?.length >= 2){
             newVall = el[inputName][1] = true;
          }else{
             newVall = el[inputName][1] = false;

          }
          return {...el,newVall}
        }
      });
      //console.log(updatedValue);
      setExperienceAndEducation({...experienceAndEducation,updatedValue})
      
  }

    function getInputValue(val){
          const item = experienceAndEducation[`${whichPage}`]?.find((el) => el.id === 0);
          if(val){
            return item[inputName][1];

          }
            return item[inputName][0];
    }
    
  


  return (
    <>
    {onlyTextArea ? 
    <div style={{position:"relative",width:"100%"}}>
    <textarea className={styles[specStyle]} cols={10} rows={10}
    placeholder={inputPlaceholder} value={getInputValue()}
     name={inputName} onChange={(e) => displayFielsText(e)}/>
    {getInputValue(true) ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>}
     </div>
    :
    <div style={{position:"relative",width:"100%"}}>
    <input className={styles[specStyle]}  type={`${fieldType}`} value={getInputValue()} placeholder={inputPlaceholder} onChange={(e) => displayFielsText(e)} />
    {getInputValue(true) ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>}
    </div>
}
    </>
  )
}

export default Exp_Edu_Reusable