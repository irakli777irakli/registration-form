import styles from './PagesMainWrapper.module.css'

function PagesMainWrapper(props,) {
  const {isMain} = props;
  
  return (
    <section className={isMain ? `${styles.registration_starter_page_col} ${styles.registration_starter_page_bg}` : `${styles.registration_starter_page_col}`}>
        {props.children}
        </section>
  )
}

export default PagesMainWrapper
