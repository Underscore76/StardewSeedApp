type JobStatus = "pending" | "running" | "complete" | "failed";

type Job = {
  user_id: string;
  payload: JobRequirements;
  start_time: string;
  end_time: string;
  status: JobStatus;
  job_id: string;
  job_hash: string;
  seeds?: number[];
};

type Weather = "Sunny" | "Rain" | "Storm" | "Snow" | "GreenRain";

type WeatherRequirement = {
  weather: Weather;
  day: number;
};

type NightEvent =
  | "None"
  | "Fairy"
  | "Witch"
  | "Meteor"
  | "StoneOwl"
  | "StrangeCapsule"
  | "WindStorm";

type NightEventRequirement = {
  event: NightEvent;
  day: number;
};

type ItemQuestRequirement = {
  day: number;
  person: string;
  id?: string;
  people_known?: string[];
  has_furnace?: boolean;
  has_desert?: boolean;
  mine_level?: number;
  has_socialize_quest?: boolean;
  cookie_recipes_known?: number;
};

type JobRequirements = {
  legacy_rng: boolean;
  start_seed: number;
  end_seed: number;
  weather: WeatherRequirement[];
  night_event: NightEventRequirement[];
  item_quest: ItemQuestRequirement[];
};

type User = {
  id: string;
  username: string;
  avatar: string;
  global_name: string;
};

type SharedJob = {
  job: Job;
  user: User;
};

type OutletContext = (name: string) => void;
