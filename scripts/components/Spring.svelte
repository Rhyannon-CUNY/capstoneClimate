<script>
  export let dataRecord = {
    avgAtBirth: 0,
    avgNow: 0,
    minAtBirth: 0,
    minNow: 0,
    startSpring: 0,
    avg1925: 0,
    alternativeState: null,
    alternativeAvgAtBirth: null,
    alternativeAvgNow: null,
  };
  console.log('Spring dataRecord:', dataRecord);
</script>

<div class="chart" id="spring-section">
  <div class="gradient-transition"></div>
      <div class="spring-solid-background"></div>
      <div class="spring-gif-background">
        <h1>Spring</h1>
  <div class="text-wrapper">
    {#if dataRecord.startSpring !== null && dataRecord.startSpring !== 0}
      <p>
        Spring is starting <span class="data-value"
          >{Math.abs(dataRecord.startSpring)} days {dataRecord.startSpring < 0
            ? 'earlier'
            : 'later'}</span
        >
        than it did when you were born. Sweater weather is becoming shorter.
      </p>
    {/if}
    <p>
      The average temperature was <span class="data-value"
        >{dataRecord.avgAtBirth.toFixed(1)}°F</span
      >
      the year you were born.
    </p>
    <p>These days it's
      <span class="data-value">{dataRecord.avgNow.toFixed(1)}°F</span>.
        That might not sound like much, but 100 years ago, the average temperature was <span class="data-value"
          >{dataRecord.avg1925.toFixed(1)}°F</span>
    </p>
      {#if dataRecord.alternativeState && dataRecord.alternativeAvgAtBirth !== null && dataRecord.alternativeAvgNow !== null}
        <p>
          Somewhere like <span class="data-value">{dataRecord.alternativeState}</span> has experienced more change:
          from <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span>
          to <span class="data-value">{dataRecord.alternativeAvgNow.toFixed(1)}°F</span> since you were born.
        </p>
      {/if}
  </div>
</div>
</div>
