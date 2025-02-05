import { Button, styled } from "@mui/material";

interface MenuButtonProps {
  children: React.ReactNode;
}
const MenuButton = styled(Button)(
  ({ theme }) => ({
    fontWeight: 700,
    fontSize: "1.5rem",
    textShadow: "2px 2px #fff",
    backgroundColor: "#ffb347", // 부드러운 오렌지 톤으로 변경하여 자연스러운 감성 추가
    border: "4px solid #a67c52", // 테두리 색상을 어두운 브라운으로 변경하여 조화롭게 만듦
    borderRadius: "8px", // 둥근 테두리 적용
    padding: "12px 24px", // 크기 조정
    transition: "transform 0.1s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#ff9a00", // 살짝 더 진한 오렌지 톤
      transform: "scale(1.1)", // 호버 시 확대
      boxShadow: "4px 4px #7a5230", // 그림자 강조
    },
    "&:active": {
      transform: "scale(0.95)", // 클릭 시 눌리는 효과
      boxShadow: "2px 2px #7a5230",
    },
  }),
  { color: "inherit" }
);

export default MenuButton;
