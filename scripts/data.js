console.log('hello from data.js');

import App from './components/App.svelte';
// import Spring from './components/Spring.svelte';
// import Summer from './components/Summer.svelte';

import * as d3 from 'd3';
import climate from '../_data/state_temps.json';
import extremeHeatData from '../_data/extreme_heat_days.json';
import extremeColdData from '../_data/extreme_cold_days.json';
import seasonTiming from '../_data/frost.json';
import disasterData from '../_data/disaster_freq.json';
// import { get } from 'http';

// using d3 for convenience, and storing a selected elements
const scrollSections = d3.selectAll('#scroll2');

// loop through each scroll section
function init() {
  console.log('Hello init');
  new App({
    target: document.getElementById('app'),
    props: {},
  });
}

/**
 * Generic function to get extreme day projections for specific ages
 * @param {string} state - State name
 * @param {number} birthYear - Birth year
 * @param {object} dataset - The data object (extremeHeatData or extremeColdData)
 * @param {string} dataKey - The key in the data object ('extreme_heat_days' or 'extreme_cold_days')
 * @param {Array} targetAges - Ages to show projections for (default: [67, 100])
 * @returns {object} Extreme day projections
 */

/* combine the seasonal data into one tidy output */

export function getPersonal(state, birthYear) {
  const spring = getSpring(state, birthYear);
  const summer = getSummer(state, birthYear);
  const fall = getFall(state, birthYear);
  const winter = getWinter(state, birthYear);

  const personalData = {
    birthYear: birthYear,
    state: state,
    spring: spring,
    summer: summer,
    fall: fall,
    winter: getWinter(state, birthYear),
    future: {
      hot67: summer?.hot67 || 0,
      hot100: summer?.hot100 || 0,
      hot2099: summer?.hot2099 || 0,
      freezing67: winter?.freezing67 || 0,
      freezing100: winter?.freezing100 || 0,
      freezing2099: winter?.freezing2099 || 0,
    },
    ...getFreezeOrHot(state),
  };

  console.log('personal data', personalData);
  return personalData;
}

/* get attributes for winter by state and birthyear */
function getWinter(state, birthYear) {
  const stateData = climate[state];
  if (!stateData) return null;
  /* pull extreme cold days by age and the end of the century*/
  const coldDaysFuture = getColdDaysByAge(state, birthYear, [67, 100], [2099]);
  const milestones = coldDaysFuture?.milestones || [];
  const freezingAtBirth = getDataForAgeInternal(
    extremeColdData,
    'extreme_cold_days',
    state,
    birthYear,
    0
  );
  const minAtBirth = seasonalAverage(stateData.tmin, birthYear, 'winter');
  const minNow = seasonalAverage(stateData.tmin, 2025, 'winter');
  const alternativeStateData = getAlternativeStateDataWinter(
    'winter',
    birthYear,
    state,
    minAtBirth,
    minNow
  );

  const freezing67 = milestones.find((m) => m.age === 67)?.days || null;
  const freezing100 = milestones.find((m) => m.age === 100)?.days || null;
  const freezing2099 = milestones.find((m) => m.isEndOfCentury)?.days || null;

  return {
    minAtBirth: minAtBirth,
    minNow: minNow,
    freezingNow: getCurrentColdDays(state),
    freezingAtBirth: freezingAtBirth,
    freezing67: freezing67,
    freezing100: freezing100,
    freezing2099: freezing2099,
    min1925: seasonalMultiYearAverage(stateData.tmin, 1895, 1925, 'winter'),
    alternativeState: alternativeStateData?.state || null,
    alternativeMinAtBirth: alternativeStateData?.minAtBirth || null,
    alternativeMinNow: alternativeStateData?.minNow || null,
  };
}

/* get attributes for spring by state and birthyear */

function getSpring(state, birthYear) {
  const stateData = climate[state];
  if (!stateData) return null;

  const timing = getSeasonTiming(state);
  // Use tavg for temperature calculations
  const tempData = stateData.tavg;
  const avgAtBirth = seasonalAverage(tempData, birthYear, 'spring');
  const avgNow = seasonalAverage(tempData, 2025, 'spring');
  const alternativeStateData = getAlternativeStateData(
    'spring',
    birthYear,
    state,
    avgAtBirth,
    avgNow
  );

  return {
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'spring'),
    avgAtBirth: avgAtBirth,
    minNow: seasonalAverage(stateData.tmin, 2025, 'spring'),
    avgNow: avgNow,
    startSpring: timing?.startSpring ?? null,
    avg1925: seasonalMultiYearAverage(tempData, 1895, 1925, 'spring'),
    alternativeState: alternativeStateData?.state || null,
    alternativeAvgAtBirth: alternativeStateData?.avgAtBirth || null,
    alternativeAvgNow: alternativeStateData?.avgNow || null,
  };
}

