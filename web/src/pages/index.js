import React, { useEffect, useState } from "react"
import Journal from "../components/journal"
import Layout from "../components/layout"
import Paper from "../components/paper"

import axios from "axios"
import * as styles from "../styles/index.module.scss"

const Papers = ({ papers }) => {
  return (
    <div>
      {papers.map(paper => (
        <Paper key={paper.title} paper={paper} />
      ))}
    </div>
  )
}

const Journals = ({ allJournals, impactFactor }) => {
  const makeSections = () => {
    let sections = []

    for (const [topic, values] of Object.entries(allJournals)) {
      const { display, journals } = values
      sections.push(
        <div>
          <h3>{display}</h3>
          <ul>
            {journals?.map(({ name, url, id, about }) => (
              <li key={id}>
                <Journal
                  name={name}
                  url={url}
                  about={about}
                  impactFactor={impactFactor[id]}
                />
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return sections
  }
  const sections = makeSections()

  return <div>{sections}</div>
}

const IndexPage = () => {
  const [impactFactor, setImpactFactor] = useState({})
  const [papers, setPapers] = useState([])
  const [journals, setJournals] = useState({})

  useEffect(() => {
    ;(async () => {
      console.log("impact")
      try {
        const data = await axios.get("https://api.mattfeng.tech/impact")
        setImpactFactor(data["data"] ? data["data"] : {})
      } catch {}
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      console.log("papers")
      try {
        const papers = await axios.get("https://api.mattfeng.tech/papers")
        setPapers(papers["data"])
      } catch {}
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const journals = await axios.get("https://api.mattfeng.tech/journals")
        setJournals(journals["data"])
      } catch {}
    })()
  }, [])

  return (
    <Layout>
      <div className={styles.indexContainer}>
        <h1>Reading group</h1>

        <h2>Journals</h2>
        <Journals allJournals={journals} impactFactor={impactFactor} />

        <h2>Papers</h2>
        <Papers papers={papers} />
      </div>
    </Layout>
  )
}

export default IndexPage
