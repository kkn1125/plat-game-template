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

  useEffect(() => {
    next();
    function handleNext() {
      if (pressSpace.current) return;
      pressSpace.current = true;
      next();
    }
    function handleNextUp() {
      if (!pressSpace.current) return;
      pressSpace.current = false;
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
      p={3}
      position="fixed"
      bottom={15}
      left="50%"
      sx={{
        transform: "translateX(-50%)",
      }}
    >
      <Typography>{current}</Typography>
      <Button onClick={next}>다음</Button>
    </Stack>
  );
};

export default QuestionBox;
