import { NumberWordsMap } from "./constants.ts";

type ParsingState = "START" | "HOUR_PARSED" | "UHR_PARSED" | "END";
type ParsedTokens = {
  hour: string | null;
  minutes: string | null;
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
        }
        break;
      case "HOUR_PARSED":
        if (token === "uhr") {
          currentState = "UHR_PARSED";
        }
        break;
      case "HALB_PARSED":
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

  const hour = parsedTokens.hour
    ? (numbersMap[parsedTokens.hour] + 12) % 24
    : 0;
  const minutes = parsedTokens.minutes ? numbersMap[parsedTokens.minutes] : 0;

  console.log({ timeString });
  console.log({ hour });
  console.log({ minutes });
  // console.log({ hourFraction });
  // console.log({ timePreposition });
  return `${hour}:${minutes.toString().padStart(2, "0")}`;
}

export default germanTimeToHuman;
