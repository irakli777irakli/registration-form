import InfoSide from "./InfoPage/InfoSide";
import styles from './Navbar.module.css'
import ExperienceForm from "./ValidationForms/ExperienceForm";
import GeneralInfoForm from "./ValidationForms/GeneralInfoForm";

import TitleHero from "./ValidationForms/TitleHero";
import ZadniBtn from "./ZadniBtn/ZadniBtn";




function Navbar({currentPage = [], title, }) {
    
    const [pageName,numeric] = currentPage;

    function displayPageIndexer() {
        return (
            <div className={styles.title_pageIndxer}>
                <TitleHero color={"black"}>
                {title}
                </TitleHero >
            {/* <h1 className={Number(numeric) ? styles.genericPageNames : styles.company_name}></h1> */}
            <p>{numeric}/3</p>
            </div>
        )
    }

  return (

    <nav className={styles.registration_nav}>
        {/* in order to maintain 10% and 40 % ration between `backBtn` and `mainNan`*/}
       {Number(numeric) > 0 ?  <ZadniBtn /> :  <ZadniBtn hidden={true}/> }
       {/* will update this logic in more concise way. */}
       <div className={Number(numeric) > 0 ? styles.title_hr_wrapper : styles.title_hr_wrapper_home}>
             {Number(numeric) ?  displayPageIndexer()
            : 
            <TitleHero  color={"red"}>
                {title}
            </TitleHero>   
            //<h1 className={Number(numeric) ? styles.genericPageNames : styles.company_name}>{title}</h1>

        }
            <hr className={styles.nav_hr}/>
            {Number(numeric) === 1 && <GeneralInfoForm />}
            {Number(numeric) === 2 && <ExperienceForm currentPageName={"experience"}/>}
            {Number(numeric) === 3 && <ExperienceForm currentPageName={"education"}/>}
        </div>
        {Number(numeric) > 0 && <InfoSide />}

  </nav>

  )
}

export default Navbar