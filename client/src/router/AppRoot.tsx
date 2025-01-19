import Main from "@/component/page/Main";
import Layout from "@/component/template/Layout";
import { Route, Routes } from "react-router-dom";

interface AppRootProps {}
const AppRoot: React.FC<AppRootProps> = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
};

export default AppRoot;
