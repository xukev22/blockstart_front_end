import { EventType, RecruitType } from "../model/CollegeProfileData";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export const eventToReadableName: Record<EventType, string> = {
  [EventType.MALE_TRACK_55]: "55m",
  [EventType.MALE_TRACK_60]: "60m",
  [EventType.MALE_TRACK_100]: "100m",
  [EventType.MALE_TRACK_200]: "200m",
  [EventType.MALE_TRACK_300]: "300m",
  [EventType.MALE_TRACK_400]: "400m",
  [EventType.MALE_TRACK_500]: "500m",
  [EventType.MALE_TRACK_600]: "600m",
  [EventType.MALE_TRACK_800]: "800m",
  [EventType.MALE_TRACK_1000]: "1000m",
  [EventType.MALE_TRACK_1500]: "1500m",
  [EventType.MALE_TRACK_1600]: "1600m",
  [EventType.MALE_TRACK_MILE]: "Mile",
  [EventType.MALE_TRACK_3000]: "3000m",
  [EventType.MALE_TRACK_3200]: "3200m",
  [EventType.MALE_TRACK_5000]: "5000m",
  [EventType.MALE_TRACK_10000]: "10000m",
  [EventType.MALE_TRACK_55_HURDLE]: "55m Hurdle",
  [EventType.MALE_TRACK_60_HURDLE]: "60m Hurdle",
  [EventType.MALE_TRACK_STRAIGHT_HURDLE]: "110m Hurdle",
  [EventType.MALE_TRACK_LONG_HURDLE]: "400m Hurdle",
  [EventType.MALE_TRACK_3000_SC]: "3000m Steeplechase",
  [EventType.MALE_FIELD_HIGH_JUMP]: "High Jump",
  [EventType.MALE_FIELD_POLE_VAULT]: "Pole Vault",
  [EventType.MALE_FIELD_LONG_JUMP]: "Long Jump",
  [EventType.MALE_FIELD_TRIPLE_JUMP]: "Triple Jump",
  [EventType.MALE_FIELD_SHOT_PUT]: "Shot Put",
  [EventType.MALE_FIELD_DISCUS]: "Discus",
  [EventType.MALE_FIELD_JAVELIN]: "Javelin",
  [EventType.MALE_FIELD_HAMMER]: "Hammer",
  [EventType.MALE_FIELD_WEIGHT]: "Weight Throw",
  [EventType.MALE_MULTI_PENTA]: "Pentathlon",
  [EventType.MALE_MULTI_HEP]: "Heptathlon",
  [EventType.MALE_MULTI_DEC]: "Decathlon",
  [EventType.MALE_XC_5000]: "Cross Country 5K",
  [EventType.MALE_XC_6000]: "Cross Country 6K",
  [EventType.MALE_XC_8000]: "Cross Country 8K",
  [EventType.MALE_XC_10000]: "Cross Country 10K",
  [EventType.MALE_XC_4MILE]: "Cross Country 4 Mile",
  [EventType.MALE_XC_7600]: "Cross Country 7600m",
  [EventType.MALE_XC_9500]: "Cross Country 9500m",
  [EventType.FEMALE_TRACK_55]: "55m",
  [EventType.FEMALE_TRACK_60]: "60m",
  [EventType.FEMALE_TRACK_100]: "100m",
  [EventType.FEMALE_TRACK_200]: "200m",
  [EventType.FEMALE_TRACK_300]: "300m",
  [EventType.FEMALE_TRACK_400]: "400m",
  [EventType.FEMALE_TRACK_500]: "500m",
  [EventType.FEMALE_TRACK_600]: "600m",
  [EventType.FEMALE_TRACK_800]: "800m",
  [EventType.FEMALE_TRACK_1000]: "1000m",
  [EventType.FEMALE_TRACK_1500]: "1500m",
  [EventType.FEMALE_TRACK_1600]: "1600m",
  [EventType.FEMALE_TRACK_MILE]: "Mile",
  [EventType.FEMALE_TRACK_3000]: "3000m",
  [EventType.FEMALE_TRACK_3200]: "3200m",
  [EventType.FEMALE_TRACK_5000]: "5000m",
  [EventType.FEMALE_TRACK_10000]: "10000m",
  [EventType.FEMALE_TRACK_55_HURDLE]: "55m Hurdle",
  [EventType.FEMALE_TRACK_60_HURDLE]: "60m Hurdle",
  [EventType.FEMALE_TRACK_STRAIGHT_HURDLE]: "100m Hurdle",
  [EventType.FEMALE_TRACK_LONG_HURDLE]: "400m Hurdle",
  [EventType.FEMALE_TRACK_3000_SC]: "3000m Steeplechase",
  [EventType.FEMALE_FIELD_HIGH_JUMP]: "High Jump",
  [EventType.FEMALE_FIELD_POLE_VAULT]: "Pole Vault",
  [EventType.FEMALE_FIELD_LONG_JUMP]: "Long Jump",
  [EventType.FEMALE_FIELD_TRIPLE_JUMP]: "Triple Jump",
  [EventType.FEMALE_FIELD_SHOT_PUT]: "Shot Put",
  [EventType.FEMALE_FIELD_DISCUS]: "Discus",
  [EventType.FEMALE_FIELD_JAVELIN]: "Javelin",
  [EventType.FEMALE_FIELD_HAMMER]: "Hammer",
  [EventType.FEMALE_FIELD_WEIGHT]: "Weight Throw",
  [EventType.FEMALE_MULTI_PENTA]: "Pentathlon",
  [EventType.FEMALE_MULTI_HEP]: "Heptathlon",
  [EventType.FEMALE_MULTI_DEC]: "Decathlon",
  [EventType.FEMALE_XC_5000]: "Cross Country 5K",
  [EventType.FEMALE_XC_6000]: "Cross Country 6K",
  [EventType.FEMALE_XC_8000]: "Cross Country 8K",
  [EventType.FEMALE_XC_10000]: "Cross Country 10K",
  [EventType.FEMALE_XC_4MILE]: "Cross Country 4 Mile",
  [EventType.FEMALE_XC_7600]: "Cross Country 7600m",
  [EventType.FEMALE_XC_9500]: "Cross Country 9500m",
  [EventType.UNHANDLED]: "Unhandled Event",
};

