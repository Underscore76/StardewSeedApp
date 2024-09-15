import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { redirect, useOutletContext, useSubmit } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import WeatherSelect from "../components/CreateJob/WeatherSelect";
import InputField from "../components/General/InputField";
import Toggle from "../components/General/Toggle";
import NightEventSelect from "../components/CreateJob/NightEventSelect";
import JobConfirmDialog from "../components/CreateJob/JobConfirmDialog";
import { createJob } from "../api";

export async function action({ request }: { request: Request }) {
  const job = (await request.json()) as JobRequirements;
  const data = await createJob(job);
  return redirect(`/job/${data.job_id}`);
}

type BaseFormProps = {
  legacyRng: boolean;
  setLegacyRng: React.Dispatch<React.SetStateAction<boolean>>;
  startSeed: number;
  setStartSeed: React.Dispatch<React.SetStateAction<number>>;
  endSeed: number;
  setEndSeed: React.Dispatch<React.SetStateAction<number>>;
  onCreate: () => void;
};
function BaseForm(props: BaseFormProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-6 sm:grid-rows-2 sm:gap-y-0">
        <div className="sm:col-span-3">
          <button
            onClick={props.onCreate}
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Submit Job
          </button>
        </div>
        <div className="sm:col-span-3">
          <Toggle
            value={props.legacyRng}
            setValue={props.setLegacyRng}
            text="Use Legacy Random"
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            id="start_seed"
            label="Start Seed"
            name="start_seed"
            type="number"
            value={props.startSeed}
            setValue={(value) => props.setStartSeed(Number(value))}
            minValue={0}
            maxValue={props.endSeed}
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            id="end_seed"
            label="End Seed"
            name="end_seed"
            type="number"
            value={props.endSeed}
            setValue={(value) => props.setEndSeed(Number(value))}
            minValue={props.startSeed}
            maxValue={2147483647}
          />
        </div>
        <div className="sm:col-span-3"></div>
      </div>
    </div>
  );
}

export default function CreateView() {
  const setPageName = useOutletContext() as OutletContext;
  const submit = useSubmit();
  const [legacyRng, setLegacyRng] = useState(false);
  const [startSeed, setStartSeed] = useState(0);
  const [endSeed, setEndSeed] = useState(100);
  const [weatherRequirements, setWeatherRequirements] = useState<
    WeatherRequirement[]
  >([]);
  const [nightEventRequirements, setNightEventRequirements] = useState<
    NightEventRequirement[]
  >([]);
  const [itemQuestRequirements, setItemQuestRequirements] = useState<
    ItemQuestRequirement[]
  >([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<JobRequirements>();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = (data) => {
    submit(data, { method: "post", encType: "application/json" });
  };

  useEffect(() => {
    setData({
      legacy_rng: legacyRng,
      start_seed: startSeed,
      end_seed: endSeed,
      weather: weatherRequirements,
      night_event: nightEventRequirements,
      item_quest: itemQuestRequirements,
    });
  }, [
    legacyRng,
    startSeed,
    endSeed,
    weatherRequirements,
    nightEventRequirements,
    itemQuestRequirements,
  ]);

  useEffect(() => setPageName("Create Job"));
  return (
    <div>
      <JobConfirmDialog
        open={open}
        onClose={handleClose}
        onAccept={handleAccept}
        data={data}
      />
      <BaseForm
        {...{
          legacyRng,
          setLegacyRng,
          startSeed,
          setStartSeed,
          endSeed,
          setEndSeed,
          onCreate: handleOpen,
        }}
      />
      <TabGroup>
        <TabList className="flex border-b border-gray-200">
          <Tab
            key="weather"
            className="block w-full border-b-2 border-gray-300 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 data-[selected]:border-indigo-500 data-[selected]:text-indigo-600"
          >
            Weather
          </Tab>
          <Tab
            key="night"
            className="block w-full border-b-2 border-gray-300 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 data-[selected]:border-indigo-500 data-[selected]:text-indigo-600"
          >
            Night Events
          </Tab>
          <Tab
            key="quests"
            className="block w-full border-b-2 border-gray-300 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 data-[selected]:border-indigo-500 data-[selected]:text-indigo-600"
          >
            Item Quests
          </Tab>
        </TabList>
        <TabPanels className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TabPanel className="p-4">
            <WeatherSelect
              weatherRequirements={weatherRequirements}
              setWeatherRequirements={setWeatherRequirements}
            />
          </TabPanel>
          <TabPanel className="p-4">
            <NightEventSelect
              nightRequirements={nightEventRequirements}
              setNightRequirements={setNightEventRequirements}
            />
          </TabPanel>
          <TabPanel className="p-4">Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
