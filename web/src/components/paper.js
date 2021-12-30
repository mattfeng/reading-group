import React from "react"

import * as styles from "../styles/paper.module.scss"

const Tag = ({ tag }) => {
  return <span className={styles.tag}>{tag}</span>
}

const Paper = ({ paper }) => {
  const { title, url, anno, tags, year, journal } = paper

  return (
    <div className={styles.paperContainer}>
      <p>
        <a target="_blank" rel="noreferrer" href={url}>
          {title} {year ? `(${year})` : null}
        </a>
      </p>
      {anno ? <p className={styles.annotation}>{anno}</p> : null}

      {tags ? tags.map(tag => <Tag tag={tag} />) : null}
    </div>
  )
}
export default Paper
