import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import helper from "../utils/helper"
import TableOfContents from "../components/tableOfContents"

export default function BlogPost({ data }) {
  const post = data.allWpPost ? data.allWpPost.nodes[0] : null

  const featuredImage = post.featuredImage ? post.featuredImage.node : null

  const category = post.categories ? post.categories.nodes[0] : null

  useEffect(() => {
    helper.highlightCode()
    helper.buildTableOfContents()
  })

  return (
    <Layout>
      <SEO title={post.title} />
      <div class="row">
        <div class="col-12 col-md-8">
          <div id="single">
            <BlogPostCategory category={category} />
            <BlogPostTitle title={post.title} />

            {featuredImage ? (
              <img
                src={featuredImage.mediaItemUrl}
                alt={featuredImage.altText}
              />
            ) : null}

            <div
              id="content"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </div>
        <div class="col">
          <TableOfContents />
        </div>
      </div>
    </Layout>
  )
}

const BlogPostTitle = ({ title }) => (
  <h1 className="title section-header">{title}</h1>
)

const BlogPostCategory = ({ category }) => (
  <h4 className="post-category">
    <Link to={category.link}>{category.name}</Link>
  </h4>
)

export const query = graphql`
  query($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        content
        categories {
          nodes {
            name
            link
          }
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`
