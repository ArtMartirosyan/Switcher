import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const LoaderExampleLoader = () => (
  <Segment style={{ height: "90vh" }}>
    <Dimmer active>
      <Loader size="huge" />
    </Dimmer>
  </Segment>
);

export default LoaderExampleLoader;
