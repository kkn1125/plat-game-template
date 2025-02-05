import Main from "@/component/page/Main";
import Layout from "@/component/template/Layout";
import { Route, Routes } from "react-router-dom";
import Intro from "../component/page/Intro";
import Settings from "@/component/page/Settings";

interface AppRootProps {}
const AppRoot: React.FC<AppRootProps> = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Intro />} />
        <Route path="_settings" element={<Settings />} />
        <Route path="_main" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default AppRoot;
