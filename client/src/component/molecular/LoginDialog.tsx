import { FormHelperText, Stack, TextField } from "@mui/material";
import gameEngine from "@recoil/gameMapAtom";
import { GameMode } from "@variable/constant";
import { useEffect, useRef, useState } from "react";
import MenuButton from "../atom/MenuButton";

interface LoginDialogProps {
  isMultiModeConnected: boolean;
  setMultiMode: (value: boolean) => void;
}
const LoginDialog: React.FC<LoginDialogProps> = ({
  isMultiModeConnected,
  setMultiMode,
}) => {
  useEffect(() => {
    gameEngine.socket.on("signup", (socket, compressMessage) => {
      if (compressMessage.result) {
        alert("회원가입 성공");
        setUserInfo({ id: "", pw: "" });
      } else {
        alert("이미 존재하는 아이디입니다.");
      }
    });
  }, []);

  // const idRef = useRef<HTMLInputElement>(null);
  // const pwRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });

  function requestLogin() {
    if (!userInfo.id || !userInfo.pw) return;
    gameEngine.socket.send({ type: "login", id: userInfo.id, pw: userInfo.pw });
  }

  function requestSignup() {
    if (!userInfo.id || !userInfo.pw) return;
    gameEngine.socket.send({
      type: "signup",
      id: userInfo.id,
      pw: userInfo.pw,
    });
  }

  return (
    <Stack py={5} px={10} gap={2}>
      <Stack gap={2}>
        <TextField
          value={userInfo.id}
          onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
          size="small"
          placeholder="ID"
          disabled={!isMultiModeConnected}
        />
        <TextField
          value={userInfo.pw}
          onChange={(e) => setUserInfo({ ...userInfo, pw: e.target.value })}
          size="small"
          placeholder="PW"
          type="password"
          disabled={!isMultiModeConnected}
        />
        {!isMultiModeConnected && (
          <FormHelperText error>
            서버가 닫혀있습니다. 싱글플레이를 이용해주세요!
          </FormHelperText>
        )}
      </Stack>
      <Stack gap={2}>
        <MenuButton variant="contained" onClick={requestLogin}>
          로그인
        </MenuButton>
        <MenuButton variant="contained" onClick={requestSignup}>
          회원가입
        </MenuButton>
        <MenuButton
          color="inherit"
          variant="contained"
          onClick={() => {
            gameEngine.gameMode = GameMode.Single;
            setMultiMode(false);
            gameEngine.socket.destroy();
          }}
        >
          돌아가기
        </MenuButton>
      </Stack>
    </Stack>
  );
};

export default LoginDialog;
