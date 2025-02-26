export type NumberWordsMap = Record<string, number>;

export type Prepositions = "nach" | "vor" | null;

export const fractions: Record<string, number> = {
  viertel: 15,
  dreiviertel: 45,
};

export const hoursMap: NumberWordsMap = {
  ein: 1,
  eins: 1,
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
  eindundzwanzig: 21,
  zweidundzwanzig: 22,
  dreiundzwanzig: 23,
  vierundzwanzig: 24,
};

export const minutesMap = {
  dreißig: 30,
  vierzig: 40,
  fünzig: 50,
  ...hoursMap,
};

export const numbersMap: NumberWordsMap = Object.assign(hoursMap, minutesMap);