export const eventToEventGroup: Record<EventType, string> = {
  [EventType.MALE_TRACK_55]: "Track",
  [EventType.MALE_TRACK_60]: "Track",
  [EventType.MALE_TRACK_100]: "Track",
  [EventType.MALE_TRACK_200]: "Track",
  [EventType.MALE_TRACK_300]: "Track",
  [EventType.MALE_TRACK_400]: "Track",
  [EventType.MALE_TRACK_500]: "Track",
  [EventType.MALE_TRACK_600]: "Track",
  [EventType.MALE_TRACK_800]: "Track",
  [EventType.MALE_TRACK_1000]: "Track",
  [EventType.MALE_TRACK_1500]: "Track",
  [EventType.MALE_TRACK_1600]: "Track",
  [EventType.MALE_TRACK_MILE]: "Track",
  [EventType.MALE_TRACK_3000]: "Track",
  [EventType.MALE_TRACK_3200]: "Track",
  [EventType.MALE_TRACK_5000]: "Track",
  [EventType.MALE_TRACK_10000]: "Track",
  [EventType.MALE_TRACK_55_HURDLE]: "Track",
  [EventType.MALE_TRACK_60_HURDLE]: "Track",
  [EventType.MALE_TRACK_STRAIGHT_HURDLE]: "Track",
  [EventType.MALE_TRACK_LONG_HURDLE]: "Track",
  [EventType.MALE_TRACK_3000_SC]: "Track",
  [EventType.MALE_FIELD_HIGH_JUMP]: "Track",
  [EventType.MALE_FIELD_POLE_VAULT]: "Track",
  [EventType.MALE_FIELD_LONG_JUMP]: "Track",
  [EventType.MALE_FIELD_TRIPLE_JUMP]: "Track",
  [EventType.MALE_FIELD_SHOT_PUT]: "Track",
  [EventType.MALE_FIELD_DISCUS]: "Track",
  [EventType.MALE_FIELD_JAVELIN]: "Track",
  [EventType.MALE_FIELD_HAMMER]: "Track",
  [EventType.MALE_FIELD_WEIGHT]: "Track",
  [EventType.MALE_MULTI_PENTA]: "Multi",
  [EventType.MALE_MULTI_HEP]: "Multi",
  [EventType.MALE_MULTI_DEC]: "Multi",
  [EventType.MALE_XC_5000]: "XC",
  [EventType.MALE_XC_6000]: "XC",
  [EventType.MALE_XC_8000]: "XC",
  [EventType.MALE_XC_10000]: "XC",
  [EventType.MALE_XC_4MILE]: "XC",
  [EventType.MALE_XC_7600]: "XC",
  [EventType.MALE_XC_9500]: "XC",
  [EventType.FEMALE_TRACK_55]: "Track",
  [EventType.FEMALE_TRACK_60]: "Track",
  [EventType.FEMALE_TRACK_100]: "Track",
  [EventType.FEMALE_TRACK_200]: "Track",
  [EventType.FEMALE_TRACK_300]: "Track",
  [EventType.FEMALE_TRACK_400]: "Track",
  [EventType.FEMALE_TRACK_500]: "Track",
  [EventType.FEMALE_TRACK_600]: "Track",
  [EventType.FEMALE_TRACK_800]: "Track",
  [EventType.FEMALE_TRACK_1000]: "Track",
  [EventType.FEMALE_TRACK_1500]: "Track",
  [EventType.FEMALE_TRACK_1600]: "Track",
  [EventType.FEMALE_TRACK_MILE]: "Track",
  [EventType.FEMALE_TRACK_3000]: "Track",
  [EventType.FEMALE_TRACK_3200]: "Track",
  [EventType.FEMALE_TRACK_5000]: "Track",
  [EventType.FEMALE_TRACK_10000]: "Track",
  [EventType.FEMALE_TRACK_55_HURDLE]: "Track",
  [EventType.FEMALE_TRACK_60_HURDLE]: "Track",
  [EventType.FEMALE_TRACK_STRAIGHT_HURDLE]: "Track",
  [EventType.FEMALE_TRACK_LONG_HURDLE]: "Track",
  [EventType.FEMALE_TRACK_3000_SC]: "Track",
  [EventType.FEMALE_FIELD_HIGH_JUMP]: "Track",
  [EventType.FEMALE_FIELD_POLE_VAULT]: "Track",
  [EventType.FEMALE_FIELD_LONG_JUMP]: "Track",
  [EventType.FEMALE_FIELD_TRIPLE_JUMP]: "Track",
  [EventType.FEMALE_FIELD_SHOT_PUT]: "Track",
  [EventType.FEMALE_FIELD_DISCUS]: "Track",
  [EventType.FEMALE_FIELD_JAVELIN]: "Track",
  [EventType.FEMALE_FIELD_HAMMER]: "Track",
  [EventType.FEMALE_FIELD_WEIGHT]: "Track",
  [EventType.FEMALE_MULTI_PENTA]: "Multi",
  [EventType.FEMALE_MULTI_HEP]: "Multi",
  [EventType.FEMALE_MULTI_DEC]: "Multi",
  [EventType.FEMALE_XC_5000]: "XC",
  [EventType.FEMALE_XC_6000]: "XC",
  [EventType.FEMALE_XC_8000]: "XC",
  [EventType.FEMALE_XC_10000]: "XC",
  [EventType.FEMALE_XC_4MILE]: "XC",
  [EventType.FEMALE_XC_7600]: "XC",
  [EventType.FEMALE_XC_9500]: "XC",
  [EventType.UNHANDLED]: "Unhandled Event",
};

