import React from "react"
import * as styles from "../styles/layout.module.scss"

const Layout = ({ children }) => {
  return <div className={styles.layoutContainer}>{children}</div>
}

export default Layout
