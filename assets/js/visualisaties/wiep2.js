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

armoede.wiep2=function() {
	this.vis = new x3();
	this.xAxis = new x3.axis();
	this.yAxis = new x3.axis();	
	this.bar = new x3.bar();
	this.grid = new x3.grid();
	
	this.data = [
		{'x': '4', 'y': 18.9, 'color': '#888888'},
		{'x': '9', 'y': 26.2, 'color': '#888888'},
		{'x': '14', 'y': 29.4, 'color': '#888888'},
		{'x': '19', 'y': 26, 'color': '#888888'},
		{'x': '24', 'y': 19.6, 'color': '#888888'},
		{'x': '29', 'y': 13.7, 'color': '#888888'},
		{'x': '34', 'y': 13.7, 'color': '#888888'},
		{'x': '39', 'y': 16.2, 'color': '#888888'},
		{'x': '44', 'y': 18.9, 'color': '#888888'},
		{'x': '49', 'y': 20.6, 'color': '#888888'},
		{'x': '54', 'y': 21.5, 'color': '#888888'},
		{'x': '59', 'y': 22.3, 'color': '#888888'},
		{'x': '64', 'y': 23.8, 'color': '#888888'},
		{'x': '65+', 'y': 28.8, 'color': '#888888'},
	];
}

armoede.wiep2.prototype.addText=function() {
	var self = this;

	this.vis.get("svg").selectAll('.line')
		.data([null])
			.enter()
				.append("line")
					.attr("class", "line")
					.attr("stroke-width", 1)
					.attr("stroke", '#FF0000')
					.style("opacity", 0)
					.attr("x1", this.yAxis.get("bbox").x)
					.attr("x2", this.yAxis.get("bbox").x+this.xAxis.get("bbox").width)
					.attr("y1", this.yAxis.get("position", 0))
					.attr("y2", this.yAxis.get("position", 0))
						.transition().duration(this.vis.get("transitionSpeed"))
							.style("opacity", 1)
							.attr("y1", this.yAxis.get("position", 21))
							.attr("y2", this.yAxis.get("position", 21))

	this.vis.get("svg").selectAll('.text1')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text1")
					.text("gemiddeld 21%")
					.attr("fill", '#FF0000')
					.attr("font-style", 'italic')
					.style("opacity", 0)
					.attr("y", this.yAxis.get("position", 0))
					.transition().duration(this.vis.get("transitionSpeed"))
						.style("opacity", 1)
						.attr("x", function(d, i) {
							return (self.yAxis.get("bbox").x+((self.yAxis.get("bbox").x+self.xAxis.get("bbox").width)/2)-(this.getBBox().width/2));
						})
						.attr("y", function(d, i) {
							return self.yAxis.get("position", 21)-5;
						})
						
	this.vis.get("svg").selectAll('.text2')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text2")
					.style("font-size", "14px")
					.text("% van de Amsterdammers")
					.attr("y", this.yAxis.get("position", 35)-10)
					.attr("x", this.xAxis.get("bbox").x-this.yAxis.get("bbox").width)
					
	this.vis.get("svg").selectAll('.text3')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "text3")
					.attr("font-style", 'italic')
					.text("tot")
					.attr("y", function(d, i) {
						return self.vis.get("innerHeight")-3;
					})
					.attr("x", this.xAxis.get("bbox").x-this.yAxis.get("bbox").width+12)
}

armoede.wiep2.prototype.create=function(parent) {
	var self = this;

	this.xAxis.set("orientation", 'bottom');
	this.xAxis.set("type", 'ordinal');
	this.yAxis.set("orientation", 'left');
	this.yAxis.set("type", 'linear');


	
	this.vis.on('create', function() {
		self.xAxis.set("parent", this);
		self.yAxis.set("parent", this);
		self.bar.set("parent", this);
		self.grid.set("parent", this);
		self.grid.create();
		self.bar.create();
		self.yAxis.create();
		self.xAxis.create();
	});
	
	this.vis.on("draw", function() {
		self.yAxis.draw();
		self.xAxis.draw();
		self.yAxis.draw();
		self.xAxis.draw();
		self.grid.draw();
	}, 0);

	this.vis.on("draw", function() {
		self.bar.redraw();
	}, 1);

	this.vis.on("redraw", function() {
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.yAxis.redraw();
		self.xAxis.redraw();
		self.grid.redraw();
	}, 0);

	this.vis.on("redraw", function() {
		self.bar.redraw();
	}, 1);

	this.vis.on("draw", function() {
		self.addText();
	}, 2);
	
	this.xAxis.set("scale", ['4', '9', '14', '19', '24', '29', '34', '39', '44', '49', '54', '59', '64', '65+']);
	this.yAxis.set("scale", [0, 35]);

	this.grid.set("axis", this.yAxis);
	this.grid.set("left", function() {
		return self.yAxis.get("bbox").width+self.xAxis.get("bbox").width;
	})
	this.grid.set("top", function() {
		return self.yAxis.get("bbox").y;
	});
	this.grid.set("size", function() {
		return self.xAxis.get("bbox").width;
	});
	
	this.xAxis.set("leftMargin", function() {
		return self.yAxis.get("bbox").width;
	});

	this.xAxis.set("rightMargin", 0);

	this.xAxis.set("link", function() {
		return self.yAxis.get("position", 0);
	});

	this.yAxis.set("link", function() {
		return self.yAxis.get("bbox").width;
	});

	this.yAxis.set("bottomMargin", function() {
		return self.xAxis.get("bbox").height;
	});

	this.yAxis.set("topMargin", 0);

	this.vis.set("margin", 15, 0, 0, 0);
	this.vis.appendTo(parent);

	this.bar.set("end", function(d) {
		var a = 0;
		if(typeof(self.xAxis.get("link")) == 'number') {
			a = self.xAxis.get("link");
		}
		var b = self.yAxis.get("position", d['y']);

		return a-b;
	});

	this.bar.set("width", function(d, i) {
		return self.xAxis.get("tickWidth")-6;
	});

	this.bar.set("left", function(d, i) {
		return self.xAxis.get("position", d['x'])+self.xAxis.get("bbox").x+3;
	});
	
	this.bar.set("start", function(d) {
		if(self.xAxis.get("orientation") == 'top') {
			if(typeof(self.xAxis.get("link")) == 'number') {
				return self.xAxis.get("link");
			} else {
				return 0;
			}
		} else if(self.xAxis.get("orientation") == 'bottom') {
			return self.xAxis.get("bbox").y;
		}
	});

	this.bar.set("data", this.data);

	this.vis.draw();	

}