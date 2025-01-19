import gameMapAtom from "@recoil/gameMapAtom";
import { useRecoilValue } from "recoil";
import GameView from "../organism/GameView";
import GameLayer from "../atom/GameLayer";

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  return <GameView layers={[<GameLayer id="layer-map" />]} />;
};

export default Main;
