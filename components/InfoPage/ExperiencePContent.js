import React from 'react'
import styles from './InfoSide.module.css'

function ExperiencePContent({content,contentType}) {
    
  return (
    
    <div className={styles.ExperiencePContent_wrapper}>
      <div className={styles.position_employer_wrapper}>
          <span >{contentType === "experience" ?content?.position[0] : content?.school[0]}</span>
          <span >{contentType === "experience" ? content?.employer[0]:content?.degree[0]}</span>
      </div>
      <div className={styles.job_info_wrapper}>
          <span>{contentType === "experience" ? content?.job_start_date[0] : content?.school_end_date[0]}</span>
          {contentType === "experience" && <span>{content?.job_end_date[0]}</span>}
      </div>
      <div>
          <p className={styles.textAreaContent}>{contentType === "experience" ? content?.description[0]: content?.ed_desc[0]}</p>
      </div>
      {contentType === "experience" ? (content?.position[1] && content?.employer[1] && content?.job_start_date[1] && content?.job_end_date[1] && content?.description[1]) &&<hr className={styles.generalInfoP_hr} /> :
      (content?.school[1] && content?.degree[1] && content?.school_end_date[1] && content?.ed_desc[1]) && <hr className={styles.generalInfoP_hr} />}
      
</div>
  )
}

export default ExperiencePContent