/**
 * Format extreme cold days section as HTML
 * @param {object} coldDays - Cold days projection data
 * @param {number} currentColdDays - Current cold days
 * @returns {string} HTML string
 */
// function formatColdDaysHTML(coldDays, currentColdDays) {
//   if (!coldDays || !coldDays.milestones) {
//     return '';
//   }

//   let html = '';

//   if (currentColdDays !== null) {
//     html += `<p>There's around ${Math.round(
//       currentColdDays
//     )} really cold days per year now, when it's below 32°F.</p>`;
//   }

//   if (coldDays.milestones.length > 0) {
//     html += '<p>By the time you are...</p>';
//     coldDays.milestones.forEach((m) => {
//       html += `<p><strong>${m.age} years old</strong> there'll be ${Math.round(
//         m.days
//       )} really cold days every year</p>`;
//     });
//   } else {
//     html += `<p>You're already ${coldDays.currentAge} years old, congratulations!</p>`;
//   }

//   return html;
// }

// /**
//  * Format winter end change text
//  * @param {number} days - Number of days change (negative = earlier)
//  * @returns {string} Formatted text
//  */
// function formatWinterEndText(days) {
//   if (days === null || days === 0) {
//     return '';
//   }

// if (days < 0) {
//   // Negative means winter is ending earlier
//   return `<p>Spring is coming ${absDays} days sooner than it did a century ago.</p>`;
// } else {
//   // Positive means winter is ending later
//   return `<p>Winter is ending ${absDays} days later than it did a century ago.</p>`;
// }

// /**
//  * Format first frost change text
//  * @param {number} days - Number of days change (positive = later)
//  * @returns {string} Formatted text
//  */
// function formatFirstFrostText(days) {
//   if (days === null || days === 0) {
//     return '';
//   }

//   const absDays = Math.abs(days);

//   if (days > 0) {
//     // Positive means first frost is happening later (fall eating into winter)
//     return `<p>Fall is eating into the winter months now. First frost happens ${absDays} days later than it used to 100 years ago.</p>`;
//   } else {
//     // Negative means first frost is happening earlier
//     return `<p>First frost is happening ${absDays} days earlier than it used to 100 years ago.</p>`;
//   }
// }

// function showData() {
//   console.log('running ShowData');
//   const div = document.getElementById('results');
//   div.innerHTML = ''; // Clear previous results

//   try {
//     const selectYear = parseInt(document.getElementById('birth-year').value);
//     const selectState = document.getElementById('state').value;

//     if (!selectYear || !selectState)
//       throw new Error('Please select both a state and a birth year.');

//     const stateData = climate[selectState];
//     if (!stateData) throw new Error(`No data available for ${selectState}.`);

//     // Get extreme heat data
//     const heatDays = getHeatDaysByAge(selectState, selectYear);
//     const currentHeatDays = getCurrentHeatDays(selectState);

//     // Get extreme cold data
//     const coldDays = getColdDaysByAge(selectState, selectYear);
//     const currentColdDays = getCurrentColdDays(selectState);

//     // Get season timing data
//     const timing = getSeasonTiming(selectState);

//     // Helper function: calculate seasonal average safely
//     const seasonalAverage = (records, year, season) => {
//       const seasonMonths = {
//         winter: [12, 1, 2],
//         spring: [3, 4, 5],
//         summer: [6, 7, 8],
//         fall: [9, 10, 11],
//       };

//       const seasonValues = records
//         .filter((r) => {
//           if (r.month === 12 && season === 'winter') return r.year === year - 1;
//           return r.year === year && seasonMonths[season].includes(r.month);
//         })
//         .map((r) => r.value);

//       if (!seasonValues.length) return null;

//       return seasonValues.reduce((a, b) => a + b, 0) / seasonValues.length;
//     };

//     // --- Calculate seasonal min/max for birth year and 2025 ---
//     // Winter: only minimum temperatures
//     const winterMinBirth = seasonalAverage(
//       stateData.tmin,
//       selectYear,
//       'winter'
//     );
//     const winterMinNow = seasonalAverage(stateData.tmin, 2025, 'winter');

