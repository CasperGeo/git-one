// Load a Landsat 8 top-of-atmosphere reflectance image.
var image = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_044034_20240820');
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.25, gamma: [1.1, 1.1, 1]}, 'rgb');

// Band combinations
var natural = ['B4', 'B3', 'B2'];  // rgb
var swir = ['B6', 'B5', 'B3'];    // short wave infra
var urban = ['B7', 'B6', 'B4'];
var veg = ['B5', 'B4', 'B3'];

// Convert rgb to HSV
var hsv = image.select(veg).rgbToHsv();

// add Band 8 panchromatic band and convert back to rgb
var sharpened = ee.Image.cat([
  hsv.select('hue'), hsv.select('saturation'), image.select('B8')])
    .hsvToRgb();
  
  // Do a very basic color correction 
var imageRGB = sharpened.visualize({min: 0, max:0.18,
              gamma:[
                1.05, // red
                1.08, // green
                0.8]  // blue
});

// Display the image and zoom to it
Map.addLayer(imageRGB);
Map.centerObject(sharpened, 9);
