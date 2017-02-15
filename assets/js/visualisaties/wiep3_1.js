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

armoede.wiep3_1=function() {
	this.vis = new x3();
	this.pie = new x3.pie();
	this.pieText = new x3.pieText();
	
	this.data = [];
	this.data[0] = [
		{ 'label': 'had al laag inkomen', 'value': 20, 'color': '#b5b7b9' },
		{ 'label': 'overige instroom', 'value': 20, 'color': '#787878' },
		{ 'label': '> 200% WSM', 'value': 20, 'color': '#034EA1' },
		{ 'label': '140 - 200% WSM', 'value': 20, 'color': '#017DC7' },
		{ 'label': '120 - 140% WSM', 'value': 20, 'color': '#00ADEE' },
		{ 'label': 'instroom minima', 'value': 0, 'color': '#00FF00' }
	]
	this.data[1] = [
		{ 'value': 72.8 },
		{ 'value': 9.8 },
		{ 'value': 3.9 },
		{ 'value': 6.2 },
		{ 'value': 7.3 },
		{ 'value': 0 }
	]
}

armoede.wiep3_1.prototype.addText=function() {
	var self = this;

	var gradient = this.vis.get("svg").append("defs")
		.append("linearGradient")
			.attr("id", "gradient")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "0%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");
			
	gradient.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "#00ADEE")
		.attr("stop-opacity", 1);

	gradient.append("stop")
		.attr("offset", "50%")
		.attr("stop-color", "#017DC7")
		.attr("stop-opacity", 1);

	gradient.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#034EA1")
		.attr("stop-opacity", 1);

	var w = 0;
	this.vis.get("svg").selectAll('.caption1')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "caption")
					.attr("font-size", 16)
					.text("INSTROOM")
					.attr("y", function() {
						return -this.getBBox().height;
					})
					.attr("x", 0)

	this.vis.get("svg").selectAll('.caption1')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "caption")
					.attr("font-size", 16)
					.attr("text-align", "middle")
					.text("27%")
					.attr("y", function() {
						return -this.getBBox().height+this.getBBox().height;
					})
					.attr("x",0)

	this.vis.get("svg").selectAll('text.legend')
		.data(this.data[0].reverse())
			.enter()
				.append("text")
					.attr("class", "legend")
					.attr("font-size", 12)
					.text(function(d, i) {
						return d['label'];
					})
					.attr("y", function(d, i) {
						return (self.vis.get("innerHeight")+24+(20*i));
					})
					.attr("x", function(d, i) {
						if(i > 0 && i < 5) {
							return 40;
						} else {
							return 20;
						}
					})
	
	this.vis.get("svg").selectAll('rect.legend')
		.data(this.data[0])
			.enter()
				.append("rect")
					.attr("class", "legend")
					.attr("width", 10)
					.attr("height", 10)
					.attr("fill", function(d, i) {
						if(i == 0) {
							return "url(#gradient)";
						} else {
							return d['color'];
						}
					})
					.attr("y", function(d, i) {
						return (self.vis.get("innerHeight")+14+(20*i));
					})
					.attr("x", function(d, i) {
						if(i > 0 && i < 5) {
							return 20;
						} else {
							return 5;
						}
					})
}

armoede.wiep3_1.prototype.create=function(parent) {
	var self = this;

	this.vis.on('create', function() {
		self.pie.set("parent", this);
		self.pieText.set("parent", self.pie);
		self.pie.create();
	});

	this.vis.on("draw", function() {
		self.pie.draw();
		self.pieText.draw();
	}, 0);

	this.vis.on("redraw", function() {
		self.pie.redraw();
		self.pieText.redraw();
	}, 0);

	this.vis.on("draw", function() {
		self.addText();
	}, 2);

	this.vis.set("margin", 35, 0, 150, 0);
	this.vis.appendTo(parent);

	this.pieText.set("text", function(d, i) {
		return d+'%';
	});

	this.pie.set("data", this.data[0]);

	this.vis.draw();

	this.pie.set("data", this.data[1]);

	this.vis.redraw();
}