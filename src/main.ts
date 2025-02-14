const isValidHour = (token: string, hoursMap: Record<string, number>) =>
  token in hoursMap;

function germanTimeToHuman(timeString: string): string {
  let currentState: "START" | "HOUR_PARSED" | "UHR_PARSED" | "END" = "START";
  let lastState: string | null = null;

  type ParsedTokens = {
    hour: string | null;
    minutes: number | null;
  };

  const parsedTokens: ParsedTokens = {
    hour: null,
    minutes: null,
  };
  const hoursMap: Record<string, number> = {
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
  };
  let hour: number = 0;
  let minutes: number | null = null;
  let hourFraction: "halb" | "viertel" | "dreiviertel" | null = null;
  let timePreposition: "nach" | "vor" | null = null;

  const tokens = timeString.toLowerCase().split(" ");

  for (const token of tokens) {
    switch (currentState) {
      case "START":
        if (isValidHour(token, hoursMap)) {
          currentState = "HOUR_PARSED";
          parsedTokens.hour = token;
        }
        break;
      case "HOUR_PARSED":
        if (token === "uhr") {
          lastState = "UHR_PARSED";
          currentState = "END";
        }
        break;
    }
  }

  if (
    currentState === "END" &&
    lastState === "UHR_PARSED" &&
    parsedTokens.hour
  ) {
    currentState = "START";
    return `${(hoursMap[parsedTokens.hour] + 12) % 24}:00`;
  }

  console.log({ timeString });
  console.log({ hour });
  console.log({ minutes });
  console.log({ hourFraction });
  console.log({ timePreposition });
  return `${hour}:${minutes}`;
}

export default germanTimeToHuman;
