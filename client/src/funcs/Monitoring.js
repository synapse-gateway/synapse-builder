export const filterDataByDropdown = (data, dataField, dropdownSelections) => {
  console.log("in func", data, dataField, dropdownSelections);
  return data.filter((datum) => {
    // console.log("in func arr", datum[dataField]);
    let isSelectionIncluded = Array.isArray(datum[dataField])
      ? datum[dataField].some((v) => dropdownSelections.includes(v))
      : dropdownSelections.includes(datum[dataField]);

    return dropdownSelections.includes("all") || isSelectionIncluded;
  });
};

export const filterDataByTimescale = (data, timeRange) => {
  return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
};
