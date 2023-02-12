import React, { useEffect } from 'react'
import Hero from './Hero'
import styles from './Validation.module.css';
import Exp_Edu_Reusable from './Exp_Edu_Reusable';
import AddMoreBtn from '../AddMoreBtn/AddMoreBtn';
import { useGlobalContext } from '@/context';
import NextBtn from '../NextBtn/NextBtn';
import { useRouter } from 'next/router';
import { urlNavigator } from '@/utils/helper';

function ExperienceForm({currentPageName}) {
  const router = useRouter();

  const {experienceAndEducation,getSendingData,resume,setResume} = useGlobalContext();
  useEffect(() => {},[experienceAndEducation?.experience?.length
     || experienceAndEducation?.education?.length])

    function ch(el,fieldName,length1){
      if(fieldName === "exp"){
        const {position,employer,job_start_date,job_end_date,description} = el;
        if(length1){
          return [position[1],employer[1],job_start_date[1],job_end_date[1],description[1]];
        }else{
          return [position[2],employer[2],job_start_date[2],job_end_date[2],description[2]];
        }
      }
      else{
        const {school,degree,school_end_date,ed_desc} = el;
        if(length1){
          return [school[1],degree[1],school_end_date[1],ed_desc[1]];
        }else{
          return [school[2],degree[2],school_end_date[2],ed_desc[2]];
        }
      }
     
    }

    
    function checkValidFields(expOrEdu,fieldName,singleOrMultiple){
      const fieldbool =  experienceAndEducation[`${expOrEdu}`]?.map((el)=> {
        return ch(el,fieldName,singleOrMultiple);
      });
      return fieldbool;
    }

    async function finish(pt){

      const dataForSending =  getSendingData();
      
      console.log(dataForSending);
       const respose = await fetch("https://resume.redberryinternship.ge/api/cvs",{
            method:"POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForSending)
          });
          const data = await respose.json();
          console.log(data);

          // continue from here

        
    }

  async function handleSubmit(e){
    e.preventDefault();
    let path;
    if(currentPageName === "experience"){
      path = urlNavigator(3);
      if(experienceAndEducation?.experience?.length === 1){
        
        const checkSingleField = checkValidFields("experience","exp",true)
       
        const areFieldsValid = checkSingleField[0].every((el) => el === true);
        
        if(areFieldsValid){
          router.push(path);
        }
      }else{
       const checkEveryField = checkValidFields("experience","exp",false);
       if(!checkEveryField.flat().includes(false)){
        router.push(path);
       }
      }
    }
    // educational part
    else{
      path = urlNavigator(4);
      if(experienceAndEducation?.education?.length === 1){
        const checkFirstEduFields = checkValidFields("education","edu",true)
         const areFieldsValid = checkFirstEduFields[0].every((el) => el === true);
        if(areFieldsValid){
          finish(path)
        }
      }else{
        const checkAllEduFields = checkValidFields("education","edu",false);
        if(!checkAllEduFields.flat().includes(false)){
          finish(path)
         }
      }
    }
    
  }

  return (
    <section className={styles.all_fields_wrapper}>
    <form className={styles.all_fields_wrapper} onSubmit={handleSubmit}>
      {experienceAndEducation && experienceAndEducation[`${currentPageName}`]?.map((el) => {
        const {id} = el;
        // console.log(el);
        return(
          <div key={id} className={styles.all_fields_wrapper}>
          <div>
              <Hero>{currentPageName === "experience" ? "თანამდებობა" : "სასწავლებელი"}</Hero>
              <Exp_Edu_Reusable 
                whichPage={currentPageName === "experience" ? "experience" : "education"}
                currentFieldId={id}
                specStyle={"full_input"} fieldType={"text"}
                inputName={currentPageName === "experience" ?"position" : "school"} 
                inputPlaceholder={currentPageName === "experience" ?"დეველოპერი, დიზაინერი, ა.შ." : "სასწავლებელი"}
                />
          </div>

          { currentPageName === "experience" && <div>
          <Hero>{"დამსაქმებელი"}</Hero>
              <Exp_Edu_Reusable 
              whichPage={"experience"}
              currentFieldId={id}
              specStyle={"full_input"}
               fieldType={"text"}
               
              inputName={"employer" }
               inputPlaceholder={"დამსაქმებელი"}
               />
          </div>}
  
          <div className={styles.name_surname_wrapper}>

          <div className={styles.name_wrapper}>
            <Hero>{currentPageName === "experience" ? "დაწყების რიცხვი" : "ხარისხი"}</Hero>
            <Exp_Edu_Reusable 
           whichPage={currentPageName === "experience" ? "experience" : "education"}
           currentFieldId={id}
            specStyle={"half_input"} fieldType={"date"}
            isSelect = {currentPageName === "experience" ? false : true}
             inputName={currentPageName === "experience" ?"job_start_date" : "degree"} 
             inputPlaceholder={currentPageName === "experience" ? "mm / dd / yyy": "აირჩიეთ ხარისხი"}/>
          </div>

           <div className={styles.surname_wrapper}>
            <Hero>{currentPageName === "experience" ? "დამთავრების რიცხვი" : "დამთავრების რიცხვი"}</Hero>
            <Exp_Edu_Reusable
           whichPage={currentPageName === "experience" ? "experience" : "education"}
           currentFieldId={id}
           specStyle={"half_input"} fieldType={"date"}
            inputName={currentPageName === "experience" ? "job_end_date" : "school_end_date"}
             inputPlaceholder={"mm / dd / yyy"}/>
          </div>
          
        </div>

        <div className={styles.textarea_wrapper}>
            <Hero>
              აღწერა
            </Hero>
            <Exp_Edu_Reusable
             whichPage={currentPageName ===  "experience" ? "experience" : "education"}
             currentFieldId={id}
             specStyle={"full_textarea"}
              inputPlaceholder={currentPageName ===  "experience" ?
              "როლი თანამდებობაზე და ზოგადი აღწერა" : "განათლების აღწერა"}
               inputName={
                currentPageName ===  "experience" ? "description" : "ed_desc"
              } 
               onlyTextArea={true}/>
          </div>
          <hr />
          </div>
        )
      })}
     <AddMoreBtn text={currentPageName === "experience" ? 
     "მეტი გამოცდილების დამატება" :
      "მეტი განათლების დამატება"}
      which={currentPageName === "experience" ? "exp" : "edu"}
      />
      <div className={styles.prev_next_btn_wrapper}>
     <NextBtn next={true} text={currentPageName === "education"? "დასრულება" :"შემდეგი"}/>
     <NextBtn next={false} text={"უკან"}/>
     </div>
    </form>
    </section>
  )
}

export default ExperienceForm