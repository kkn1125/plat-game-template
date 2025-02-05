import { keyframes, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface FadeOutProps {}
const FadeOut: React.FC<FadeOutProps> = () => {
  const [show, setShow] = useState(true);
  const fadeOut = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
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
          animation: `${fadeOut} 2s 1s both`,
        }}
      />
    )
  );
};

export default FadeOut;
