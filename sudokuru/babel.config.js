module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      [
        "styled-jsx/babel",
        {
           "optimizeForSpeed": true 
        }
      ]
    ]
  };
};
