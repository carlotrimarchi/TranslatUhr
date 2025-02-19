import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";
import EndState from "./EndState.ts";

export default class PrepositionParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.hour = token;
      this.parser.state = new EndState(this.parser);
    }
  }
}
