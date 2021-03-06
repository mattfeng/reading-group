import React from "react"
import { Link } from "gatsby"

import * as styles from "../styles/paper.module.scss"

const Tags = ({ tags }) => {
  return <div className={styles.tags}>tags: {tags.join(", ")}</div>
}

const Paper = ({ paper }) => {
  const { title, url, anno, tags, year, journal, summary } = paper

  let display

  if (journal && year) {
    display = `${title} (${journal}, ${year})`
  } else if (year) {
    display = `${title} (${year})`
  } else {
    display = `${title}`
  }

  return (
    <div className={styles.paperContainer}>
      <p>
        <a target="_blank" rel="noreferrer" href={url}>
          {display}
        </a>
      </p>
      {anno ? <p className={styles.annotation}>{anno}</p> : null}

      {tags ? <Tags tags={tags} /> : null}

      <div className={styles.notesContainer}>
        {summary ? <Link to={`/papers/${summary}`}>Notes</Link> : null}
      </div>
    </div>
  )
}
export default Paper
