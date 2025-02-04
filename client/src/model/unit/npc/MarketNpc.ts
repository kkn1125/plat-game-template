import Market from "@model/option/Market";
import { Npc } from "..";
import UseMarket from "../implement/UseMarket";

export default class MarketNpc extends Npc implements UseMarket {
  market: Market = new Market();
}
