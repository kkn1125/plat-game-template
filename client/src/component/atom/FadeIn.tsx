import { keyframes, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface FadeInProps {}
const FadeIn: React.FC<FadeInProps> = () => {
  const [show, setShow] = useState(true);
  const fadeIn = keyframes`
    0%   { opacity: 1; }
    100% { opacity: 0; }
  `;
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);
  return (
    show && (
      <Stack
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        right={0}
        sx={{
          zIndex: 100,
          background: "#000000",
          animation: `${fadeIn} 2s 1s both`,
        }}
      />
    )
  );
};

export default FadeIn;
