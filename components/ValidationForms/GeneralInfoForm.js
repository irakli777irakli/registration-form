import Hero from './Hero';
import ReusebleForm from './ReusebleForm';
import TitleHero from './TitleHero';
import styles from './Validation.module.css';

function GeneralInfoForm() {



  return (
    <section>
      <div>
        <div>
          <Hero>სახელი</Hero>
          <ReusebleForm fieldType={"text"} inputName={"name"} inputPlaceholder={"ანზორ"}/>
        </div>
        <div>
          <Hero>გვარი</Hero>
          <ReusebleForm fieldType={"text"} inputName={"surname"} inputPlaceholder={"მუმლაძე"}/>
        </div>
        <div>
          <Hero>პირადი ფოტოს ატვირთვა</Hero>
          <ReusebleForm fieldType={"file"} inputName={"photo"}/>
        </div>
        <div>
          <Hero>
            ჩემს შესახებ (არასავალდებულო)
          </Hero>
          <ReusebleForm inputPlaceholder={"ზოგადი ინფო შენს შესახებ"} inputName={"aboutMe"} onlyTextArea={true}/>
        </div>
        <div>
          <Hero>
            ელ.ფოსტა
          </Hero>
          <ReusebleForm fieldType={"email"} inputName={"email"} inputPlaceholder={"anzor666@redberry.ge"}/>
        </div>
        <div>
          <Hero>
            მობილურის ნომერი
          </Hero>
          <ReusebleForm fieldType={"text"} inputName={"phoneNumber"} inputPlaceholder={"+995 3551 12 34 56"}/>
        </div>
      </div>
    </section>
  )
}

export default GeneralInfoForm