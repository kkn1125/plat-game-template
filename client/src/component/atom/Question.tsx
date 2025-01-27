import Question from "@model/option/Question";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

interface QuestionProps {
  question: Question;
  closeConversation: () => void;
}
const QuestionBox: React.FC<QuestionProps> = ({
  question,
  closeConversation,
}) => {
  const telling = question.getNext();
  const [current, setCurrent] = useState("");
  const pressSpace = useRef(true);

  const next = useCallback(() => {
    const content = telling.next();
    if (content.done) {
      closeConversation();
      return;
    }
    setCurrent(() => content.value || "");
  }, []);

  const cancel = useCallback(() => {
    closeConversation();
    setCurrent(() => "");
  }, []);

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
      <Typography variant="h5" gutterBottom>
        {question.npc.name}
      </Typography>
      <Typography variant="body1">{current}</Typography>
      <Stack direction="row" gap={1} justifyContent="flex-end">
        <Button variant="outlined" onClick={cancel}>
          취소
        </Button>
        <Button variant="contained" onClick={next}>
          {question.scripts.indexOf(current) === question.scripts.length - 1
            ? "확인"
            : "다음"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default QuestionBox;
