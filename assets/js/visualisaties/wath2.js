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

armoede.wath2=function() {
	this.vis = new x3();
	this.line = new x3.line();

	this.xAxis = new x3.axis();
	this.yAxis = new x3.axis();

	this.yGrid = new x3.grid();

	this.data = [{
		'id': 0,
		'color': '#FF0000',
		'width': 3,
		'points': [
			{'x': 2005, 'y': 23.5},
			{'x': 2006, 'y': 23.6},
			{'x': 2007, 'y': 22.6},
			{'x': 2008, 'y': 21.9},
			{'x': 2009, 'y': 22.4},
			{'x': 2010, 'y': 23.2},
			{'x': 2011, 'y': 23.5},
			{'x': 2012, 'y': 23.7},
			{'x': 2013, 'y': 24}
		]
	}]
	
	this.data1 = [{
		'id': 0,
		'color': '#FF0000',
		'width': 3,
		'points': [
			{'x': 2005, 'y': 23.5},
			{'x': 2006, 'y': 23.6},
			{'x': 2007, 'y': 22.6},
			{'x': 2008, 'y': 21.9},
			{'x': 2009, 'y': 22.4},
			{'x': 2010, 'y': 23.2},
			{'x': 2011, 'y': 23.5},
			{'x': 2012, 'y': 23.7},
			{'x': 2013, 'y': 24}
		]
	},{
		'id': 1,
		'color': '#00a0e6',
		'width': 3,
		'points': [
			{'x': 2013, 'y': 24},
			{'x': 2014, 'y': 24.7},
			{'x': 2015, 'y': 25.1}
		]
	},{
		'id': 2,
		'color': '#00A03C',
		'width': 3,
		'points': [
			{'x': 2013, 'y': 24},
			{'x': 2014, 'y': 24.2},
			{'x': 2015, 'y': 23.5}
		]
	}]
	
	this.legend = [{
		"label": "huishoudens met laag inkomen",
		'color': '#FF0000'
	}, {
		"label": "bovengrens raming",
		'color': '#00a0e6'
	}, {
		"label": "ondergrens raming",
		'color': '#00A03C'
	}]
}

armoede.wath2.prototype.addText=function() {
	var self = this;

	self.vis.get("svg").selectAll('.line')
		.data([null])
			.enter()
				.append("line")
					.attr("class", "line")
					.attr("stroke-width", 2)
					.attr("stroke", '#dddddd')
					.attr("stroke-dasharray", '2,4')
					.style("opacity", 0)
					.attr("x1", self.xAxis.get("position", 2013)+self.xAxis.get("bbox").x)
					.attr("x2", self.xAxis.get("position", 2013)+self.xAxis.get("bbox").x)
					.attr("y1", self.yAxis.get("position", 0))
					.attr("y2", self.yAxis.get("position", 0))
						.transition().duration(self.vis.get("transitionSpeed"))
							.style("opacity", 1)
								.attr("y1", self.yAxis.get("position", 0))
								.attr("y2", self.yAxis.get("position", 50))
								.each("end", function() {
									self.vis.get("svg").selectAll('.text4')
										.data([null])
											.enter()
												.append("text")
													.attr("class", "text4")
													.attr("fill", '#FF0000')
													.text("90.400")
													.style("opacity", 0)
													.attr("y", function(d, i) {
														return (self.yAxis.get("position", 50)-5);
													})
													.attr("x", function(d, i) {
														return self.xAxis.get("position", 2013)+self.xAxis.get("bbox").x-(this.getBBox().width/2);
													})
													.transition().duration(self.vis.get("transitionSpeed"))
														.style("opacity", 1)

									self.vis.get("svg").selectAll('.text5')
										.data([null])
											.enter()
												.append("text")
													.attr("class", "text5")
													.attr("fill", '#00a0e6')
													.text("97.100")
													.style("opacity", 0)
													.attr("y", function(d, i) {
														return (self.yAxis.get("position", 24)-15);
													})
													.attr("x", function(d, i) {
														return self.xAxis.get("position", 2015)+self.xAxis.get("bbox").x-(this.getBBox().width/2);
													})
													.transition().duration(self.vis.get("transitionSpeed"))
														.style("opacity", 1)

									self.vis.get("svg").selectAll('.text6')
										.data([null])
											.enter()
												.append("text")
													.attr("class", "text6")
													.attr("fill", '#00A03C')
													.text("91.200")
													.style("opacity", 0)
													.attr("y", function(d, i) {
														return (self.yAxis.get("position", 23.5)+15);
													})
													.attr("x", function(d, i) {
														return self.xAxis.get("position", 2015)+self.xAxis.get("bbox").x-(this.getBBox().width/2);
													})
													.transition().duration(self.vis.get("transitionSpeed"))
														.style("opacity", 1)
								});
		
	this.vis.get("svg").selectAll('.legend1')
		.data(this.legend)
			.enter()
				.append("rect")
					.attr("class", "legend1")
					.attr("width", 15)
					.attr("height", 3)
					.attr("fill", function(d, i) {
						return d['color'];
					})
					.attr("y", function(d, i) {
						return self.vis.get("innerHeight")+(i*20)+25;
					})
					.attr("x", function(d, i) {
						return self.vis.get("innerWidth")-this.getBBox().width-160;
					})

	this.vis.get("svg").selectAll('.legend2')
		.data(this.legend)
			.enter()
				.append("text")
					.attr("class", "legend2")
					.text(function(d, i) {
						return d['label'];
					})
					.attr("y", function(d, i) {
						return (self.vis.get("innerHeight")+(i*20)+21)+(this.getBBox().height/2);
					})
					.attr("x", function(d, i) {
						return self.vis.get("innerWidth")-150;
					})

	this.vis.get("svg").selectAll('.text2')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text2")
					.text("%")
					.attr("y", this.yAxis.get("position", 50)-5)
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

armoede.wath2.prototype.create=function(parent) {
	var self = this;

	this.xAxis.set("tickInterval", 1);
	this.yAxis.set("tickInterval", 10);

	this.xAxis.set("orientation", 'bottom');
	this.xAxis.set("type", 'linear');
	this.yAxis.set("orientation", 'left');
	this.yAxis.set("type", 'linear');

	this.vis.on('create', function() {
		self.xAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.line.set("parent", this);
		self.yGrid.set("parent", this);
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
		self.yGrid.draw();
	}, 0);

	this.vis.on("redraw", function() {
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.yAxis.redraw();
		self.xAxis.redraw();
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

	this.vis.set("margin", 10, 13, 75, 0);
	this.vis.appendTo(parent);

	this.xAxis.set("scale", [2005, 2015]);
	this.yAxis.set("scale", [0, 50]);

	this.xAxis.set("tickFormat", function(d, i) {
		return d.toString().replace('20', '\'');
	});
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

	this.vis.set("transitionSpeed", 750);
	this.vis.redraw();
	
	window.setTimeout(function() {
		self.data = self.data1;
		self.line.set("data", self.data);
		self.vis.set("transitionSpeed", self.vis.get("transitionSpeed")/5);
		self.vis.redraw();
	}, this.vis.get("transitionSpeed"));
}