// Write your code!
import scrollama from 'scrollama';
import * as d3 from 'd3';

console.log(scrollama);

// using d3 for convenience, and storing a selected elements
const scrollSections = d3.selectAll('.scroll');

// loop through each scroll section
scrollSections.each(function () {
  const container = d3.select(this);
  const graphic = container.select('.scroll__graphic');
  const chart = graphic.select('.chart');
  const text = container.select('.scroll__text');
  const step = text.selectAll('.step');

  // initialize the scrollama
  const scroller = scrollama();

  function handleResize() {
    // 1. update height of step elements for breathing room between steps
    const stepHeight = Math.floor(window.innerHeight * 0.5);
    step.style('height', stepHeight + 'px');

    // 2. update height of graphic element

    const graphicHeight = window.innerHeight / 2;
    const graphicMarginTop = (window.innerHeight - graphicHeight) / 2;

    graphic
      .style('height', graphicHeight + 'px')
      .style('top', graphicMarginTop + 'px');

    // 4. tell scrollama to update new element dimensions
    scroller.resize();
  }

  function handleStepEnter(response) {
    console.log('handleStepEnter', response);
    // response = { element, direction, index }

    // fade in current step
    step.classed('is-active', function (d, i) {
      return i === response.index;
    });

    // update graphic based on step here
    const activeStep = response.index + 1;
    // Clear the chart ...
    chart.selectAll('p').remove();

    if (activeStep == 1) {
      console.log('DO THE STEP ONE STUFF...');
      chart.append('p').text('A world map with USA highlighted');
    } else if (activeStep == 2) {
      console.log('DO THE STEP TWO STUFF...');
      chart.append('p').text('A world map with USA highlighted');
    } else if (activeStep == 3) {
      console.log('DO THE STEP THREE STUFF...');
      chart.append('p').text('A network map of 4 websites');
    } else if (activeStep == 4) {
      console.log('DO THE STEP FOUR STUFF...');
      chart.append('p').text('A network map of 4 websites');
    } else if (activeStep == 5) {
      console.log('DO THE STEP FIVE STUFF...');
      chart.append('p').text('A network map of 4 websites');
    } else if (activeStep == 6) {
      console.log('DO THE STEP SIX STUFF...');
      chart.append('p').text('Looksmaxing website');
    } else if (activeStep == 7) {
      console.log('DO THE STEP SEVEN STUFF...');
      chart.append('p').text('Looksmaxing website');
    } else if (activeStep == 8) {
      console.log('DO THE STEP EIGHT STUFF...');
      chart.append('p').text('zoom in on looksmaxing website');
    } else if (activeStep == 9) {
      console.log('DO THE STEP NINE STUFF...');
      chart.append('p').text('zoom in on looksmaxing website');
    }

    console.log('activeStep', activeStep);
  }

  function init() {
    console.log('init');
    // 1. call a resize on load to update width/height/position of elements
    handleResize();

    // 2. setup the scrollama instance
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
      .setup({
        container: '#scroll', // our outermost scrollytelling element
        graphic: '.scroll__graphic', // the graphic
        text: '.scroll__text', // the step container
        step: '.scroll__text .step', // the step elements
        offset: 0.5, // set the trigger to be 1/2 way down screen
        debug: false, // display the trigger offset for testing
      })
      .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener('resize', handleResize);
  }

  init();
});
