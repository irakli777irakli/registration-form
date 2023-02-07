import { useGlobalContext } from '@/context';
import React, { useEffect } from 'react';
import TitleHero from '../ValidationForms/TitleHero';
import styles from './InfoSide.module.css'

function ExperienceP() {

    const {experienceAndEducation} = useGlobalContext();

    useEffect(() => {},[experienceAndEducation]);
  return (
    <section className={styles.experienceP}>
        <TitleHero>
            გამოცდილება
        </TitleHero>
        <div className={styles.experienceInfo_wrapper}>
        {experienceAndEducation?.experience.map((el,i) => {
            const { position,employer,job_start_date,job_end_date,description} = el;
            return (
                <div key={i}>
                    <div className={styles.position_employer_wrapper}>
                        <span>{position[0]}</span>
                        <span>{employer[0]}</span>
                    </div>
                    <div className={styles.job_info_wrapper}>
                        <span>{job_start_date[0]}</span>
                        <span>{job_end_date[0]}</span>
                    </div>
                    <div>
                        <p>{description[0]}</p>
                    </div>
                </div>
            )
        })}
</div>
    </section>
  )
}

export default ExperienceP