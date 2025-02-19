import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";
import PrepositionParsedState from "./PrepositionParsedState.ts";
import UhrParsedState from "./UhrParsedState.ts";
import EndState from "./EndState.ts";

export default class NumberParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token === "uhr") {
      console.log("found uhr");
      this.parser.parsedTokens.hour = this.parser.parsedTokens.number;

      if (this.parser.tokens.indexOf(token) === this.parser.tokens.length - 1) {
        this.parser.state = new EndState(this.parser);
      } else {
        this.parser.state = new UhrParsedState(this.parser);
      }
    } else if (["nach", "vor"].includes(token)) {
      this.parser.parsedTokens.minutes = this.parser.parsedTokens.number;
      this.parser.parsedTokens.preposition = token;
      this.parser.state = new PrepositionParsedState(this.parser);
    }
  }
}