export const eventToEventCategory: Record<EventType, string> = {
  [EventType.MALE_TRACK_55]: "Short",
  [EventType.MALE_TRACK_60]: "Short",
  [EventType.MALE_TRACK_100]: "Short",
  [EventType.MALE_TRACK_200]: "Short",
  [EventType.MALE_TRACK_300]: "Short",
  [EventType.MALE_TRACK_400]: "Short",
  [EventType.MALE_TRACK_500]: "Short",
  [EventType.MALE_TRACK_600]: "Short",
  [EventType.MALE_TRACK_800]: "Long",
  [EventType.MALE_TRACK_1000]: "Long",
  [EventType.MALE_TRACK_1500]: "Long",
  [EventType.MALE_TRACK_1600]: "Long",
  [EventType.MALE_TRACK_MILE]: "Long",
  [EventType.MALE_TRACK_3000]: "Long",
  [EventType.MALE_TRACK_3200]: "Long",
  [EventType.MALE_TRACK_5000]: "Long",
  [EventType.MALE_TRACK_10000]: "Long",
  [EventType.MALE_TRACK_55_HURDLE]: "Short",
  [EventType.MALE_TRACK_60_HURDLE]: "Short",
  [EventType.MALE_TRACK_STRAIGHT_HURDLE]: "Short",
  [EventType.MALE_TRACK_LONG_HURDLE]: "Short",
  [EventType.MALE_TRACK_3000_SC]: "Long",
  [EventType.MALE_FIELD_HIGH_JUMP]: "Field",
  [EventType.MALE_FIELD_POLE_VAULT]: "Field",
  [EventType.MALE_FIELD_LONG_JUMP]: "Field",
  [EventType.MALE_FIELD_TRIPLE_JUMP]: "Field",
  [EventType.MALE_FIELD_SHOT_PUT]: "Field",
  [EventType.MALE_FIELD_DISCUS]: "Field",
  [EventType.MALE_FIELD_JAVELIN]: "Field",
  [EventType.MALE_FIELD_HAMMER]: "Field",
  [EventType.MALE_FIELD_WEIGHT]: "Field",
  [EventType.MALE_MULTI_PENTA]: "Multi",
  [EventType.MALE_MULTI_HEP]: "Multi",
  [EventType.MALE_MULTI_DEC]: "Multi",
  [EventType.MALE_XC_5000]: "XC",
  [EventType.MALE_XC_6000]: "XC",
  [EventType.MALE_XC_8000]: "XC",
  [EventType.MALE_XC_10000]: "XC",
  [EventType.MALE_XC_4MILE]: "XC",
  [EventType.MALE_XC_7600]: "XC",
  [EventType.MALE_XC_9500]: "XC",
  
  
  [EventType.FEMALE_TRACK_55]: "Short",
  [EventType.FEMALE_TRACK_60]: "Short",
  [EventType.FEMALE_TRACK_100]: "Short",
  [EventType.FEMALE_TRACK_200]: "Short",
  [EventType.FEMALE_TRACK_300]: "Short",
  [EventType.FEMALE_TRACK_400]: "Short",
  [EventType.FEMALE_TRACK_500]: "Short",
  [EventType.FEMALE_TRACK_600]: "Short",
  [EventType.FEMALE_TRACK_800]: "Long",
  [EventType.FEMALE_TRACK_1000]: "Long",
  [EventType.FEMALE_TRACK_1500]: "Long",
  [EventType.FEMALE_TRACK_1600]: "Long",
  [EventType.FEMALE_TRACK_MILE]: "Long",
  [EventType.FEMALE_TRACK_3000]: "Long",
  [EventType.FEMALE_TRACK_3200]: "Long",
  [EventType.FEMALE_TRACK_5000]: "Long",
  [EventType.FEMALE_TRACK_10000]: "Long",
  [EventType.FEMALE_TRACK_55_HURDLE]: "Short",
  [EventType.FEMALE_TRACK_60_HURDLE]: "Short",
  [EventType.FEMALE_TRACK_STRAIGHT_HURDLE]: "Short",
  [EventType.FEMALE_TRACK_LONG_HURDLE]: "Short",
  [EventType.FEMALE_TRACK_3000_SC]: "Long",
  [EventType.FEMALE_FIELD_HIGH_JUMP]: "Field",
  [EventType.FEMALE_FIELD_POLE_VAULT]: "Field",
  [EventType.FEMALE_FIELD_LONG_JUMP]: "Field",
  [EventType.FEMALE_FIELD_TRIPLE_JUMP]: "Field",
  [EventType.FEMALE_FIELD_SHOT_PUT]: "Field",
  [EventType.FEMALE_FIELD_DISCUS]: "Field",
  [EventType.FEMALE_FIELD_JAVELIN]: "Field",
  [EventType.FEMALE_FIELD_HAMMER]: "Field",
  [EventType.FEMALE_FIELD_WEIGHT]: "Field",
  [EventType.FEMALE_MULTI_PENTA]: "Multi",
  [EventType.FEMALE_MULTI_HEP]: "Multi",
  [EventType.FEMALE_MULTI_DEC]: "Multi",
  [EventType.FEMALE_XC_5000]: "XC",
  [EventType.FEMALE_XC_6000]: "XC",
  [EventType.FEMALE_XC_8000]: "XC",
  [EventType.FEMALE_XC_10000]: "XC",
  [EventType.FEMALE_XC_4MILE]: "XC",
  [EventType.FEMALE_XC_7600]: "XC",
  [EventType.FEMALE_XC_9500]: "XC",
  [EventType.UNHANDLED]: "Unhandled Event",
};

