import moment from "moment";

export const filterDataByDropdown = (data, dataField, dropdownSelections) => {
  return data.filter((datum) => {
    let isSelectionIncluded = Array.isArray(datum[dataField])
      ? datum[dataField].some((v) => dropdownSelections.includes(v))
      : dropdownSelections.includes(datum[dataField]);

    return dropdownSelections.includes("all") || isSelectionIncluded;
  });
};

export const filterDataByTimescale = (data, timeRange) => {
  return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
};
export const binDataByTimestamp = (data, timeRange) => {
  let bin = {};

  for (
    let idx = timeRange.unixStart;
    idx <= Math.round(new Date().getTime() / 1000);
    idx += timeRange.divisionInterval
  ) {
    data.push({
      unixTime: moment(moment.unix(idx), timeRange.timeConversion).unix(),
      latency: 0,
      count: 0,
      fake: true,
    });
  }

  data.forEach((datapoint) => {
    let timeBin = moment.unix(datapoint.unixTime).format(timeRange.timeFormat);
    if (bin.hasOwnProperty(timeBin)) {
      if (datapoint.fake) bin[timeBin].tick = true;
      return bin[timeBin].push(datapoint);
    }
    bin[timeBin] = [datapoint];
  });

  let binnedData = Object.keys(bin).map((key) => {
    return {
      unixTime: moment(
        moment.unix(bin[key][0].unixTime).format(timeRange.timeConversion)
      ).unix(),
      latency: +(
        bin[key].map((arr) => +arr.latency).reduce((a, b) => a + b) /
        bin[key].length
      ).toFixed(3),
      count: bin[key].filter((datapoint) => !datapoint.hasOwnProperty("fake"))
        .length,
    };
  });

  return binnedData.sort((a, b) => a.unixTime - b.unixTime);
};
