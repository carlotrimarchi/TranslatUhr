import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";

export default class EndState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {}
}
