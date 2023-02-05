import styles from './InfoSide.module.css'

import React, { useEffect } from 'react'
import { useGlobalContext } from '@/context'
import TitleHero from '../ValidationForms/TitleHero';

function InfoSide() {

  const {generalInfo} =useGlobalContext();
  useEffect(()=> {},[generalInfo])

  return (
    <div>
      <TitleHero color={"red"}>
        {generalInfo?.name} {generalInfo?.surname}
      </TitleHero>
      </div>
  )
}

export default InfoSide