/* get attributes for summer by state and birthyear */

function getSummer(state, birthYear) {
  const stateData = climate[state];
  if (!stateData) return null;
  /* pull extreme heat days by age and the end of the century*/
  const hotAtBirth = getDataForAgeInternal(
    extremeHeatData,
    'extreme_heat_days',
    state,
    birthYear,
    0
  );
  const heatDaysFuture = getHeatDaysByAge(state, birthYear, [67, 100], [2099]);
  const milestones = heatDaysFuture?.milestones || [];
  const hot67 = milestones.find((m) => m.age === 67)?.days || null;
  const hot100 = milestones.find((m) => m.age === 100)?.days || null;
  const hot2099 = milestones.find((m) => m.isEndOfCentury)?.days || null;
  // Use tavg for temperature calculations
  const tempData = stateData.tavg;
  const avgAtBirth = seasonalAverage(tempData, birthYear, 'summer');
  const avgNow = seasonalAverage(tempData, 2025, 'summer');
  const alternativeStateData = getAlternativeStateData(
    'summer',
    birthYear,
    state,
    avgAtBirth,
    avgNow
  );

  return {
    avgAtBirth: avgAtBirth,
    avgNow: avgNow,
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'summer'),
    minNow: seasonalAverage(stateData.tmin, 2025, 'summer'),
    hotNow: getCurrentHeatDays(state),
    hotAtBirth: hotAtBirth,
    hot67: hot67,
    hot100: hot100,
    hot2099: hot2099,
    avg1925: seasonalMultiYearAverage(tempData, 1895, 1925, 'summer'),
    alternativeState: alternativeStateData?.state || null,
    alternativeAvgAtBirth: alternativeStateData?.avgAtBirth || null,
    alternativeAvgNow: alternativeStateData?.avgNow || null,
  };
}
/* get attributes for fall by state and birthyear */

function getFall(state, birthYear) {
  const stateData = climate[state];
  if (!stateData) return null;

  const timing = getSeasonTiming(state);
  // Use tavg for temperature calculations
  const tempData = stateData.tavg;
  const avgAtBirth = seasonalAverage(tempData, birthYear, 'fall');
  const avgNow = seasonalAverage(tempData, 2025, 'fall');
  const alternativeStateData = getAlternativeStateData(
    'fall',
    birthYear,
    state,
    avgAtBirth,
    avgNow
  );

  return {
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'fall'),
    avgAtBirth: avgAtBirth,
    minNow: seasonalAverage(stateData.tmin, 2025, 'fall'),
    avgNow: avgNow,
    startWinter: timing?.startWinter ?? null,
    avg1925: seasonalMultiYearAverage(tempData, 1895, 1925, 'fall'),
    alternativeState: alternativeStateData?.state || null,
    alternativeAvgAtBirth: alternativeStateData?.avgAtBirth || null,
    alternativeAvgNow: alternativeStateData?.avgNow || null,
  };
}

/* helper functions to feed into seasonal data */

/* Calculate seasonal average temperature
 */
function seasonalAverage(records, year, season) {
  const seasonMonths = {
    winter: [12, 1, 2],
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    fall: [9, 10, 11],
  };

  const seasonValues = records
    .filter((r) => {
      if (r.month === 12 && season === 'winter') return r.year === year - 1;
      return r.year === year && seasonMonths[season].includes(r.month);
    })
    .map((r) => r.value);

  if (!seasonValues.length) return null;

  return seasonValues.reduce((a, b) => a + b, 0) / seasonValues.length;
}

/* Calculate seasonal average temperature across multiple years (1895-1925 baseline)
 */
