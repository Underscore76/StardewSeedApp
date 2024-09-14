export const BASE_URL =
  import.meta.env.MODE == "dev"
    ? "http://localhost:8000"
    : "https://seed-api.underscore76.net";

export async function getSharedJob(shareId: string): Promise<Job> {
  const response = await fetch(`${BASE_URL}/job/shared/${shareId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function getJob(jobId: string): Promise<Job> {
  const response = await fetch(`${BASE_URL}/job/${jobId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function createJob(job: JobRequirements): Promise<Job> {
  const response = await fetch(`${BASE_URL}/job`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  return response.json();
}

export async function deleteJob(jobId: string): Promise<boolean> {
  console.log("deleting", jobId, `${BASE_URL}/job/${jobId}`);
  const result = await fetch(`${BASE_URL}/job/${jobId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result.json();
}

export async function updateCookies(token: string): Promise<void> {
  await fetch(`${BASE_URL}/user/token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
}

export async function listJobs(): Promise<Job[]> {
  const response = await fetch(`${BASE_URL}/job`, {
    credentials: "include",
  });
  const data = await response.json();
  return data.sort((a, b) => {
    if (a.start_time === b.start_time) {
      return 0;
    }
    return a.start_time < b.start_time ? 1 : -1;
  });
}
