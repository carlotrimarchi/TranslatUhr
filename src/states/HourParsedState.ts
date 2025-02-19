import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";
import UhrParsedState from "./UhrParsedState.ts";

export default class HourParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token === "uhr") {
      this.parser.state = new UhrParsedState(this.parser);
    }
  }
}
