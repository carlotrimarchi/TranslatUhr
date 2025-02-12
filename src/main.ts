const hoursMap = {
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

const hourFractions = {
  viertel: 15,
  dreiviertel: 45,
  halb: 30,
};

const timePrepositions = ["vor", "nach"];

function germanTimeToHuman(timeString: string): string {
  let hour: number = 0;
  let minutes: number | null = null;
  let hourFraction: "halb" | "viertel" | "dreiviertel" | null = null;
  let timePreposition: "nach" | "vor" | null = null;

  const tokens = timeString.toLowerCase().split(" ");

  for (const token of tokens) {
    if (["halb", "viertel", "dreiviertel"].includes(token)) {
      hourFraction = token as "halb" | "viertel" | "dreiviertel";
    } else if (["vor", "nach"].includes(token)) {
      timePreposition = token as "vor" | "nach";
    } else if (token === "uhr") {
    } else {
      console.log(token);
      hour = hoursMap[token] + (12 % 24);
    }
  }

  if (hourFraction) {
    minutes = hourFractions[hourFraction];
  }

  if (timePreposition) {
    if (timePreposition === "vor") {
      hour -= 1;
      minutes = 60 - hourFractions[hourFraction];
    }
  }

  console.log({ timeString });
  console.log({ hour });
  console.log({ minutes });
  console.log({ hourFraction });
  console.log({ timePreposition });
  return `${hour}:${minutes}`;
}

germanTimeToHuman("fünf Uhr");

export default germanTimeToHuman;
