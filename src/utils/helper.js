import slugify from "slugify"
import cookie from "./cookie"
import api from "../utils/api"
import highlighter from "../utils/highlighter"

/**
 * Add syntax highlighting to code blocks wrapped in pre tags
 */
const highlightCode = () => {
  const codes = document.querySelectorAll("pre > code")
  highlighter.highlight(codes)
}

// grab all the headings in a post and build a table of contents
const buildTableOfContents = () => {
  // get all headings from #content
  const headings = document
    .getElementById("content")
    .querySelectorAll("h2, h3, h4, h5, h6")

  // get the element we are going to fill with html
  const tableOfContentsDOM = document
    .getElementById("table-of-contents")
    .querySelector("ul")

  let tableOfContentsList = ""

  // loop through the headings
  for (let key in headings) {
    // filter objects
    if (typeof headings[key] === "object") {
      // get current heading
      const heading = headings[key]

      // make slug from current heading
      const slug = makeSlug(heading.textContent)

      // create a link to the header
      const link = `<a href="#${slug}">${heading.textContent}</a>`

      // assign the slug used in the link as the headers id
      heading.id = slug

      // get current heading level
      const thisHeadingLevel = getHeadingLevel(heading)

      // get next heading level
      const nextHeadingLevel = getHeadingLevel(
        headings[String(parseInt(key) + 1)]
      )

      if (thisHeadingLevel < nextHeadingLevel) {
        // if next header is bigger, create list item and open ul
        tableOfContentsList += `<li>${link}</li><ul>`
      } else if (thisHeadingLevel > nextHeadingLevel) {
        // after adding the current link, we calculate the range between the current
        // and next heading level (e.g jumping from a h4 to h2 (4 - 2 = 2)) and repeat
        // "</ul>" for the range (close up all the open lists)
        tableOfContentsList += `<li>${link}</li>${"</ul>".repeat(
          thisHeadingLevel - nextHeadingLevel
        )}`
      } else {
        // Otherwise its just a list item
        tableOfContentsList += `<li>${link}</li>`
      }
    }
  }

  // add html to DOM
  tableOfContentsDOM.innerHTML = tableOfContentsList
}

// take a string and slugify it into url friendly slugs
export const makeSlug = string =>
  slugify(string, { remove: /[*+~.()'"!:@;]/g })
    .toLowerCase()
    .replace("_", "-")

// extract heading level from nodename (H1 = 1, H6 = 6)
const getHeadingLevel = heading => (heading ? heading.nodeName.substr(1) : null)

const getPostClicks = async postID => {
  // Get the users clicked posts from cookie
  const clickedPosts = cookie.get("clickedPosts")
    ? JSON.parse(cookie.get("clickedPosts"))
    : 0

  // if clickedPosts doesnt include this post ID - set at 0
  return !clickedPosts[`${postID}`] ? 0 : clickedPosts[`${postID}`]
}

const getPostHearts = async postID => {
  const post = await api.getPost(postID)
  return post.meta.hearts
}

export default {
  highlightCode,
  buildTableOfContents,
  getPostClicks,
  getPostHearts,
}
