var points;
var font;
var amt;
var multiplier = 0.2;
var r = [];
var g = [];
var b = [];

function preload() {
  font = loadFont("assets/Calistoga-Regular.ttf");
}

// called once
function setup() {
  createCanvas(1600, 500);
  textFont(font);
  textSize(30);

  // Retrieve text points
  //points = font.textToPoints("Hello P5.js", 50, 300, 300, {
  //sampleFactor: 0.3,
  //simplifyThreshold: 0,
  //});
}

// called every frame
function draw() {
  //var trail = map(mouseY, 0, height, 1, 10);
  //background(255, 255, 0);
  text("hola", 0, 0);
  fill(0);
  //fill(0, trail);
  //rect(0, 0, width, height);

  //noStroke();
  //for (let i = 0; i < points.length; i++) {
  //// Set color
  //fill(214, 0, 0);

  //// Get locations
  //var p = points[i];
  //amt = map(mouseX, 0, width, 0, 80);
  //var nX = noise(p.x + p.y + frameCount * multiplier);
  //var locX = map(nX, 0, 1, -amt, amt);
  //var nY = noise(p.x + p.y + 2 + frameCount * multiplier);
  //var locY = map(nY, 0, 1, -amt, amt);
  //// create ellipse
  //ellipse(p.x + locX, p.y + locY, 2, 2);
  //}
}
