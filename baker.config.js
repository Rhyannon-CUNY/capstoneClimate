const entrypoints = [
  // Add more script entrypoints here as needed
  'data',
];

export default {
  output: 'docs',
  domain: 'https://Rhyannon-CUNY.github.io',
  entrypoints: `scripts/${
    entrypoints.length > 1 ? `{${entrypoints.join(',')}}` : entrypoints[0]
  }.js`,
  pathPrefix: '/capstoneClimate/',
};
