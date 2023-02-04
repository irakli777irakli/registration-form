import styles from './PagesMainWrapper.module.css'

function PagesMainWrapper(props) {
  return (
    <section className={styles.registration_starter_page_col}>
        {props.children}
        </section>
  )
}

export default PagesMainWrapper
