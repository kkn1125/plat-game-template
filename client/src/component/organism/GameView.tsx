import Equipment from "@model/option/Equipment";
import Inventory from "@model/option/Inventory";
import Question from "@model/option/Question";
import { Npc } from "@model/unit";
import { Paper } from "@mui/material";
import gameEngine from "@recoil/gameMapAtom";
import { GameMode, GameState, QuestionState } from "@variable/constant";
import { observer } from "mobx-react";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import FadeIn from "../atom/FadeIn";
import GameLayer from "../atom/GameLayer";
import QuestionBox from "../atom/Question";
import EquipmentBox from "../molecular/EquipmentBox";
import InventoryBox from "../molecular/InventoryBox";
import MenuDialog from "../molecular/MenuDialog";

interface GameViewProps {
  // layers: React.ReactElement[];
}
const GameView: React.FC<GameViewProps> = observer(() => {
  // const gameEngine = useRecoilValue(gameMapAtom);
  const [fade, setFade] = useState(true);
  const [layers, setLayers] = useState<string[]>([]);
  const [multiMode, setMultiMode] = useState(false);
  const [isMultiModeConnected, setIsMultiModeConnected] = useState(false);
  const pressSpace = useRef(false);
  const pressEquipment = useRef(false);
  const pressInventory = useRef(false);
  const endConversation = useRef(() => {});
  // const endInventory = useRef(() => {});
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const addLayer = (id: string) => {
    setLayers((prev) => [...prev, id]);
  };

  useLayoutEffect(() => {
    addLayer("layer-map");
    addLayer("layer-unit");
    addLayer("layer-portal");
    addLayer("layer-map-object");
    addLayer("layer-unit-label");
    addLayer("layer-minimap");

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
        case "m": {
          const controlUnit = gameEngine.controlUnit;
          if (!controlUnit) return;
          gameEngine.renderer.useMinimap = !gameEngine.renderer.useMinimap;
          break;
        }
        case "e": {
          if (pressEquipment.current) return;
          const controlUnit = gameEngine.controlUnit;
          if (!controlUnit) return;
          setEquipment((prev) => (prev ? null : controlUnit.equipment));

          pressEquipment.current = true;
          break;
        }
      }
    },
    [inventory, equipment]
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
      case "e":
        if (!pressEquipment.current) return;
        pressEquipment.current = false;
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
  function closeEquipment() {
    setEquipment(() => null);
  }

  function requestLogin() {
    if (idRef.current?.value && pwRef.current?.value) {
      gameEngine.ui.login(GameMode.Multiple, {
        id: idRef.current?.value,
        pw: pwRef.current?.value,
      });
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  }

  return (
    <div>
      {fade && <FadeIn />}
      {layers.map((id, i) => (
        <GameLayer key={id + i} id={id} />
      ))}
      {!gameEngine.controlUnit && (
        <Paper
          elevation={5}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backdropFilter: "blur(5px)", // 배경을 블러 처리하여 가독성을 높임
            backgroundColor: "#fdf4e3cc", // 따뜻한 베이지 톤으로 변경하여 부드러운 느낌 추가
            borderRadius: "12px", // 모서리를 둥글게 하여 부드러운 느낌 추가
            padding: "2rem", // 전체적인 여백 조정
          }}
        >
          <MenuDialog />
        </Paper>
      )}
      {equipment && <EquipmentBox closeEquipment={closeEquipment} />}
      {inventory && <InventoryBox closeInventory={closeInventory} />}
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
