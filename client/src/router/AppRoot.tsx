import Main from "@/component/page/Main";
import Layout from "@/component/template/Layout";
import { Route, Routes } from "react-router-dom";
import Intro from "../component/page/Intro";
import Settings from "@/component/page/Settings";
import { path } from "@variable/variable";

interface AppRootProps {}
const AppRoot: React.FC<AppRootProps> = () => {
  return (
    <Routes>
      <Route path={path} element={<Layout />}>
        <Route index element={<Intro />} />
        <Route path="settings" element={<Settings />} />
        <Route path="main" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default AppRoot;
