import { render } from "@react-email/render";
import React from "react";

export const emailTemplate = async (ReactComponent: any, props = {}) => {
  return await render(React.createElement(ReactComponent, props));
};