//     const springMinBirth = seasonalAverage(
//       stateData.tmin,
//       selectYear,
//       'spring'
//     );
//     const springMinNow = seasonalAverage(stateData.tmin, 2025, 'spring');
//     const springMaxBirth = seasonalAverage(
//       stateData.tmax,
//       selectYear,
//       'spring'
//     );
//     const springMaxNow = seasonalAverage(stateData.tmax, 2025, 'spring');

//     // Summer: only maximum temperatures
//     const summerMaxBirth = seasonalAverage(
//       stateData.tmax,
//       selectYear,
//       'summer'
//     );
//     const summerMaxNow = seasonalAverage(stateData.tmax, 2025, 'summer');

//     const fallMinBirth = seasonalAverage(stateData.tmin, selectYear, 'fall');
//     const fallMinNow = seasonalAverage(stateData.tmin, 2025, 'fall');
//     const fallMaxBirth = seasonalAverage(stateData.tmax, selectYear, 'fall');
//     const fallMaxNow = seasonalAverage(stateData.tmax, 2025, 'fall');

//     // --- Convert to safe strings (avoid calling toFixed on null) ---
//     const toStr = (val) => (val !== null ? val.toFixed(1) : 'N/A');

//     const describeChange = (birth, now, type) => {
//       if (birth === null || now === null) return '';
//       if (now > birth) return type === 'min' ? 'warmer' : 'hotter';
//       if (now < birth) return type === 'min' ? 'colder' : 'cooler';
//       return 'about the same';
//     };

// --- Build innerHTML with custom sentences per season ---
// div.innerHTML = `
//   <h3>In your lifetime, your climate has changed...</h3>

//   <p>Winters are now ${describeChange(winterMinBirth, winterMinNow, 'min')}. The minimum temperature used to be ${toStr(winterMinBirth)}°F. Now it only gets as cold as ${toStr(winterMinNow)}°F.</p>

//   ${formatColdDaysHTML(coldDays, currentColdDays)}

//   <p>In spring it is ${describeChange(springMinBirth, springMinNow, 'min')}. It used to get as cold as ${toStr(springMinBirth)}°F, now it's ${toStr(springMinNow)}°F. The maximum went from ${toStr(springMaxBirth)}°F to ${toStr(springMaxNow)}°F.</p>

//   ${timing ? formatWinterEndText(timing.winterEndChange) : ''}

//   <p>Summers are ${describeChange(summerMaxBirth, summerMaxNow, 'max')}. The maximum used to be ${toStr(summerMaxBirth)}°F, now it reaches ${toStr(summerMaxNow)}°F.</p>

//   ${formatHeatDaysHTML(heatDays, currentHeatDays)}

//   <p>Falls are ${describeChange(fallMinBirth, fallMinNow, 'min')}. Minimum temperatures changed from ${toStr(fallMinBirth)}°F to ${toStr(fallMinNow)}°F, and maximums from ${toStr(fallMaxBirth)}°F to ${toStr(fallMaxNow)}°F.</p>

//   ${timing ? formatFirstFrostText(timing.firstFrostChange) : ''}
// `;
//   } catch (err) {
//     div.innerHTML = `❗ ${err.message}`;
//   }
// }

// /**
//  * Format extreme heat days section as HTML
//  * @param {object} heatDays - Heat days projection data
//  * @param {number} currentHeatDays - Current heat days
//  * @returns {string} HTML string
//  */
// function formatHeatDaysHTML(heatDays, currentHeatDays) {
//     if (!heatDays || !heatDays.milestones) {
//       return '';
//     }

//     let html = '';

//     if (currentHeatDays !== null) {
//       html += `<p>There's around ${Math.round(
//         currentHeatDays
//       )} really hot days per year now, when it's above 95°F.</p>`;
//     }

//     if (heatDays.milestones.length > 0) {
//       html += '<p>By the time you are...</p>';
//       heatDays.milestones.forEach((m) => {
//         html += `<p><strong>${m.age} years old</strong> there'll be ${Math.round(
//           m.days
//         )} really hot days every year</p>`;
//       });
//     } else {
//       html += `<p>You're already ${heatDays.currentAge} years old, congratulations!</p>`;
//     }

//     return html;
//   }
