import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../utils";
import { Link } from "react-router-dom";

type JobListItemProps = {
  job: Job;
  onShare?: () => void;
  onDelete?: () => void;
};

const statuses = {
  pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  running: "text-blue-800 bg-blue-50 ring-blue-600/20",
  complete: "text-green-700 bg-green-50 ring-green-600/20",
  failed: "text-red-800 bg-red-50 ring-red-600/20",
};

export default function JobListItem(props: JobListItemProps) {
  const { job } = props;
  const onShare = () => {
    const path = `${window.location.origin}/shared/${job.user_id}.${job.job_id}`;
    navigator.clipboard.writeText(path);
    if (props.onShare) {
      props.onShare();
    }
  };
  const onDelete = () => {
    props.onDelete && props.onDelete();
  };
  return (
    <li
      key={job.job_id}
      className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
    >
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {job.job_id}
          </p>
          <p
            className={classNames(
              statuses[job.status],
              "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
            )}
          >
            {job.status}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            Started on <time dateTime={job.start_time}>{job.start_time}</time>
          </p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          to={`/job/${job.job_id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          View job
        </Link>
        <Menu as="div" className="relative z-50 flex-none">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <a
                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                onClick={onShare}
              >
                Share
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                onClick={onDelete}
              >
                Delete
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </li>
  );
}

// export default function Example() {
//   return (
//     <ul role="list" className="divide-y divide-gray-100">
//       {people.map((person) => (

//       ))}
//     </ul>
//   )
// }
