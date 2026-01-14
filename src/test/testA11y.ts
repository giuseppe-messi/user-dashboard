import { render } from "@testing-library/react";
import { axe } from "jest-axe";

export const testA11y = async (ui: React.ReactElement): Promise<unknown> => {
  render(ui);
  return await axe(document.body);
};
