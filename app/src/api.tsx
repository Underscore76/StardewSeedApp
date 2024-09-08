export async function getSharedJob(shareId: string): Promise<Job> {
  const response = await fetch(`http://localhost:8000/job/shared/${shareId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function getJob(jobId: string): Promise<Job> {
  const response = await fetch(`http://localhost:8000/job/${jobId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function createJob(job: JobRequest): Promise<Job> {
  const response = await fetch("http://localhost:8000/job", {
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
  console.log("deleting", jobId, `http://localhost:8000/job/${jobId}`);
  const result = await fetch(`http://localhost:8000/job/${jobId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result.json();
}

export async function updateCookies(token: string): Promise<void> {
  await fetch("http://localhost:8000/user/token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
}
