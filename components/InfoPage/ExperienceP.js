import { useGlobalContext } from '@/context';
import React, { useEffect } from 'react';
import TitleHero from '../ValidationForms/TitleHero';
import ExperiencePContent from './ExperiencePContent';
import styles from './InfoSide.module.css'

function ExperienceP() {

    const {experienceAndEducation,pageNumber} = useGlobalContext();

    useEffect(() => {},[experienceAndEducation]);
  return (
    <section className={styles.experienceP}>
         {pageNumber >=2 && <TitleHero>
            გამოცდილება
        </TitleHero>}
        <div className={styles.experienceInfo_wrapper}>
        {pageNumber >=2 && experienceAndEducation?.experience.map((el,i) => {
            return (
                <ExperiencePContent key={i} content={el} contentType={"experience"}/>
            )
        })}
         {pageNumber >=3 && <TitleHero>
            განათლება
        </TitleHero>}
        {pageNumber >=3 && experienceAndEducation?.education.map((el,i) => {
            
            return <ExperiencePContent key={i} content={el} contentType={"education"}/>
        })}
</div>
    </section>
  )
}

export default ExperienceP