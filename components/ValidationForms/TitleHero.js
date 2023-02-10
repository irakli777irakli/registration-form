import styles from './Validation.module.css';

function TitleHero(props) {
    
  return (
    <h1 className={props?.color === "black" 
    ? `${styles.genericPageNames}` : `${props?.textAreaTitle ? `${styles.textAreaTitle}` : `${styles.company_name}` }`}>
        {props.children}
        </h1>
  )
}

export default TitleHero