function seasonalMultiYearAverage(records, startYear, endYear, season) {
  const seasonMonths = {
    winter: [12, 1, 2],
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    fall: [9, 10, 11],
  };

  const seasonValues = [];

  // Collect data for all years in the range
  for (let year = startYear; year <= endYear; year++) {
    const yearRecords = records.filter((r) => {
      if (r.month === 12 && season === 'winter') return r.year === year - 1;
      return r.year === year && seasonMonths[season].includes(r.month);
    });

    seasonValues.push(...yearRecords.map((r) => r.value));
  }

  if (!seasonValues.length) return null;

  return seasonValues.reduce((a, b) => a + b, 0) / seasonValues.length;
}

/* Get alternative state data for comparison */
function getAlternativeStateData(
  season,
  birthYear,
  currentState,
  currentTempAtBirth,
  currentTempNow
) {
  // Find the state with the greatest temperature change for this season
  // that has a significantly greater change than the current state

  let bestAlternativeState = null;
  let bestChange = 0;
  const minSignificantChange = 5; // Minimum degree difference to be considered significant

  // Calculate the current state's temperature change
  const currentChange = Math.abs(currentTempNow - currentTempAtBirth);

  // Analyze all states to find the best alternative
  Object.keys(climate).forEach((state) => {
    // Skip the current state and states without data
    if (state === currentState || !climate[state]) return;

    const stateData = climate[state];
    // Use tavg for temperature calculations
    const tempData = stateData.tavg;
    const tempAtBirth = seasonalAverage(tempData, birthYear, season);
    const tempNow = seasonalAverage(tempData, 2025, season);

    if (tempAtBirth !== null && tempNow !== null) {
      const change = Math.abs(tempNow - tempAtBirth);

      // Look for states with significantly greater changes
      if (
        change > bestChange &&
        change > currentChange + minSignificantChange
      ) {
        bestChange = change;
        bestAlternativeState = state;
      }
    }
  });

  // If we found a suitable alternative state, return its data
  if (bestAlternativeState && climate[bestAlternativeState]) {
    const stateData = climate[bestAlternativeState];
    // Use tavg for temperature calculations
    const tempData = stateData.tavg;
    return {
      state: bestAlternativeState,
      avgAtBirth: seasonalAverage(tempData, birthYear, season),
      avgNow: seasonalAverage(tempData, 2025, season),
      minAtBirth: seasonalAverage(stateData.tmin, birthYear, season),
      minNow: seasonalAverage(stateData.tmin, 2025, season),
      temperatureChange: bestChange,
    };
  }

  // If no suitable alternative found, return null
  return null;
}

/* Get alternative state data for winter comparison (uses min temperatures) */
function getAlternativeStateDataWinter(
  season,
  birthYear,
  currentState,
  currentMinAtBirth,
  currentMinNow
) {
  // Find the state with the greatest temperature change for winter
  // that has a significantly greater change than the current state

  let bestAlternativeState = null;
  let bestChange = 0;
  const minSignificantChange = 5; // Minimum degree difference to be considered significant

  // Calculate the current state's temperature change
  const currentChange = Math.abs(currentMinNow - currentMinAtBirth);

  // Analyze all states to find the best alternative
  Object.keys(climate).forEach((state) => {
    // Skip the current state and states without data
    if (state === currentState || !climate[state] || !climate[state].tmin)
      return;

    const stateData = climate[state];
    const minAtBirth = seasonalAverage(stateData.tmin, birthYear, season);
    const minNow = seasonalAverage(stateData.tmin, 2025, season);

    if (minAtBirth !== null && minNow !== null) {
      const change = Math.abs(minNow - minAtBirth);

      // Look for states with significantly greater changes
      if (
        change > bestChange &&
        change > currentChange + minSignificantChange
      ) {
        bestChange = change;
        bestAlternativeState = state;
      }
    }
  });

  // If we found a suitable alternative state, return its data
  if (bestAlternativeState && climate[bestAlternativeState]) {
    const stateData = climate[bestAlternativeState];
    return {
      state: bestAlternativeState,
      minAtBirth: seasonalAverage(stateData.tmin, birthYear, season),
      minNow: seasonalAverage(stateData.tmin, 2025, season),
      temperatureChange: bestChange,
    };
  }

  // If no suitable alternative found, return null
  return null;
}

/**
 * Generic function to get extreme day projections for specific ages
 */
