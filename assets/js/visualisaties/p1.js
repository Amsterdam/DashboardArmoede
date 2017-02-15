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

armoede.p1=function() {
	this.vis = new x3();
	this.xAxis1 = new x3.axis();
	this.yAxis1 = new x3.axis();

	this.column1 = new x3.column();
	
	this.data = [
		{'y': 'Modaal', 'x': 2024, 'color': '#888888'},
		{'y': '120% WSM', 'x': 1153, 'color': '#FF0000'},
		{'y': 'Wettelijk Sociaal\nMinimum', 'x': 961, 'color': '#FF0000'}
	];
}

armoede.p1.prototype.addText=function() {
	var self = this;
	/*
	 * Additional text
	 */
	this.vis.get("svg").selectAll('.text')
		.data(this.data)
			.enter()
				.append("text")
					.attr("class", "text")
					.attr("fill", '#fff')
					.style("opacity", 1)
					.attr("x", self.xAxis1.get("position", 0)+self.xAxis1.get("bbox").x+5)
					.attr("y", function(d, i) {
						return self.yAxis1.get("position", d['y'])+(self.yAxis1.get("tickWidth")/2)+2.5
					})
					.transition().ease("linear").duration(this.vis.get("transitionSpeed"))
						.attrTween("text", function(d, i) {
							var obj = d3.select(this);
							var i = d3.interpolate(0, d['x']);

							return function(x) {
								obj.text('€ '+(d3.format(',')(Math.round(i(x))).replace(',','.')));
							}
						});
}

armoede.p1.prototype.create=function(parent) {
	var self = this;
	this.xAxis1.set("orientation", 'bottom');
	this.xAxis1.set("type", 'linear');
	this.yAxis1.set("orientation", 'left');
	this.yAxis1.set("type", 'ordinal');
	
	this.vis.on('create', function() {
		self.xAxis1.set("parent", this);
		self.yAxis1.set("parent", this);
		self.column1.set("parent", this);
		self.yAxis1.create();
		self.xAxis1.create();
		self.column1.create();
	});
	
	this.vis.on("draw", function() {
		self.yAxis1.draw();
		self.xAxis1.draw();
		self.yAxis1.draw();
		self.xAxis1.draw();
	}, 0);

	this.vis.on("draw", function() {
		self.column1.draw();
	}, 1);
	
	this.vis.on("draw", function() {
		self.addText();
	}, 2);

	this.vis.on("redraw", function() {
		self.yAxis1.redraw();
		self.xAxis1.redraw();
		self.yAxis1.redraw();
		self.xAxis1.redraw();
	}, 0);

	this.vis.on("redraw", function() {
		self.column1.redraw();
	}, 1);
	
	this.vis.on("redraw", function() {
		self.addText();
	}, 2);
	
	this.xAxis1.set("scale", [0, 3000]);
	this.yAxis1.set("scale", ['Modaal', '120% WSM', 'Wettelijk Sociaal\nMinimum']);

	this.xAxis1.set("leftMargin", function() {
		return self.yAxis1.get("bbox").width;
	});

	this.xAxis1.set("rightMargin", function() {
		return -self.xAxis1.get("textMargin")[1]/2;
	});

	this.xAxis1.set("link", function() {
		return self.yAxis1.get("bbox").height+self.yAxis1.get("bbox").y;
	});

	this.yAxis1.set("link", function() {
		return self.xAxis1.get("position", 0)+self.xAxis1.get("bbox").x;
	});
	
	this.yAxis1.set("bottomMargin", 0);

	this.yAxis1.set("topMargin", 1);

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

	this.column1.set("start", function(d) {
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

	this.vis.draw();	

	this.column1.set("data", this.data);

	this.vis.redraw();	

}