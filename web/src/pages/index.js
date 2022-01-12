import React, { useEffect, useState } from "react"
import Journal from "../components/journal"
import Book from "../components/book"
import Layout from "../components/layout"
import Paper from "../components/paper"

import axios from "axios"
import * as styles from "../styles/index.module.scss"

const Papers = ({ allPapers }) => {
  const makeSections = () => {
    let sections = []

    for (const [topic, values] of Object.entries(allPapers)) {
      const { display, papers } = values
      sections.push(
        <div>
          <h3>{display}</h3>
          <ul>
            {papers?.map(paper => (
              <li key={paper.title}>
                <Paper paper={paper} />
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

const Books = ({ allBooks }) => {
  const makeSections = () => {
    let sections = []

    for (const [topic, values] of Object.entries(allBooks)) {
      const { display, books } = values
      sections.push(
        <div>
          <h3>{display}</h3>
          {books?.map(({ title, url, author, about, notes, year }) => (
            <Book
              title={title}
              url={url}
              author={author}
              about={about}
              notes={notes}
              year={year}
            />
          ))}
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
  const [books, setBooks] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        const data = await axios.get("https://api.mattfeng.tech/impact")
        setImpactFactor(data["data"] ? data["data"] : {})
      } catch {}
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
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

  useEffect(() => {
    ;(async () => {
      try {
        const books = await axios.get("https://api.mattfeng.tech/books")
        setBooks(books["data"])
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
        <Papers allPapers={papers} />

        <h2>Books</h2>
        <Books allBooks={books} />
      </div>
    </Layout>
  )
}

export default IndexPage
