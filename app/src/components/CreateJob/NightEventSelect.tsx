import { useMemo } from "react";
import Calendar from "../General/Calendar";
import { classNames } from "../../utils";

type NightEventSelectProps = {
  nightRequirements: NightEventRequirement[];
  setNightRequirements: React.Dispatch<
    React.SetStateAction<NightEventRequirement[]>
  >;
};

function NightEventCell(event?: NightEvent) {
  return (
    <div
      className={classNames(
        event === "Fairy" && "bg-pink-300",
        event === "Witch" && "bg-gray-600",
        event === "Meteor" && "bg-purple-600",
        event === "StoneOwl" && "bg-gray-400",
        event === "StrangeCapsule" && "bg-green-200",
        event === "WindStorm" && "bg-blue-200",
        event === undefined && "bg-gray-50",
        "h-6 cursor-pointer rounded-md border border-gray-300 px-3 text-center font-semibold",
      )}
    >
      {event ? event : "Any"}
    </div>
  );
}

const eventOptions: NightEvent[] = [
  "Fairy",
  "Witch",
  "Meteor",
  "StoneOwl",
  "StrangeCapsule",
  "WindStorm",
];

export default function NightEventSelect(props: NightEventSelectProps) {
  const { nightRequirements, setNightRequirements } = props;

  const onClick = (day: number) => {
    const existingRequirement = nightRequirements.find(
      (req) => req.day === day,
    )?.event;

    if (existingRequirement) {
      const index = eventOptions.indexOf(existingRequirement);
      if (index + 1 < eventOptions.length) {
        setNightRequirements((prev) => [
          ...prev.filter((req) => req.day !== day),
          { day, event: eventOptions[index + 1] },
        ]);
      } else {
        setNightRequirements((prev) => prev.filter((req) => req.day !== day));
      }
    } else {
      setNightRequirements((prev) => [
        ...prev,
        { day, event: "Fairy" }, // Default event
      ]);
    }
  };

  const clearSeason = (season: number, year: number) => {
    const dayStart = season * 28 + year * 112;
    const dayEnd = dayStart + 28;
    setNightRequirements((prev) =>
      prev.filter((req) => req.day < dayStart || req.day > dayEnd),
    );
  };

  const clearAll = () => {
    setNightRequirements([]);
  };

  const options = useMemo(() => {
    const d = {};
    nightRequirements.forEach((req) => {
      const day = req.day;
      d[day] = req.event;
    });
    return d;
  }, [nightRequirements]);

  return (
    <div className="px-4 py-4 shadow">
      <div className="pb-4">
        Click on a cell for each day to set your desired state (click through to
        reset a day to Any). Clear Season will clear all settings for the
        specific season, while Clear All will reset everything.
        <br />
        Night events occur on the night of the selected day (e.g. if you select
        Day 1 fairy, it'll occur during the night between day 1 and day 2).
      </div>
      <Calendar
        itemChildren={options}
        cellFunc={NightEventCell}
        onClick={(d) => onClick(d)}
        clearAll={clearAll}
        clearSeason={clearSeason}
      />
    </div>
  );
}
