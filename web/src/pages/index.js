import React, { useEffect, useState } from "react"
import Journal from "../components/journal"
import Layout from "../components/layout"

import axios from "axios"
import * as styles from "../styles/index.module.scss"

const journals = {
  orgo: [
    {
      name: "Journal of Medicinal Chemistry",
      url: "https://pubs.acs.org/journal/jmcmar",
      _id: "journal_med_chem",
    },
    {
      name: "Tetrahedron",
      url: "https://www.sciencedirect.com/journal/tetrahedron",
      _id: "tetrahedron",
    },
  ],
  cancer: [],
  ml: [
    {
      name: "International Conference on Learning Representations",
      url: "https://iclr.cc/",
      _id: "iclr",
    },
    {
      name: "International Conference on Machine Learning",
      url: "https://icml.cc/",
      _id: "icml",
    },
    {
      name: "Neural Information Processing Systems (NeurIPS)",
      url: "https://nips.cc/",
      _id: "neurips",
    },
  ],
}

const Papers = ({ papers }) => {
  return (
    <div>
      <ul>
        {papers.map(({ title, url }) => (
          <li key="title">
            <a target="_blank" rel="noreferrer" href={url}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Journals = ({ journals, impactFactor }) => {
  return (
    <div>
      <ul>
        {journals.map(({ name, url, _id }) => (
          <li>
            <Journal
              key={_id}
              name={name}
              url={url}
              impactFactor={impactFactor[_id]}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const IndexPage = () => {
  const [impactFactor, setImpactFactor] = useState({})
  const [papers, setPapers] = useState([])

  useEffect(() => {
    ;(async () => {
      console.log("impact")
      try {
        const data = await axios.get("http://api.mattfeng.tech/impact")
        setImpactFactor(data["data"] ? data["data"] : {})
      } catch {}
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      console.log("papers")
      try {
        const papers = await axios.get("http://api.mattfeng.tech/papers")
        setPapers(papers["data"])
      } catch {}
    })()
  }, [])

  return (
    <Layout>
      <div className={styles.indexContainer}>
        <h1>Reading group</h1>

        <h2>Journals</h2>

        <h3>Organic Chemistry</h3>
        <Journals journals={journals["orgo"]} impactFactor={impactFactor} />

        <h3>Cancer</h3>
        <Journals journals={journals["cancer"]} impactFactor={impactFactor} />

        <h3>Machine Learning</h3>
        <Journals journals={journals["ml"]} impactFactor={impactFactor} />

        <h2>Papers</h2>

        <Papers papers={papers} />
      </div>
    </Layout>
  )
}

export default IndexPage
