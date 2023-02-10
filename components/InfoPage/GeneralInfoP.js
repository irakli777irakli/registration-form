import styles from './InfoSide.module.css'
import React, { useEffect } from 'react'
import { useGlobalContext } from '@/context'
import TitleHero from '../ValidationForms/TitleHero';
import Image from 'next/image';

function GeneralInfoP() {
    const {generalInfo} =useGlobalContext();
    useEffect(()=> {
  
    },[generalInfo])



  return (
    <>
    <div className={styles.generalInfoP_wrapper}>
        <div className={styles.generalInfoP_l}>
            <TitleHero color={"red"}>
            {generalInfo?.name[0]} {generalInfo?.surname[0]}
            </TitleHero>
        <div className={styles.number_email_wrapper}>
            <span className={styles.email}>@ {generalInfo?.email[0]}</span>
            <span className={styles.phone_Number}>📞 {generalInfo?.phoneNumber[0]}</span>
        </div>
        <div className={styles.title_textarea}>
        {generalInfo?.aboutMe[0]?.length > 0 && <TitleHero textAreaTitle={true} color={"red"}>ჩემს შესახებ</TitleHero>}
        <span className={styles.aboutMe_text}>{generalInfo?.aboutMe[0]}</span>
        </div>
    </div>
    <div className={styles.generalInfoP_r}>
        {generalInfo?.photo[0] !== ""  && 
        <Image src={generalInfo?.photo[0]} alt="image" width={200} height={200} className={styles.person_img}/>}
  
    </div>
  </div>
  <hr />
 </>
  
  )
}

export default GeneralInfoP