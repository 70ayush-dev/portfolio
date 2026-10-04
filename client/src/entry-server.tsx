import { renderToString } from "react-dom/server";
import App from "./App";
export { identity, projects, faqs } from "./data/portfolio";
export function render(path: string) {
  return renderToString(<App path={path} />);
}
