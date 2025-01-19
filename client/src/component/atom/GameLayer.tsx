import { useEffect, useRef } from "react";

interface GameLayerProps {
  id: string;
}
const GameLayer: React.FC<GameLayerProps> = ({ id }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    function handleResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    if (canvas) {
      window.addEventListener("resize", handleResize);
      handleResize();
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 100, 100);
    }
  }, []);
  return <canvas id={id} ref={ref} />;
};

export default GameLayer;
