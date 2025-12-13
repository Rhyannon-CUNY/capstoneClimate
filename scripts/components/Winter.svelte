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
    };
    export let freezes = 'no'; 
  </script>
  
  <div class="chart">
    <div class="background-wrapper">
      <div class="winter-solid-background"></div>
        <div class="winter-gif-background">
        <h1>Winter</h1>
        <div class="text-wrapper">
          <p>Winters used to cool to {dataRecord.minAtBirth.toFixed(1)}°F. Now it is {dataRecord.minNow.toFixed(1)}°F
          </p>
          {#if freezes === 'yes'}
            {#if dataRecord.freezingAtBirth !== null && dataRecord.freezingAtBirth > 0}
              <p>There was an average {dataRecord.freezingAtBirth} days that were below freezing when you were born.
              </p>
            {/if}
            {#if dataRecord.freezing67}
              <p>When you're 67 years-old, there will be {dataRecord.freezing67} days that cold 
              </p>
            {/if}
            {#if dataRecord.freezing100 !== null && dataRecord.freezing100 > 0}
              <p>By the time you're 100, there'll be {dataRecord.freezing100} freezing days.
              </p>
            {/if}
            {#if dataRecord.freezing2099}
              <p>For someone born in 2000, there will be {dataRecord.freezing2099} freezing days by the time they reach 100. 
              </p>
            {/if}
          {/if}
          </div>
      </div>
    </div>
</div>