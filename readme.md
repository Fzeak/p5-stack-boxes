This explains the repo

# This is a visualizer for box stacking using the p5.js library.
## It is to draw out a 3D image of your stacked box based on an array input.

The program's purpose is to show how boxes of certain dimensions are stacked and then provides the dimensions of the stack itself.
This program uses a consumer product as an example.

The array (as seen below) should be structured as:

An **Object** containing **4 properties**:

1. grid
2. totalSize: addition of final parameters of stack
3. quantity: number of boxes being stacked
4. title: title of product

In **grid** there are 3 **Objects** each representing a parameter of a box (length, width, height):

1. scale: number of rows/columns
2. total: total span of parameter
3. initial: initial span of an individual box

*Here is an example of the input data:*

Given input data:
````json
[{
	"grid": [{
		"scale": 2,
		"total": 80,
		"initial": 40
	}, {
		"scale": 3,
		"total": 75,
		"initial": 25
	}, {
		"scale": 7,
		"total": 105,
		"initial": 15
	}],
	"totalSize": 260,
	"quantity": 39,
	"title": "AccSafe Premium Cotton Inspection Glove White 1 dozen "
}]
````
This script renders:

![Optional Text](../master/stacked-boxes.PNG)