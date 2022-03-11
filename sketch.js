
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var Composites = Matter.Composites;
var Composite = Matter.Composite;
var Constraint = Matter.Constraint;
var bird, bird_img, mango_img, mango, hairdryer, hairdryer_img;
var emptystar, onestar, twostar, starcount;
var background;
var button;
var button2;
var bk_song;
var mute_btn;
var mango_con;
var mango_con2;
var rope;
var rope2;


function preload() {

  bird_img = loadAnimation("Sprites/p1.png", "Sprites/p2.png", "Sprites/p3.png", "Sprites/p4.png", "Sprites/p5.png", "Sprites/p6.png", "Sprites/p7.png", "Sprites/p8.png", "Sprites/p9.png");
  hairdryer_img = loadImage("Sprites/hd.png");
  mango_img = loadImage("Sprites/OG Mango.png");
  starImg = loadImage("Sprites/star.png");
  emptystar = loadAnimation("Sprites/empty.png");
  onestar = loadAnimation("Sprites/one_star.png");
  twostar = loadAnimation("Sprites/stars.png");
  bk_song = loadSound("Sounds/backgroundSound.mp3");
  cut_sound = loadSound("Sounds/CutSound.mp3");
  bg_img = loadImage("Sprites/background.jpg");
}

function setup() {
  createCanvas(600, 700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('Sprites/CutButton.png');
  button.position(180, 90);
  button.size(50, 50);
  button.mouseClicked(drop);


  button2 = createImg('Sprites/CutButton.png');
  button2.position(390, 90);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  rope = new Rope(7, { x: 200, y: 90 });
  rope2 = new Rope(7, { x: 400, y: 90 });


  mute_btn = createImg('Sprites/MuteButton.png');
  mute_btn.position(width - 50, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(300, height, width, 20);

  bird = createSprite(120, 620, 100, 100);
  bird.scale = 0.2;
  bird = bird_img;

  starcount = createSprite(50, 20, 30, 30);
  starcount.scale = 0.2;
  starcount.addAnimation("EmptyStars", emptystar);
  starcount.addAnimation("1star", onestar);
  starcount.addAnimation("2star", twostar);
  starcount.changeAnimation("EmptyStars");

  mango = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, mango);

  hairdryer = createImg("Sprites/hd.png");
  hairdryer.position(260, 370);
  hairdryer.size(120, 120);
  hairdryer.mouseClicked(airBlow);

  star1 = createSprite(320, 30, 20, 20);
  star1.addImage("star_image", starImg);
  star1.scale = 0.02;

  star2 = createSprite(110, 300, 20, 20);
  star2.addImage("star_image", starImg);
  star2.scale = 0.02;

  mango_con = new Link(rope, mango);
  mango_con2 = new Link(rope2, mango);

  engine = Engine.create();
  world = engine.world;

}


function draw() {
  background(51);
  image(bg_img, 0, 0, width, height);

  push();
  imageMode(CENTER);
  if (mango != null) {
    image(mango_img, mango.position.x, mango.position.y, 70, 70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(mango, bird, 80) == true) {
    World.remove(engine.world, mango);
    mango = null;
    eating_sound.play();
  }

  if (collide(mango, star1, 20) === true) {
    star1.visible = false;
    starcount.changeAnimation("1star");

  }

  if (collide(mango, star2, 20) === true) {
    star2.visible = false;
    starcount.changeAnimation("2star");

  }

  if (mango != null && mango.position.y >= 650) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    mango = null;
  }

}

function drop() {
  cut_sound.play();
  rope.break();
  mango_con.dettach();
  mango_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  mango_con2.dettach();
  mango_con2 = null;
}

function airBlow() {
  Matter.Body.applyForce(mango, { x: 0, y: 0 }, { x: 0, y: -0.03 });

}

function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {
      return true;
    }
    else {
      return false;
    }
  }
}


function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}

