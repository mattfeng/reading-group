import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"

import * as styles from "../styles/summary.module.scss"
import Layout from "../components/layout"

require(`katex/dist/katex.min.css`)

const components = {
  Link,
}

const Summary = ({ children }) => (
  <Layout>
    <div className={styles.summaryContainer}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  </Layout>
)

export default Summary
