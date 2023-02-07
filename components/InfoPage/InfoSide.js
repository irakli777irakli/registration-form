import ExperienceP from './ExperienceP'
import GeneralInfoP from './GeneralInfoP'
import styles from './InfoSide.module.css'



function InfoSide() {


  return (
   <section className={styles.infoSide_wrapper}>
    <GeneralInfoP />
    <ExperienceP />
   </section>
  )
}

export default InfoSide
