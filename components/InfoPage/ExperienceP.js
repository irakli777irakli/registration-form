import { useGlobalContext } from '@/context';
import React, { useEffect } from 'react';
import TitleHero from '../ValidationForms/TitleHero';
import ExperiencePContent from './ExperiencePContent';
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
            return (
                <ExperiencePContent key={i} content={el} contentType={"experience"}/>
            )
        })}
         <TitleHero>
            განათლება
        </TitleHero>
        {experienceAndEducation?.education.map((el,i) => {
            
            return <ExperiencePContent key={i} content={el} contentType={"education"}/>
        })}
</div>
    </section>
  )
}

export default ExperienceP