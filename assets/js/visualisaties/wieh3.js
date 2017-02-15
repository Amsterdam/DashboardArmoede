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

armoede.wieh3=function() {
	this.vis = new x3();
	this.xAxis = new x3.axis();
	this.yAxis = new x3.axis();	
	this.column = new x3.column();
	
	this.data = [
		{'y': '0-79%', 'x': [ 0, 71 ], 'color': '#FF0000'},
		{'y': '0-79%', 'x': [ 71, 87 ], 'color': '#888888'},
		{'y': '0-79%', 'x': [ 87, 99 ], 'color': '#71BDEE'},
		{'y': '0-79%', 'x': [ 99, 100 ], 'color': '#CCCCCC'},
		{'y': '80-99%', 'x': [ 0, 25 ], 'color': '#FF0000'},
		{'y': '80-99%', 'x': [ 25, 73 ], 'color': '#888888'},
		{'y': '80-99%', 'x': [ 73, 100 ], 'color': '#71BDEE'},
		{'y': '100-109%', 'x': [ 0, 12 ], 'color': '#FF0000'},
		{'y': '100-109%', 'x': [ 12, 74 ], 'color': '#888888'},
		{'y': '100-109%', 'x': [ 74, 100 ], 'color': '#71BDEE'},
		{'y': '110-119%', 'x': [ 0, 35 ], 'color': '#FF0000'},
		{'y': '110-119%', 'x': [ 35, 76 ], 'color': '#888888'},
		{'y': '110-119%', 'x': [ 76, 100 ], 'color': '#71BDEE'}
	];

	this.legend = [
		{'color': '#FF0000', 'label': 'werk'},
		{'color': '#888888', 'label': 'uitkering'},
		{'color': '#71BDEE', 'label': 'pensioen'},
		{'color': '#CCCCCC', 'label': 'overig'},
	];
}

armoede.wieh3.prototype.addText=function() {
	var self = this;

	this.vis.get("svg").selectAll('.legend1')
		.data(this.legend)
			.enter()
				.append("rect")
					.attr("class", "legend1")
					.attr("width", 10)
					.attr("height", 10)
					.attr("fill", function(d, i) {
						return d['color'];
					})
					.attr("x", function(d, i) {
						var x = 0;
						if(i < 2) {
							x = i;
						} else {
							x = i-2;
						}
						return self.xAxis.get("position", 0)+self.xAxis.get("bbox").x+(x*85);
					})
					.attr("y", function(d, i) {
						var x = 0;
						if(i < 2) {
							x = 2;
						} else {
							x = 1;
						}
						return (-16*x)+(this.getBBox().height/2);
					})

	this.vis.get("svg").selectAll('.legend2')
		.data(this.legend)
			.enter()
				.append("text")
					.attr("class", "legend2")
					.text(function(d, i) {
						return d['label'];
					})
					.attr("x", function(d, i) {
						var x = 0;
						if(i < 2) {
							x = i;
						} else {
							x = i-2;
						}
						return self.xAxis.get("position", 0)+self.xAxis.get("bbox").x+(x*85)+15;
					})
					.attr("y", function(d, i) {
						var x = 0;
						if(i < 2) {
							x = 2;
						} else {
							x = 1;
						}
						return (-16*x)+(this.getBBox().height/2)+5;
						// return 8+(i*20)+(this.getBBox().height/2);
					})

	this.vis.get("svg").selectAll('.text1')
		.data(this.data)
			.enter()
				.append("text")
					.attr("class", "text1")
					.text(function(d, i) {
						if((self.xAxis.get("position", d['x'][1])-self.xAxis.get("position", d['x'][0])) < 10) {
							return '';
						} else {
							return d['x'][1]-d['x'][0];
						}
					})
					.attr("fill", '#FFF')
					.attr("y", function(d, i) {
						return ((self.yAxis.get("position", d['y']))+((self.yAxis.get("tickWidth")-10)/2))+(this.getBBox().height/2);
					})
					.attr("x", function(d, i) {
						return self.column.get("start", d, i, true)-(this.getBBox().width/2);
					})
					.style("opacity", 0)
						.transition().duration(this.vis.get("transitionSpeed"))
							.style("opacity", 1)

	this.vis.get("svg").selectAll('.text2')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text2")
					.text("%")
					.attr("x", this.xAxis.get("position", 100)+this.xAxis.get("bbox").x+10)
					.attr("y", function(d, i) {
						return self.xAxis.get("link")+5;
					})
}

armoede.wieh3.prototype.create=function(parent) {
	var self = this;

	this.xAxis.set("orientation", 'bottom');
	this.xAxis.set("type", 'linear');
	this.yAxis.set("orientation", 'left');
	this.yAxis.set("type", 'ordinal');
	this.xAxis.set("tickInterval", 20);

	this.vis.on('create', function() {
		self.xAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.column.set("parent", this);
		self.yAxis.create();
		self.xAxis.create();
		self.column.create();
	});
	
	this.vis.on("draw", function() {
		self.yAxis.draw();
		self.xAxis.draw();
		self.yAxis.draw();
		self.xAxis.draw();
	}, 0);

	this.vis.on("draw", function() {
		self.column.draw();
	}, 1);

	this.vis.on("redraw", function() {
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.yAxis.redraw();
		self.xAxis.redraw();
	}, 0);

	this.vis.on("redraw", function() {
		self.column.redraw();
	}, 1);

	this.vis.on("draw", function() {
		self.addText();
	}, 2);

	this.xAxis.set("scale", [0, 100]);
	this.yAxis.set("scale", ['0-79%','80-99%','100-109%','110-119%']);

	this.xAxis.set("leftMargin", function() {
		return self.yAxis.get("bbox").width;
	});

	this.xAxis.set("rightMargin", 0);

	this.xAxis.set("link", function() {
		return self.yAxis.get("bbox").height+self.yAxis.get("bbox").y;
	});

	this.yAxis.set("link", function() {
		return self.xAxis.get("position", 0)+self.xAxis.get("bbox").x;
	});

	this.yAxis.set("bottomMargin", function() {
		return self.xAxis.get("bbox").height;
	});

	this.yAxis.set("topMargin", 1);

	this.vis.set("margin", 30, 15, 0, 0);
	this.vis.appendTo(parent);

	this.column.set("end", function(d) {
		var b = self.xAxis.get("position", d['x'][1]-d['x'][0]);
		return b;
	});

	this.column.set("height", function(d, i) {
		return self.yAxis.get("tickWidth")-10;
	});

	this.column.set("top", function(d, i) {
		return self.yAxis.get("position", d['y'])+self.yAxis.get("bbox").y+5;
	});
	
	this.column.set("start", function(d, i, f) {
		var start = self.xAxis.get("position", d['x'][0])+self.xAxis.get("bbox").x;
		if(f == true) {
			start += self.xAxis.get("position", (d['x'][1]-d['x'][0])/2);
		}
		return start;
		
	});

	this.vis.draw();

	this.column.set("data", this.data);

	this.vis.redraw();
}