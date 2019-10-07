// Simple array element removal by element reference

Array.prototype.remove = function(element) {
  this.splice(this.indexOf(element), 1);
};

// Get last array element

Array.prototype.last = function() {
  return this[ this.length - 1 ];
};

// Get random array element

Array.prototype.random = function() {
  return this[ Math.floor( Math.random()*this.length ) ];
};

// Clamping number from `min` to `max`

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

// Splice that works on strings

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// Number padding, adds leading zeroes

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
};

// Remove `deleteValue` from array

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
