import styles from './NextBtn.module.css';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/context';
import { urlNavigator } from '@/utils/helper';
function NextBtn({next,text}) {
  const router = useRouter();
  const {pageNumber} = useGlobalContext();
  function goToPevPage(){
    
    const path = urlNavigator(pageNumber - 1);
    
    router.push(path);
  }


  return (
    <button type={next ? "submit" : "button"}
     className={next ? styles.sumbit_btn : styles.prev_btn}
     onClick={() => {!next && goToPevPage()}}
     >
        {text}
    </button>
  )
}

export default NextBtn