<script>
  import Spring from './Spring.svelte';
  import Summer from './Summer.svelte';
  import Fall from './Fall.svelte';
  import Winter from './Winter.svelte';
  import Future from './Future.svelte';
  import { getPersonal } from '../data.js';
  import { states } from './states.js';
  import { years } from './years.js';

  let state = '';
  let birthYear = '';
  let springData = null;
  let summerData = null;
  let fallData = null;
  let winterData = null;
  let futureData = null;
  let freezes = 'no';
  let hot = 'no';

  function handleSubmit() {
    console.log('handling submit', state, birthYear);
    const personalData = getPersonal(state, parseInt(birthYear));
    springData = personalData.spring; // Extract the spring data
    summerData = personalData.summer; // Extract the summer data
    fallData = personalData.fall; // Extract the fall data
    winterData = personalData.winter; // Extract the fall data
    futureData = personalData.future; // Extract the future data
    freezes = personalData.freezes;
    hot = personalData.hot;

    // Scroll smoothly to spring section after data loads
    setTimeout(() => {
      const springSection = document.getElementById('spring-section');
      if (springSection) {
        springSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }
</script>

<div>
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      <h2>Where were you born?</h2>
      <select bind:value={state}>
        <option value="" disabled selected>State</option>
        {#each states as stateOption}
          <option value={stateOption.State}>{stateOption.State}</option>
        {/each}
      </select>
    </label>
    <label>
      <h2>What year?</h2>
      <select bind:value={birthYear}>
        <option value="" disabled selected>Year</option>
        {#each years as year}
          <option value={year.Year}>{year.Year}</option>
        {/each}
      </select>
    </label>
    <button type="submit">Your climate story</button>
  </form>
  <section class="chart-container">
    {#if springData}
      <Spring dataRecord={springData} />
    {/if}
    {#if summerData}
      <Summer dataRecord={summerData} {hot} />
    {/if}
    {#if fallData}
      <Fall dataRecord={fallData} />
    {/if}
    {#if winterData}
      <Winter dataRecord={winterData} {freezes} />
    {/if}
    {#if futureData}
      <Future dataRecord={futureData} {hot} {freezes} />
    {/if}
  </section>
</div>
