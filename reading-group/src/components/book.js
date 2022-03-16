import React from "react"
import { Link } from "gatsby"

import * as styles from "../styles/book.module.scss"

const Book = ({ title, author, about, notes, year }) => {
  const authors = typeof author === "string" ? author : author.join(", ")

  let display
  if (year) {
    display = `${title} (${year})`
  } else {
    display = `${title}`
  }

  return (
    <div className={styles.bookContainer}>
      <p className={styles.title}>{display}</p>
      <p className={styles.author}>{author ? authors : "n/a"}</p>
      {about ? <p>{about}</p> : null}
      <div>
        {notes ? (
          <Link className={styles.notes} to={`/books/${notes}`}>
            Notes
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default Book
