import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import FadeIn from "../atom/FadeIn";
import MenuButton from "../atom/MenuButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FadeOut from "../atom/FadeOut";

interface IntroProps {}
const Intro: React.FC<IntroProps> = () => {
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  function handleStart() {
    setFade(false);
    setTimeout(() => {
      navigate("_main");
    }, 3000);
  }

  return (
    <Stack height="100%" justifyContent="center" alignItems="center">
      {/* 배경 이미지 설정: 2D 게임의 인트로 느낌을 살리기 위해 전체 배경 적용 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        sx={{
          backgroundImage: 'url("/images/bg/intro.jpg")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      {/* 페이드인 애니메이션 추가 */}
      {fade ? <FadeIn /> : <FadeOut />}

      <Paper
        elevation={5}
        sx={{
          backdropFilter: "blur(5px)", // 배경을 블러 처리하여 가독성을 높임
          backgroundColor: "#fdf4e3cc", // 따뜻한 베이지 톤으로 변경하여 부드러운 느낌 추가
          borderRadius: "12px", // 모서리를 둥글게 하여 부드러운 느낌 추가
          padding: "2rem", // 전체적인 여백 조정
        }}
      >
        {/* 타이틀 스타일 수정: 더 밝고 레트로한 느낌 강조 */}
        <Stack px={10} py={5} alignItems="center" gap={3}>
          <Typography
            fontSize={(theme) => theme.typography.pxToRem(48)}
            sx={{
              textShadow:
                "0px 2px #ffefd5, 2px 0px #ffefd5, -2px 0px #ffefd5, 0px -2px #ffefd5, 3px 3px #a67c52", // 색상 변경: 더 따뜻하고 부드러운 톤
              color: "#3b2f2f", // 다소 부드러운 브라운 톤으로 변경
              fontWeight: "bold",
              letterSpacing: "2px", // 글자 간격 조정
            }}
          >
            시작한 김에 게임처럼 만들어보려 합니다
          </Typography>

          {/* 버튼 디자인 변경: 2D 게임 스타일 적용 */}
          <MenuButton onClick={handleStart}>시작하기</MenuButton>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Intro;
