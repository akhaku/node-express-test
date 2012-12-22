var MOVE_DISTANCE = 4;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

/* Modeling classes as functions, js-style */
function RoundRect(ctx, x, y, width, height, radius) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.radius = radius;
  this.ctx = ctx;
  var instance = this;
  /* Should probably do collision detection here. This can get hairy when we
   * have multiple shapes.
   */
  this.moveUp = function() {
    instance.y -= MOVE_DISTANCE;
  }
  this.moveDown = function() {
    instance.y += MOVE_DISTANCE;
  }
  this.moveLeft = function() {
    instance.x -= MOVE_DISTANCE;
  };
  this.moveRight = function() {
    instance.x += MOVE_DISTANCE;
  };

  /* All the draw function for all the shapes should be called by a single
   * method on the main class, rather than calling each one individually.
   */
  this.draw = function() {
    var x = instance.x;
    var y = instance.y;
    var width = instance.width;
    var height = instance.height;
    var radius = instance.radius;
    var ctx = instance.ctx;
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x , y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
  };
};

define([], function() {
  var me = {};

  /* Modeling instance variables - we could just as easily have multiple var
   * declarations, but I like prefixing instance variables with 'this' or 'self'
   * to make it more clear. 'this' is taken, so use the python convention 'self'
   */
  var self = {
    shape: undefined,
    ctx: undefined
  }

  me.init = function(ctx) {
    self.ctx = ctx;
    /* Shape should probably be a dict of some sort. For what I want to do with 
     * this, it should be a dict from a salted hash of the session id to (array
     * of?) shapes
     */
    self.shape = new RoundRect(self.ctx, 10, 10, 25, 25, 4);
    window.shape = self.shape;
    self.shape.draw();
  }

  /* Clears the canvas */
  function clear() {
    self.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  me.moveUp = function(ctx) {
    self.shape.moveUp();
    clear();
    self.shape.draw();
  }

  me.moveDown = function(ctx) {
    self.shape.moveDown();
    clear();
    self.shape.draw();
  }

  me.moveLeft = function(ctx) {
    self.shape.moveLeft();
    clear();
    self.shape.draw();
  }

  me.moveRight = function(ctx) {
    self.shape.moveRight();
    clear();
    self.shape.draw();
  }
  return me;
});
