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

armoede.waarp3=function() {
	this.vis = new x3();
	this.xAxis1 = new x3.axis();
	this.yAxis1 = new x3.axis();
	this.xAxis2 = new x3.axis();
	this.yAxis2 = new x3.axis();

	this.column1 = new x3.column();
	this.column2 = new x3.column();

	this.data = [];
	
	this.data[0] = [
		{'y': 'Zuidoost', 'x': 0, 'color': '#FF0000'},
		{'y': 'Noord', 'x': 0, 'color': '#FF0000'},
		{'y': 'West en Westpoort', 'x': 0, 'color': '#FF0000'},
		{'y': 'Nieuw-West', 'x': 0, 'color': '#FF0000'},
		{'y': 'Oost', 'x': 0, 'color': '#FF0000'},
		{'y': 'Centrum', 'x': 0, 'color': '#FF0000'},
		{'y': 'Zuid', 'x': 0, 'color': '#FF0000'},
		{'y': 'Onbekend', 'x': 0, 'color': '#FF0000'}
	];
	this.data[1] = [
		{'y': 'Zuidoost', 'x': 0, 'color': '#888888'},
		{'y': 'Noord', 'x': 0, 'color': '#888888'},
		{'y': 'West en Westpoort', 'x': 0, 'color': '#888888'},
		{'y': 'Nieuw-West', 'x': 0, 'color': '#888888'},
		{'y': 'Oost', 'x': 0, 'color': '#888888'},
		{'y': 'Centrum', 'x': 0, 'color': '#888888'},
		{'y': 'Zuid', 'x': 0, 'color': '#888888'},
		{'y': 'Onbekend', 'x': 0, 'color': '#888888'}
	];
}

armoede.waarp3.prototype.showPerc=function() {
	var self = this;
	this.data[0] = [
		{'y': 'Zuidoost', 'x': 35, 'color': '#FF0000'},
		{'y': 'Noord', 'x': 31, 'color': '#FF0000'},
		{'y': 'West en Westpoort', 'x': 27, 'color': '#FF0000'},
		{'y': 'Nieuw-West', 'x': 26, 'color': '#FF0000'},
		{'y': 'Oost', 'x': 20, 'color': '#FF0000'},
		{'y': 'Centrum', 'x': 17, 'color': '#FF0000'},
		{'y': 'Zuid', 'x': 15, 'color': '#FF0000'},
		{'y': 'Onbekend', 'x': 9, 'color': '#FF0000'}
	];

	this.data[1] = [
		{'y': 'Zuidoost', 'x': 0, 'color': '#888888'},
		{'y': 'Noord', 'x': 0, 'color': '#888888'},
		{'y': 'West en Westpoort', 'x': 0, 'color': '#888888'},
		{'y': 'Nieuw-West', 'x': 0, 'color': '#888888'},
		{'y': 'Oost', 'x': 0, 'color': '#888888'},
		{'y': 'Centrum', 'x': 0, 'color': '#888888'},
		{'y': 'Zuid', 'x': 0, 'color': '#888888'},
		{'y': 'Onbekend', 'x': 0, 'color': '#888888'}
	];

	this.column1.set("data", this.data[0]);

	this.column2.set("data", this.data[1]);

	this.yAxis1.set("sort", function(d) {
		d(self.column1.get("data").sort(function(a, b) {
			return a['x'] - b['x'];
		})
		.map(function(d) { return d['y'] }));
	});

	this.yAxis2.set("sort", function(d) {
		d(self.column1.get("data").sort(function(a, b) {
			return a['x'] - b['x'];
		})
		.map(function(d) { return d['y'] }));
	});

	this.vis.redraw();
}

