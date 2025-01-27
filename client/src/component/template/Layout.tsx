import { Chip } from "@mui/material";
import { VERSION } from "@variable/variable";
import { Outlet } from "react-router-dom";

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Outlet />
      <Chip
        label={`v.${VERSION}`}
        size="small"
        color="info"
        sx={{ position: "fixed", right: "1%", top: "1%", zIndex: 1500 }}
      />
    </>
  );
};

export default Layout;
