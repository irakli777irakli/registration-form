import styles from './Validation.module.css';

function TitleHero(props) {
    // console.log(props)
  return (
    <h1 className={props?.color === "black" ? `${styles.genericPageNames}` : `${styles.company_name}`}>
        {props.children}
        </h1>
  )
}

export default TitleHero