import ExperienceP from './ExperienceP'
import GeneralInfoP from './GeneralInfoP'
import styles from './InfoSide.module.css'



function InfoSide({isResume}) {


  return (
   <section className={isResume ? `${styles.infoSide_wrapper} ${styles.isResume}` : styles.infoSide_wrapper}>
    <GeneralInfoP />
    <ExperienceP />
   </section>
  )
}

export default InfoSide
