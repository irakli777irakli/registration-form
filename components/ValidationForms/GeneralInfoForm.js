import NextBtn from '../NextBtn/NextBtn';
import Hero from './Hero';
import ReusebleForm from './ReusebleForm';
import styles from './Validation.module.css';

function GeneralInfoForm() {



  return (
    <section className={styles.all_fields_wrapper}>
      
      <div className={styles.name_surname_wrapper}>
        <div className={styles.name_wrapper}>
          <Hero>სახელი</Hero>
          <ReusebleForm specStyle={"half_input"} fieldType={"text"} inputName={"name"} inputPlaceholder={"ანზორ"}/>
        </div>
        <div className={styles.surname_wrapper}>
          <Hero>გვარი</Hero>
          <ReusebleForm specStyle={"half_input"} fieldType={"text"} inputName={"surname"} inputPlaceholder={"მუმლაძე"}/>
        </div>
      </div>
        <div className={styles.file_upload_wrapper}>
          <Hero>პირადი ფოტოს ატვირთვა</Hero>
          <ReusebleForm specStyle={"upload_button"}  fieldType={"file"} inputName={"photo"}/>
        </div>
        <div className={styles.textarea_wrapper}>
          <Hero>
            ჩემს შესახებ (არასავალდებულო)
          </Hero>
          <ReusebleForm specStyle={"full_textarea"} inputPlaceholder={"ზოგადი ინფო შენს შესახებ"} inputName={"aboutMe"} onlyTextArea={true}/>
        </div>
        <div className={styles.email_number_wrapper}>
        <div>
          <Hero>
            ელ.ფოსტა
          </Hero>
          <ReusebleForm specStyle={"full_input"} fieldType={"email"} inputName={"email"} inputPlaceholder={"anzor666@redberry.ge"}/>
        </div>
        <div>
          <Hero>
            მობილურის ნომერი
          </Hero>
          <ReusebleForm specStyle={"full_input"} fieldType={"text"} inputName={"phoneNumber"} inputPlaceholder={"+995 3551 12 34 56"}/>
        </div>
        </div>
        <NextBtn />
      
    </section>
  )
}

export default GeneralInfoForm