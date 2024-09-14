import { useMemo } from "react";
import Calendar from "../General/Calendar";
import { classNames } from "../../utils";

type WeatherSelectProps = {
  weatherRequirements: WeatherRequirement[];
  setWeatherRequirements: React.Dispatch<
    React.SetStateAction<WeatherRequirement[]>
  >;
};

function WeatherCell(weather?: Weather) {
  return (
    <div
      className={classNames(
        weather === "Sunny" && "bg-yellow-200",
        weather === "Rain" && "bg-blue-200",
        weather === "Storm" && "bg-gray-400",
        weather === "Snow" && "bg-white",
        weather === "GreenRain" && "bg-green-200",
        "h-6 cursor-pointer rounded-md border border-gray-300 bg-gray-50 px-3 text-center font-semibold",
      )}
    >
      {weather ? weather : "Any"}
    </div>
  );
}

const weatherOptions: Weather[] = [
  "Sunny",
  "Rain",
  "Storm",
  "Snow",
  "GreenRain",
];

export default function WeatherSelect(props: WeatherSelectProps) {
  const { weatherRequirements, setWeatherRequirements } = props;

  const onClick = (day: number) => {
    const existingRequirement = weatherRequirements.find(
      (req) => req.day === day,
    )?.weather;
    console.log({ day, existingRequirement, options });

    if (existingRequirement) {
      const index = weatherOptions.indexOf(existingRequirement);
      if (index + 1 < weatherOptions.length) {
        setWeatherRequirements((prev) => [
          ...prev.filter((req) => req.day !== day),
          { day, weather: weatherOptions[index + 1] },
        ]);
      } else {
        setWeatherRequirements((prev) => prev.filter((req) => req.day !== day));
      }
    } else {
      setWeatherRequirements((prev) => [
        ...prev,
        { day, weather: "Sunny" }, // Default weather
      ]);
    }
  };

  const clearSeason = (season: number, year: number) => {
    const dayStart = season * 28 + year * 112;
    const dayEnd = dayStart + 28;
    setWeatherRequirements((prev) =>
      prev.filter((req) => req.day < dayStart || req.day > dayEnd),
    );
  };

  const clearAll = () => {
    setWeatherRequirements([]);
  };

  const options = useMemo(() => {
    const d = {};
    weatherRequirements.forEach((req) => {
      const day = req.day;
      d[day] = req.weather;
    });
    return d;
  }, [weatherRequirements]);

  return (
    <div className="px-4 py-4 shadow">
      <div className="pb-4">
        Click on the weather for each day to set your desired state (click
        through to reset a day to Any). Clear Season will clear all settings for
        the specific season, while Clear All will reset everything.
      </div>
      <Calendar
        itemChildren={options}
        cellFunc={WeatherCell}
        onClick={(d) => onClick(d)}
        clearAll={clearAll}
        clearSeason={clearSeason}
      />
    </div>
  );
}
