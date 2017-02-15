/*
 *  Copyright (C) 2017 X Gemeente
 *                     X Amsterdam
 *                     X Onderzoek, Informatie en Statistiek
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

if(typeof(armoede) != 'function') {
	armoede=function() {
	}
}

armoede.waarp2=function() {
	this.vis = new x3();
	this.line = new x3.line();

	this.xAxis = new x3.axis();
	this.yAxis = new x3.axis();

	this.xGrid = new x3.grid();
	this.yGrid = new x3.grid();

	this.data = [{
		'id': 0,
		'color': '#F6B400',
		'label': 'Rotterdam',
		'width': 2,
		'points': [
			{'x': 2005, 'y': 29.1},
			{'x': 2006, 'y': 29.6},
			{'x': 2007, 'y': 27.4},
			{'x': 2008, 'y': 25.5},
			{'x': 2009, 'y': 26.9},
			{'x': 2010, 'y': 27.3},
			{'x': 2011, 'y': 27.4},
			{'x': 2012, 'y': 27.6},
			{'x': 2013, 'y': 27.8}
		]
	}, {
		'id': 1,
		'color': '#FF0000',
		'label': 'Amsterdam',
		'width': 2,								
		'points': [
			{'x': 2005, 'y': 28.8},
			{'x': 2006, 'y': 28.4},
			{'x': 2007, 'y': 27},
			{'x': 2008, 'y': 25.1},
			{'x': 2009, 'y': 25.3},
			{'x': 2010, 'y': 25.4},
			{'x': 2011, 'y': 25.4},
			{'x': 2012, 'y': 25.1},
			{'x': 2013, 'y': 24.7}
		]
	}, {
		'id': 2,						
		'color': '#B4E600',
		'label': 'Den Haag',
		'width': 2,
		'points': [
			{'x': 2005, 'y': 23.2},
			{'x': 2006, 'y': 23},
			{'x': 2007, 'y': 22.3},
			{'x': 2008, 'y': 20},
			{'x': 2009, 'y': 20.9},
			{'x': 2010, 'y': 21.7},
			{'x': 2011, 'y': 22.1},
			{'x': 2012, 'y': 22.8},
			{'x': 2013, 'y': 23.3}
		]
	}, {
		'id': 3,
		'color': '#00a0e6',
		'label': 'Utrecht',
		'width': 2,								

		'points': [
			{'x': 2005, 'y': 17.9},
			{'x': 2006, 'y': 16.7},
			{'x': 2007, 'y': 16.1},
			{'x': 2008, 'y': 13.9},
			{'x': 2009, 'y': 13.7},
			{'x': 2010, 'y': 14.1},
			{'x': 2011, 'y': 14.2},
			{'x': 2012, 'y': 14.3},
			{'x': 2013, 'y': 14.2}
		]
	}, {
		'id': 4,
		'color': '#787878',
		'label': 'Nederland',
		'width': 2,
		'points': [
			{'x': 2005, 'y': 12.1},
			{'x': 2006, 'y': 12},
			{'x': 2007, 'y': 11.3},
			{'x': 2008, 'y': 10.5},
			{'x': 2009, 'y': 11.5},
			{'x': 2010, 'y': 11.9},
			{'x': 2011, 'y': 12.2},
			{'x': 2012, 'y': 12.6},
			{'x': 2013, 'y': 12.9}
		]
	}]
}

armoede.waarp2.prototype.addText=function() {
	var self = this;
	var textLeft = -80;

	this.vis.get("svg").selectAll('.line')
		.data(this.data)
			.enter()
				.append("line")
					.attr("class", "line")
					.attr("stroke-width", 3)
					.attr("stroke", function(d, i) {
						return d['color'];
					})
					.style("opacity", 0)
					.attr("x1", function(d, i) {
						var x = i;
						if(i >= 3) {
							x -= 3;
						}
						return self.vis.get("innerWidth")-(x*100)+textLeft;
					})
					.attr("x2", function(d, i) {
						var x = i;
						if(i >= 3) {
							x -= 3;
						}
						return self.vis.get("innerWidth")-(x*100)+10+textLeft;
					})
					.style("opacity", 1)
					.attr("y1", function(d, i) {
						if(i < 3) {
							return self.vis.get("innerHeight")+20;
						} else {
							return self.vis.get("innerHeight")+40;
						}
					})
					.attr("y2", function(d, i) {
						if(i < 3) {
							return self.vis.get("innerHeight")+20;
						} else {
							return self.vis.get("innerHeight")+40;
						}
					})
							
	this.vis.get("svg").selectAll('.legend2')
		.data(this.data)
			.enter()
				.append("text")
					.attr("class", "legend2")
					.text(function(d, i) {
						return d['label'];
					})
					.attr("fill", '#000')
					.attr("y", function(d, i) {
						if(i >= 3) {
							return self.vis.get("innerHeight")+43;
						} else {
							return self.vis.get("innerHeight")+23;
						}
					})
					.attr("x", function(d, i) {
						var x = i;
						if(i >= 3) {
							x -= 3;
						}
						return self.vis.get("innerWidth")-(x*100)+20+textLeft;
					})
						
	this.vis.get("svg").selectAll('.text2')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text2")
					.text("%")
					.attr("y", this.yAxis.get("position", 35)-5)
					.attr("x", this.xAxis.get("bbox").x-this.yAxis.get("bbox").width+20)

	this.vis.get("svg").selectAll('.text3')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text3")
					.style("font-style", "italic")
					.text("jaar")
					.attr("y", this.yAxis.get("position", 0)+40)
					.attr("x", 5)
}

armoede.waarp2.prototype.create=function(parent) {
	var self = this;

	this.xAxis.set("ticks", 1);
	this.yAxis.set("ticks", 5);

	this.xAxis.set("orientation", 'bottom');
	this.xAxis.set("type", 'linear');
	this.yAxis.set("orientation", 'left');
	this.yAxis.set("type", 'linear');

	this.vis.on('create', function() {
		self.xAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.line.set("parent", this);
		self.xGrid.set("parent", this);
		self.yGrid.set("parent", this);
		self.xGrid.create();
		self.yGrid.create();
		self.line.create();
		self.yAxis.create();
		self.xAxis.create();
	});

	this.vis.on("draw", function() {
		self.yAxis.draw();
		self.xAxis.draw();
		self.yAxis.draw();
		self.xAxis.draw();
		self.xGrid.draw();
		self.yGrid.draw();
	}, 0);

	this.vis.on("redraw", function() {
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.xGrid.redraw();
		self.yGrid.redraw();
	}, 0);

	this.vis.on("draw", function() {
		self.line.draw();
	}, 1);

	this.vis.on("redraw", function() {
		self.line.redraw();
	}, 1);

	this.vis.on("draw", function() {
		self.addText();
	}, 2);
	
	this.vis.set("margin", 10, 0, 50, 0);
	this.vis.appendTo(parent);

	this.xAxis.set("scale", [2005, 2013]);
	this.yAxis.set("scale", [0, 35]);

	this.xAxis.set("link", function() {
		return self.yAxis.get("position", 0);
	});
	this.yAxis.set("link", function() {
		return self.xAxis.get("position", 2005)+self.xAxis.get("bbox").x;
	});
	this.yAxis.set("bottomMargin", function() {
		return self.xAxis.get("bbox").height;
	});
	this.xAxis.set("leftMargin", function() {
		return self.yAxis.get("bbox").width;
	});
	this.xAxis.set("tickFormat", function(d, i) {
		return d.toString().replace('20', '\'');
	});

	this.yGrid.set("axis", this.yAxis);
	this.yGrid.set("left", function() {
		return self.yAxis.get("bbox").width+self.xAxis.get("bbox").width;
	})
	this.yGrid.set("top", function() {
		return self.yAxis.get("bbox").y;
	});
	this.yGrid.set("size", function() {
		return self.xAxis.get("bbox").width;
	});

	this.xGrid.set("axis", this.xAxis);
	this.xGrid.set("left", function() {
		return self.xAxis.get("bbox").x;
	})
	this.xGrid.set("top", function() {
		return self.yAxis.get("bbox").y;
	});
	this.xGrid.set("size", function() {
		return self.yAxis.get("bbox").height;
	});
	
	this.line.set("position-x", function(d, i) {
		var x = (self.xAxis.get("position", d['x'])+self.xAxis.get("bbox").x)
		if(self.xAxis.get("type") == 'ordinal') {
			x += self.xAxis.get("tickWidth")/2;
		}
		return x;
	});
	
	this.line.set("position-y", function(d, i) {
		return self.yAxis.get("position", d['y']);
	});
	
	this.line.set("order", function(a, b) {
		return a['x'] - b['x'];
	});

	this.vis.draw();

	this.line.set("data", this.data);

	this.vis.redraw();
}