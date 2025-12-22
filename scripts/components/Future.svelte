<script>
  export let dataRecord = {
    hot60: 0,
    hot100: 0,
    hot2099: 0,
    freezing60: 0,
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
        {#if hot === 'yes' || freezes === 'yes'}
          <!-- Age 67 projections -->
          {#if hot === 'yes' && dataRecord.hot67 && dataRecord.hot67 > 0}
            <p>
              When you're 67 years old, there'll be <span class="data-value">{dataRecord.hot67}</span> day{dataRecord.hot67 !== 1 ? 's' : ''} of extreme
              heat a year.
          {/if}
          {#if freezes === 'yes' && dataRecord.freezing67 && dataRecord.freezing67 > 0}
            <p>
              There'll be <span class="data-value">{dataRecord.freezing67}</span> day{dataRecord.freezing67 !== 1 ? 's' : ''}
              of extreme cold a year by then.
            </p>
          {/if}

          <!-- Age 100 projections -->
          {#if hot === 'yes' && dataRecord.hot100 && dataRecord.hot100 > 0}
            <p>
              By the time you're 100, there'll be <span class="data-value">{dataRecord.hot100}</span> extremely hot
              day{dataRecord.hot100 !== 1 ? 's' : ''}.
            </p>
          {/if}
          {#if freezes === 'yes' && dataRecord.freezing100 && dataRecord.freezing100 > 0}
            <p>
              There'll only be <span class="data-value">{dataRecord.freezing100}</span> day{dataRecord.freezing100 !== 1 ? 's' : ''} of extreme
              cold when you reach 100.
            </p>
          {/if}

          <!-- 2099 projections - only show if different from 100-year projections -->
          {#if hot === 'yes' && dataRecord.hot2099 && dataRecord.hot2099 > 0 && dataRecord.hot2099 !== dataRecord.hot100}
            <p>
              For someone born in 2000, there'll be <span class="data-value">{dataRecord.hot2099}</span> extremely
              hot day{dataRecord.hot2099 !== 1 ? 's' : ''} by the time they turn 100.
            </p>
          {/if}
          {#if freezes === 'yes' && dataRecord.freezing2099 && dataRecord.freezing2099 > 0 && dataRecord.freezing2099 !== dataRecord.freezing100}
            <p>
              For a 25 year old now, there'll only be <span class="data-value">{dataRecord.freezing2099}</span> freezing
              day{dataRecord.freezing2099 !== 1 ? 's' : ''} by the time they are 100.
            </p>
          {/if}
        {:else}
          <p>
            Your state doesn't experience extreme heat or cold days in our
            projections.
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>
<!-- the alternativeState logic still isn't showing for Spring and Summer, but hiding avgNow IS working. It would be nice to have "no more extreme cold days" if the previous value was not zero.  -->
