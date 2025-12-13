<script>
    export let dataRecord = {
      maxAtBirth: 0,
      maxNow: 0,
      minAtBirth: 0,
      minNow: 0,
      startSpring: 0, // shift in days of spring
    };
    console.log("Spring dataRecord:", dataRecord);
    console.log("Keys in dataRecord:", Object.keys(dataRecord));
  
  </script>
  
  <div class="chart">
    <div class="background-wrapper">
      <div class="spring-solid-background"></div>
      <div class="spring-gif-background">
        <h1>Spring</h1>
        <div class="text-wrapper">
          <p>
            When you were born, it didn't get warmer than {dataRecord.maxAtBirth.toFixed(1)}°F. 
            <br>
            Now it's {dataRecord.maxNow.toFixed(1)}°F.
          </p>
          {#if dataRecord.startSpring !== null && dataRecord.startSpring !== 0}
          <p>
            Spring is starting {Math.abs(dataRecord.startSpring)} days {dataRecord.startSpring < 0 ? 'earlier' : 'later'} than it used to. 
          </p>
            {/if}
        </div>
      </div>
    </div>
  </div>