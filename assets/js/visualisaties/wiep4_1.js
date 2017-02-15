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

armoede.wiep4_1=function() {
	this.vis = new x3();
	this.pie = new x3.pie();
	this.pieText = new x3.pieText();
	
	this.data = [];
	this.data[0] = [
		{ 'label': 'autochtonen', 'value': 16.6, 'color': '#FF0000' },
		{ 'label': 'Turken', 'value': 16.6, 'color': '#E8E8E8' },
		{ 'label': 'Marokkanen', 'value': 16.7, 'color': '#BEBEBE' },
		{ 'label': 'Surinamers', 'value': 16.7, 'color': '#888888' },
		{ 'label': 'Antillianen', 'value': 16.7, 'color': '#004699' },
		{ 'label': 'overige', 'value': 16.7, 'color': '#71BDEE' }
	]
	this.data[1] = [
		{ 'value': 32.3 },
		{ 'value': 8.4 },
		{ 'value': 15.5 },
		{ 'value': 11.2 },
		{ 'value': 1.9 },
		{ 'value': 30.6 }
	]
}

armoede.wiep4_1.prototype.addText=function() {
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

armoede.wiep4_1.prototype.create=function(parent) {
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

	this.vis.set("margin", 0, 0, 150, 0);
	this.vis.appendTo(parent);

	this.pieText.set("text", function(d, i) {
		return d+'%';
	});
	
	this.pie.set("data", this.data[0]);

	this.vis.draw();

	this.pie.set("data", this.data[1]);

	this.vis.redraw();
}