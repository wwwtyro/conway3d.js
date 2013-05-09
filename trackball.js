var Trackball = function(eventElement, targetMesh) {

    var self = this;
    self.element = eventElement;
    self.mesh = targetMesh;
    self.mouseDown = false;
    self.pos = {x:0, y:0};

    self.initialize = function() { 
        self.element.addEventListener('mousedown', self.onMouseDown, false);
        window.addEventListener('mouseup', self.onMouseUp, false);
        window.addEventListener('mousemove', self.onMouseMove, false);
    }

    self.onMouseMove = function(e) {
        if (!self.mouseDown) { 
            return; 
        }
        var dx = e.clientX - self.pos.x;
        var dy = e.clientY - self.pos.y;
        self.rotate(dx*0.015, dy*0.015);
        self.pos.x = e.clientX; 
        self.pos.y = e.clientY;
    }

    self.rotate = function(dx, dy) {
        var tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(0,1,0), dx);
        tempMat.multiply(self.mesh.matrix);
        var tempMat2 = new THREE.Matrix4();
        tempMat2.makeRotationAxis(new THREE.Vector3(1,0,0), dy);
        tempMat2.multiply(tempMat);
        self.mesh.rotation.setEulerFromRotationMatrix(tempMat2);
    }

    self.onMouseDown = function(e) {
        if (e.button == 0) {
            self.mouseDown = true;
            self.pos.x = e.clientX;
            self.pos.y = e.clientY;
        }
    }

    self.onMouseUp = function(e) {
        if (e.button == 0) {
            self.mouseDown = false;
        }
    }

    self.initialize();

}