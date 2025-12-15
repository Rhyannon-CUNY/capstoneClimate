<script>
  export let dataRecord = {
    maxAtBirth: 0,
    maxNow: 0,
    minAtBirth: 0,
    minNow: 0,
    startWinter: 0,
    max1925: 0,
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
            than it used to when you were born.
          </p>
        {/if}
        <p>
          Back then it didn't get warmer than <span class="data-value"
            >{dataRecord.maxAtBirth.toFixed(1)}°F</span
          >.
          <br />
          Now it's
          <span class="data-value">{dataRecord.maxNow.toFixed(1)}°F</span>.
        </p>
        {#if Math.abs(dataRecord.maxAtBirth - dataRecord.maxNow) < 3}
          <p>
            In your grandparents' time, the warmest temperature in fall was <span
              class="data-value">{dataRecord.max1925.toFixed(1)}°F</span
            >.
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>
