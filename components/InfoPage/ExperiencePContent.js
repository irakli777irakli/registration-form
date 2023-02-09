import React from 'react'
import styles from './InfoSide.module.css'

function ExperiencePContent({content,contentType}) {
    
  return (
    
    <div>
    <div className={styles.position_employer_wrapper}>
        <span>{contentType === "experience" ?content.position[0] : content.school[0]}</span>
        <span>{contentType === "experience" ? content.employer[0]:content.degree[0]}</span>
    </div>
    <div className={styles.job_info_wrapper}>
        <span>{contentType === "experience" ? content.job_start_date[0] : content.school_end_date[0]}</span>
        {contentType === "experience" && <span>{content.job_end_date[0]}</span>}
    </div>
    <div>
        <p>{contentType === "experience" ? content.description[0]: content.ed_desc[0]}</p>
    </div>
</div>
  )
}

export default ExperiencePContent