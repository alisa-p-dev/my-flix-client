import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import Container from "react-bootstrap/Container";

const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <MainView />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
