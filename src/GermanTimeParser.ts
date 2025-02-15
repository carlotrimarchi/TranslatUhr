import { NumberWordsMap } from "./constants.ts";

type ParsedTokens = {
  hour: string | null;
  minutes: string | null;
  isHalb: boolean;
};

export default class GermanTimeParser {
  tokens: string[];
  state: State;
  protected _numbersMap: NumberWordsMap;

  parsedTokens: ParsedTokens = {
    hour: null,
    minutes: null,
    isHalb: false,
  };
  constructor(timeString: string, numbersMap: NumberWordsMap) {
    this.tokens = timeString.toLowerCase().split(" ");
    this._numbersMap = numbersMap;
    this.state = new StartState(this);
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
    let hour = this.parsedTokens.hour
      ? (this.numbersMap[this.parsedTokens.hour] + 12) % 24
      : 0;
    let minutes = this.parsedTokens.minutes
      ? this.numbersMap[this.parsedTokens.minutes]
      : 0;

    if (this.parsedTokens.isHalb) {
      minutes = 30;
      hour = hour - 1;
    }

    return `${hour}:${minutes.toString().padStart(2, "0")}`;
  }
}

interface State {
  processToken(token: string): void;
}

class StartState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.hour = token;
      this.parser.state = new HourParsedState(this.parser);
    } else if (token === "halb") {
      this.parser.parsedTokens.isHalb = true;
      this.parser.state = new HalbParsedState(this.parser);
    }
  }
}

class HourParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token === "uhr") {
      this.parser.state = new UhrParsedState(this.parser);
    }
  }
}

class HalbParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.hour = token;
      this.parser.state = new EndState(this.parser);
    }
  }
}

class UhrParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.minutes = token;
      this.parser.state = new EndState(this.parser);
    }
  }
}

class EndState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {}
}
