"use strict";

importScripts("conway3d.js");

var gol;

self.addEventListener('message', function(e) {

    if (e.data.cmd == 'initialize') {
        gol = new Conway3D(e.data.size, e.data.size, e.data.size, e.data.lonely, e.data.crowded);
    }

    if (e.data.cmd == 'next') {
        var updates = gol.update();
        for (var i = 0; i < updates.length; i++) {
            var a = Math.floor(Math.random() * updates.length/4);
            var b = Math.floor(Math.random() * updates.length/4);
            var temp = [updates[a*4+0], updates[a*4+1], updates[a*4+2], updates[a*4+3]];
            updates[a*4+0] = updates[b*4+0];
            updates[a*4+1] = updates[b*4+1];
            updates[a*4+2] = updates[b*4+2];
            updates[a*4+3] = updates[b*4+3];
            updates[b*4+0] = temp[0];
            updates[b*4+1] = temp[1];
            updates[b*4+2] = temp[2];
            updates[b*4+3] = temp[3];
        }
        self.postMessage(updates);
    }

});