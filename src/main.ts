const isValidHour = (token: string, numbersMap: Record<string, number>) =>
  token in numbersMap;
const isValidMinute = (token: string, numbersMap: Record<string, number>) =>
  token in numbersMap;

function germanTimeToHuman(timeString: string): string {
  let currentState: "START" | "HOUR_PARSED" | "UHR_PARSED" | "END" = "START";
  let lastState: string | null = null;

  type ParsedTokens = {
    hour: string | null;
    minutes: string | null;
  };

  const parsedTokens: ParsedTokens = {
    hour: null,
    minutes: null,
  };
  const numbersMap: Record<string, number> = {
    ein: 1,
    zwei: 2,
    drei: 3,
    vier: 4,
    fünf: 5,
    sechs: 6,
    sieben: 7,
    acht: 8,
    neun: 9,
    zehn: 10,
    elf: 11,
    zwölf: 12,
    dreizehn: 13,
    vierzehn: 14,
    fünfzehn: 15,
    sechzehn: 16,
    siebzehn: 17,
    achtzehn: 18,
    neunzehn: 19,
    zwanzig: 20,
    dreißig: 30,
    vierzig: 40,
    fünzig: 50,
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
        }
        break;
      case "HOUR_PARSED":
        if (token === "uhr") {
          currentState = "UHR_PARSED";
        }
        break;
      case "UHR_PARSED":
        if (isValidMinute(token, numbersMap)) {
          lastState = currentState;
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
