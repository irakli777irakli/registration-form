import { useRouter } from "next/router";
import { useState } from "react";
import {MdOutlineArrowBackIos} from 'react-icons/md'
import InfoSide from "./InfoPage/InfoSide";
import styles from './Navbar.module.css'


const possibleRoutes = ["/generalNews/1","/experience/2","/education/3","/result/4"];

function Navbar({currentPage = [], title, }) {
    const router = useRouter();
    const [pageName,numeric] = currentPage;
    function goToPrevPage() {
        const exists = possibleRoutes.indexOf(`/${pageName}/${numeric}`)
        if(exists === -1 || exists === 0){
            router.push("/")
        }else{
            router.push(possibleRoutes[exists - 1]);
        }
    }


    function displayGoBackBtn(hidden = false) {
        return (
            <div className={hidden ? `${styles.go_back_btn_wrapper} ${styles.hidden}` : `${styles.go_back_btn_wrapper}`}>
        <button  onClick={() => goToPrevPage()}>
           <MdOutlineArrowBackIos size={25} color={"black"} cursor={"pointer"} />
    </button>
       </div>  
        )
    }

    function displayPageIndexer() {
        return (
            <div className={styles.title_pageIndxer}>
            <h1 className={Number(numeric) ? styles.genericPageNames : styles.company_name}>{title}</h1>
            <p>{numeric}/3</p>
            </div>
        )
    }

  return (

    <nav className={styles.registration_nav}>
        {/* in order to maintain 10% and 90 % ration between `backBtn` and `mainNan`*/}
       {Number(numeric) > 0 ? displayGoBackBtn() : displayGoBackBtn(true)}
       {/* will update this logic in more concise way. */}
       <div className={Number(numeric) > 0 ? styles.title_hr_wrapper : styles.title_hr_wrapper_home}>
             {Number(numeric) ?  displayPageIndexer()
            :    
            <h1 className={Number(numeric) ? styles.genericPageNames : styles.company_name}>{title}</h1>

        }
            <hr className={styles.nav_hr}/>
        </div>
        {Number(numeric) > 0 && <InfoSide />}

  </nav>

  )
}

export default Navbar