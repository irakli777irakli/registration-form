import styles from './PagesMainWrapper.module.css'
import Image from 'next/image';
function PagesMainWrapper(props,) {
  const {isMain} = props;
  
  return (
    <section className={isMain ? `${styles.registration_starter_page_col} ${styles.vh100}` :`${styles.registration_starter_page_col}`}>
        {isMain && <Image className={styles.mainP_img} src={"/background.png"} fill={true} alt={"spectrum"} priority={90} quality={85}/>}
        {props.children}
        </section>
  )
}

export default PagesMainWrapper
