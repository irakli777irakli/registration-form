import { useGlobalContext } from '@/context';
import { urlNavigator } from '@/utils/helper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NextBtn from '../NextBtn/NextBtn';
import Hero from './Hero';
import ReusebleForm from './ReusebleForm';
import styles from './Validation.module.css';


function GeneralInfoForm() {
  const router = useRouter();

  const {generalInfo,setGeneralInfo,getFromLC,exprerience,setExperience,pageNumber} = useGlobalContext();
  
  function handleSubmit(e){
    e.preventDefault();
    let startErrorTime, stopErrorTime;
    if(generalInfo["name"][1] && generalInfo["surname"][1] &&
     generalInfo["photo"][1] && generalInfo["email"][1] && generalInfo["phoneNumber"][1]){
      const path = urlNavigator(pageNumber+1 || 2)
      router.push(path);
     }else{
      
      startErrorTime =  setTimeout(() => {
        checkInput(true);
      }, 1000);
       stopErrorTime =  setTimeout(() => {
        checkInput(false)
      },5000);
      
     }
     function checkInput(on){
      let notValid;
      notValid = (generalInfo["name"][1] === false) ?generalInfo["name"][2] = on : null
      
      checkIfValid(notValid)
      notValid = (generalInfo["surname"][1] === false) ?generalInfo["surname"][2] = on : null
      checkIfValid(notValid)
      notValid = (generalInfo["photo"][1] === false) ? generalInfo["photo"][2] = on: null
      checkIfValid(notValid)
      notValid = (generalInfo["email"][1] === false ) ? generalInfo["email"][2] = on: null
      checkIfValid(notValid)
      notValid = (generalInfo["phoneNumber"][1] === false) ? generalInfo["phoneNumber"][2] = on : null 
      checkIfValid(notValid)
     }

     function checkIfValid(isValid){
      if(isValid === null) return
      setGeneralInfo({...generalInfo,isValid})
    
     }
   
  }
  useEffect(()=> {},[generalInfo])


  return (
    <section className={styles.all_fields_wrapper}>
      <form className={styles.all_fields_wrapper} onSubmit={handleSubmit}>
      <div className={styles.name_surname_wrapper}>
        <div className={styles.name_wrapper}>
          <Hero>სახელი</Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"half_input"} fieldType={"text"} inputName={"name"} inputPlaceholder={"ანზორ"}/>
          <Hero twoLetter={true}>მინიმუმ 2 ასო, ქართული ასოები</Hero>
        </div>
        <div className={styles.surname_wrapper}>
          <Hero>გვარი</Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"half_input"} fieldType={"text"} inputName={"surname"} inputPlaceholder={"მუმლაძე"}/>
          <Hero twoLetter={true}>მინიმუმ 2 ასო, ქართული ასოები</Hero>
        </div>
      </div>
        <div className={styles.file_upload_wrapper}>
          <Hero>პირადი ფოტოს ატვირთვა</Hero>
          <ReusebleForm  currentPage={generalInfo} specStyle={"upload_button"}  fieldType={"file"} inputName={"photo"} acceptance={"image/*"}/>
        </div>
        <div className={styles.textarea_wrapper}>
          <Hero>
            ჩემს შესახებ (არასავალდებულო)
          </Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"full_textarea"} inputPlaceholder={"ზოგადი ინფო შენს შესახებ"} inputName={"aboutMe"} onlyTextArea={true}/>
        </div>
        <div className={styles.email_number_wrapper}>
        <div>
          <Hero>
            ელ.ფოსტა
          </Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"full_input"} fieldType={"email"} inputName={"email"} inputPlaceholder={"anzor666@redberry.ge"}/>
          <Hero twoLetter={true}>უნდა მთავრდებოდეს @redberry.ge-ით</Hero>
        </div>
        <div>
          <Hero>
            მობილურის ნომერი
          </Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"full_input"} fieldType={"text"} inputName={"phoneNumber"} inputPlaceholder={"+995 3551 12 34 56"}/>
          <Hero twoLetter={true}>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</Hero>
        </div>
        </div>
        <NextBtn  next={true} text={"შემდეგი"}/>
        </form>
    </section>
  )
}

export default GeneralInfoForm