import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Menu = () => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query SidebarItemsQuery {
      allFile(sort: { order: ASC, fields: [fields___title] }) {
        edges {
          node {
            fields {
              slug
              title
            }
          }
        }
      }
    }
  `);

  return (
    <ul>
      {edges.map(
        ({
          node: {
            fields: { slug, title },
          },
        }) => (
          <li key={slug} className="menuItem">
            <Link to={slug} target="viewport" activeClassName="active">
              {title}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export { Menu };