export function textFieldToEventTypeName(
  textFieldName: string,
  gender: Gender
) {
  switch (textFieldName) {
    case "60m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_60
        : EventType.FEMALE_TRACK_60;
    case "60m Hurdles":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_60_HURDLE
        : EventType.FEMALE_TRACK_60_HURDLE;
    case "100m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_100
        : EventType.FEMALE_TRACK_100;
    case "110/100m Hurdles":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_STRAIGHT_HURDLE
        : EventType.FEMALE_TRACK_STRAIGHT_HURDLE;
    case "200m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_200
        : EventType.FEMALE_TRACK_200;
    case "300m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_300
        : EventType.FEMALE_TRACK_300;
    case "400m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_400
        : EventType.FEMALE_TRACK_400;
    case "400m Hurdles":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_LONG_HURDLE
        : EventType.FEMALE_TRACK_LONG_HURDLE;
    case "600m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_600
        : EventType.FEMALE_TRACK_600;
    case "800m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_800
        : EventType.FEMALE_TRACK_800;
    case "1000m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_1000
        : EventType.FEMALE_TRACK_1000;
    case "1500m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_1500
        : EventType.FEMALE_TRACK_1500;
    case "1600m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_1600
        : EventType.FEMALE_TRACK_1600;
    case "3000m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_3000
        : EventType.FEMALE_TRACK_3000;
    case "3000m SC":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_3000_SC
        : EventType.FEMALE_TRACK_3000_SC;
    case "3200m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_3200
        : EventType.FEMALE_TRACK_3200;
    case "5000m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_5000
        : EventType.FEMALE_TRACK_5000;
    case "10000m":
      return gender === Gender.MALE
        ? EventType.MALE_TRACK_10000
        : EventType.FEMALE_TRACK_10000;
    case "Long Jump":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_LONG_JUMP
        : EventType.FEMALE_FIELD_LONG_JUMP;
    case "Triple Jump":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_TRIPLE_JUMP
        : EventType.FEMALE_FIELD_TRIPLE_JUMP;
    case "High Jump":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_HIGH_JUMP
        : EventType.FEMALE_FIELD_HIGH_JUMP;
    case "Pole Vault":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_POLE_VAULT
        : EventType.FEMALE_FIELD_POLE_VAULT;
    case "Shot Put":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_SHOT_PUT
        : EventType.FEMALE_FIELD_SHOT_PUT;
    case "Discus":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_DISCUS
        : EventType.FEMALE_FIELD_DISCUS;
    case "Javelin":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_JAVELIN
        : EventType.FEMALE_FIELD_JAVELIN;
    case "Hammer":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_HAMMER
        : EventType.FEMALE_FIELD_HAMMER;
    case "Weight Throw":
      return gender === Gender.MALE
        ? EventType.MALE_FIELD_WEIGHT
        : EventType.FEMALE_FIELD_WEIGHT;
    case "Pentathalon":
      return gender === Gender.MALE
        ? EventType.MALE_MULTI_PENTA
        : EventType.FEMALE_MULTI_PENTA;
    case "Heptathalon":
      return gender === Gender.MALE
        ? EventType.MALE_MULTI_HEP
        : EventType.FEMALE_MULTI_HEP;
    case "Decathalon":
      return gender === Gender.MALE
        ? EventType.MALE_MULTI_DEC
        : EventType.FEMALE_MULTI_DEC;
    case "5k XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_5000
        : EventType.FEMALE_XC_5000;
    case "6k XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_6000
        : EventType.FEMALE_XC_6000;
    case "8k XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_8000
        : EventType.FEMALE_XC_8000;
    case "10k XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_10000
        : EventType.FEMALE_XC_10000;
    case "4 Mile XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_4MILE
        : EventType.FEMALE_XC_4MILE;
    case "7600m XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_7600
        : EventType.FEMALE_XC_7600;
    case "9500m XC":
      return gender === Gender.MALE
        ? EventType.MALE_XC_9500
        : EventType.FEMALE_XC_9500;
    default:
      throw new Error("bad input for text field name");
  }
}
const stateMappings: { [key: string]: string } = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AZ: "Arizona",
  BC: "British Columbia",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming",
};

