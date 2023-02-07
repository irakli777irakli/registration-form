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
      schoool_end_date: ["",false],
      description: ["",false]
    }]
    
});

  const getFromLC = async() => {
    const data = await  JSON.parse(localStorage.getItem("generalP"));
    if(data){
      setGeneralInfo(data);
    }
  }
  
  useEffect(()=> {
    getFromLC()
  },[])
  return (
    <AppContext.Provider
      value={{generalInfo,setGeneralInfo,getFromLC,experienceAndEducation,setExperienceAndEducation}}
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








