import React, { useState, useContext, useEffect } from 'react'
import { eDucation, eXperience, getFormatedNumber, gInfo, makeEduDefault, makeExpDefault } from './utils/helper';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  
  const [formCount,setFormCount] = useState({
    experience: 1,
    education: 1
  });

  const [successPopUp,setSuccessPopUp] = useState(true);
  const [pageNumber,setPageNumber] = useState(0);

  const [generalInfo,setGeneralInfo] = useState({
   ...gInfo
  });
 

  const [experienceAndEducation,setExperienceAndEducation] = useState({
    experience:[{
     ...eXperience
    }],
    education: [{ 
      ...eDucation
    }]
    
});

const [resume,setResume] = useState();
  const addMore = async (what) => {
    let newField;
    let newExperienceField;
    if(what === "experience"){
      setFormCount({...formCount,experience:formCount.experience + 1});
      const isThere = experienceAndEducation.experience.find((el) => el.id === formCount.experience);
      if(isThere){
         newExperienceField = {
          id: formCount.experience + 1,
          position: ["",false,false],
          employer: ["",false,false],
          job_start_date: ["",false,false],
          job_end_date: ["",false,false],
          description: ["",false,false]
        }
         }else{
         newExperienceField = {
          id: formCount.experience,
          position: ["",false,false],
          employer: ["",false,false],
          job_start_date: ["",false,false],
          job_end_date: ["",false,false],
          description: ["",false,false]
        }
      }
      newField = [...experienceAndEducation.experience,newExperienceField];
      setExperienceAndEducation({...experienceAndEducation,experience:[...newField]})
     
       }else{
      setFormCount({...formCount,education:formCount.education + 1});
      const isThere = experienceAndEducation.education.find((el) => el.id === formCount.education);
      if(isThere){
      newField = await getDegreesData(true);
      newField = {...newField,id:formCount.education + 1}
      }else{
        newField = await getDegreesData(true);
        newField = {...newField,id:formCount.education}
      }
      
      newField = [...experienceAndEducation.education,newField];
      setExperienceAndEducation({...experienceAndEducation,education:[...newField]});
    }
    
   
  }
  async function getDegreesData(forMoreEducation){
    try{
    const response = await fetch("https://resume.redberryinternship.ge/api/degrees");
    const data = await response.json()
    data.unshift({id:0,title:"აირჩიეთ ხარისხი"});
    if(data){
      const educationField = { 
        id: 0,
        school: ["",false,false],
        degree: ["",false,false,data],
        school_end_date: ["",false,false],
        ed_desc: ["",false,false]
      }
      if(forMoreEducation){
        return educationField;
      }
      setExperienceAndEducation({...experienceAndEducation,education:[educationField]});
    }
  }catch(e){
    alert("something went wrong redirecting to main page"+ e?.message)
    await goZadni()

  }

  }

  const getFromLC = async() => {
    const isGeneralInfoInLC = localStorage.getItem("generalP");
    if(isGeneralInfoInLC){
      const generalPData = await  JSON.parse(isGeneralInfoInLC);
      setGeneralInfo(generalPData);
    }
    const isExperienceInLC = localStorage.getItem("experienceP");
    if(isExperienceInLC) {
      const experiencePData = await  JSON.parse(isExperienceInLC);
      setExperienceAndEducation(experiencePData);
    }else{
        getDegreesData();
    }
      
    
  }
  

  const getSendingData = () => {
   
    const blob = urlToFile(generalInfo.photo[0]);
    const file = new File([blob],"myFileName",{type:"image/png"});

    const name = generalInfo.name[0];
    const surname = generalInfo.surname[0];
    const email = generalInfo.email[0];
    const phone_number = getFormatedNumber(generalInfo.phoneNumber[0]);
    const about_me = generalInfo.aboutMe[0];
    
    const experiences = experienceAndEducation.experience.map((el) => {
      const {position,description,employer,job_end_date:due_date,job_start_date:start_date} = el;
      return {position:position[0],
        employer:employer[0],
        start_date:start_date[0],
        due_date:due_date[0],
        description:description[0]}
    });
    const educations = experienceAndEducation.education.map((el) => {
      const {degree,ed_desc,school,school_end_date} = el;
      const {id,title} =  degree[3].find((el) => el.title === degree[0]);
      console.log(id);
      return{
        institute:school[0],
        degree_id: id,
        due_date:school_end_date[0],
        description:ed_desc[0],
      }
    });
  
    const formData = new FormData();
    formData.append('name',name);
    formData.append('surname',surname);
    formData.append('email',email);
    formData.append('phone_number ',phone_number);
    formData.append('experiences',JSON.stringify(experienceAndEducation));
    formData.append('educations ',JSON.stringify(educations));
    formData.append('image ',file);
    formData.append('name',name);
    formData.append('about_me',about_me);
    return formData;


    // return {
    //   name: name,
    //   surname: surname,
    //   email: email,
    //   phone_number: phone_number,
    //   experiences: [
    //     {
    //       "position": "back-end developer",
    //       "employer": "Redberry",
    //       "start_date": "2019/09/09",
    //       "due_date": "2020/09/23",
    //       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum."
    //     }
    //   ],
    //   educations: [
    //     {
    //       "institute": "თსუ",
    //       "degree_id": 7,
    //       "due_date": "2017/06/25",
    //       "description": "სამართლის ფაკულტეტის მიზანი იყო მიგვეღო ფართო თეორიული ცოდნა სამართლის არსის, სისტემის, ძირითადი პრინციპების, სამართლებრივი სისტემების, ქართული სამართლის ისტორიული წყაროების, კერძო, სისხლის და საჯარო სამართლის სფეროების ძირითადი თეორიების, პრინციპებისა და რეგულირების თავისებურებების შესახებ."
    //     }
    //   ],
    //   image: file,
    //   about_me: about_me
    // }
     
  }

  const urlToFile = (dataUrl) =>{
    const parts = dataUrl.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];
    for(let i=0;i<byteCharacters.length;i++){
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray],{type:contentType});
  
  }
  
  useEffect(()=> {
    
    getFromLC();
  
  },[]);


  const goZadni = async () => {
   
    
  if(localStorage.getItem("generalP") || localStorage.getItem("experienceP")){
    localStorage.removeItem("generalP");
    localStorage.removeItem("experienceP");
  }


  setGeneralInfo({
    name: ["",false,false],
    surname: ["",false,false],
    photo: ["",false,false],
    aboutMe: [""],
    email: ["",false,false],
    phoneNumber: ["",false,false],
    });
    setSuccessPopUp(true);
    setPageNumber(0);
    setFormCount({experience:0,education:0});
    
    const emptyExp = experienceAndEducation.experience.filter((el)=> el.id === 0);
    const defaultExp = makeExpDefault(emptyExp)
    const emptyEdu = experienceAndEducation.education.filter((el) => el.id === 0);
    const defaultEduc = makeEduDefault(emptyEdu)
    console.log("this",defaultExp)
    setExperienceAndEducation({
      experience:defaultExp,
      education:defaultEduc
    });
    console.log(experienceAndEducation)

    // await addMore("experience");
    // await addMore("experience");
  }







  return (
    <AppContext.Provider
      value={{generalInfo,setGeneralInfo,getFromLC,experienceAndEducation,
        setExperienceAndEducation,addMore,getSendingData,
        successPopUp,setSuccessPopUp,goZadni,pageNumber,setPageNumber,resume,setResume
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }








