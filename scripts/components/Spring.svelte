<script>
  export let dataRecord = {
    maxAtBirth: 0,
    maxNow: 0,
    minAtBirth: 0,
    minNow: 0,
    startSpring: 0,
    max1925: 0,
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
        than it did when you were born.
      </p>
    {/if}
    <p>
      It didn't get warmer than <span class="data-value"
        >{dataRecord.maxAtBirth.toFixed(1)}°F</span
      >
      the year you were born.
      <br />
      Now it's
      <span class="data-value">{dataRecord.maxNow.toFixed(1)}°F</span>.
    </p>
    {#if Math.abs(dataRecord.maxAtBirth - dataRecord.maxNow) < 3}
      <p>
        But 100 years ago, the maximum temperature was <span class="data-value"
          >{dataRecord.max1925.toFixed(1)}°F.</span
        >.
      </p>
    {/if}
  </div>
</div>
</div>