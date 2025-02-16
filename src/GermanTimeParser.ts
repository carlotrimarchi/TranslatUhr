import { NumberWordsMap, fractions } from "./constants.ts";

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

interface State {
  processToken(token: string): void;
}

class StartState implements State {
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

class FractionParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (["nach", "vor"].includes(token)) {
      this.parser.parsedTokens.preposition = token;
      this.parser.state = new PrepositionParsedState(this.parser);
    }
  }
}

class PrepositionParsedState implements State {
  constructor(private parser: GermanTimeParser) {}
  processToken(token: string) {
    if (token in this.parser.numbersMap) {
      this.parser.parsedTokens.hour = token;
      this.parser.state = new EndState(this.parser);
    }
  }
}

class NumberParsedState implements State {
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
    this.parser.parsedTokens.hour = this.parser.parsedTokens.number;
    console.log("uhrparsed", this.parser.parsedTokens);
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
