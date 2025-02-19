import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";
import PrepositionParsedState from "./PrepositionParsedState.ts";

export default class FractionParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (["nach", "vor"].includes(token)) {
      this.parser.parsedTokens.preposition = token;
      this.parser.state = new PrepositionParsedState(this.parser);
    }
  }
}
