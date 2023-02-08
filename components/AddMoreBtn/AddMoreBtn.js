import { useGlobalContext } from '@/context';
import React from 'react';
import styles from './AddMoreBtn.module.css';

function AddMoreBtn({text}) {

    const {addExperience} = useGlobalContext();

  return (
    <button type='button' onClick={() => addExperience()} className={styles.add_more}>{text}</button>
  )
}

export default AddMoreBtn