armoede.waarp3.prototype.addText=function() {
	var self = this;
	/*
	 * Additional text
	 */
	var text1 = this.vis.get("svg").selectAll('.text1')
		.data(this.data[0], function(d, i) {
			return i;
		})
	
	text1
		.enter()
			.append("text")
				.attr("class", "text1")
				.text(function(d, i) {
					return d['x']+'%';
				})
				.attr("fill", '#fff')
				.style("opacity", 0)
				.transition().duration(this.vis.get("transitionSpeed"))
					.style("opacity", 1)
					.attr("x", self.xAxis1.get("position", 0)+self.xAxis1.get("bbox").x+5)
					.attr("y", function(d, i) {
						return self.yAxis1.get("position", d['y'])+(self.yAxis1.get("tickWidth")/2)+2.5
					})

	this.vis.get("svg").selectAll('.text1')
		.transition().duration(this.vis.get("transitionSpeed"))
			.style("opacity", 1)
			.attr("x", self.xAxis1.get("position", 0)+self.xAxis1.get("bbox").x+5)
			.attr("y", function(d, i) {
				return self.yAxis1.get("position", d['y'])+(self.yAxis1.get("tickWidth")/2)+2.5
			})
			.attrTween("text", function(d, i) {
				var obj = d3.select(this);
				var old = obj.text().replace('%', '');
				var i = d3.interpolate(old, d['x']);
				return function(x) {
					obj.text(Math.round(i(x))+'%');
				}
			});

	var text2 = this.vis.get("svg").selectAll('.text2')
		.data(this.data[1], function(d, i) {
			return i;
		})

	text2
		.enter()
			.append("text")
				.attr("class", "text2")
				.text(function(d, i) {
					return (d['x']*1000);
				})
				.attr("fill", '#fff')
				.style("opacity", 0)
				.transition().duration(this.vis.get("transitionSpeed"))
					.style("opacity", 1)
					.attr("x", function(d, i) {
						return ((self.xAxis1.get("bbox").x+self.xAxis2.get("position", 0))-(42+5))
					})
					.attr("y", function(d, i) {
						return self.yAxis2.get("position", d['y'])+(self.yAxis2.get("tickWidth")/2)+2.5
					})

	this.vis.get("svg").selectAll('.text2')				
		.transition().duration(this.vis.get("transitionSpeed"))
			.style("opacity", 1)
			.attr("x", function(d, i) {
				return ((self.xAxis1.get("bbox").x+self.xAxis2.get("position", 0))-(42+5))
			})
			.attr("y", function(d, i) {
				return self.yAxis2.get("position", d['y'])+(self.yAxis2.get("tickWidth")/2)+2.5
			})
			.attrTween("text", function(d, i) {
				var obj = d3.select(this);
				var old = obj.text();
				var i = d3.interpolate(old, d['x']*1000);

				return function(x) {
					obj.text((d3.format(',')(i(x)).replace(',','.')));
				}
			});
}

armoede.waarp3.prototype.showAbs=function() {
	var self = this;
	this.data[0] = [
		{'y': 'West en Westpoort', 'x': 0, 'color': '#FF0000'},
		{'y': 'Zuidoost', 'x': 0, 'color': '#FF0000'},
		{'y': 'Noord', 'x': 0, 'color': '#FF0000'},
		{'y': 'Nieuw-West', 'x': 0, 'color': '#FF0000'},
		{'y': 'Oost', 'x': 0, 'color': '#FF0000'},
		{'y': 'Centrum', 'x': 0, 'color': '#FF0000'},
		{'y': 'Zuid', 'x': 0, 'color': '#FF0000'},
		{'y': 'Onbekend', 'x': 0, 'color': '#FF0000'}
	];
	this.data[1] = [
		{'y': 'West en Westpoort', 'x': 5653/1000, 'color': '#888888'},
		{'y': 'Zuidoost', 'x': 5917/1000, 'color': '#888888'},
		{'y': 'Noord', 'x': 5785/1000, 'color': '#888888'},
		{'y': 'Nieuw-West', 'x': 7864/1000, 'color': '#888888'},
		{'y': 'Oost', 'x': 4983/1000, 'color': '#888888'},
		{'y': 'Centrum', 'x': 1573/1000, 'color': '#888888'},
		{'y': 'Zuid', 'x': 2939/1000, 'color': '#888888'},
		{'y': 'Onbekend', 'x': 3/1000, 'color': '#888888'}
	];
	this.column1.set("data", this.data[0]);

	this.column2.set("data", this.data[1]);

	this.yAxis1.set("sort", function(d) {
		d(self.column2.get("data").sort(function(a, b) {
			return a['x'] - b['x'];
		})
		.map(function(d) { return d['y'] }));
	});

	this.yAxis2.set("sort", function(d) {
		d(self.column2.get("data").sort(function(a, b) {
			return a['x'] - b['x'];
		})
		.map(function(d) { return d['y'] }));
	});


	this.vis.redraw();
}

