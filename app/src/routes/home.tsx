import {
  useLoaderData,
  useOutletContext,
  useRevalidator,
} from "react-router-dom";
import { useEffect } from "react";
import JobCard from "../components/Jobs/JobCard";
import { listJobs } from "../api";

export async function loader(): Promise<Job[]> {
  const data = await listJobs();
  return data;
}

export default function Home() {
  const revalidator = useRevalidator();
  const setPageName = useOutletContext() as OutletContext;
  const jobs = useLoaderData() as Job[];
  useEffect(() => {
    setPageName("Home");
  });

  const onDelete = () => {
    revalidator.revalidate();
  };
  return <JobCard jobs={jobs} onDelete={onDelete} />;
}
