import gameEngine from "@recoil/gameMapAtom";
import gameMapAtom from "@recoil/gameMapAtom";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
// import { useRecoilValue } from "recoil";

interface GameLayerProps {
  id: string;
}
const GameLayer: React.FC<GameLayerProps> = observer(({ id }) => {
  // const gameEngine = useRecoilValue(gameMapAtom);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    // function handleResize() {
    //   if (!canvas) return;
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // }
    if (canvas) {
      // window.addEventListener("resize", handleResize);
      // handleResize();
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      gameEngine.ui.addLayer({ id, canvas, ctx });
    }
  }, [id]);

  return <canvas id={id} ref={ref} />;
});

export default GameLayer;