armoede.waarp3.prototype.create=function(parent) {
	var self = this;

	this.xAxis1.set("orientation", 'bottom');
	this.xAxis1.set("type", 'linear');
	this.yAxis1.set("orientation", 'left');
	this.yAxis1.set("type", 'ordinal');
	
	this.xAxis2.set("orientation", 'top');
	this.xAxis2.set("type", 'linear');
	this.yAxis2.set("orientation", 'right');
	this.yAxis2.set("type", 'ordinal');

	this.vis.on('create', function() {
		self.xAxis1.set("parent", this);
		self.yAxis1.set("parent", this);
		self.xAxis2.set("parent", this);
		self.yAxis2.set("parent", this);
		self.column1.set("parent", this);
		self.column2.set("parent", this);
		self.yAxis1.create();
		self.xAxis1.create();
		self.yAxis2.create();
		self.xAxis2.create();
		self.column1.create();
		self.column2.create();
	});
	
	this.vis.on("draw", function() {
		self.yAxis1.draw();
		self.xAxis1.draw();
		self.yAxis1.draw();
		self.xAxis1.draw();
		self.yAxis2.draw();
		self.xAxis2.draw();
		self.yAxis2.draw();
		self.xAxis2.draw();
	}, 0);

	this.vis.on("draw", function() {
		self.column1.draw();
		self.column2.draw();
	}, 1);

	this.vis.on("redraw", function() {
		self.yAxis1.redraw();
		self.xAxis1.redraw();
		self.yAxis1.redraw();
		self.xAxis1.redraw();
		self.yAxis2.redraw();
		self.xAxis2.redraw();
		self.yAxis2.redraw();
		self.xAxis2.redraw();
	}, 0);

	this.vis.on("redraw", function() {
		self.column1.redraw();
		self.column2.redraw();
	}, 1);

	this.vis.on("draw", function() {
		self.addText();
	}, 2)
	
	this.vis.on("redraw", function() {
		self.addText();
	}, 2)
	
	this.xAxis1.set("scale", [0, 40]);
	this.yAxis1.set("scale", ['Zuidoost', 'Noord', 'West en Westpoort', 'Nieuw-West', 'Oost', 'Centrum', 'Zuid', 'Onbekend']);

	this.xAxis1.set("leftMargin", function() {
		return self.yAxis1.get("bbox").width;
	});

	this.xAxis1.set("rightMargin", 0);

	this.xAxis1.set("link", function() {
		return self.yAxis1.get("bbox").height+self.yAxis1.get("bbox").y;
	});

	this.yAxis1.set("link", function() {
		return self.xAxis1.get("position", 0)+self.xAxis1.get("bbox").x;
	});

	this.yAxis1.set("bottomMargin", 0);

	this.yAxis1.set("topMargin", 1);

	this.xAxis2.set("scale", [8.75, 0]);
	this.yAxis2.set("scale", ['Zuidoost', 'Noord', 'West en Westpoort', 'Nieuw-West', 'Oost', 'Centrum', 'Zuid', 'Onbekend']);

	this.xAxis2.set("leftMargin", function() {
		return self.yAxis1.get("bbox").width;
	});

	this.xAxis2.set("rightMargin", -8);

	this.xAxis2.set("link", function() {
		return self.yAxis2.get("bbox").y;
	});

	this.yAxis2.set("link", function() {
		return self.xAxis2.get("bbox").width+self.xAxis2.get("bbox").x;
	});

	this.yAxis2.set("bottomMargin", 0);

	this.yAxis2.set("topMargin", function() {
		return 1;
	});

	this.vis.set("margin", 0, 0, 0, 0);
	this.vis.appendTo(parent);

	this.column1.set("end", function(d) {
		var a = 0;
		if(typeof(self.yAxis1.get("link")) == 'number') {
			c = self.yAxis1.get("link");
		}
		var a = c-self.xAxis1.get("bbox").x;
		var b = self.xAxis1.get("position", d['x']);

		return b-a;
	});

	this.column1.set("height", function(d, i) {
		return self.yAxis1.get("tickWidth")-10;
	});

	this.column1.set("top", function(d, i) {
		return self.yAxis1.get("position", d['y'])+5;
	});

	this.column1.set("start", function(d, i, f) {
		if(self.yAxis1.get("orientation") == 'right') {
			if(typeof(self.yAxis1.get("link")) == 'number') {
				return self.yAxis1.get("link");
			} else {
				return 0;
			}
		} else if(self.yAxis1.get("orientation") == 'left') {
			return self.yAxis1.get("bbox").x;
		}
	});

	this.column2.set("end", function(d) {
		var a = 0;
		if(typeof(self.yAxis2.get("link")) == 'number') {
			c = self.yAxis2.get("link");
		}
		var a = c-self.xAxis2.get("bbox").x;
		var b = self.xAxis2.get("position", d['x']);

		return b-a;
	});

	this.column2.set("height", function(d, i) {
		return self.yAxis2.get("tickWidth")-10;
	});

	this.column2.set("top", function(d, i) {
		return self.yAxis2.get("position", d['y'])+5;
	});

	this.column2.set("start", function(d) {
		if(self.yAxis2.get("orientation") == 'right') {
			if(typeof(self.yAxis2.get("link")) == 'number') {
				return self.yAxis2.get("link");
			} else {
				return 0;
			}
		} else if(self.yAxis2.get("orientation") == 'left') {
			return self.yAxis2.get("bbox").x;
		}
	});

	this.vis.draw();

	this.column1.set("data", this.data[0]);
	this.column2.set("data", this.data[1]);

	this.vis.redraw();

	this.showPerc();
}

armoede.waarp3.prototype.redraw=function() {
	this.vis.redraw();
}