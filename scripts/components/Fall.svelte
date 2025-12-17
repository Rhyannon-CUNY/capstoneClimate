<script>
  export let dataRecord = {
    avgAtBirth: 0,
    avgNow: 0,
    minAtBirth: 0,
    minNow: 0,
    startWinter: 0,
    avg1925: 0,
    alternativeState: null,
    alternativeAvgAtBirth: null,
    alternativeAvgNow: null,
  };
  console.log('Fall dataRecord:', dataRecord);
</script>

<div class="chart">
  <div class="background-wrapper">
    <div class="fall-solid-background"></div>
    <div class="fall-gif-background">
      <h1>Fall</h1>
      <div class="text-wrapper">
        {#if dataRecord.startWinter !== null && dataRecord.startWinter !== 0}
          <p>
            Winter is starting <span class="data-value"
              >{Math.abs(dataRecord.startWinter)} days {dataRecord.startWinter <
              0
                ? 'earlier'
                : 'later'}</span
            >
            than it used to. It's warmer for longer.
          </p>
        {/if}
        <p>
          The average temperature was <span class="data-value"
            >{dataRecord.avgAtBirth.toFixed(1)}°F</span
          >
          when you were born.
          <br />
          Now it's
          <span class="data-value">{dataRecord.avgNow.toFixed(1)}°F</span>.
          </p>
        {#if Math.abs(dataRecord.avgAtBirth - dataRecord.avgNow) < 3}
          <p>
            But 100 years ago, the average was <span
              class="data-value">{dataRecord.avg1925.toFixed(1)}°F</span
            >.
          </p>
          {#if dataRecord.alternativeState && dataRecord.alternativeAvgAtBirth !== null && dataRecord.alternativeAvgNow !== null}
            <p>
              Some states have changed more since you were born. In <span class="data-value">{dataRecord.alternativeState}</span> fall temperatures have risen
              from <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span>
              to <span class="data-value">{dataRecord.alternativeAvgNow.toFixed(1)}°F</span>.
            </p>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
