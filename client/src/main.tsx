import "@assets/main.css";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import AppRoot from "./router/AppRoot";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <RecoilRoot>
      <BrowserRouter>
        <AppRoot />
      </BrowserRouter>
    </RecoilRoot>
    {/* </StrictMode> */}
  </>
);
