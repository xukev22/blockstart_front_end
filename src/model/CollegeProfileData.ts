enum Division {
  I = "I",
  II = "II",
  III = "III",
}

enum PublicPrivateState {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  DEFAULT = "DEFAULT",
}

enum HBCUState {
  YES = "YES",
  NO = "NO",
  DEFAULT = "DEFAULT",
}

export enum EventType {
  MALE_TRACK_55 = "MALE_TRACK_55",
  MALE_TRACK_60 = "MALE_TRACK_60",
  MALE_TRACK_100 = "MALE_TRACK_100",
  MALE_TRACK_200 = "MALE_TRACK_200",
  MALE_TRACK_300 = "MALE_TRACK_300",
  MALE_TRACK_400 = "MALE_TRACK_400",
  MALE_TRACK_500 = "MALE_TRACK_500",
  MALE_TRACK_600 = "MALE_TRACK_600",
  MALE_TRACK_800 = "MALE_TRACK_800",
  MALE_TRACK_1000 = "MALE_TRACK_1000",
  MALE_TRACK_1500 = "MALE_TRACK_1500",
  MALE_TRACK_1600 = "MALE_TRACK_1600",
  MALE_TRACK_MILE = "MALE_TRACK_MILE",
  MALE_TRACK_3000 = "MALE_TRACK_3000",
  MALE_TRACK_3200 = "MALE_TRACK_3200",
  MALE_TRACK_5000 = "MALE_TRACK_5000",
  MALE_TRACK_10000 = "MALE_TRACK_10000",
  MALE_TRACK_55_HURDLE = "MALE_TRACK_55_HURDLE",
  MALE_TRACK_60_HURDLE = "MALE_TRACK_60_HURDLE",
  MALE_TRACK_STRAIGHT_HURDLE = "MALE_TRACK_STRAIGHT_HURDLE",
  MALE_TRACK_LONG_HURDLE = "MALE_TRACK_LONG_HURDLE",
  MALE_TRACK_3000_SC = "MALE_TRACK_3000_SC",
  MALE_FIELD_HIGH_JUMP = "MALE_FIELD_HIGH_JUMP",
  MALE_FIELD_POLE_VAULT = "MALE_FIELD_POLE_VAULT",
  MALE_FIELD_LONG_JUMP = "MALE_FIELD_LONG_JUMP",
  MALE_FIELD_TRIPLE_JUMP = "MALE_FIELD_TRIPLE_JUMP",
  MALE_FIELD_SHOT_PUT = "MALE_FIELD_SHOT_PUT",
  MALE_FIELD_DISCUS = "MALE_FIELD_DISCUS",
  MALE_FIELD_JAVELIN = "MALE_FIELD_JAVELIN",
  MALE_FIELD_HAMMER = "MALE_FIELD_HAMMER",
  MALE_FIELD_WEIGHT = "MALE_FIELD_WEIGHT",
  MALE_MULTI_PENTA = "MALE_MULTI_PENTA",
  MALE_MULTI_HEP = "MALE_MULTI_HEP",
  MALE_MULTI_DEC = "MALE_MULTI_DEC",
  MALE_XC_5000 = "MALE_XC_5000",
  MALE_XC_6000 = "MALE_XC_6000",
  MALE_XC_8000 = "MALE_XC_8000",
  MALE_XC_10000 = "MALE_XC_10000",
  MALE_XC_4MILE = "MALE_XC_4MILE",
  MALE_XC_7600 = "MALE_XC_7600",
  MALE_XC_9500 = "MALE_XC_9500",
  FEMALE_TRACK_55 = "FEMALE_TRACK_55",
  FEMALE_TRACK_60 = "FEMALE_TRACK_60",
  FEMALE_TRACK_100 = "FEMALE_TRACK_100",
  FEMALE_TRACK_200 = "FEMALE_TRACK_200",
  FEMALE_TRACK_300 = "FEMALE_TRACK_300",
  FEMALE_TRACK_400 = "FEMALE_TRACK_400",
  FEMALE_TRACK_500 = "FEMALE_TRACK_500",
  FEMALE_TRACK_600 = "FEMALE_TRACK_600",
  FEMALE_TRACK_800 = "FEMALE_TRACK_800",
  FEMALE_TRACK_1000 = "FEMALE_TRACK_1000",
  FEMALE_TRACK_1500 = "FEMALE_TRACK_1500",
  FEMALE_TRACK_1600 = "FEMALE_TRACK_1600",
  FEMALE_TRACK_MILE = "FEMALE_TRACK_MILE",
  FEMALE_TRACK_3000 = "FEMALE_TRACK_3000",
  FEMALE_TRACK_3200 = "FEMALE_TRACK_3200",
  FEMALE_TRACK_5000 = "FEMALE_TRACK_5000",
  FEMALE_TRACK_10000 = "FEMALE_TRACK_10000",
  FEMALE_TRACK_55_HURDLE = "FEMALE_TRACK_55_HURDLE",
  FEMALE_TRACK_60_HURDLE = "FEMALE_TRACK_60_HURDLE",
  FEMALE_TRACK_STRAIGHT_HURDLE = "FEMALE_TRACK_STRAIGHT_HURDLE",
  FEMALE_TRACK_LONG_HURDLE = "FEMALE_TRACK_LONG_HURDLE",
  FEMALE_TRACK_3000_SC = "FEMALE_TRACK_3000_SC",
  FEMALE_FIELD_HIGH_JUMP = "FEMALE_FIELD_HIGH_JUMP",
  FEMALE_FIELD_POLE_VAULT = "FEMALE_FIELD_POLE_VAULT",
  FEMALE_FIELD_LONG_JUMP = "FEMALE_FIELD_LONG_JUMP",
  FEMALE_FIELD_TRIPLE_JUMP = "FEMALE_FIELD_TRIPLE_JUMP",
  FEMALE_FIELD_SHOT_PUT = "FEMALE_FIELD_SHOT_PUT",
  FEMALE_FIELD_DISCUS = "FEMALE_FIELD_DISCUS",
  FEMALE_FIELD_JAVELIN = "FEMALE_FIELD_JAVELIN",
  FEMALE_FIELD_HAMMER = "FEMALE_FIELD_HAMMER",
  FEMALE_FIELD_WEIGHT = "FEMALE_FIELD_WEIGHT",
  FEMALE_MULTI_PENTA = "FEMALE_MULTI_PENTA",
  FEMALE_MULTI_HEP = "FEMALE_MULTI_HEP",
  FEMALE_MULTI_DEC = "FEMALE_MULTI_DEC",
  FEMALE_XC_5000 = "FEMALE_XC_5000",
  FEMALE_XC_6000 = "FEMALE_XC_6000",
  FEMALE_XC_8000 = "FEMALE_XC_8000",
  FEMALE_XC_10000 = "FEMALE_XC_10000",
  FEMALE_XC_4MILE = "FEMALE_XC_4MILE",
  FEMALE_XC_7600 = "FEMALE_XC_7600",
  FEMALE_XC_9500 = "FEMALE_XC_9500",
  UNHANDLED = "UNHANDLED",
}

