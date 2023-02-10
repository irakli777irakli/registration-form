import InfoSide from "./InfoPage/InfoSide";
import styles from './Navbar.module.css'
import ExperienceForm from "./ValidationForms/ExperienceForm";
import GeneralInfoForm from "./ValidationForms/GeneralInfoForm";

import TitleHero from "./ValidationForms/TitleHero";
import ZadniBtn from "./ZadniBtn/ZadniBtn";
import Image from "next/image";




function Navbar({currentPage = [], title, }) {
    
    const [pageName,numeric] = currentPage;

    function displayPageIndexer() {
        return (
            <div className={styles.title_pageIndxer}>
                <TitleHero color={"black"}>
                {title}
                </TitleHero >
            {/* <h1 className={Number(numeric) ? styles.genericPageNames : styles.company_name}></h1> */}
            <p className={styles.pageNumber}>{numeric}/3</p>
            </div>
        )
    }

  return (

    <nav className={styles.registration_nav}>
        {/* when First page displa full, otherwise ass Zadni btn*/}
       {Number(numeric) > 0 ?  <ZadniBtn /> :  <ZadniBtn hidden={true}/> }
       {/* will update this logic in more concise way. */}
       <div className={Number(numeric) > 0 ? styles.title_hr_wrapper : styles.title_hr_wrapper_home}>
             {Number(numeric) ?  displayPageIndexer()
            : 
                <Image src={"/redberryImg.png"} width={236} height={38} alt="redberry" />

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