export function convertState(input: string): string {
  const inputUpperCase = input.toUpperCase();
  if (stateMappings[inputUpperCase]) {
    return `${stateMappings[inputUpperCase]} (${inputUpperCase})`;
  }

  for (const abbreviation in stateMappings) {
    if (stateMappings[abbreviation].toUpperCase() === inputUpperCase) {
      return `${stateMappings[abbreviation]} (${abbreviation})`;
    }
  }

  return "State or abbreviation not found";
}

export function convertFullNameToAbbreviation(input: string): string {
  const stateRegex = /^(.*?)\s*\((.*?)\)$/; // Regular expression to match "Full Name (Abbreviation)" format

  const match = input.match(stateRegex);
  if (match && match.length === 3) {
    const fullName = match[1].trim();
    const abbreviation = match[2].trim().toUpperCase();

    // Check if the abbreviation is valid in the stateMappings object
    if (
      stateMappings[abbreviation] &&
      stateMappings[abbreviation].toUpperCase() === fullName.toUpperCase()
    ) {
      return abbreviation;
    }
  }

  return "Invalid format or state not found";
}

export function tagsToString(
  tags: Partial<Record<EventType, RecruitType>>[]
): string {
  const tagStrings: string[] = [];

  for (const tag of tags) {
    for (const eventType in tag) {
      if (tag.hasOwnProperty(eventType)) {
        const recruitType = tag[eventType as EventType];
        tagStrings.push(`${eventType}: ${recruitType}`);
      }
    }
  }

  return tagStrings.join(", ");
}
