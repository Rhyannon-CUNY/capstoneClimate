<script>
  // import { hostname } from "os";

  export let dataRecord = {
    hot100: 0,
    hot60: 0,
    hot2099: 0,
    hotPast: 0,
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
  export let birthYear = '';
</script>

<div class="chart">
  <div class="background-wrapper">
    <div class="summer-solid-background"></div>
    <div class="summer-gif-background">
      <h1>Summer</h1>
      <div class="text-wrapper">
        {#if hot === 'yes'}
          {#if dataRecord.hotPast !== null && dataRecord.hotPast > 0}
            <p>
              In the past, there were <span class="data-value"
                >{dataRecord.hotPast} day{dataRecord.hotPast !== 1 ? 's' : ''}</span
              > above 95°F.
            </p>
          {/if}
          {#if dataRecord.hotNow !== null && dataRecord.hotPast > 0}
            <p>
              Now <span class="data-value">{dataRecord.hotNow} day{dataRecord.hotNow !== 1 ? 's' : ''}</span> {dataRecord.hotNow === 1 ? 'is' : 'are'}  expected to be that hot.
            </p>
          {/if}
        {/if}
        {#if birthYear >= 1950}
          <p>100 years ago the average temperature was <span
              class="data-value">{dataRecord.avg1925.toFixed(1)}°F</span>.
          </p>
        {/if}
        <p>
          When you were born, the average temperature was <span class="data-value"
            >{dataRecord.avgAtBirth.toFixed(1)}°F
          </span>.
        </p>
        {#if birthYear <= 2005}
          <p>This year it's <span class="data-value">{dataRecord.avgNow.toFixed(1)}°F</span>.</p>
        {/if}

        {#if dataRecord.alternativeState && dataRecord.alternativeAvgAtBirth !== null}
          <p>
            {#if birthYear > 2005}
              <span class="data-value">{dataRecord.alternativeState}</span> has changed a lot since 1925:
              from <span class="data-value">{dataRecord.alternativeAvg1925?.toFixed(1)}°F</span>
              to <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span>.
            {:else}
              <span class="data-value">{dataRecord.alternativeState}</span> has changed a lot since you were born:
              from <span class="data-value">{dataRecord.alternativeAvgAtBirth.toFixed(1)}°F</span>
              to <span class="data-value">{dataRecord.alternativeAvgNow?.toFixed(1)}°F</span>.
            {/if}
          </p>
        {/if}
        
      </div>
    </div>
  </div>
</div>
