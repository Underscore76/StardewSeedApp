import {
  redirect,
  redirectDocument,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import JobItem from "../components/JobItem";
import { getSharedJob } from "../api";
import { useEffect } from "react";

export async function loader({ params }) {
  const shareId = params.shareId as string | undefined;
  if (shareId === undefined) {
    return redirect("/");
  }
  return await getSharedJob(shareId);
}

export default function ShareView() {
  const data = useLoaderData() as SharedJob;
  const setPageName = useOutletContext() as OutletContext;
  useEffect(() => setPageName("Create Job"));
  return (
    <div>
      <h2>{`Shared by ${data.user.global_name} (${data.user.username})`}</h2>
      <JobItem job={data.job} />
    </div>
  );
}
