import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/source-sans-3/latin-400.css";
import "@fontsource/source-sans-3/latin-600.css";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const root = document.getElementById("root")!;
const app = <App path={window.location.pathname} />;
const normalize = (path: string) => path.replace(/\/$/, "") || "/";
const page = root.dataset.page;
if (
  root.hasChildNodes() &&
  (page === "/404.html" ||
    (page && normalize(page) === normalize(window.location.pathname)))
)
  hydrateRoot(root, app);
else createRoot(root).render(app);
