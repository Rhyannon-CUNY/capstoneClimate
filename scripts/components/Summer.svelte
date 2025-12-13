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
    };
    export let hot = 'no'; 

  </script>
  
  <div class="chart">
    <div class="background-wrapper">
      <div class="summer-solid-background"></div>
      <div class="summer-gif-background">
        <h1>Summer</h1>
          <div class="text-wrapper">
            {#if hot === 'yes'}
            {#if dataRecord.hotAtBirth !== null && dataRecord.hotAtBirth > 0}
                <p>There were {dataRecord.hotAtBirth} days above 95°F when you were born.</p>
            {/if}         
            {#if dataRecord.hot67 !== null && dataRecord.hot67 > 0}
                <p>When you're 67 years old, there will be {dataRecord.hot67} days that hot.</p>
            {/if}
            {#if dataRecord.hot100 !== null && dataRecord.hot100 > 0}
                <p>By the time you're 100, there'll be {dataRecord.hot100} extremely hot days.</p>
            {/if}
            {#if dataRecord.hot2099 !== null && dataRecord.hot2099 > 0}
                <p>For someone born in 2000, there will be {dataRecord.hot2099} extremely hot days when they turn 100.</p>
            {/if}
        {:else}
            <p>Your state doesn't get extreme heat days!</p>
        {/if}
          </div>
      </div>
    </div>
  </div>