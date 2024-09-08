import {
  useLoaderData,
  useOutletContext,
  useRevalidator,
} from "react-router-dom";
import { useUser } from "../UserProvider";
import { useEffect } from "react";
import JobCard from "../components/Jobs/JobCard";

export async function loader(): Promise<Job[]> {
  const response = await fetch("http://localhost:8000/job", {
    credentials: "include",
  });
  const data = (await response.json()) as Job[];
  return data.sort((a, b) => {
    if (a.start_time === b.start_time) {
      return 0;
    }
    return a.start_time < b.start_time ? 1 : -1;
  });
}

export default function Home() {
  const user = useUser();
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
