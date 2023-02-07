import { useGlobalContext } from '@/context';
import { useRouter } from 'next/router';
import NextBtn from '../NextBtn/NextBtn';
import Hero from './Hero';
import ReusebleForm from './ReusebleForm';
import styles from './Validation.module.css';
const possibleRoutes = ["/generalNews/1","/experience/2","/education/3","/result/4"];

 // function goToPrevPage() {
    //     const exists = possibleRoutes.indexOf(`/${pageName}/${numeric}`)
    //     if(exists === -1 || exists === 0){
    //         router.push("/")
    //     }else{
    //         router.push(possibleRoutes[exists - 1]);
    //     }
    // }
function GeneralInfoForm() {
  const router = useRouter();

  const {generalInfo,setGeneralInfo,getFromLC,exprerience,setExperience} = useGlobalContext();
  
  function handleSubmit(e){
    e.preventDefault();
    if(generalInfo["name"][1] && generalInfo["surname"][1] &&
     generalInfo["photo"][1] && generalInfo["email"][1] && generalInfo["phoneNumber"][1]){
      router.push(possibleRoutes[1]);
     }
  }


  return (
    <section className={styles.all_fields_wrapper}>
      <form className={styles.all_fields_wrapper} onSubmit={handleSubmit}>
      <div className={styles.name_surname_wrapper}>
        <div className={styles.name_wrapper}>
          <Hero>სახელი</Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"half_input"} fieldType={"text"} inputName={"name"} inputPlaceholder={"ანზორ"}/>
        </div>
        <div className={styles.surname_wrapper}>
          <Hero>გვარი</Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"half_input"} fieldType={"text"} inputName={"surname"} inputPlaceholder={"მუმლაძე"}/>
        </div>
      </div>
        <div className={styles.file_upload_wrapper}>
          <Hero>პირადი ფოტოს ატვირთვა</Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"upload_button"}  fieldType={"file"} inputName={"photo"} acceptance={"image/*"}/>
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
        </div>
        <div>
          <Hero>
            მობილურის ნომერი
          </Hero>
          <ReusebleForm currentPage={generalInfo} specStyle={"full_input"} fieldType={"text"} inputName={"phoneNumber"} inputPlaceholder={"+995 3551 12 34 56"}/>
        </div>
        </div>
        <NextBtn />
        </form>
    </section>
  )
}

export default GeneralInfoForm