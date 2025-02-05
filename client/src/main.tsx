import "@assets/main.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ThemeModeProvider from "./provider/ThemeModeProvider";
import AppRoot from "./router/AppRoot";

const theme = createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <RecoilRoot>
      <BrowserRouter>
        <ThemeModeProvider>
          <AppRoot />
        </ThemeModeProvider>
      </BrowserRouter>
    </RecoilRoot>
    {/* </StrictMode> */}
  </>
);
