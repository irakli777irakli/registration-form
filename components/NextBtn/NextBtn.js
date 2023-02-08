import styles from './NextBtn.module.css';
function NextBtn({next,text}) {
  return (
    <button type={next ? "submit" : "button"} className={next ? styles.sumbit_btn : styles.prev_btn}>
        {text}
    </button>
  )
}

export default NextBtn