function getExtremeDaysByAge(
  state,
  birthYear,
  dataset,
  dataKey,
  targetAges = [67, 100],
  targetYears = []
) {
  const stateData = dataset[state];
  if (!stateData) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;

  function getDataForAge(age) {
    const targetYear = birthYear + age;

    if (targetYear <= 2022) {
      return { dataYear: 2005, days: stateData[dataKey]['2005'] };
    } else if (targetYear <= 2049) {
      return { dataYear: 2039, days: stateData[dataKey]['2039'] };
    } else if (targetYear <= 2079) {
      return { dataYear: 2059, days: stateData[dataKey]['2059'] };
    } else {
      return { dataYear: 2099, days: stateData[dataKey]['2099'] };
    }
  }

  const milestones = [];

  for (const age of targetAges) {
    if (currentAge < age) {
      //person hasn't reach the age yet
      const data = getDataForAge(age);
      milestones.push({
        age: age,
        year: birthYear + age,
        days: data.days,
        dataYear: data.dataYear,
      });
    }
  }
  for (const year of targetYears) {
    if (year > currentYear) {
      let age = year - birthYear;
      const data = getDataForAge(age);
      milestones.push({
        age: age,
        year: year,
        days: data.days,
        dataYear: data.dataYear,
        isEndOfCentury: true,
      });
    }
  }

  return {
    state: state,
    birthYear: birthYear,
    currentAge: currentAge,
    milestones: milestones,
  };
}

function getDataForAgeInternal(dataset, dataKey, state, birthYear, age) {
  const stateData = dataset[state]?.[dataKey];
  if (!stateData) return null;

  const targetYear = birthYear + age;

  if (targetYear <= 2022) return stateData['2005'];
  if (targetYear <= 2049) return stateData['2039'];
  if (targetYear <= 2079) return stateData['2059'];
  return stateData['2099'];
}

/**
 * Get current extreme days for comparison
 * @param {string} state - State name
 * @param {object} dataset - The data object (extremeHeatData or extremeColdData)
 * @param {string} dataKey - The key in the data object ('extreme_heat_days' or 'extreme_cold_days')
 * @returns {number} Current extreme days (closest to current year)
 */
function getCurrentExtremeDays(state, dataset, dataKey) {
  const stateData = dataset[state];
  if (!stateData) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  // Map current year to closest data point
  if (currentYear <= 2022) {
    return stateData[dataKey]['2005'];
  } else if (currentYear <= 2049) {
    return stateData[dataKey]['2039'];
  } else if (currentYear <= 2079) {
    return stateData[dataKey]['2059'];
  } else {
    return stateData[dataKey]['2099'];
  }
}

// Convenience wrapper functions for heat days
function getHeatDaysByAge(
  state,
  birthYear,
  targetAges = [67, 100],
  targetYears = [2099]
) {
  return getExtremeDaysByAge(
    state,
    birthYear,
    extremeHeatData,
    'extreme_heat_days',
    targetAges,
    targetYears
  );
}

function getCurrentHeatDays(state) {
  return getCurrentExtremeDays(state, extremeHeatData, 'extreme_heat_days');
}

// Convenience wrapper functions for cold days
function getColdDaysByAge(
  state,
  birthYear,
  targetAges = [67, 100],
  targetYears = [2099]
) {
  return getExtremeDaysByAge(
    state,
    birthYear,
    extremeColdData,
    'extreme_cold_days',
    targetAges,
    targetYears
  );
}

function getCurrentColdDays(state) {
  return getCurrentExtremeDays(state, extremeColdData, 'extreme_cold_days');
}

/* Get season timing changes for a state
 * @param {string} state - State name
 * @returns {object} Season timing data
 */
function getSeasonTiming(state) {
  const stateData = seasonTiming[state];
  if (!stateData) {
    return null;
  }

  return {
    startWinter: stateData.startWinter,
    startSpring: stateData.startSpring,
  };
}

function showData() {
  console.log('running ShowData');
  const div = document.getElementById('results');
}

function getFreezeOrHot(state) {
  const coldData = extremeColdData[state]?.extreme_cold_days;
  const heatData = extremeHeatData[state]?.extreme_heat_days;

  const freezes = coldData
    ? Object.values(coldData).some((days) => days > 0) // any year > 0
      ? 'yes'
      : 'no'
    : 'no';

  const hot = heatData
    ? Object.values(heatData).some((days) => days > 0)
      ? 'yes'
      : 'no'
    : 'no';

  return { freezes, hot };
}
init();
