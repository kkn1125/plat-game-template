import Question from "@model/option/Question";
import QuestNpc from "@model/unit/npc/QuestNpc";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

interface QuestionProps {
  playerQuests: Map<string, QuestRealMap> | null;
  question: Question;
  npcQuest: QuestNpc | null;
  openQuest: () => void;
  closeConversation: () => void;
}
const QuestionBox: React.FC<QuestionProps> = ({
  playerQuests = null,
  question,
  npcQuest,
  openQuest,
  closeConversation,
}) => {
  const [telling, setTelling] = useState(question.getNext());
  const [current, setCurrent] = useState("");
  const pressSpace = useRef(true);

  const next = () => {
    const content = telling.next();

    if (content.done) {
      const quests = Array.from(playerQuests?.values() ?? []);
      const quest = quests.find((quest) => {
        return npcQuest?.questionHistory.some((q) => q.name === quest.quest.id);
      });
      if (quest && quest.status !== "completed") {
        quest.status = "completed";
        quest.process = 100;
      }

      closeConversation();
    } else {
      setCurrent(() => content.value || "");
    }
  };

  useEffect(() => {
    setTelling(question.getNext());
  }, [question]);

  const cancel = useCallback(() => {
    closeConversation();
    setCurrent(() => "");
  }, [closeConversation]);

  useEffect(() => {
    next();
    function handleNext(e: KeyboardEvent) {
      if (e.key === " ") {
        if (pressSpace.current) return;
        pressSpace.current = true;
        next();
      }
      if (e.key === "Escape") {
        cancel();
      }
    }
    function handleNextUp(e: KeyboardEvent) {
      if (e.key === " ") {
        if (!pressSpace.current) return;
        pressSpace.current = false;
      }
    }
    window.addEventListener("keydown", handleNext);
    window.addEventListener("keyup", handleNextUp);
    return () => {
      window.removeEventListener("keydown", handleNext);
      window.removeEventListener("keyup", handleNextUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      component={Paper}
      borderRadius={0}
      p={3}
      position="fixed"
      bottom="10%"
      left="50%"
      minWidth="80%"
      width="80vmin"
      maxWidth="90%"
      sx={{
        transform: "translateX(-50%)",
        wordBreak: "auto-phrase",
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight={700}>
        {question.npc.name}
      </Typography>
      <Typography variant="body1">{current}</Typography>
      <Stack direction="row" gap={1} justifyContent="flex-end">
        {npcQuest && npcQuest.quests.length > 0 && (
          <Button variant="outlined" onClick={openQuest}>
            쿼스트
          </Button>
        )}
        <Button variant="outlined" onClick={cancel}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (question.scripts.indexOf(current) === 0) {
              next();
            }
            next();
          }}
        >
          {question.scripts.indexOf(current) === question.scripts.length - 1
            ? "확인"
            : "다음"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default QuestionBox;