export interface Mark {
  type: string;
  minute?: number;
  second?: number;
  fracSecond?: string;
  meters?: number;
  points?: number;
}

export interface Essentials {
  name: string;
  division: string;
  conference: string;
  state: string;
  mainWebsiteURL: string;
  athleticWebsiteURL: string;
  publicOrPrivate: string;
  hbcuOrNot: string;
}

export interface StandardsSet {
  maleWalkOn: {
    existingEventsMapAndTheirTargetStandard: Partial<
      Record<EventType, Mark>
    > | null;
  };
  maleSoftRecruit: {
    existingEventsMapAndTheirTargetStandard: Partial<
      Record<EventType, Mark>
    > | null;
  };
  maleHardRecruit: {
    existingEventsMapAndTheirTargetStandard: Partial<
      Record<EventType, Mark>
    > | null;
  };
  femaleWalkOn: {
    existingEventsMapAndTheirTargetStandard: Partial<
      Record<EventType, Mark>
    > | null;
  };
  femaleSoftRecruit: {
    existingEventsMapAndTheirTargetStandard: Partial<
      Record<EventType, Mark>
    > | null;
  };
  femaleHardRecruit: {
    existingEventsMapAndTheirTargetStandard: Partial<
      Record<EventType, Mark>
    > | null;
  };
}

export interface EssentialsBonus {
  name: string;
  nickname: string;
  town: string;
  hexColor: string;
}

interface CollegeProfileData {
  essentials: Essentials;
  standardsSet: StandardsSet | null;
  eb: EssentialsBonus | null;
}

export enum RecruitType {
  HARD_RECRUIT = "HARD_RECRUIT",
  SOFT_RECRUIT = "SOFT_RECRUIT",
  WALK_ON = "WALK_ON",
}

export interface CollegeProfileDataWrapper {
  collegeProfile: CollegeProfileData;
  tags: Array<Partial<Record<EventType, RecruitType>>> | null;
}

export default CollegeProfileData;
