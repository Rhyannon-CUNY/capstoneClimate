<script>
    export let dataRecord = {
      hot100: 0,
      hot67: 0,
      hot2099: 0,
      hotAtBirth: 0,
      hotNow: 0,
      maxAtBirth: 0,
      maxNow: 0,
    };
  </script>
  
  <div class="chart">
    <div class="background-wrapper">
      <div class="summer-solid-background"></div>
        <div class="summer-gif-background">
        <h2>Summer Data</h2>
        <ul>
          <li><strong>Max at Birth:</strong> {dataRecord.maxAtBirth}</li>
          <li><strong>Max Now:</strong> {dataRecord.maxNow}</li>
          <li><strong>Extreme heat days at birth:</strong> {dataRecord.hotAtBirth}</li>
          <li><strong>Extreme heat days now:</strong> {dataRecord.hotNow}</li>
          <li><strong>Extreme heat days at age 67:</strong> {dataRecord.hot67}</li>
          <li><strong>Extreme heat days at age 100:</strong> {dataRecord.hot100}</li>
          <li><strong>Extreme heat days at end of century:</strong> {dataRecord.hot2099}</li>
        </ul>
      </div>
    </div>
</div>