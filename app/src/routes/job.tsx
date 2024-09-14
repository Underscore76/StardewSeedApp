import {
  redirect,
  Params,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import JobItem from "../components/JobItem";
import { getJob } from "../api";
import { useEffect } from "react";

export async function loader({ params }: { params: Params }) {
  const jobId = params.jobId as string | undefined;
  if (jobId === undefined) {
    return redirect("/");
  }
  return await getJob(jobId);
}

export default function JobView() {
  const data = useLoaderData() as Job;
  const setPageName = useOutletContext() as OutletContext;
  useEffect(() => setPageName("Job: " + data.job_id));
  return (
    <div>
      <h1>My Job</h1>
      <JobItem job={data} />
    </div>
  );
}
