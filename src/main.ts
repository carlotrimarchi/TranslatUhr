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

const isValidHour = (token: string, numbersMap: NumberWordsMap) =>
  token in numbersMap;
const isValidMinute = (token: string, numbersMap: NumberWordsMap) =>
  token in numbersMap;

function germanTimeToHuman(
  timeString: string,
  numbersMap: NumberWordsMap,
): string {
  let currentState: ParsingState = "START";

  const parsedTokens: ParsedTokens = {
    hour: null,
    minutes: null,
    isHalb: false,
  };
  // let hourFraction: "halb" | "viertel" | "dreiviertel" | null = null;
  // let timePreposition: "nach" | "vor" | null = null;

  const tokens = timeString.toLowerCase().split(" ");

  for (const token of tokens) {
    switch (currentState) {
      case "START":
        if (isValidHour(token, numbersMap)) {
          currentState = "HOUR_PARSED";
          parsedTokens.hour = token;
        } else if (token === "halb") {
          currentState = "HALB_PARSED";
          parsedTokens.isHalb = true;
        }
        break;
      case "HOUR_PARSED":
        if (token === "uhr") {
          currentState = "UHR_PARSED";
        }
        break;
      case "HALB_PARSED":
        if (isValidHour(token, numbersMap)) {
          parsedTokens.hour = token;
          currentState = "END";
        }
        break;
      case "UHR_PARSED":
        if (isValidMinute(token, numbersMap)) {
          parsedTokens.minutes = token;
          currentState = "END";
        }
        break;
    }
  }

  currentState = "START";
  let hour = parsedTokens.hour ? (numbersMap[parsedTokens.hour] + 12) % 24 : 0;
  let minutes = parsedTokens.minutes ? numbersMap[parsedTokens.minutes] : 0;

  if (parsedTokens.isHalb) {
    minutes = 30;
    hour = hour - 1;
  }

  console.log(hour, minutes);

  console.log({ timeString });
  console.log({ hour });
  console.log({ minutes });
  // console.log({ hourFraction });
  // console.log({ timePreposition });
  return `${hour}:${minutes.toString().padStart(2, "0")}`;
}

export default germanTimeToHuman;
