<script>
  // import { hostname } from "os";

  export let dataRecord = {
    hot100: 0,
    hot67: 0,
    hot2099: 0,
    hotAtBirth: 0,
    hotNow: 0,
    avgAtBirth: 0,
    avgNow: 0,
    minAtBirth: 0,
    minNow: 0,
    avg1925: 0,
    alternativeState: null,
    alternativeAvgAtBirth: null,
    alternativeAvgNow: null,
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
          The average temperature was <span class="data-value"
            >{dataRecord.avgAtBirth.toFixed(1)}°F
          </span>
          when you were born.
          <br />
          Now it's
          <span class="data-value">{dataRecord.avgNow.toFixed(1)}°F</span>.
          </p>
        {#if Math.abs(dataRecord.avgAtBirth - dataRecord.avgNow) < 3}
          <p>
            But 100 years ago, the average temperature was <span
              class="data-value">{dataRecord.avg1925.toFixed(1)}°F</span
            >.
          </p>
          {#if dataRecord.alternativeState && dataRecord.alternativeAvgAtBirth !== null && dataRecord.alternativeAvgNow !== null}
            <p>
              In somewhere like <span class="data-value">{dataRecord.alternativeState}</span>, the change is more noticeable:
              from <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span>
              to <span class="data-value">{dataRecord.alternativeAvgNow.toFixed(1)}°F</span>.
            </p>
          {/if}
        {/if}
        {#if hot === 'yes'}
          {#if dataRecord.hotAtBirth !== null && dataRecord.hotAtBirth > 0}
            <p>
              There {dataRecord.hotAtBirth === 1 ? 'was' : 'were'} <span class="data-value"
                >{dataRecord.hotAtBirth} day{dataRecord.hotAtBirth !== 1 ? 's' : ''}</span
              > above 95°F when you were born.
            </p>
          {/if}
          {#if dataRecord.hotNow !== null && dataRecord.hotAtBirth > 0}
            <p>
              Now there {dataRecord.hotNow === 1 ? 'is' : 'are'} <span class="data-value">{dataRecord.hotNow} day{dataRecord.hotNow !== 1 ? 's' : ''}</span> that hot.
            </p>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
