import { useOutletContext, Form, redirect } from "react-router-dom";
import { createJob } from "../api";
import { useEffect } from "react";

export async function action({ request }) {
  const form = await request.formData();
  const weather = form.get("weather");
  const location = form.get("location");
  const start_seed = form.get("start_seed");
  const end_seed = form.get("end_seed");
  const job = {
    weather,
    location,
    start_seed,
    end_seed,
  } as JobRequest;
  const data = await createJob(job);
  return redirect(`/job/${data.job_id}`);
}

export default function CreateView() {
  const setPageName = useOutletContext() as OutletContext;
  useEffect(() => setPageName("Create Job"));
  return (
    <div>
      <h1>Create Job</h1>
      <Form method="post">
        <label htmlFor="weather">Weather</label>
        <input type="text" id="weather" name="weather" required={true} />
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" required={true} />
        <label htmlFor="start_seed">Start Seed</label>
        <input
          type="number"
          id="start_seed"
          name="start_seed"
          required={true}
        />
        <label htmlFor="end_seed">End Seed</label>
        <input type="number" id="end_seed" name="end_seed" required={true} />
        <button type="submit">Create Job</button>
      </Form>
    </div>
  );
}
