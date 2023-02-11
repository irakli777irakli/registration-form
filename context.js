import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  
  const [formCount,setFormCount] = useState({
    experience: 1,
    education: 1
  });

  const [successPopUp,setSuccessPopUp] = useState(true);
  const [pageNumber,setPageNumber] = useState(0);

  const [generalInfo,setGeneralInfo] = useState({
    name: ["",false,false],
    surname: ["",false,false],
    photo: ["",false,false],
    aboutMe: [""],
    email: ["",false,false],
    phoneNumber: ["",false,false],
   
  });
 

  const [experienceAndEducation,setExperienceAndEducation] = useState({
    experience:[{
      id: 0,
      position: ["",false,false],
      employer: ["",false,false],
      job_start_date: ["",false,false],
      job_end_date: ["",false,false],
      description: ["",false,false]
    }],
    education: [{ 
      id: 0,
      school: ["",false],
      degree: ["",false],
      school_end_date: ["",false],
      ed_desc: ["",false]
    }]
    
});


const [resume,setResume] = useState();

  const addMore = async (what) => {
    let newField;
    if(what === "experience"){
      setFormCount({...formCount,experience:formCount.experience + 1});
      const newExperienceField = {
        id: formCount.experience,
        position: ["",false,false],
        employer: ["",false],
        job_start_date: ["",false,false],
        job_end_date: ["",false,false],
        description: ["",false,false]
      }
      newField = [...experienceAndEducation.experience,newExperienceField];
      setExperienceAndEducation({...experienceAndEducation,experience:[...newField]})
    }else{
      setFormCount({...formCount,education:formCount.education + 1});
      newField = await getDegreesData(true);
      newField = {...newField,id:formCount.education}
      newField = [...experienceAndEducation.education,newField];
      setExperienceAndEducation({...experienceAndEducation,education:[...newField]});
    }
    
   
  }

  

  async function getDegreesData(forMoreEducation){
    const response = await fetch("https://resume.redberryinternship.ge/api/degrees");
    const data = await response.json();
    if(data){
      const educationField = { 
        id: 0,
        school: ["",false],
        degree: ["",false,data],
        school_end_date: ["",false],
        ed_desc: ["",false]
      }
      if(forMoreEducation){
        return educationField;
      }
    
      
      setExperienceAndEducation({...experienceAndEducation,education:[educationField]});
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


  const getSendingData = async () => {
  //strip off the data uri prefix
 
  
    const response = await fetch(`${generalInfo.photo[0]}`);
    const blob = await response.blob();
    console.log(blob)
    const file = new File([blob],'image.jpg',{type: blob.type});
    // continue from here
    console.log(file)
    const name = generalInfo.name[0];
    const surname = generalInfo.surname[0];
    const email = generalInfo.email[0];
    const phone_number = generalInfo.phoneNumber[0];
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
      const {id,title} =  degree[2].find((el) => el.title === degree[0]);
      console.log(id);
      return{
        institute:school[0],
        degree_id: id,
        due_date:school_end_date[0],
        description:ed_desc[0],
      }
    });
  
    
    return {
      name,
      surname,
      email,
      phone_number,
      experiences,
      educations,
      image:file,
      about_me
    }
  }
  
  useEffect(()=> {
    
    getFromLC();
  
  },[]);


  const goZadni = () => {
    setGeneralInfo({
      name: ["",false,false],
    surname: ["",false,false],
    photo: ["",false,false],
    aboutMe: [""],
    email: ["",false,false],
    phoneNumber: ["",false,false],
    });
    setExperienceAndEducation({
      experience:[{
        id: 0,
        position: ["",false],
        employer: ["",false],
        job_start_date: ["",false],
        job_end_date: ["",false],
        description: ["",false]
      }],
      education: [{ 
        id: 0,
        school: ["",false],
        degree: ["",false],
        school_end_date: ["",false],
        ed_desc: ["",false]
      }]
  });
  if(localStorage.getItem("generalP") || localStorage.getItem("experienceP")){
    localStorage.removeItem("generalP");
    localStorage.removeItem("experienceP");
  }
  }







  return (
    <AppContext.Provider
      value={{generalInfo,setGeneralInfo,getFromLC,experienceAndEducation,
        setExperienceAndEducation,addMore,getSendingData,resume,setResume,
        successPopUp,setSuccessPopUp,goZadni,pageNumber,setPageNumber
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








