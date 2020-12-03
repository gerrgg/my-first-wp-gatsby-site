import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Boop from "../components/boop"

import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"

const TableOfContents = () => {
  const [show, setShow] = useState(false)

  const icon = !show ? faChevronUp : faChevronDown

  return (
    <div id="table-of-contents">
      <h4 className="section-header flex between align-center">
        <span>Table of Contents</span>
        <Boop scale={1.1}>
          <button className="btn close" onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={icon} />
          </button>
        </Boop>
      </h4>
      <ul className={show ? "show" : ""}></ul>
    </div>
  )
}

export default TableOfContents
