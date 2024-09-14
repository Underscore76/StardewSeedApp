type JobItemProps = {
  job: Job;
};

export default function JobItem(props: JobItemProps) {
  const { job } = props;
  return (
    <div className="w-full bg-discord-gray p-4">
      <p key="id">Job ID: {job.job_id}</p>
      <p key="hash">Job Hash: {job.job_hash}</p>
      <p key="start">Start Time: {job.start_time}</p>
      <p key="end">End Time: {job.end_time}</p>
    </div>
  );
}
