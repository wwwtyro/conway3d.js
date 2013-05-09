conway3d.js
===========

Conway's Game of Life, in 3D, in Javascript.

Example:

```javascript

var c3d = new Conway3D(width, depth, height, lonely, crowded);

var updates = c3d.update();
```

The Conway3D constructor takes three integer values for the width, height, and depth of the game field, 
and two integer parameters governing the game mechanics - **lonely** and **crowded**. The rules work like so:

If the number of live neighboring cells <= **lonely** OR the number of live neighboring cells >= **crowded**, 
a cell will die if it is alive. Otherwise, it will come to life or continue to live.

Each call to the **update** function applies these rules to all the cells, and returns a list of changes
to the field in the following format:

```
[x1, y1, z1, c1, x2, y2, z2, c2, ..., xn, yn, zn, cn]
```

Where x, y, and z are the coordinates of the change, and c is an integer representing the nature 
of the change: 0 if the cell dies, 1 if the cell is brought to life. These changes could be used to update
a visualization of the field. I've kept the format simple here to avoid garbage collection issues when 
performing fast-running simulations and visualizations.

Note: The first time update is called, the field is initialized with a random walk, and the result of that
walk is returned in the updates. It is not the result of applying the rules.
