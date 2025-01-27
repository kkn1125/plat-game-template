import {
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import gameEngine from "@recoil/gameMapAtom";

interface EquipmentBoxProps {
  closeEquipment: () => void;
}
const EquipmentBox: React.FC<EquipmentBoxProps> = ({ closeEquipment }) => {
  const controlUnit = gameEngine.controlUnit;

  if (!controlUnit) return <></>;

  const equipment = controlUnit.equipment;

  if (!equipment) return <></>;

  return (
    <Stack
      component={Paper}
      p={3}
      position="fixed"
      top="50%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      <Stack direction="row" gap={2}>
        <Table>
          <TableBody
            sx={{
              td: {
                textAlign: "center",
                p: 1,
                width: "40px",
                height: "40px",
              },
            }}
          >
            <TableRow>
              <TableCell />
              <TableCell>{equipment.head?.name ?? "head"}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell>{equipment.hand?.name ?? "hand"}</TableCell>
              <TableCell>{equipment.body?.name ?? "body"}</TableCell>
              <TableCell>{equipment.weapon?.name ?? "weapon"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>{equipment.pants?.name ?? "pants"}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>{equipment.foot?.name ?? "foot"}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
        <Divider flexItem orientation="vertical" />
        <Stack minWidth={100} gap={1} flex={1}>
          <Stack direction="row" gap={2}>
            <Typography>Str: {controlUnit.stat.str}</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Typography>Dex: {controlUnit.stat.dex}</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Typography>Int: {controlUnit.stat.int}</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Typography>Luck: {controlUnit.stat.luk}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EquipmentBox;
