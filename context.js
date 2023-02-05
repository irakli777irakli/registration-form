import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  

  const [generalInfo,setGeneralInfo] = useState({
    name: "",
    surname: "",
    photo: "",
    aboutMe: "",
    mail: "",
    phoneNumber: "",
  });


  return (
    <AppContext.Provider
      value={{generalInfo,setGeneralInfo}}
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








