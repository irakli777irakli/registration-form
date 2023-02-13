import {MdOutlineArrowBackIos} from 'react-icons/md'
import { useRouter } from "next/router";
import styles from './ZadniBtn.module.css'
import { useGlobalContext } from '@/context';

function ZadniBtn({hidden = false}) {
    const {goZadni} = useGlobalContext();
    const router = useRouter();
    async function goToInitialPage() {
            
        router.push("/")    
        await goZadni();    
    }

    return (
        <div className={hidden ? `${styles.go_back_btn_wrapper} ${styles.hidden}` : `${styles.go_back_btn_wrapper}`}>
    <button style={{border:"none",backgroundColor:"white"}} onClick={() => goToInitialPage()}>
       <MdOutlineArrowBackIos size={32} color={"gray"} cursor={"pointer"} />
</button>
   </div>  
    )
}

export default ZadniBtn