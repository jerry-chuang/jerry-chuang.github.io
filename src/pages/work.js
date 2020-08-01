import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"

const WorkTitle = styled("h1")`
  margin-bottom: 1em;
`

const Work = ({ projects, meta }) => (
  <>
    <Helmet
      title={`Work | Prist, Gatsby & Prismic Starter`}
      titleTemplate={`%s | Work | Prist, Gatsby & Prismic Starter`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: `Work | Prist, Gatsby & Prismic Starter`,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat(meta)}
    />
    <Layout>
      <WorkTitle>Projects</WorkTitle>
      <>
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            title={project.node.project_title}
            stacks={project.node.project_stacks}
            description={project.node.project_preview_description}
            thumbnail={project.node.project_preview_thumbnail}
            uid={project.node._meta.uid}
          />
        ))}
      </>
    </Layout>
  </>
)

export default ({ data }) => {
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata
  if (!projects) return null

  return <Work projects={projects} meta={meta} />
}

Work.propTypes = {
  projects: PropTypes.array.isRequired,
}

export const query = graphql`
  {
    prismic {
      allProjects(sortBy:project_post_date_DESC) {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_stacks {
              project_stack
            }
            github_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            demo_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`