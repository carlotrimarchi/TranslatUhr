import GermanTimeParser from "../GermanTimeParser.ts";
import State from "./State.ts";
import HalbParsedState from "./HalbParsedState.ts";
import FractionParsedState from "./FractionParsedState.ts";
import NumberParsedState from "./NumberParsedState.ts";

export default class StartState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token === "halb") {
      this.parser.parsedTokens.isHalb = true;
      this.parser.state = new HalbParsedState(this.parser);
    } else if (["viertel", "dreiviertel"].includes(token)) {
      this.parser.parsedTokens.isFraction = true;
      this.parser.parsedTokens.fraction = token;
      this.parser.state = new FractionParsedState(this.parser);
    } else if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.number = token;
      console.log({ token });
      this.parser.state = new NumberParsedState(this.parser);
    }
  }
}
