import { NumberWordsMap, fractions } from "./constants.ts";
import State from "./states/State.ts";
import StartState from "./states/StartState.ts";

type ParsedTokens = {
  number: string | null;
  hour: string | null;
  minutes: string | null;
  fraction: string | null;
  preposition: string | null;
  isHalb: boolean;
  isFraction: boolean;
};

export default class GermanTimeParser {
  tokens: string[];
  state: State;
  protected _numbersMap: NumberWordsMap;

  parsedTokens: ParsedTokens = {
    number: null,
    hour: null,
    minutes: null,
    fraction: null,
    preposition: null,
    isHalb: false,
    isFraction: false,
  };
  constructor(timeString: string, numbersMap: NumberWordsMap) {
    this.tokens = timeString.toLowerCase().split(" ");
    this._numbersMap = numbersMap;
    this.state = new StartState(this);
    console.log(this.numbersMap);
  }

  get numbersMap(): NumberWordsMap {
    return this._numbersMap;
  }

  parse() {
    for (const token of this.tokens) {
      this.state.processToken(token);
    }

    return this.formatTime();
  }

  private formatTime() {
    console.log("formattime", this.parsedTokens);

    let hour = this.parsedTokens.hour
      ? (this.numbersMap[this.parsedTokens.hour] + 12) % 24
      : 0;
    let minutes = this.parsedTokens.minutes
      ? this.numbersMap[this.parsedTokens.minutes]
      : 0;
    console.log(hour, minutes);

    if (this.parsedTokens.isFraction && this.parsedTokens.fraction) {
      minutes = fractions[this.parsedTokens.fraction];
    }

    if (this.parsedTokens.preposition) {
      if (this.parsedTokens.preposition === "vor") {
        hour -= 1;
        minutes = 60 - minutes;
      } else {
      }
    }
    if (this.parsedTokens.isHalb) {
      minutes = 30;
      hour = hour - 1;
    }

    return `${hour}:${minutes.toString().padStart(2, "0")}`;
  }
}
