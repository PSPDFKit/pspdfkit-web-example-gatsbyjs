import * as React from "react";
import { graphql } from "gatsby";
import { withLayout } from "../components/Layout";

const Viewport = (props) => {
  const { title } = props.data.allFile.edges[0].node.fields;

  const containerRef = React.useRef();

  React.useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      let PSPDFKit;
      const pspdfkitScript = document.createElement("script");

      pspdfkitScript.onload = () => {
        PSPDFKit = window.PSPDFKit;
        PSPDFKit.load({
          container: containerElement,
          document: `../assets/${title}`,
        });
      };
      // Gatsby needs client-side only packages need to be imported asynchronously
      // https://www.gatsbyjs.com/docs/using-client-side-only-packages/
      pspdfkitScript.src =
        "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.0.0/nutrient-viewer.js";
      document.head.appendChild(pspdfkitScript);

      return () => {
        PSPDFKit && PSPDFKit.unload(containerElement);
        pspdfkitScript.remove();
      };
    }
    // We only want this callback to run once, hence the empty array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="viewport" ref={containerRef} />;
};

export default withLayout(Viewport);

export const pageQuery = graphql`
  query FilesQuery($slug: String) {
    allFile(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          fields {
            title
          }
        }
      }
    }
  }
`;
