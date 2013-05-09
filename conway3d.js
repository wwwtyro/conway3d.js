"use strict";

var Conway3D = function(width, height, depth, lonely, crowded) {

    var self = this;

    self.w = width;
    self.h = height;
    self.d = depth;
    self.wh = width * height;
    self.lonely = lonely;
    self.crowded = crowded;

    self.initialize = function() {
        self.updates = [];
        self.field = new Int16Array(self.w*self.h*self.d*2);
        for (var i = 0; i < self.w; i++) {
            for (var j = 0; j < self.h; j++) {
                for (var k = 0; k < self.d; k++) {
                    self.field[2*(self.wh*k + self.w*j + i) + 0] = 0;
                    self.field[2*(self.wh*k + self.w*j + i) + 1] = 0;
                }
            }
        }
        var x=Math.floor(self.w/2),y=Math.floor(self.h/2),z=Math.floor(self.d/2);
        for (i = 0; i < self.w*self.d*self.h/64; i++) {
            x += [-1,0,1][Math.floor(Math.random() * 3)];
            y += [-1,0,1][Math.floor(Math.random() * 3)];
            z += [-1,0,1][Math.floor(Math.random() * 3)];
            x = (x + self.w) % self.w;
            y = (y + self.h) % self.h;
            z = (z + self.d) % self.d;
            self.cellOn(x,y,z);
        }
    }

    self.cellOn = function(x,y,z) {
        x = (x + self.w) % self.w;
        y = (y + self.h) % self.h;
        z = (z + self.d) % self.d;
        if (self.field[2*(self.wh*z + self.w*y + x) + 0] == 1) {
            // It's already on.
            return;
        }
        self.field[2*(self.wh*z+ self.w*y + x) + 0] = 1;
        self.updates.push(x,y,z,1);
        for (var i = x-1; i <= x+1; i++) {
            for (var j = y-1; j <= y+1; j++) {
                for (var k = z-1; k <= z+1; k++) {
                    var l = (i+self.w)%self.w;
                    var m = (j+self.h)%self.h;
                    var n = (k+self.d)%self.d;
                    self.field[2*(self.wh*n + self.w*m + l) + 1]++;
                }
            }
        }
        self.field[2*(self.wh*z+ self.w*y + x) + 1]--; // Remove the self-increment from the above loop.
    }

    self.cellOff = function(x,y,z) {
        x = (x + self.w) % self.w;
        y = (y + self.h) % self.h;
        z = (z + self.d) % self.d;
        if (self.field[2*(self.wh*z+ self.w*y + x) + 0] == 0) {
            // It's already off.
            return;
        }
        self.field[2*(self.wh*z+ self.w*y + x) + 0] = 0;
        self.updates.push(x,y,z,0);
        for (var i = x-1; i <= x+1; i++) {
            for (var j = y-1; j <= y+1; j++) {
                for (var k = z-1; k <= z+1; k++) {
                    var l = (i+self.w)%self.w;
                    var m = (j+self.h)%self.h;
                    var n = (k+self.d)%self.d;
                    self.field[2*(self.wh*n+ self.w*m + l) + 1]--;
                }
            }
        }
        self.field[2*(self.wh*z+ self.w*y + x) + 1]++; // Remove the self-decrement from the above loop.
    }

    self.update = function() {
        self.updates = [];
        var changes = [];
        var i,j,k,count;
        for (i = 0; i < self.w; i++) {
            for (j = 0; j < self.h; j++) {
                for (k = 0; k < self.d; k++) {
                    count = self.field[2*(self.wh*k+ self.w*j + i) + 1];
                    if (!self.field[2*(self.wh*k + self.w*j + i) + 0] && count > self.lonely && count < self.crowded) {
                        changes.push(i,j,k,1);
                    }
                    else if (self.field[2*(self.wh*k + self.w*j + i) + 0] && (count <= self.lonely || count >= self.crowded)) {
                        changes.push(i,j,k,0);
                    }
                }
            }
        }
        for (i = 0; i < changes.length; i+=4) {
            if (changes[i+3]) {
                self.cellOn(changes[i+0], changes[i+1], changes[i+2]);
            }
            else {
                self.cellOff(changes[i+0], changes[i+1], changes[i+2]);
            }
        }
        return self.updates;
    }

    self.initialize();

}