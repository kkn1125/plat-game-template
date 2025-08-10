import { Stack } from "@mui/material";

interface QuestItemProps extends QuestRealMap {}
const QuestItem: React.FC<QuestItemProps> = ({ quest, status, process }) => {
  return (
    <Stack>
      {quest.npc.name} - {quest.title} / {status} / {process}
    </Stack>
  );
};

export default QuestItem;
