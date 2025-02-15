import { NumberWordsMap } from "./constants.ts";

type ParsingState =
  | "START"
  | "HOUR_PARSED"
  | "HALB_PARSED"
  | "HOUR_AFTER_HALB_PARSED"
  | "UHR_PARSED"
  | "END";

type ParsedTokens = {
  hour: string | null;
  minutes: string | null;
  isHalb: boolean;
};

export default class GermanTimeParser {
  tokens: string[];
  state: ParsingState = "START";

  parsedTokens: ParsedTokens = {
    hour: null,
    minutes: null,
    isHalb: false,
  };
  constructor(
    timeString: string,
    private numbersMap: NumberWordsMap,
  ) {
    this.tokens = timeString.toLowerCase().split(" ");
  }

  parse() {
    for (const token of this.tokens) {
      switch (this.state) {
        case "START":
          if (this.#isValidHour(token, this.numbersMap)) {
            this.state = "HOUR_PARSED";
            this.parsedTokens.hour = token;
          } else if (token === "halb") {
            this.state = "HALB_PARSED";
            this.parsedTokens.isHalb = true;
          }
          break;
        case "HOUR_PARSED":
          if (token === "uhr") {
            this.state = "UHR_PARSED";
          }
          break;
        case "HALB_PARSED":
          if (this.#isValidHour(token, this.numbersMap)) {
            this.parsedTokens.hour = token;
            this.state = "END";
          }
          break;
        case "UHR_PARSED":
          if (this.#isValidMinute(token, this.numbersMap)) {
            this.parsedTokens.minutes = token;
            this.state = "END";
          }
          break;
      }
    }

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
  #isValidHour(token: string, numbersMap: NumberWordsMap) {
    return token in numbersMap;
  }

  #isValidMinute(token: string, numbersMap: NumberWordsMap) {
    return token in numbersMap;
  }
}
