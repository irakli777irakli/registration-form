import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import PagesMainWrapper from '../components/PagesWrapper/PagesMainWrapper'
import Image from 'next/image';
import { urlNavigator } from '@/utils/helper';

export default function Home() {

  const router = useRouter();
  
  return (
    <PagesMainWrapper isMain = {true}>
     <Navbar/>
     <div className="addBtn_logo_wrapper">
        <button type='button' className="add_resume_btn" onClick={() =>router.push(urlNavigator(0))}>
          რეზიუმეს დამატება
        </button>
        <Image src={"/logo.png"} width={299} height={299} alt="symbol" className='logo'/>
      </div>
     
      </PagesMainWrapper>
   
  )
}


// reference
{/* <div className="logo">
<h5 className="circle_chars">{"REDBERRY 614090504 - DIGITAL INTERNATIONAL AGENCY".split("").map((char,i) =>{
  return <span key={i} style={{transform:`rotate(${(i+1)*7}deg)`}}>{char}</span>
})}
 <div className="circle">
  <div className="symbol"></div>
</div>
</h5>

</div> */}
