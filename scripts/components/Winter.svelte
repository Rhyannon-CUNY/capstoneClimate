<script>
  export let dataRecord = {
    freezing100: 0,
    freezing60: 0,
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
  export let birthYear = '';
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
              There used to be <span class="data-value"
                >{dataRecord.freezingAtBirth} day{dataRecord.freezingAtBirth !== 1 ? 's' : ''}</span
              > below freezing.
            </p>
          {/if}
          {#if birthYear <= 2005 && dataRecord.freezingNow !== null && dataRecord.freezingNow > 0}
            <p>
              Because winters are getting warmer, only <span class="data-value"
                >{dataRecord.freezingNow}</span> {dataRecord.freezingNow === 1 ? 'is' : 'are'} expected to be that cold over the next decade or so.
            </p>
          {/if}
          {#if birthYear <= 2005 && (dataRecord.freezingNow == null || dataRecord.freezingNow == 0)}
            <p>Freezing days are no longer expected in your state.</p>
          {/if}
        {/if}
        <p>
          Winter cooled to <span class="data-value"
            >{dataRecord.minAtBirth.toFixed(1)}°F</span
            > when you were born.
        </p>
        {#if birthYear <= 2005 && dataRecord.minNow - dataRecord.minAtBirth >= 3}
          <p>These days it reaches
            <span class="data-value">{dataRecord.minNow.toFixed(1)}°F.</span>
          </p>
        {/if}
        {#if birthYear >= 1950}
        <p>
          One hundred years ago, it was as cold as <span class="data-value"
            >{dataRecord.min1925.toFixed(1)}°F</span
          >.
        </p>
        {/if}
          {#if dataRecord.alternativeState && dataRecord.alternativeMinAtBirth !== null}
            <p>
              {#if birthYear > 2005}
                In <span class="data-value">{dataRecord.alternativeState}</span>, winters have warmed significantly since 1925.
                The coldest temperatures went from <span class="data-value">{dataRecord.alternativeMin1925?.toFixed(1)}°F</span>
                to <span class="data-value">{dataRecord.alternativeMinAtBirth.toFixed(1)}°F</span>.
              {:else}
                In <span class="data-value">{dataRecord.alternativeState}</span>, winters have warmed significantly since you were born.
                The coldest temperatures went from <span class="data-value">{dataRecord.alternativeMinAtBirth.toFixed(1)}°F</span>
                to <span class="data-value">{dataRecord.alternativeMinNow?.toFixed(1)}°F</span>.
              {/if}
            </p>
          {/if}
      </div>
    </div>
  </div>
</div>
