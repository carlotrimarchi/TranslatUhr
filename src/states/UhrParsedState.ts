import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";
import EndState from "./EndState.ts";

export default class UhrParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    this.parser.parsedTokens.hour = this.parser.parsedTokens.number;
    console.log("uhrparsed", this.parser.parsedTokens);
    if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.minutes = token;
      this.parser.state = new EndState(this.parser);
    }
  }
}
