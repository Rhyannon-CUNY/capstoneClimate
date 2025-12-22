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
  export let birthYear = '';
  console.log('Spring dataRecord:', dataRecord);
</script>

<div class="chart" id="spring-section">
      <div class="spring-solid-background"></div>
      <div class="spring-gif-background">
        <h1>Spring</h1>
  <div class="text-wrapper">
    {#if dataRecord.startSpring !== null && dataRecord.startSpring !== 0}
      <p>
        Spring is starting <span class="data-value"
          >{Math.abs(dataRecord.startSpring)} day{Math.abs(dataRecord.startSpring) !== 1 ? 's' : ''} {dataRecord.startSpring < 0
            ? 'earlier'
            : 'later'}</span
        >
        than it did in 1895. Sweater weather is becoming shorter.
      </p>
    {/if}
    {#if birthYear >= 1950}
      <p>100 years ago, the average temperature was <span class="data-value"
          >{dataRecord.avg1925.toFixed(1)}°F</span>
      </p>
    {/if}
    <p>
      When you were born, the average temperature was <span class="data-value"
        >{dataRecord.avgAtBirth.toFixed(1)}°F
      </span>.
    </p>
    {#if birthYear <= 2005}
      <p>This year it was
        <span class="data-value">{dataRecord.avgNow.toFixed(1)}°F</span>.
      </p>
    {/if}
      {#if dataRecord.alternativeState && dataRecord.alternativeAvgAtBirth !== null}
        <p>
          {#if birthYear > 2005}
            Somewhere like <span class="data-value">{dataRecord.alternativeState}</span> has experienced more change:
            from <span class="data-value">{dataRecord.alternativeAvg1925?.toFixed(1)}°F</span>
            to <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span> since 1925.
          {:else}
            Somewhere like <span class="data-value">{dataRecord.alternativeState}</span> has warmed from
           <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span>
            to <span class="data-value">{dataRecord.alternativeAvgNow?.toFixed(1)}°F</span> since you were born.
          {/if}
        </p>
      {/if}
  </div>
</div>
</div>
