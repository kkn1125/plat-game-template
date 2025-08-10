import Quest from "@model/option/Quest";
import QuestNpc from "@model/unit/npc/QuestNpc";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface QuestWindowProps {
  npcQuest: QuestNpc;
  playerQuests: Map<string, QuestRealMap> | null;
  acceptQuest: (quest: Quest) => void;
  completeQuest: (quest: Quest) => void;
  closeQuest: () => void;
  closeNpcQuest: () => void;
  closeQuestWindow: () => void;
}
const QuestWindow: React.FC<QuestWindowProps> = ({
  npcQuest,
  playerQuests,
  acceptQuest,
  completeQuest,
  closeQuest,
  closeNpcQuest,
  closeQuestWindow,
}) => {
  const [detailQuest, setDetailQuest] = useState<Quest | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function setViewDetailQuest(quest: Quest | null) {
    setDetailQuest(quest);
    setIsOpen(true);
  }

  function closeDetailQuest() {
    setDetailQuest(null);
    setIsOpen(false);
  }

  const buttonTextMap = (status: QuestStatus) => {
    switch (status) {
      case "pending":
        return "수락";
      case "accepted":
        return "진행중";
      case "completed":
        return "완료하기";
      case "done":
        return "완료";
      default:
        return "수락";
    }
  };

  const buttonColorMap = (status: QuestStatus) => {
    switch (status) {
      case "pending":
        return "primary";
      case "accepted":
        return "secondary";
      case "completed":
        return "success";
      case "done":
        return "success";
      default:
        return "primary";
    }
  };

  const buttonFeatureMap = (status: QuestStatus, quest: Quest) => {
    console.log("🚀 ~ buttonFeatureMap ~ status:", playerQuests, status, quest);
    switch (status) {
      case "pending":
        return () => acceptQuest(quest);
      case "accepted":
        return () => null;
      case "completed":
        return () => completeQuest(quest);
      case "done":
        return () => null;
      default:
        return () => acceptQuest(quest);
    }
  };

  return (
    <Box>
      <Stack
        component={Paper}
        elevation={5}
        gap={2}
        p={3}
        sx={{
          position: "absolute",
          top: "50%",
          right: isOpen ? "calc(100% - 580px)" : "calc(40%)",
          transform: "translateY(-50%)",
          width: 300,
          height: "60%",
          backgroundColor: "white",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{detailQuest?.getTitle()}</Typography>
          <Button onClick={closeDetailQuest}>닫기</Button>
        </Stack>
        <Divider />
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", overflowY: "auto" }}
        >
          {detailQuest?.content.join(" ")}
        </Typography>
        <Typography variant="body1">Exp: {detailQuest?.reward?.exp}</Typography>
        <Typography variant="body1">
          Gold: {detailQuest?.reward?.gold}
        </Typography>
        {detailQuest?.reward?.item?.name && (
          <Typography variant="body1">
            Item: {detailQuest?.reward?.item?.name}
          </Typography>
        )}
      </Stack>
      <Stack
        component={Paper}
        elevation={5}
        p={3}
        position="fixed"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          minWidth: 500,
          minHeight: 300,
          height: 500,
          maxHeight: "80vh",
          zIndex: 1000,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">퀘스트</Typography>
          <Button onClick={closeQuestWindow}>닫기</Button>
        </Stack>
        <List sx={{ overflowY: "auto", maxHeight: "80vh" }}>
          {npcQuest.quests.map((quest, index) => (
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  width: "100%",
                  gap: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText primary={quest.getTitle()} />
                <Stack direction="row" gap={1} alignItems="center">
                  <ListItemIcon>
                    <Button
                      variant="outlined"
                      onClick={buttonFeatureMap(
                        playerQuests?.get(quest.id)?.status as QuestStatus,
                        quest
                      )}
                      color={buttonColorMap(
                        playerQuests?.get(quest.id)?.status as QuestStatus
                      )}
                    >
                      {buttonTextMap(
                        playerQuests?.get(quest.id)?.status as QuestStatus
                      )}
                    </Button>
                  </ListItemIcon>
                  <ListItemIcon onClick={() => setViewDetailQuest(quest)}>
                    <Button variant="outlined">상세보기</Button>
                  </ListItemIcon>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default QuestWindow;
