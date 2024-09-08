type JobRequest = {
  weather: string;
  location: string;
  start_seed: number;
  end_seed: number;
};

type Job = {
  user_id: string;
  payload: any;
  start_time: string;
  end_time: string;
  status: string;
  job_id: string;
  job_hash: string;
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
