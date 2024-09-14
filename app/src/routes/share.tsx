import {
  Params,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import JobItem from "../components/JobItem";
import { getSharedJob } from "../api";
import { useEffect } from "react";

export async function loader({ params }: { params: Params }) {
  const shareId = params.shareId as string | undefined;
  if (shareId === undefined) {
    return redirect("/");
  }
  return await getSharedJob(shareId);
}

export default function ShareView() {
  const data = useLoaderData() as SharedJob;
  const setPageName = useOutletContext() as OutletContext;
  useEffect(() =>
    setPageName(`Shared by ${data.user.global_name} (${data.user.username})`),
  );
  return (
    <div>
      <JobItem job={data.job} />
    </div>
  );
}
