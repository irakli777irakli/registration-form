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

  const {experienceAndEducation} = useGlobalContext();
  useEffect(() => {},[experienceAndEducation?.experience?.length])


  function handleSubmit(e){
    e.preventDefault();
    const path = urlNavigator(2);
    if(experienceAndEducation?.experience[0].position[1] &&
      experienceAndEducation?.experience[0].employer[1] &&
      experienceAndEducation?.experience[0].job_start_date[1] &&
      experienceAndEducation?.experience[0].job_end_date[1] &&
      experienceAndEducation?.experience[0].description[1]){
        if(experienceAndEducation?.experience?.length === 1){
          router.push(path);
        }


       for(let i=0;i<experienceAndEducation?.experience?.length;i++){
        if(i===0){
          continue;
        }else{
          if((experienceAndEducation?.experience[i].position[1] &&
            experienceAndEducation?.experience[i].employer[1] &&
            experienceAndEducation?.experience[i].job_start_date[1] &&
            experienceAndEducation?.experience[i].job_end_date[1] &&
            experienceAndEducation?.experience[i].description[1])
            ||
            (experienceAndEducation?.experience[i].position[1] === false &&
              experienceAndEducation?.experience[i].employer[1] === false &&
              experienceAndEducation?.experience[i].job_start_date[1] === false &&
              experienceAndEducation?.experience[i].job_end_date[1] === false &&
              experienceAndEducation?.experience[i].description[1] === false)
            ){
              router.push(path);
            }
        }
       }
      }
    
  
  }

 

  return (
    <section className={styles.all_fields_wrapper}>
    <form className={styles.all_fields_wrapper} onSubmit={handleSubmit}>
      {experienceAndEducation && experienceAndEducation[`${currentPageName}`]?.map((el) => {
        const {id} = el;
        console.log(el);
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

          <div>
          <Hero>{currentPageName === "experience" ? "დამსაქმებელი" : "ხარისხი"}</Hero>
              <Exp_Edu_Reusable 
              whichPage={currentPageName === "experience" ? "experience" : "education"}
              currentFieldId={id}
              specStyle={currentPageName === "experience" ? "full_input" : "half_input"}
               fieldType={"text"}
               isSelect = {currentPageName === "experience" ? false : true}
              inputName={currentPageName === "experience" ?"employer" : "degree"}
               inputPlaceholder={currentPageName === "experience" ?"დამსაქმებელი": "აირჩიეთ ხარისხი"}
               />
          </div>
  
          <div className={styles.name_surname_wrapper}>
          <div className={styles.name_wrapper}>
            <Hero>{currentPageName === "experience" ? "დაწყების რიცხვი" : "დამთავრების რიცხვი"}</Hero>
            <Exp_Edu_Reusable 
           whichPage={currentPageName === "experience" ? "experience" : "education"}
           currentFieldId={id}
            specStyle={"half_input"} fieldType={"date"}
             inputName={currentPageName === "experience" ?"job_start_date" :"school_end_date"} 
             inputPlaceholder={"mm / dd / yyy"}/>
          </div>
          {currentPageName === "experience" && <div className={styles.surname_wrapper}>
            <Hero>დამთავრების რიცხვი</Hero>
            <Exp_Edu_Reusable
           whichPage={"experience"}
           currentFieldId={id}
           specStyle={"half_input"} fieldType={"date"} inputName={"job_end_date"} inputPlaceholder={"mm / dd / yyy"}/>
          </div>
          }
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
      />
     <NextBtn next={true} text={"შემდეგი"}/>
     <NextBtn next={false} text={"უკან"}/>
    </form>
    </section>
  )
}

export default ExperienceForm