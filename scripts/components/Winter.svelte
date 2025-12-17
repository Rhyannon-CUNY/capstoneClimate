<script>
  export let dataRecord = {
    freezing100: 0,
    freezing67: 0,
    freezing2099: 0,
    freezingAtBirth: 0,
    freezingNow: 0,
    minAtBirth: 0,
    minNow: 0,
    min1925: 0,
    alternativeState: null,
    alternativeMinAtBirth: null,
    alternativeMinNow: null,
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
          >. Now it reaches
          <span class="data-value">{dataRecord.minNow.toFixed(1)}°F.</span>
        <br>
            But in 1925, the minimum temperature was <span class="data-value"
              >{dataRecord.min1925.toFixed(1)}°F</span
            >.
          </p>
          {#if dataRecord.alternativeState && dataRecord.alternativeMinAtBirth !== null && dataRecord.alternativeMinNow !== null}
            <p>
              In <span class="data-value">{dataRecord.alternativeState}</span> though, winters have changed more starkly since you were born..
              The coldest temperatures went from <span class="data-value">{dataRecord.alternativeMinAtBirth.toFixed(1)}°F</span>
              to <span class="data-value">{dataRecord.alternativeMinNow.toFixed(1)}°F</span>.
            </p>
          {/if}
        {#if freezes === 'yes'}
          {#if dataRecord.freezingAtBirth !== null && dataRecord.freezingAtBirth > 0}
            <p>
              There was an average <span class="data-value"
                >{dataRecord.freezingAtBirth} day{dataRecord.freezingAtBirth !== 1 ? 's' : ''}</span
              > {dataRecord.freezingAtBirth === 1 ? 'that was' : 'that were'} below freezing when you were born.
            </p>
          {/if}
          {#if dataRecord.freezingNow !== null && dataRecord.freezingNow > 0}
            <p>
              Now there {dataRecord.freezingNow === 1 ? 'is' : 'are'} only <span class="data-value"
                >{dataRecord.freezingNow} day{dataRecord.freezingNow !== 1 ? 's' : ''}</span
              > that cold because winters are getting warmer.
            </p>
          {/if}
          {#if dataRecord.freezingNow == null || dataRecord.freezingNow == 0}
            <p>Now there {dataRecord.freezingAtBirth === 1 ? "isn't anymore freezing day" : "aren't anymore freezing days"}.</p>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
