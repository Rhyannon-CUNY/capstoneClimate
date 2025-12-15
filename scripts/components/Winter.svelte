<script>
  export let dataRecord = {
    freezing100: 0,
    freezing67: 0,
    freezing2099: 0,
    freezingAtBirth: 0,
    freezingNow: 0,
    minAtBirth: 0,
    minNow: 0,
    maxAtBirth: 0,
    maxNow: 0,
    min1925: 0,
  };
  export let freezes = 'no';
</script>

<div class="chart">
  <div class="background-wrapper">
    <div class="winter-solid-background"></div>
    <div class="winter-gif-background">
      <h1>Winter</h1>
      <div class="text-wrapper">
        <p>
          Winters used to get as cold as <span class="data-value"
            >{dataRecord.minAtBirth.toFixed(1)}°F</span
          >. Now it is
          <span class="data-value">{dataRecord.minNow.toFixed(1)}°F.</span>
        </p>
        {#if Math.abs(dataRecord.maxAtBirth - dataRecord.maxNow) < 3}
          <p>
            But in 1925, the maximum temperature was <span class="data-value"
              >{dataRecord.min1925.toFixed(1)}°F</span
            >.
          </p>
        {/if}
        {#if freezes === 'yes'}
          {#if dataRecord.freezingAtBirth !== null && dataRecord.freezingAtBirth > 0}
            <p>
              There was an average <span class="data-value"
                >{dataRecord.freezingAtBirth} days</span
              > that were below freezing when you were born.
            </p>
          {/if}
          {#if dataRecord.freezingNow !== null && dataRecord.freezingNow > 0}
            <p>
              Now there are <span class="data-value"
                >{dataRecord.freezingNow} days</span
              > that cold.
            </p>
          {/if}
          {#if dataRecord.freezingNow == null || dataRecord.freezingNow == 0}
            <p>Now there aren't anymore freezing days.</p>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
