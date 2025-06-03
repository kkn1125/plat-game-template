import { Stack } from "@mui/material";
import gameEngine from "@recoil/gameMapAtom";
import { GameMode } from "@variable/constant";
import Socket from "@websocket/Socket";
import { useEffect, useState } from "react";
import MenuButton from "../atom/MenuButton";
import LoginDialog from "./LoginDialog";

interface MenuDialogProps {}
const MenuDialog: React.FC<MenuDialogProps> = () => {
  const [multiMode, setMultiMode] = useState(false);
  const [isMultiModeConnected, setIsMultiModeConnected] = useState(false);

  useEffect(() => {
    if (gameEngine.socket?.socket?.readyState !== 1) {
      setIsMultiModeConnected(false);
    }
  }, [gameEngine.socket?.socket?.readyState]);

  if (multiMode) {
    return (
      <LoginDialog
        isMultiModeConnected={isMultiModeConnected}
        setMultiMode={setMultiMode}
      />
    );
  }

  return (
    <Stack py={5} px={10} gap={2}>
      <MenuButton
        variant="contained"
        onClick={() => {
          gameEngine.ui.login("Test");
          // setTimeout(() => {
          //   if (gameEngine.controlUnit) {
          //     gameEngine.controlUnit.gold += 1000;
          //     console.log(gameEngine.controlUnit.gold);
          //   }
          // }, 3000);
          // setInterval(() => {
          //   gameEngine.controlUnit?.levelUp();
          // }, 2000);
        }}
      >
        테스트
      </MenuButton>
      <MenuButton
        variant="contained"
        onClick={() => gameEngine.ui.login("Single")}
      >
        싱글플레이
      </MenuButton>
      <MenuButton
        variant="contained"
        onClick={() => {
          gameEngine.gameMode = GameMode.Multiple;
          setMultiMode(true);
          const socket = new Socket(gameEngine);
          gameEngine.loadSocket(socket);
          socket.emitOpenResolver?.then(setIsMultiModeConnected);
        }}
      >
        멀티플레이
      </MenuButton>
    </Stack>
  );
};

export default MenuDialog;
