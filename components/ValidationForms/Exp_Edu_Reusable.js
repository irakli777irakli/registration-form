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
          let isFieldEmpty;
          // let newVallWithotSpaces = newVall
          const valueLength = newVall.split('').filter((ch) => ch !== " ");

          if(valueLength?.length > 0){
            
            isFieldEmpty =  el[inputName][2] = true;
          }else{
            isFieldEmpty =  el[inputName][2] = false;
          }


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
          if(inputName === "degree" && el[inputName][0] === " "){
            newVall = el[inputName][1] = false;
          }else if(inputName === "degree" && el[inputName][0]?.length > 0){
            newVall = el[inputName][1] = true;
          }

          if(valueLength?.length >= 2){
             newVall = el[inputName][1] = true;
          }else{
             newVall = el[inputName][1] = false;

          }
          return {...el,newVall,isFieldEmpty}
        }
      });
      // console.log(updatedValue);
      setExperienceAndEducation({...experienceAndEducation,updatedValue});
      localStorage.setItem("experienceP",JSON.stringify(experienceAndEducation))
      
  }

    function getInputValue(val,index){
        
          const item = experienceAndEducation[`${whichPage}`]?.find((el) => el.id === currentFieldId);
          
          if(val){
            return item[inputName][1];

          }
          if(index){
            return item[inputName][index]
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
    {getInputValue(false,2) ? (getInputValue(true) ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>) : null}
     </div>
    :
    <div style={{position:"relative",width:"100%"}}>
  {isSelect ? <select value={getInputValue()}  onChange={(e) => displayFielsText(e)} >
      {getInputValue(false,2)?.map((el,i) => {
        const {title,id} = el;
        return i === 0 ?  <option disabled key={i} value="">ხარისხი</option> :
           <option key={id} value={title}>{title}</option>
        
      }
      )}


  </select> 
  : 
  <input className={styles[specStyle]}  type={`${fieldType}`}
     value={getInputValue()} placeholder={inputPlaceholder}
      onChange={(e) => displayFielsText(e)} />}
  
    {getInputValue(false,2) ? (getInputValue(true) ? <span className={styles.success}>✓</span> 
      :
      <span className={styles.error}>!</span>) : null}
    </div>
}
    </>
  )
}

export default Exp_Edu_Reusable