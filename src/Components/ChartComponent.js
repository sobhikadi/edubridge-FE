import React, { useEffect } from "react";

function ChartComponent({ period, chartData }) {
  const { startDate, endDate } = period;

  // Create an array of all the dates between startDate and endDate
  const getAllDaysOfWeek = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let dates = [];

    while (startDate <= endDate) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  const getAllMonths = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let months = [];

    if (startDate.getFullYear() === endDate.getFullYear()) {
      startDate.setMonth(1);
      endDate.setMonth(12);
    }

    while (startDate <= endDate) {
      months.push(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return months;
  };

  // Merge this array with chartData
  const fillMissingDaysOrMonths = (datesOrMonths, chartData, isMonthly) => {
    const filledData = datesOrMonths.map((dateOrMonth) => {
      const formattedDateOrMonth = dateOrMonth.toISOString().split("T")[0];
      const matchingData = chartData?.find((data) =>
        isMonthly
          ? new Date(data.date).getFullYear() === dateOrMonth.getFullYear() &&
            new Date(data.date).getMonth() === dateOrMonth.getMonth()
          : data.date === formattedDateOrMonth
      );

      return matchingData
        ? matchingData
        : {
            date: formattedDateOrMonth,
            count: 0,
          };
    });

    if (isMonthly) {
      const seenMonths = new Set();
      return filledData.filter((data) => {
        const month = new Date(data.date).getMonth();
        const year = new Date(data.date).getFullYear();
        const key = `${year}-${month}`;
        if (seenMonths.has(key)) {
          return false;
        } else {
          seenMonths.add(key);
          return true;
        }
      });
    }

    return filledData;
  };

  // Determine if it's a weekly or monthly view
  const isWeekly =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) <= 7;

  const daysOrMonths = isWeekly
    ? getAllDaysOfWeek(startDate, endDate)
    : getAllMonths(startDate, endDate);

  const filledChartData = fillMissingDaysOrMonths(
    daysOrMonths,
    chartData,
    !isWeekly
  );

  const selectedData = filledChartData;

  const getMonthName = (date) => {
    return new Date(date).toLocaleString("default", { month: "short" });
  };

  const getYearFromStartAndEndDates = () => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();
    return startYear === endYear ? startYear : `${startYear} - ${endYear}`;
  };

  const getWeekNumber = (date) => {
    const tempDate = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date - tempDate) / 86400000 + tempDate.getDay() + 1) / 7
    );
    return weekNumber;
  };

  const getWeekNumberFromStartAndEndDate = () => {
    const startWeek = getWeekNumber(new Date(startDate));
    const endWeek = getWeekNumber(new Date(endDate));
    return startWeek === endWeek ? `${startWeek}` : `${startWeek} - ${endWeek}`;
  };

  useEffect(() => {
    console.log(chartData);
    console.log(filledChartData);
  }, [chartData, filledChartData]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-4 sm:px-10 sm:py-10">
        <div className="flex flex-col items-center w-full lg:w-4/6 p-6 bg-gray-800 rounded-lg sm:p-8 text-slate-200">
          <h2 className="text-xl font-bold">
            {isWeekly ? `Weekly Subscriptions ` : "Monthly Subscriptions"}
          </h2>
          <span className="text-sm font-semibold text-slate-200">
            {isWeekly
              ? `${getYearFromStartAndEndDates()} - Week ${getWeekNumberFromStartAndEndDate()}`
              : getYearFromStartAndEndDates()}
          </span>
          <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
            {selectedData?.map((data) => (
              <div
                className="relative flex flex-col items-center flex-grow pb-5 group mt-10"
                key={data.date}
              >
                <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                  {data.count}
                </span>
                <div
                  className="relative flex justify-center w-full bg-indigo-600"
                  style={{ height: `${data.count}px` }}
                ></div>
                <span className="absolute bottom-0 text-xs font-bold">
                  {isWeekly
                    ? `${getMonthName(data.date)} - ${new Date(
                        data.date
                      ).getDate()}`
                    : getMonthName(data.date)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex w-full mt-6">
            <div className="flex items-center ml-auto">
              <span className="block w-4 h-4 bg-indigo-600"></span>
              <span className="ml-1 text-xs font-medium">Subscriptions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartComponent;
