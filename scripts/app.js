// Write your code!
import scrollama from 'scrollama';
import * as d3 from 'd3';
import maplibregl from 'maplibre-gl';

const map = new maplibregl.Map({
  container: 'map', // container id
  style: 'https://demotiles.maplibre.org/globe.json', // style URL
  center: [-95.5795, 37.8283], // Center of U.S. [lng, lat]
  zoom: 3.9, // starting zoom
  interactive: false, // Disable map interactions
});

function panAndZoomMap(lng, lat, zoomLevel) {
  map.flyTo({
    center: [lng, lat], // New coordinates [lng, lat]
    zoom: zoomLevel, // New zoom level
    essential: true, // This ensures the animation is user-friendly
  });
}

map.on('load', () => {
  map.resize();
});

console.log(maplibregl);
console.log(map);

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

    // get chart ID
    const chartID = chart.attr('id');

    console.log('Chart ID:', chartID, 'Active Step:', activeStep);

    // Clear the chart ...
    chart.selectAll('p').remove();

    if (chartID === 'chart1') {
      if (activeStep == 1) {
        console.log('DO THE STEP ONE STUFF...');
        chart
          .append('p')
          .text('blue overlay on map for winter, animations of snow?');
      } else if (activeStep == 2) {
        console.log('DO THE STEP TWO STUFF...');
        chart
          .append('p')
          .text('pink overlay for spring, animation of flowers?');
      } else if (activeStep == 3) {
        console.log('DO THE STEP THREE STUFF...');
        chart
          .append('p')
          .text('red overlay for summer, animation of fan blowing?');
      } else if (activeStep == 4) {
        console.log('DO THE STEP FOUR STUFF...');
        chart
          .append('p')
          .text('orange overlay for autumn, animation of leaves falling?');
      }
    } else if (chartID === 'chart2') {
      if (activeStep == 1) {
        console.log('DO THE STEP ONE STUFF...'); //restart the count for chart2
        chart
          .append('p')
          .text('Bar chart of extreme weather events, 1925-2025');
      } else if (activeStep == 2) {
        console.log('DO THE STEP TWO STUFF...');
        chart
          .append('p')
          .text('Bar chart of extreme weather events, 1925-2025');
      } else if (activeStep == 3) {
        console.log('DO THE STEP THREE STUFF...');
        chart.append('p').text('Sea level rise, 1925-2025');
      }
    }

    console.log(
      'After everything - activeStep:',
      activeStep,
      'chartID:',
      chartID
    );
  }

  function init() {
    console.log('init');
    // 1. call a resize on load to update width/height/position of elements
    handleResize();

    const containerNode = container.node(); // selectors are specific to containers

    // 2. setup the scrollama instance
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
      .setup({
        container: containerNode, // choose each container
        graphic: '.scroll__graphic', // the graphic
        text: '.scroll__text', // the step container
        step: containerNode.querySelectorAll('.scroll__text .step'), // the step elements chosen for each separate container
        offset: 0.5, // set the trigger to be 1/2 way down screen
        debug: false, // display the trigger offset for testing
      })
      .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener('resize', handleResize);
  }

  init();
});
