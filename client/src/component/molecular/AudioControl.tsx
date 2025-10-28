import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { IconButton, Paper, Stack, Tooltip } from "@mui/material";
import gameEngine from "@recoil/gameMapAtom";
import { observer } from "mobx-react";
import { FC, useMemo } from "react";

const AudioControl: FC = observer(() => {
  const initialized = useMemo(() => {
    return gameEngine.controlUnit !== null;
  }, [gameEngine.controlUnit]);
  const isPlaing = useMemo(() => {
    return gameEngine.audioManager.isPlaying;
  }, [gameEngine.audioManager.isPlaying]);

  function toggleAudio() {
    if (isPlaing) {
      gameEngine.audioManager.pauseTrack();
    } else {
      gameEngine.audioManager.playCurrentTrack();
    }
  }

  if (!initialized) return null;

  return (
    <Stack
      component={Paper}
      direction="row"
      p={1}
      sx={{
        position: "fixed",
        top: 15,
        left: 15,
        zIndex: 2000,
        backgroundColor: "background.paper",
      }}
    >
      <Tooltip title={isPlaing ? "음소거" : "음소거 해제"}>
        <IconButton color="primary" onClick={toggleAudio}>
          {isPlaing ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
});

export default AudioControl;
