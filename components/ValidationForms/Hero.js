import styles from './Validation.module.css';

function Hero(props) {

  return (
    <h5 className={props?.twoLetter ? styles.two_letter : styles.input_label}>
      {props.children}
      </h5>
  )
}

export default Hero