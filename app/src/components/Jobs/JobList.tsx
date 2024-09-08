import { useState } from "react";
import JobListItem from "./JobListItem";
import Notification from "../General/Notification";
import { deleteJob } from "../../api";

type JobListProps = {
  jobs: Job[];
  onDeleteJob?: () => void;
};

export default function JobList(props: JobListProps) {
  const { jobs } = props;
  const [show, setShow] = useState(false);
  const onDelete = (jobId: string) => () => {
    console.log("Deleting job", jobId);
    deleteJob(jobId).then(() => {
      props.onDeleteJob && props.onDeleteJob();
    });
  };
  return (
    <>
      <ul
        role="list"
        className="min-h-96 divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {jobs.map((job) => (
          <JobListItem
            job={job}
            key={job.job_id}
            onShare={() => setShow(true)}
            onDelete={onDelete(job.job_id)}
          />
        ))}
      </ul>
      <Notification
        show={show}
        setShow={setShow}
        text="Link copied to clipboard!"
        variant="success"
      />
    </>
  );
}
