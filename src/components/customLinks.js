import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const CustomLinks = ({ show, setShow }) => (
  <div id="custom-links" className="flex center">
    <CustomLink
      link="https://github.com/gerrgg"
      icon={faGithub}
      text="Github"
    />
    <CustomLink
      link="https://github.com/gerrgg/gregbastianelli"
      icon={faCode}
      text="Source"
    />
    <MobileMenuButton show={show} setShow={setShow} />
  </div>
)

const MobileMenuButton = ({ show, setShow }) => (
  <button className="btn mobile-menu" onClick={() => setShow(!show)}>
    <FontAwesomeIcon icon={faBars} style={{ width: 25.5, height: 25.5 }} />
    <span>Menu</span>
  </button>
)

const CustomLink = ({ link, icon, text }) => (
  <a
    href={link}
    rel="noopener"
    target="
  blank"
  >
    <FontAwesomeIcon icon={icon} style={{ width: 25.5, height: 25.5 }} />
    <span>{text}</span>
  </a>
)

export default CustomLinks
