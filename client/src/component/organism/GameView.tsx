import { Button, Paper, Stack, TextField } from "@mui/material";
import gameMapAtom from "@recoil/gameMapAtom";
import { GameMode, GameState, QuestionState } from "@variable/constant";
import { observer } from "mobx-react";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import GameLayer from "../atom/GameLayer";
import { Npc } from "@model/unit";
import Question from "@model/option/Question";
import QuestionBox from "../atom/Question";
import Socket from "@websocket/Socket";
import Inventory from "@model/option/Inventory";
import InventoryBox from "../molecular/InventoryBox";

interface GameViewProps {
  // layers: React.ReactElement[];
}
const GameView: React.FC<GameViewProps> = observer(() => {
  const gameEngine = useRecoilValue(gameMapAtom);
  const [layers, setLayers] = useState<string[]>([]);
  const [multiMode, setMultiMode] = useState(false);
  const pressSpace = useRef(false);
  const pressInventory = useRef(false);
  const endConversation = useRef(() => {});
  const endInventory = useRef(() => {});
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const addLayer = (id: string) => {
    setLayers((prev) => [...prev, id]);
  };

  useLayoutEffect(() => {
    addLayer("layer-map");
    addLayer("layer-unit");
    addLayer("layer-portal");
    addLayer("layer-map-object");
    addLayer("layer-unit-label");

    return () => {
      setLayers([]);
    };
  }, []);

  useEffect(() => {
    if (gameEngine.state === GameState.Prepare) {
      gameEngine.state = GameState.Loading;
      gameEngine.renderer.render();
    }
  }, [gameEngine, gameEngine.state]);

  const handleKeyboardDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;
      switch (key) {
        case " ": {
          if (pressSpace.current) return;
          const controlUnit = gameEngine.controlUnit;
          if (!controlUnit) return;
          const closeUnit = controlUnit.closeUnit as Npc;
          if (closeUnit && closeUnit instanceof Npc) {
            endConversation.current = () => closeUnit.endConversation();
            if (closeUnit.question.state === QuestionState.Idle) {
              const question = closeUnit.startConversation();
              // console.log(question)
              setQuestion(() => question);
              gameEngine.eventManager.joystickEvent.clearMove();
            } else {
              gameEngine.eventManager.emit("conversationNext");
            }
          }
          pressSpace.current = true;
          break;
        }
        case "i": {
          if (pressInventory.current) return;
          const controlUnit = gameEngine.controlUnit;
          if (!controlUnit) return;
          setInventory((prev) => (prev ? null : controlUnit.inventory));

          pressInventory.current = true;
          break;
        }
      }
    },
    [inventory]
  );

  const handleKeyboardUp = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case " ":
        if (!pressSpace.current) return;
        pressSpace.current = false;
        break;
      case "i":
        if (!pressInventory.current) return;
        pressInventory.current = false;
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardDown);
    window.addEventListener("keyup", handleKeyboardUp);
    return () => {
      window.removeEventListener("keydown", handleKeyboardDown);
      window.removeEventListener("keydown", handleKeyboardUp);
    };
  }, []);

  function closeConversation() {
    setQuestion(null);
    endConversation.current();
    endConversation.current = () => {};
  }

  function closeInventory() {
    setInventory(() => null);
  }

  const inventoryValue = useMemo(() => {
    return inventory;
  }, [inventory, gameEngine.controlUnit]);

  return (
    <div>
      {layers.map((id, i) => (
        <GameLayer key={id + i} id={id} />
      ))}
      {!gameEngine.controlUnit && (
        <Stack
          component={Paper}
          p={3}
          gap={2}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {multiMode ? (
            <Stack gap={2}>
              <TextField size="small" placeholder="ID" />
              <TextField size="small" placeholder="PW" type="password" />
            </Stack>
          ) : (
            <Stack gap={2}>
              <Button
                variant="contained"
                onClick={() => {
                  gameEngine.ui.login("Test");
                  // setInterval(() => {
                  //   gameEngine.controlUnit?.levelUp();
                  // }, 2000);
                }}
              >
                테스트
              </Button>
              <Button
                variant="contained"
                onClick={() => gameEngine.ui.login("Single")}
              >
                싱글플레이
              </Button>
            </Stack>
          )}
          {multiMode ? (
            <Stack gap={2}>
              <Button variant="contained">로그인</Button>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  gameEngine.gameMode = GameMode.Single;
                  setMultiMode((prev) => !prev);
                  gameEngine.socket.destroy();
                }}
              >
                돌아가기
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                gameEngine.gameMode = GameMode.Multiple;
                setMultiMode((prev) => !prev);
                const socket = new Socket(gameEngine);
                gameEngine.loadSocket(socket);
              }}
            >
              멀티플레이
            </Button>
          )}
        </Stack>
      )}
      {inventoryValue && (
        <InventoryBox inventory={inventoryValue} closeInventory={closeInventory} />
      )}
      {question && (
        <QuestionBox
          question={question}
          closeConversation={closeConversation}
        />
      )}
    </div>
  );
});

export default memo(GameView);
