import { Paper, Stack, Typography } from "@mui/material";
import QuestItem from "../atom/QuestItem";

interface QuestBoxProps {
  quests: Map<string, QuestRealMap>;
  closeQuest: () => void;
}

const QuestBox: React.FC<QuestBoxProps> = ({ quests, closeQuest }) => {
  // console.log("🚀 ~ quests:", quests);
  // console.log("🚀 ~ quests:", Object.keys(quests));
  // console.log("🚀 ~ quests:", Object.entries(quests));
  // console.log("🚀 ~ quests:", Object.values(quests));
  return (
    <Stack
      component={Paper}
      p={3}
      position="fixed"
      top="50%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      {quests &&
        Array.from(quests.values()).map((quest) => (
          <QuestItem
            key={quest.quest.id}
            quest={quest.quest}
            status={quest.status}
            process={quest.process}
          />
        ))}
      {(quests === null || quests.size === 0) && (
        <Typography variant="body1">퀘스트가 없습니다.</Typography>
      )}
    </Stack>
  );
};

export default QuestBox;
