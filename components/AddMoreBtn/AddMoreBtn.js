import { useGlobalContext } from '@/context';
import React from 'react';
import styles from './AddMoreBtn.module.css';

function AddMoreBtn({text,which}) {

    const {addMore} = useGlobalContext();

  return (
    <button type='button'
     onClick={() =>  {which === "exp" ? addMore("experience") : addMore("education")}}
      className={styles.add_more}>
      {text}
      </button>
  )
}

export default AddMoreBtn