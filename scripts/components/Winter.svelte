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
        {#if freezes === 'yes'}
          {#if dataRecord.freezingAtBirth !== null && dataRecord.freezingAtBirth > 0}
            <p>
              <span class="data-value"
                >{dataRecord.freezingAtBirth} day{dataRecord.freezingAtBirth !== 1 ? 's' : ''}</span
              > {dataRecord.hotAtBirth === 1 ? ' was ' : ' were '}below freezing when you were born.
            </p>
          {/if}
          {#if dataRecord.freezingNow !== null && dataRecord.freezingNow > 0}
            <p>
              Because winters are getting warmer, now only <span class="data-value"
                >{dataRecord.freezingNow}</span> {dataRecord.freezingNow === 1 ? 'is' : 'are'} that cold.
            </p>
          {/if}
          {#if dataRecord.freezingNow == null || dataRecord.freezingNow == 0}
            <p>Now there aren't anymore freezing days.</p>
          {/if}
        {/if}
        <p>
          Winter cooled to <span class="data-value"
            >{dataRecord.minAtBirth.toFixed(1)}°F</span
            > when you were born.
        </p>
        {#if dataRecord.minNow - dataRecord.minAtBirth >= 3}
          <p>These days it only reaches
            <span class="data-value">{dataRecord.minNow.toFixed(1)}°F.</span>
          </p>
        {/if}
        <p>
          One hundred years ago, it was as cold as <span class="data-value"
            >{dataRecord.min1925.toFixed(1)}°F</span
          >.
        </p>
          {#if dataRecord.alternativeState && dataRecord.alternativeMinAtBirth !== null && dataRecord.alternativeMinNow !== null}
            <p>
              In <span class="data-value">{dataRecord.alternativeState}</span> though, winters have warmed more since you were born.
              The coldest temperatures went from <span class="data-value">{dataRecord.alternativeMinAtBirth.toFixed(1)}°F</span>
              to <span class="data-value">{dataRecord.alternativeMinNow.toFixed(1)}°F</span>.
            </p>
          {/if}
      </div>
    </div>
  </div>
</div>
