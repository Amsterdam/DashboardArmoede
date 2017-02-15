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

armoede.bereikh2=function() {
	this.vis = new x3();
	this.xAxis = new x3.axis();
	this.yAxis = new x3.axis();	
	this.bar = new x3.bar();
	this.grid = new x3.grid();
	this.data = [];
	
	this.data[3] = [
		{'g': 1, 'x': 'Gratis\nOV 65+', 'y': [ 0, 37 ], 'color': '#FF0000'},
		{'g': 1, 'x': 'Gratis\nOV 65+', 'y': [ 37, 100 ], 'color': '#71BDEE'},
		{'g': 2, 'x': 'Gratis\nOV 65+', 'y': [ 0, 53 ], 'color': '#FF0000'},
		{'g': 2, 'x': 'Gratis\nOV 65+', 'y': [ 53, 100 ], 'color': '#71BDEE'},
		{'g': 1, 'x': 'Scholieren-\nVergoeding', 'y': [ 0, 61 ], 'color': '#888888'},
		{'g': 1, 'x': 'Scholieren-\nVergoeding', 'y': [ 61, 100 ], 'color': '#CCCCCC'},
		{'g': 2, 'x': 'Scholieren-\nVergoeding', 'y': [ 0, 56 ], 'color': '#888888'},
		{'g': 2, 'x': 'Scholieren-\nVergoeding', 'y': [ 56, 100 ], 'color': '#CCCCCC'},
		{'g': 1, 'x': 'Collectieve\nZorgverzekering', 'y': [ 0, 51 ], 'color': '#888888'},
		{'g': 1, 'x': 'Collectieve\nZorgverzekering', 'y': [ 51, 100 ], 'color': '#CCCCCC'},
		{'g': 2, 'x': 'Collectieve\nZorgverzekering', 'y': [ 0, 33 ], 'color': '#888888'},
		{'g': 2, 'x': 'Collectieve\nZorgverzekering', 'y': [ 33, 100 ], 'color': '#CCCCCC'},
		{'g': 1, 'x': 'Stadspas\n', 'y': [ 0, 54 ], 'color': '#888888'},
		{'g': 1, 'x': 'Stadspas\n', 'y': [ 54, 100 ], 'color': '#CCCCCC'},
		{'g': 2, 'x': 'Stadspas\n', 'y': [ 0, 70 ], 'color': '#888888'},
		{'g': 2, 'x': 'Stadspas\n', 'y': [ 70, 100 ], 'color': '#CCCCCC'},
	];

	this.data[0] = JSON.parse(JSON.stringify(this.data[3]));
	this.data[0][0]['color'] = this.data[0][2]['color'] = '#888888';
	this.data[0][1]['color'] = this.data[0][3]['color'] = '#CCCCCC';
	this.data[0][4]['color'] = this.data[0][6]['color'] = '#FF0000';
	this.data[0][5]['color'] = this.data[0][7]['color'] = '#71BDEE';

	this.data[1] = JSON.parse(JSON.stringify(this.data[3]));
	this.data[1][0]['color'] = this.data[1][2]['color'] = '#888888';
	this.data[1][1]['color'] = this.data[1][3]['color'] = '#CCCCCC';
	this.data[1][8]['color'] = this.data[1][10]['color'] = '#FF0000';
	this.data[1][9]['color'] = this.data[1][11]['color'] = '#71BDEE';

	this.data[2] = JSON.parse(JSON.stringify(this.data[3]));
	this.data[2][0]['color'] = this.data[2][2]['color'] = '#888888';
	this.data[2][1]['color'] = this.data[2][3]['color'] = '#CCCCCC';
	this.data[2][12]['color'] = this.data[2][14]['color'] = '#FF0000';
	this.data[2][13]['color'] = this.data[2][15]['color'] = '#71BDEE';
}

armoede.bereikh2 = armoede.bereikh2.extendsFrom(Function.extensions);

armoede.bereikh2.prototype.changeData=function(i) {
	var self = this;
	this.bar.set("data", this.data[i]);
	this.vis.redraw();

	var tick = self.vis.get("svg").selectAll('.axis.bottom .tick text');
	tick
		.transition().duration(this.vis.get("transitionSpeed"))
			.style("fill", "#000000")	
	
	var tick = self.vis.get("svg").select('.axis.bottom .tick-'+(3-i)+' text');
	tick
		.transition().duration(this.vis.get("transitionSpeed"))
			.style("fill", "#FF0000")
}

