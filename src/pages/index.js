import * as React from "react";
import { withLayout } from "../components/Layout";

const Home = () => (
  <div className="centered">
    <p>
      Integration of <a href="https://pspdfkit.com/try">PSPDFKit for Web</a> in
      GatsbyJS.
    </p>
    <p>Navigate between the different documents using the menu above</p>
  </div>
);

export default withLayout(Home);
