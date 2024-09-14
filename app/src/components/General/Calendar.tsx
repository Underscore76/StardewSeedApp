import { useMemo, useState } from "react";

type Requirement = any;

type CellFunc = (req?: Requirement) => React.ReactNode;

type CalendarProps = {
  itemChildren: {
    [day: number]: Requirement;
  };
  cellFunc: CellFunc;
  onClick: (day: number) => void;
  clearSeason: (season: number, year: number) => void;
  clearAll: () => void;
};

function dateCell(
  day: number,
  children?: React.ReactNode,
  onClick?: () => void,
) {
  return (
    <td
      key={`${day}-cell`}
      className="min-w-32 whitespace-nowrap border border-solid border-black p-0 text-left align-text-top"
      onClick={onClick}
    >
      <span className="inline-block w-5 border-b border-r border-solid border-black text-right">
        {day}
      </span>
      <br />
      {children}
    </td>
  );
}

export default function Calendar(props: CalendarProps) {
  const [year, setYear] = useState(0);
  const [season, setSeason] = useState(0);
  const seasonName = ["Spring", "Summer", "Fall", "Winter"];
  const offset = useMemo(() => {
    return year * 112 + 28 * season; // Calculate offset based on the current month and year
  }, [year, season]);

  const prevSeason = () => {
    if (season === 0 && year === 0) return; // Prevent going to negative year
    const nextSeason = (season - 1 + 4) % 4;
    if (nextSeason === 3) {
      setYear((prev) => prev - 1);
    }
    setSeason(nextSeason);
  };
  const nextSeason = () => {
    const nextSeason = (season + 1) % 4;
    if (nextSeason === 0) {
      setYear((prev) => prev + 1);
    }
    setSeason(nextSeason);
  };

  const clearSeason = () => {
    props.clearSeason(season, year);
  };

  const clearAll = () => {
    props.clearAll();
  };

  return (
    <table className="border-collapse border-2 border-solid border-black bg-white">
      <thead className="bg-[#333] font-medium text-white">
        <tr>
          <th colSpan={1}>
            <button
              onClick={clearSeason}
              className="rounded-md border-gray-400"
            >
              Clear Season
            </button>
          </th>
          <th colSpan={1}>
            <button onClick={clearAll} className="rounded-md border-gray-400">
              Clear All
            </button>
          </th>
          <th colSpan={1}>
            <button onClick={prevSeason}>{"<"}</button>
          </th>
          <th colSpan={1}>{`${seasonName[season]} Year ${year + 1}`}</th>
          <th colSpan={1}>
            <button onClick={nextSeason}>{">"}</button>
          </th>
          <th colSpan={2} />
        </tr>
        <tr>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>Th</th>
          <th>F</th>
          <th>Sa</th>
          <th>Su</th>
        </tr>
      </thead>
      <tbody className="table-row-group border-inherit">
        <tr>
          {[...Array(7)].map((_, index) =>
            dateCell(
              index + 1,
              props.cellFunc(props.itemChildren?.[index + offset + 1]),
              () => props.onClick(index + offset + 1),
            ),
          )}
        </tr>
        <tr>
          {[...Array(7)].map((_, index) =>
            dateCell(
              index + 8,
              props.cellFunc(props.itemChildren?.[index + offset + 8]),
              () => props.onClick(index + offset + 8),
            ),
          )}
        </tr>
        <tr>
          {[...Array(7)].map((_, index) =>
            dateCell(
              index + 15,
              props.cellFunc(props.itemChildren?.[index + offset + 15]),
              () => props.onClick(index + offset + 15),
            ),
          )}
        </tr>
        <tr>
          {[...Array(7)].map((_, index) =>
            dateCell(
              index + 22,
              props.cellFunc(props.itemChildren?.[index + offset + 22]),
              () => props.onClick(index + offset + 22),
            ),
          )}
        </tr>
      </tbody>
    </table>
  );
}