armoede.bereikh2.prototype.addText=function() {
	var self = this;
	this.vis.get("svg").selectAll('.legend1')
		.data(this.data[0], function(d, i) {
			return d['x']+'_'+d['g'];
		}).enter()
			.append("text")
				.attr("class", "legend1")
				.attr("fill", "#000")
				.text(function(d, i) {
					switch(i % 4) {
						case 0:
							return "2013";
						break;
						default:
							return "*2015";
						break;
					}
				})
				.attr("x", function(d, i) {
					return self.bar.get("left", d, i)+((((self.xAxis.get("tickWidth")/2)-15)/2)-(this.getBBox().width/2));
				})
				.attr("y", function(d, i) {
					return -0;
				})

	this.vis.get("svg").selectAll('.legend2')
		.data(["schatting"]).enter()
			.append("text")
				.attr("class", "legend2")
				.attr("fill", "#000")
				.attr("font-style", 'italic')
				.text("*schatting")
				.attr("x", function(d, i) {
					return self.vis.get("innerWidth")-this.getBBox().width;
				})
				.attr("y", function() {
					return -20;
				})

	this.vis.get("svg").selectAll('.text')
		.data(this.data[0], function(d, i) {
			return d['x']+'_'+d['g'];
		}).enter()
			.append("text")
				.attr("class", "text")
				.attr("fill", "#FFF")
				.text(function(d, i) {
					return d['y'][1]+'%';
				})
				.attr("x", function(d, i) {
					return (self.bar.get("left", d, i)+(self.bar.get("width")/2))-(this.getBBox().width/2);
				})
				.attr("y", function(d, i) {
					return self.yAxis.get("bbox").height;
				})
				.style("opacity", 0)
					.transition().duration(this.vis.get("transitionSpeed"))
						.style("opacity", 1)
}

armoede.bereikh2.prototype.create=function(parent) {
	var self = this;

	this.xAxis.set("orientation", 'bottom');
	this.xAxis.set("type", 'ordinal');
	this.yAxis.set("orientation", 'left');
	this.yAxis.set("type", 'linear');

	this.vis.on('create', function() {
		self.xAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.bar.set("parent", this);
		self.yAxis.create();
		self.xAxis.create();
		self.bar.create();
	});
	
	this.vis.on("draw", function() {
		self.yAxis.draw();
		self.xAxis.draw();
		self.yAxis.draw();
		self.xAxis.draw();
	}, 0);

	this.vis.on("draw", function() {
		self.bar.redraw();
	}, 1);

	this.vis.on("redraw", function() {
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.yAxis.redraw();
		self.xAxis.redraw();
	}, 0);

	this.vis.on("redraw", function() {
		self.bar.redraw();
	}, 1);

	this.vis.on("draw", function() {
		self.addText();
	}, 2);

	// this.xAxis.set("scale", ['A','B','C','D','E','F','G','H','I','J','K']);
	this.xAxis.set("scale", ['Scholieren-\nVergoeding', 'Collectieve\nZorgverzekering', 'Stadspas\n', 'Gratis\nOV 65+']);
	this.yAxis.set("scale", [0, 100]);

	this.xAxis.set("leftMargin", 0);

	this.xAxis.set("rightMargin", 0);

	this.xAxis.set("link", function() {
		return self.yAxis.get("position", 0);
	});

	this.yAxis.set("link", 0);

	this.yAxis.set("bottomMargin", function() {
		return self.xAxis.get("bbox").height;
	});

	this.yAxis.set("topMargin", 0);

	this.vis.set("margin", 30, 0, 0, 0);
	this.vis.appendTo(parent);

	this.bar.set("end", function(d) {
		var a = 0;
		if(typeof(self.xAxis.get("link")) == 'number') {
			a = self.xAxis.get("link");
		}
		var b = self.yAxis.get("position", d['y'][1]-d['y'][0]);

		return a-b;
	});

	this.xAxis.on("click", function(d, i) {
		self.call("click", d, i);
	});

	this.bar.set("width", function(d, i, f) {
		return (self.xAxis.get("tickWidth")/2)-15;
	});
	this.bar.set("left", function(d, i) {
		if(d['g'] == 1) {
			return (self.xAxis.get("position", d['x'])+self.xAxis.get("bbox").x+10);
		} else {
			return self.xAxis.get("position", d['x'])+self.xAxis.get("bbox").x+5+(self.xAxis.get("tickWidth")/2);
		}
	});
	
	this.bar.set("start", function(d, i, f) {
		var start = self.yAxis.get("position", d['y'][0]);
		if(f == true) {
			var height = this.get('end', d, i, f);
			start -= (height/2);
		}
		return start;
	});

	this.vis.draw();

	this.bar.set("data", this.data[0]);

	this.vis.redraw();
}