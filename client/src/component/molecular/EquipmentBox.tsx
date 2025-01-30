import Item from "@model/unit/object/Item";
import {
  Button,
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
import { observer } from "mobx-react";
import { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import Stat from "@model/option/Stat";

interface EquipmentBoxProps {
  closeEquipment: () => void;
}
const EquipmentBox: React.FC<EquipmentBoxProps> = observer(
  ({ closeEquipment }) => {
    const controlUnit = gameEngine.controlUnit;

    if (!controlUnit) return <></>;

    const equipment = controlUnit.equipment;

    function handleUnEquipItem(item: Item | null) {
      if (!item || !equipment) return;
      equipment.unequip(item);
    }

    function handleAddStat(
      type: keyof Pick<Stat, "str" | "dex" | "int" | "luk">
    ) {
      controlUnit?.stat.statUp(type, 1);
    }

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
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  maxWidth: 40,
                  cursor: "pointer",
                  ["&:hover"]: {
                    boxShadow: "inset 0 0 0 99999999px rgba(0, 0, 0, 0.1)",
                  },
                },
              }}
            >
              <TableRow>
                <TableCell />
                <TableCell onClick={() => handleUnEquipItem(equipment.head)}>
                  {equipment.head?.name ?? "head"}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell onClick={() => handleUnEquipItem(equipment.hand)}>
                  {equipment.hand?.name ?? "hand"}
                </TableCell>
                <TableCell onClick={() => handleUnEquipItem(equipment.body)}>
                  {equipment.body?.name ?? "body"}
                </TableCell>
                <TableCell onClick={() => handleUnEquipItem(equipment.weapon)}>
                  {equipment.weapon?.name ?? "weapon"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell onClick={() => handleUnEquipItem(equipment.pants)}>
                  {equipment.pants?.name ?? "pants"}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell onClick={() => handleUnEquipItem(equipment.foot)}>
                  {equipment.foot?.name ?? "foot"}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
          <Divider flexItem orientation="vertical" />
          <Stack gap={1} flex={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="nowrap"
            >
              <Typography fontSize={12} whiteSpace="nowrap">
                Str: {controlUnit.stat.str}
                {equipment.totalStr > 0 ? `(+${equipment.totalStr})` : ""}
              </Typography>

              <Button
                disabled={controlUnit.stat.statPoint === 0}
                size="small"
                variant="contained"
                sx={{ p: 0, minWidth: "auto" }}
                onClick={() => handleAddStat("str")}
              >
                <AddIcon />
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="nowrap"
            >
              <Typography fontSize={12} whiteSpace="nowrap">
                Dex: {controlUnit.stat.dex}
                {equipment.totalDex > 0 ? `(+${equipment.totalDex})` : ""}
              </Typography>

              <Button
                disabled={controlUnit.stat.statPoint === 0}
                size="small"
                variant="contained"
                sx={{ p: 0, minWidth: "auto" }}
                onClick={() => handleAddStat("dex")}
              >
                <AddIcon />
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="nowrap"
            >
              <Typography fontSize={12} whiteSpace="nowrap">
                Int: {controlUnit.stat.int}
                {equipment.totalInt > 0 ? `(+${equipment.totalInt})` : ""}
              </Typography>

              <Button
                disabled={controlUnit.stat.statPoint === 0}
                size="small"
                variant="contained"
                sx={{ p: 0, minWidth: "auto" }}
                onClick={() => handleAddStat("int")}
              >
                <AddIcon />
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="nowrap"
            >
              <Typography fontSize={12} whiteSpace="nowrap">
                Luck: {controlUnit.stat.luk}
                {equipment.totalLuk > 0 ? `(+${equipment.totalLuk})` : ""}
              </Typography>

              <Button
                disabled={controlUnit.stat.statPoint === 0}
                size="small"
                variant="contained"
                sx={{ p: 0, minWidth: "auto" }}
                onClick={() => handleAddStat("luk")}
              >
                <AddIcon />
              </Button>
            </Stack>
            <Divider flexItem />
            <Typography fontSize={12}>
              Stat Point: {controlUnit.stat.statPoint}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

export default EquipmentBox;
