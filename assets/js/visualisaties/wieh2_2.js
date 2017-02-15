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

armoede.wieh2_2=function() {
	this.vis = new x3();
	this.pie = new x3.pie();
	this.pieText = new x3.pieText();
	
	this.data = [];
	this.data[0] = [
		{'label': 'alleenstaanden', 'value': 25, 'unit': '%', 'color': '#FF0000' },
		{'label': 'paren zonder kinderen', 'value': 25, 'unit': '%', 'color': '#CCCCCC' },
		{'label': 'paren met kinderen', 'value': 25, 'unit': '%', 'color': '#888888' },
		{'label': 'eenoudergezinnen', 'value': 25, 'unit': '%', 'color': '#71BDEE' }
	];
	this.data[1] = [
		{ 'value': 64.8, 'unit': '%' },
		{ 'value': 9.5, 'unit': '%' },
		{ 'value': 9.1, 'unit': '%'},
		{ 'value': 16, 'unit': '%' }
	];
}

armoede.wieh2_2.prototype.addText=function() {
	var self = this;

	this.vis.get("svg").selectAll('text.legend')
		.data(this.data[0])
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
						return 20;
					})
	
	this.vis.get("svg").selectAll('rect.legend')
		.data(this.data[0])
			.enter()
				.append("rect")
					.attr("class", "legend")
					.attr("width", 10)
					.attr("height", 10)
					.attr("fill", function(d, i) {
						return d['color'];
					})
					.attr("y", function(d, i) {
						return (self.vis.get("innerHeight")+14+(20*i));
					})
					.attr("x", function(d, i) {
						return 5;
					})
}

armoede.wieh2_2.prototype.create=function(parent) {
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

	this.vis.set("margin", 0, 0, 100, 0);
	this.vis.appendTo(parent);

	this.pie.set("data", this.data[0]);

	this.pieText.set("text", function(d, i) {
		return d+'%';
	});
	
	this.vis.draw();

	this.pie.set("data", this.data[1]);

	this.vis.redraw();
}