<script>
  export let dataRecord = {
    hot67: 0,
    hot100: 0,
    hot2099: 0,
    freezing67: 0,
    freezing100: 0,
    freezing2099: 0,
  };
  export let hot = 'no';
  export let freezes = 'no';
  console.log('Future dataRecord:', dataRecord);
  console.log('Hot:', hot, 'Freezes:', freezes);
</script>

<div class="chart">
  <div class="background-wrapper">
    <div class="future-solid-background"></div>
    <div class="future-gif-background">
      <h1>Your future</h1>
      <div class="text-wrapper">
        {#if hot === 'yes'}
          {#if dataRecord.hot67 && dataRecord.hot67 > 0}
            <p>
              When you're 67 years old, there'll be <span class="data-value">{dataRecord.hot67}</span> days of extreme
              heat a year.
            </p>
          {/if}
          {#if dataRecord.hot100 && dataRecord.hot100 > 0}
            <p>
              By the time you're 100, there'll be <span class="data-value">{dataRecord.hot100}</span> extremely hot
              days.
            </p>
          {/if}
          {#if dataRecord.hot2099 && dataRecord.hot2099 > 0}
            <p>
              For someone born in 2000, there'll be <span class="data-value">{dataRecord.hot2099}</span> extremely
              hot days when they turn 100.
            </p>
          {/if}
        {/if}

        {#if freezes === 'yes'}
          {#if dataRecord.freezing67 && dataRecord.freezing67 > 0}
            <p>
              When you're 67 years old, there'll be <span class="data-value">{dataRecord.freezing67}</span> days
              of extreme cold a year.
            </p>
          {/if}
          {#if dataRecord.freezing100 && dataRecord.freezing100 > 0}
            <p>
              By the time you're 100, it'll be <span class="data-value">{dataRecord.freezing100} days</span> of extreme
              cold.
            </p>
          {/if}
          {#if dataRecord.freezing2099 && dataRecord.freezing2099 > 0}
            <p>
              For someone born in 2000, there'll be <span class="data-value">{dataRecord.freezing2099}</span> freezing
              days by the time they reach 100.
            </p>
          {/if}
        {/if}

        <!-- Fallback -->
        {#if hot === 'no' && freezes === 'no'}
          <p>
            Your state doesn't experience extreme heat or cold days in our
            projections.
          </p>
        {/if}
      </div>
      <div class="footnote-section">
        <h3>Data Sources</h3>
        <p>
          This analysis is based on climate projections and historical data from
          the following sources:
          <br />NOAA National Centers for Environmental Information - Climate
          data and temperature records
          <br />U.S. Global Change Research Program - Future climate projections
          <br />NASA Earth Observatory - Seasonal timing and frost data
          <br />University of Chicago Climate Impact Lab - Extreme heat and cold
          day projections
        </p>
        <p style="margin-top: 1.5rem; font-style: italic;">
          Projections represent mid-range climate scenarios and actual outcomes
          may vary. Data last updated: December 2024.
        </p>
      </div>
    </div>
  </div>
</div>
