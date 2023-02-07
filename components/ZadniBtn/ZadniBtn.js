import {MdOutlineArrowBackIos} from 'react-icons/md'
import { useRouter } from "next/router";
import styles from './ZadniBtn.module.css'

function ZadniBtn({hidden = false}) {
    const router = useRouter();
    function goToInitialPage() {
    
            router.push("/")    
    }

    return (
        <div className={hidden ? `${styles.go_back_btn_wrapper} ${styles.hidden}` : `${styles.go_back_btn_wrapper}`}>
    <button style={{border:"none"}} onClick={() => goToInitialPage()}>
       <MdOutlineArrowBackIos size={25} color={"gray"} cursor={"pointer"} />
</button>
   </div>  
    )
}

export default ZadniBtn