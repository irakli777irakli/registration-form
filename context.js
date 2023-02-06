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
      value={{generalInfo,setGeneralInfo,getFromLC}}
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








