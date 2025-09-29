// Write your code!
import scrollama from 'scrollama';
import * as d3 from 'd3';

console.log(scrollama);

// using d3 for convenience, and storing a selected elements
const container = d3.select('#scroll');
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

  var graphicHeight = window.innerHeight / 2;
  var graphicMarginTop = (window.innerHeight - graphicHeight) / 2;

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
  var activeStep = response.index + 1;
  // Clear the chart ...
  chart.selectAll('p').remove();
  if (activeStep == 1) {
    console.log('DO THE STEP ONE STUFF...');
    chart.append('p').text('Step 1 active');
  } else if (activeStep == 2) {
    console.log('DO THE STEP TWO STUFF...');
    chart.append('p').text('Step 2 active');
  } else if (activeStep == 3) {
    console.log('DO THE STEP THREE STUFF...');
    chart.append('p').text('Step 3 active');
  } else if (activeStep == 4) {
    console.log('DO THE STEP FOUR STUFF...');
    chart.append('p').text('Step 4 active');
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
