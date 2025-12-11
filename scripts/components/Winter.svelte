<script>
    export let dataRecord = {
      freezing100: 0,
      freezing67: 0,
      freezing2099: 0,
      freezingAtBirth: 0,
      freezingNow: 0,
      minAtBirth: 0,
      minNow: 0,
    };
  </script>
  
  <div class="chart">
    <div class="background-wrapper">
      <div class="winter-solid-background"></div>
        <div class="winter-gif-background">
        <h2>Winter Data</h2>
        <ul>
          <li><strong>Max at Birth:</strong> {dataRecord.minAtBirth}</li>
          <li><strong>Max Now:</strong> {dataRecord.minNow}</li>
          <li><strong>Extreme cold days at birth:</strong> {dataRecord.freezingAtBirth}</li>
          <li><strong>Extreme cold days now:</strong> {dataRecord.freezingNow}</li>
          <li><strong>Extreme cold days at age 67:</strong> {dataRecord.freezing67}</li>
          <li><strong>Extreme cold days at age 100:</strong> {dataRecord.freezing100}</li>
          <li><strong>Extreme cold days at end of century:</strong> {dataRecord.freezing2099}</li>
        </ul>
      </div>
    </div>
</div>