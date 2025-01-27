import Inventory from "@model/option/Inventory";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";

interface InventoryBoxProps {
  inventory: Inventory;
  closeInventory: () => void;
}
const InventoryBox: React.FC<InventoryBoxProps> = observer(
  ({ inventory, closeInventory }) => {
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
                        sx={{
                          textAlign: "center",
                          p: 1,
                          width: "40px",
                          height: "40px",
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
