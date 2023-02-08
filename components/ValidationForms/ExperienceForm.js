import React, { useEffect } from 'react'
import Hero from './Hero'
import styles from './Validation.module.css';
import Exp_Edu_Reusable from './Exp_Edu_Reusable';
import AddMoreBtn from '../AddMoreBtn/AddMoreBtn';
import { useGlobalContext } from '@/context';
import NextBtn from '../NextBtn/NextBtn';

function ExperienceForm() {

  const {experienceAndEducation} = useGlobalContext();
  useEffect(() => {},[experienceAndEducation?.experience?.length])


  function handleSubmit(e){
    e.preventDefault();
        
  
  }

  return (
    <section className={styles.all_fields_wrapper}>
    <form className={styles.all_fields_wrapper} onSubmit={handleSubmit}>
      {experienceAndEducation?.experience?.map((el) => {
        const {id} = el;
        return(
          <div className={styles.all_fields_wrapper}>
          <div>
              <Hero>თანამდებობა</Hero>
              <Exp_Edu_Reusable 
              whichPage={"experience"}
              currentFieldId={id}
              specStyle={"full_input"} fieldType={"text"} inputName={"position"} inputPlaceholder={"დეველოპერი, დიზაინერი, ა.შ."}/>
          </div>        
          <div>
          <Hero>დამსაქმებელი</Hero>
              <Exp_Edu_Reusable 
              whichPage={"experience"}
              currentFieldId={id}
              specStyle={"full_input"} fieldType={"text"} inputName={"employer"} inputPlaceholder={"დამსაქმებელი"}/>
          </div>
  
          <div className={styles.name_surname_wrapper}>
          <div className={styles.name_wrapper}>
            <Hero>დაწყების რიცხვი</Hero>
            <Exp_Edu_Reusable 
           whichPage={"experience"}
           currentFieldId={id}
            specStyle={"half_input"} fieldType={"date"} inputName={"job_start_date"} inputPlaceholder={"mm / dd / yyy"}/>
          </div>
          <div className={styles.surname_wrapper}>
            <Hero>დამთავრების რიცხვი</Hero>
            <Exp_Edu_Reusable
           whichPage={"experience"}
           currentFieldId={id}
           specStyle={"half_input"} fieldType={"date"} inputName={"job_end_date"} inputPlaceholder={"mm / dd / yyy"}/>
          </div>
        </div>
        <div className={styles.textarea_wrapper}>
            <Hero>
              აღწერა
            </Hero>
            <Exp_Edu_Reusable
             whichPage={"experience"}
             currentFieldId={id}
             specStyle={"full_textarea"}
              inputPlaceholder={"როლი თანამდებობაზე და ზოგადი აღწერა"} inputName={"description"} onlyTextArea={true}/>
          </div>
          <hr />
          </div>
        )
      })}
     <AddMoreBtn text={"მეტი გამოცდილების დამატება"}/>
     <NextBtn />
    </form>
    </section>
  )
}

export default ExperienceForm