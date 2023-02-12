import React, { useEffect } from 'react'
import Hero from './Hero'
import styles from './Validation.module.css';
import Exp_Edu_Reusable from './Exp_Edu_Reusable';
import AddMoreBtn from '../AddMoreBtn/AddMoreBtn';
import { useGlobalContext } from '@/context';
import NextBtn from '../NextBtn/NextBtn';
import { useRouter } from 'next/router';
import { urlNavigator } from '@/utils/helper';

const experienceArr = ["position","employer","job_start_date","job_end_date","description"]
const educationalArr = ["school","degree","school_end_date","ed_desc"]

function ExperienceForm({currentPageName}) {
  const router = useRouter();

  const {setExperienceAndEducation, experienceAndEducation,getSendingData,resume,setResume,pageNumber} = useGlobalContext();
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

    function multiErrorLogic(value,expOrEdu,onOff){
      value.map((el,i)=>{
        if(expOrEdu ==="experience"){
          const {position,employer,job_start_date,job_end_date,description} = el;
          position[1] === false ? position[2] = onOff : null;
          employer[1] === false ? employer[2] = onOff : null;
          job_start_date[1] === false ? job_start_date[2] = onOff : null;
          job_end_date[1] === false ? job_end_date[2] = onOff : null;
          description[1] === false ? description[2] = onOff : null;
      }else{
        const {school,degree,school_end_date,ed_desc} = el;
        school[1] === false ? school[2] = onOff : null;
        degree[1] === false ? degree[2] = onOff : null;
        school_end_date[1] === false ? school_end_date[2] = onOff : null;
        ed_desc[1] === false ? ed_desc[2] = onOff : null;
      }
      });
      if(expOrEdu ==="experience"){
        setExperienceAndEducation({...experienceAndEducation,experience:value})
      }else{
        setExperienceAndEducation({...experienceAndEducation,education:value})

      }
    }


    function errorMultipleParts(value,expOrEdu,onOff,time1){
      setTimeout(()=> {
        multiErrorLogic(value,expOrEdu,onOff)
      },time1)
      
     
    }

    function errorAddedFields(expOrEdu){
      let value = experienceAndEducation[`${expOrEdu}`].slice();
      errorMultipleParts(value,expOrEdu,true,2000)
      errorMultipleParts(value,expOrEdu,false,5000)
    }

    function erroOut(fieldValue,expOrEdu,value,onOff){
      const propArr = expOrEdu === "experience" ? experienceArr : educationalArr
      fieldValue.map((el,i) => {
        if(el === false){
          value[0][`${propArr[i]}`][2] = onOff;
        }
      });
      setExperienceAndEducation({...experienceAndEducation,education:value})
    }

    function ErrorInvalidFields(fieldValue,expOrEdu,time1,time2){
      let value = experienceAndEducation[`${expOrEdu}`].slice();
      setTimeout(()=> {
        erroOut(fieldValue,expOrEdu,value,true)
      },time1);
      setTimeout(()=> {
        erroOut(fieldValue,expOrEdu,value,false)
      },time2);
      
    }

  async function handleSubmit(e){
    e.preventDefault();
    let path;
    let checkSingleField;
    if(currentPageName === "experience"){
      path = urlNavigator(pageNumber+1 || 3);
      if(experienceAndEducation?.experience?.length === 1){
        
        checkSingleField = checkValidFields("experience","exp",true)
       
        const areFieldsValid = checkSingleField[0].every((el) => el === true);
        
        if(areFieldsValid){
          router.push(path);
        }else{    
          // single field error
          ErrorInvalidFields(checkSingleField[0],"experience",2000,5000);

        }
      }else{
       const checkEveryField = checkValidFields("experience","exp",false);
       if(!checkEveryField.flat().includes(false)){
        router.push(path);
       }else{
        // multiple experience error
        errorAddedFields("experience")
       }
      }
    }
    // educational part
    else{
      path = urlNavigator(pageNumber+1 || 4);
      if(experienceAndEducation?.education?.length === 1){
        const checkFirstEduFields = checkValidFields("education","edu",true)
         const areFieldsValid = checkFirstEduFields[0].every((el) => el === true);
        if(areFieldsValid){
          finish(path)
        }else{
          // add error logic for single input
          ErrorInvalidFields(checkFirstEduFields[0],"education",2000,5000);
        }
      }else{
        const checkAllEduFields = checkValidFields("education","edu",false);
        if(!checkAllEduFields.flat().includes(false)){
          finish(path)
         }else{
          // add error logic for multilple
          errorAddedFields("education")
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