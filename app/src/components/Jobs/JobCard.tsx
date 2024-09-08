import { Link } from "react-router-dom";
import Card from "../Cards/Card";
import JobList from "./JobList";

type JobCardProps = {
  jobs: Job[];
  onDelete?: () => void;
};

function CardButtons() {
  return (
    <div className="ml-4 mt-2 flex-shrink-0">
      <Link
        to="/create"
        type="button"
        className="relative inline-flex items-center rounded-md bg-discord-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create new job
      </Link>
    </div>
  );
}

export default function JobCard(props: JobCardProps) {
  return (
    <Card title="Jobs" buttons={CardButtons()}>
      <JobList jobs={props.jobs} onDeleteJob={props.onDelete} />
    </Card>
  );
}
