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
        <h2>Fall Data</h2>
        <ul>
          <li><strong>Max at Birth:</strong> {dataRecord.maxAtBirth}</li>
          <li><strong>Max Now:</strong> {dataRecord.maxNow}</li>
          <li><strong>Min at Birth:</strong> {dataRecord.minAtBirth}</li>
          <li><strong>Min Now:</strong> {dataRecord.minNow}</li>
          <li><strong>Start of Winter:</strong> {dataRecord.startWinter}</li>
        </ul>
      </div>
    </div>
</div>