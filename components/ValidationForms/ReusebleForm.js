import { useGlobalContext } from '@/context';
import { useEffect } from 'react';
import styles from './Validation.module.css';

function ReusebleForm({fieldType,inputName,inputPlaceholder, onlyTextArea = false}) {

  const {generalInfo,setGeneralInfo} = useGlobalContext();

  function displayInfo(e,iName) {
  const value =   generalInfo[iName] = e.target.value;
  setGeneralInfo({...generalInfo,value});

  console.log(generalInfo);
  }

  useEffect(()=>{},[generalInfo])

  return (
   <>
   {onlyTextArea ? 
   
   <textarea cols={20} rows={10}
   placeholder={inputPlaceholder} value={generalInfo[inputName]} name={inputName} onChange={(e) => displayInfo(e,inputName)} />
    :
    <input type={`${fieldType}`}  placeholder={inputPlaceholder} value={generalInfo[inputName]} name={inputName} onChange={(e) => displayInfo(e,inputName)} />

  }
      
      </>
  )
}

export default ReusebleForm