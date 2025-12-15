<script>
  // import { hostname } from "os";

  export let dataRecord = {
    hot100: 0,
    hot67: 0,
    hot2099: 0,
    hotAtBirth: 0,
    hotNow: 0,
    maxAtBirth: 0,
    maxNow: 0,
    minAtBirth: 0,
    minNow: 0,
    max1925: 0,
  };
  export let hot = 'no';
</script>

<div class="chart">
  <div class="background-wrapper">
    <div class="summer-solid-background"></div>
    <div class="summer-gif-background">
      <h1>Summer</h1>
      <div class="text-wrapper">
        <p>
          When you were born, the hottest it got was <span class="data-value"
            >{dataRecord.maxAtBirth.toFixed(1)}°F
          </span>.
          <br />
          Now it's
          <span class="data-value">{dataRecord.maxNow.toFixed(1)}°F</span>.
        </p>
        {#if Math.abs(dataRecord.maxAtBirth - dataRecord.maxNow) < 3}
          <p>
            In your grandparents's time in 1925, the maximum temperature was <span
              class="data-value">{dataRecord.max1925.toFixed(1)}°F</span
            >.
          </p>
        {/if}
        {#if hot === 'yes'}
          {#if dataRecord.hotAtBirth !== null && dataRecord.hotAtBirth > 0}
            <p>
              There were <span class="data-value"
                >{dataRecord.hotAtBirth}
                days</span
              > above 95°F when you were born.
            </p>
          {/if}
          {#if dataRecord.hotNow !== null && dataRecord.hotAtBirth > 0}
            <p>
              Now there's <span class="data-value">{dataRecord.hotNow}</span>.
            </p>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
