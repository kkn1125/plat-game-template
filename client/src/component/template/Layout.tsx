import { Outlet } from "react-router-dom";

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
