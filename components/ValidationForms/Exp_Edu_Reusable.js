import { useGlobalContext } from '@/context'
import React, { useEffect } from 'react'
import styles from './Validation.module.css';

function Exp_Edu_Reusable({isSelect,currentFieldId,whichPage,fieldType,inputName,inputPlaceholder,specStyle, onlyTextArea = false}) {

    const {experienceAndEducation,setExperienceAndEducation} = useGlobalContext();

    useEffect(()=> {

    },[experienceAndEducation])

    function checkCorrectDate(newVall,job_status){
      alert(`it's not possibele to start ${newVall} and end at ${job_status}`);
    }
   

    function displayFielsText(e){
      e.preventDefault();
      const updatedValue = experienceAndEducation[whichPage].map((el) => {
        if(el.id === currentFieldId){
          let newVall = el[inputName][0] = e.target.value;
          // let newVallWithotSpaces = newVall
          const valueLength = newVall.split('').filter((ch) => ch !== " ");

          if((inputName === "job_start_date" ) || (inputName === "job_end_date")){
            let job_status; 
            let isValid;

            if((inputName === "job_start_date") && (el["job_end_date"][0] !== "")){
              job_status = el["job_end_date"][0];
              
             isValid = Math.floor(new Date(newVall).getTime() / 1000) - Math.floor(new Date(job_status).getTime() / 1000);
             if(isValid > 0){
              checkCorrectDate(newVall,job_status);
              newVall = el[inputName][1] = false;
              return;
            }
             
            }else if((inputName === "job_end_date") && (el["job_start_date"][0] !== "")){
              job_status = el["job_start_date"][0];
             isValid = Math.floor(new Date(newVall).getTime() / 1000) - Math.floor(new Date(job_status).getTime() / 1000);
             if(isValid < 0){
              checkCorrectDate(newVall,job_status);
              newVall = el[inputName][1] = false;
              return;
            }     
            }
           


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
      setExperienceAndEducation({...experienceAndEducation,updatedValue});
      localStorage.setItem("experienceP",JSON.stringify(experienceAndEducation))
      
  }

    function getInputValue(val){
        
          const item = experienceAndEducation[`${whichPage}`]?.find((el) => el.id === currentFieldId);
          
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
  <input className={styles[specStyle]}  type={`${fieldType}`}
     value={getInputValue()} placeholder={inputPlaceholder}
      onChange={(e) => displayFielsText(e)} />
   {/* implement select option stuff conditionally */}

    
    
    {getInputValue(true) ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>}
    </div>
}
    </>
  )
}

export default Exp_Edu_Reusable