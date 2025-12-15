console.log('hello from data.js');

import App from './components/App.svelte';
// import Spring from './components/Spring.svelte';
// import Summer from './components/Summer.svelte';

import * as d3 from 'd3';
import climate from '../_data/state_temps.json';
import extremeHeatData from '../_data/extreme_heat_days.json';
import extremeColdData from '../_data/extreme_cold_days.json';
import seasonTiming from '../_data/frost.json';
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

  const freezing67 = milestones.find((m) => m.age === 67)?.days || null;
  const freezing100 = milestones.find((m) => m.age === 100)?.days || null;
  const freezing2099 = milestones.find((m) => m.isEndOfCentury)?.days || null;

  return {
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'winter'),
    minNow: seasonalAverage(stateData.tmin, 2025, 'winter'),
    freezingNow: getCurrentColdDays(state),
    freezingAtBirth: freezingAtBirth,
    freezing67: freezing67,
    freezing100: freezing100,
    freezing2099: freezing2099,
    min1925: seasonalAverage(stateData.tmin, 1925, 'winter'),
  };
}

/* get attributes for spring by state and birthyear */

function getSpring(state, birthYear) {
  const stateData = climate[state];
  if (!stateData) return null;

  const timing = getSeasonTiming(state);

  return {
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'spring'),
    maxAtBirth: seasonalAverage(stateData.tmax, birthYear, 'spring'),
    minNow: seasonalAverage(stateData.tmin, 2025, 'spring'),
    maxNow: seasonalAverage(stateData.tmax, 2025, 'spring'),
    startSpring: timing?.startSpring ?? null,
    max1925: seasonalAverage(stateData.tmax, 1925, 'spring'),
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

  return {
    maxAtBirth: seasonalAverage(stateData.tmax, birthYear, 'summer'),
    maxNow: seasonalAverage(stateData.tmax, 2025, 'summer'),
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'summer'),
    minNow: seasonalAverage(stateData.tmin, 2025, 'summer'),
    hotNow: getCurrentHeatDays(state),
    hotAtBirth: hotAtBirth,
    hot67: hot67,
    hot100: hot100,
    hot2099: hot2099,
    max1925: seasonalAverage(stateData.tmax, 1925, 'summer'),
  };
}
/* get attributes for fall by state and birthyear */

function getFall(state, birthYear) {
  const stateData = climate[state];
  if (!stateData) return null;

  const timing = getSeasonTiming(state);

  return {
    minAtBirth: seasonalAverage(stateData.tmin, birthYear, 'fall'),
    maxAtBirth: seasonalAverage(stateData.tmax, birthYear, 'fall'),
    minNow: seasonalAverage(stateData.tmin, 2025, 'fall'),
    maxNow: seasonalAverage(stateData.tmax, 2025, 'fall'),
    startWinter: timing?.startWinter ?? null,
    max1925: seasonalAverage(stateData.tmax, 1925, 'fall'),
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

// Attach listener after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('show').addEventListener('click', () => {
    const year = parseInt(document.getElementById('birth-year').value);
    const state = document.getElementById('state').value;

    if (!year || !state) {
      console.warn('Select both a state and a birth year');
      return;
    }

    getPersonal(state, year);
  });
});
init();
