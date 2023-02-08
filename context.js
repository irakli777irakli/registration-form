import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  

  const [generalInfo,setGeneralInfo] = useState({
    name: ["",false],
    surname: ["",false],
    photo: ["",false],
    aboutMe: [""],
    email: ["",false],
    phoneNumber: ["",false],
   
  });
 

  const [experienceAndEducation,setExperienceAndEducation] = useState({
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


const [experienceFormCount,setExperienceFormCount] = useState(1);


  const addExperience = () => {
    setExperienceFormCount(experienceFormCount + 1);
    const newExperienceField = {
      id: experienceFormCount,
      position: ["",false],
      employer: ["",false],
      job_start_date: ["",false],
      job_end_date: ["",false],
      description: ["",false]
    }
    const newField = [...experienceAndEducation.experience,newExperienceField];
    setExperienceAndEducation({...experienceAndEducation,experience:[...newField]})
   
  }


  async function getDegreesData(){
    const response = await fetch("https://resume.redberryinternship.ge/api/degrees");
    const data = await response.json();
    if(data){
      const educationField = { 
        id: 0,
        school: ["",false],
        degree: [data,false],
        school_end_date: ["",false],
        ed_desc: ["",false]
      }
      
      setExperienceAndEducation({...experienceAndEducation,education:[educationField]})
    }
    


  }

  const getFromLC = async() => {
    const generalPData = await  JSON.parse(localStorage.getItem("generalP"));
    const experiencePData = await  JSON.parse(localStorage.getItem("experienceP"));
    if(generalPData){
      setGeneralInfo(generalPData);
    }
    if(experiencePData){
      setExperienceAndEducation(experiencePData);
    }
  }
  
  useEffect(()=> {
    getDegreesData();
    getFromLC()
  },[])
  return (
    <AppContext.Provider
      value={{generalInfo,setGeneralInfo,getFromLC,experienceAndEducation,
        setExperienceAndEducation,addExperience}}
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








