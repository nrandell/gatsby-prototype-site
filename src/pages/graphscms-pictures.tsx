import { graphql } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

interface Props {
  data: any;
}

const GraphCmsPictures: React.FC<Props> = ({ data }) => {
  return (
    <ul className="gap-6 grid grid-cols-1 max-w-6xl md:grid-cols-3 mx-auto">
      {data.pictures.nodes.map((picture: any) => {
        return (
          <li key={picture.id} className="bg-white rounded-lg shadow">
            <div
              dangerouslySetInnerHTML={{
                __html: picture.description.html,
              }}
            />
            <div className="flex-1 flex flex-col p-8">
              <Img
                fluid={picture.image.localFile.childImageSharp.fluid}
                fadeIn={false}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GraphCmsPictures;

export const query = graphql`
  query PictureQuery {
    pictures: allGraphCmsPicture {
      nodes {
        id
        description {
          html
        }
        image {
          id
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
