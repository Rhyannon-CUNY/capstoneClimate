<script>
    export let dataRecord = {
      maxAtBirth: 0,
      maxNow: 0,
      minAtBirth: 0,
      minNow: 0,
      startWinter: 0,
    };
  </script>
  
  <div class="chart">
    <div class="background-wrapper">
      <div class="fall-solid-background"></div>
        <div class="fall-gif-background">
        <h1 style="color:#92cdc5">Fall</h1>
        <div class="text-wrapper">
          <p>
            When you were born, it used to get as cool as {dataRecord.maxAtBirth.toFixed(1)}°F. 
            <br>
            Now it's {dataRecord.maxNow.toFixed(1)}°F.
          </p>
          {#if dataRecord.startWinter !== null && dataRecord.startWinter !== 0}
          <p>
            Winter is starting {Math.abs(dataRecord.startWinter)} days {dataRecord.startWinter < 0 ? 'earlier' : 'later'} than it used to. 
          </p>
          {/if}
        </div>
        </div>
    </div>
  </div>