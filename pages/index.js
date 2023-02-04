import Navbar from '@/components/Navbar';
import PagesMainWrapper from '@/components/PagesWrapper/PagesMainWrapper';
import { useRouter } from 'next/router';


export default function Home() {

  const router = useRouter();
  


  
  return (
    <PagesMainWrapper>
     <Navbar title={"REDBERRY"}/>
     <div className="addBtn_logo_wrapper">
        <button type='button' className="add_resume_btn" onClick={() =>router.push("/generalNews/1")}>
          რეზიუმეს დამატება
        </button>
        <div className="logo">
          <h5 className="circle_chars">{"REDBERRY 614090504 - DIGITAL INTERNATIONAL AGENCY".split("").map((char,i) =>{
            return <span key={i} style={{transform:`rotate(${(i+1)*7}deg)`}}>{char}</span>
          })}
           <div className="circle">
            <div className="symbol"></div>
          </div>
          </h5>
         
        </div>
      </div>
     
      </PagesMainWrapper>
   
  )
}
