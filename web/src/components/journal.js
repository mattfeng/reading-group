import React from "react"

import * as styles from "../styles/journal.module.scss"

const Journal = ({ name, impactFactor, url }) => {
  return (
    <div className={styles.journalContainer}>
      <div className={styles.title}>
        <a rel="noreferrer" target="_blank" href={url}>
          {name}
        </a>
        {impactFactor ? ` (impact factor: ${impactFactor})` : null}
        {about ? <p>{about}</p> : null}
      </div>
    </div>
  )
}

export default Journal
