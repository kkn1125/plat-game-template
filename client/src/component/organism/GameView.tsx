import { Fragment } from "react/jsx-runtime";

interface GameViewProps {
  layers: React.ReactElement[];
}
const GameView: React.FC<GameViewProps> = ({ layers }) => {
  return (
    <div style={{ position: "relative" }}>
      {layers.map((layer, index) => (
        <Fragment key={index}>{layer}</Fragment>
      ))}
    </div>
  );
};

export default GameView;
