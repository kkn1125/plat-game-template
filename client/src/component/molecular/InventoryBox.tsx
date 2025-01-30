import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import gameEngine from "@recoil/gameMapAtom";
// import gameMapAtom from "@recoil/gameMapAtom";
import { observer } from "mobx-react";

interface InventoryBoxProps {
  closeInventory: () => void;
}
const InventoryBox: React.FC<InventoryBoxProps> = observer(
  ({ closeInventory }) => {
    const inventory = gameEngine.controlUnit?.inventory;

    function handleEquipItem(x: number, y: number) {
      gameEngine.controlUnit?.inventory.equipItem(x, y);
    }

    if (!inventory) return <></>;
    return (
      <Stack
        component={Paper}
        p={3}
        position="fixed"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Table sx={{ minWidth: "fit-content", boxSizing: "border-box" }}>
          <TableBody>
            {inventory.slots.map((row, y) => {
              return (
                <TableRow key={y}>
                  {row.map((item, x) => {
                    return (
                      <TableCell
                        key={x}
                        onClick={() => handleEquipItem(x, y)}
                        sx={{
                          textAlign: "center",
                          p: 1,
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          ["&:hover"]: {
                            boxShadow:
                              "inset 0 0 0 99999999px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        {item ? item.name : "empty"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Stack direction="row" mt={1}>
          <Typography>💰 {inventory.unit.gold} Gold</Typography>
        </Stack>
      </Stack>
    );
  }
);

export default InventoryBox;
