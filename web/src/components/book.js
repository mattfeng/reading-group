import React from "react"
import { Link } from "gatsby"

import * as styles from "../styles/book.module.scss"

const Book = ({ title, author, about, notes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <p>{about}</p>
      <div>{notes ? <Link to={`/books/${notes}`} /> : null}</div>
    </div>
  )
}

export default Book
