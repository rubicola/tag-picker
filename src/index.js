import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
  rootElement
);
