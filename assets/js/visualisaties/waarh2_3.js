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

armoede.waarh2_3=function() {
	this.vis = new x3();
	this.pie = new x3.pie();
	this.pieText = new x3.pieText();

	this.data = [];
	this.data[0] = [{ 'value': 0, 'color': '#FF0000' }, { 'value': 100, 'color': '#888888', 'label': false }]
	this.data[1] = [{ 'value': 26.1 }, { 'value': 73.9, 'label': false }]
}

armoede.waarh2_3.prototype.addText=function() {
	var self = this;

	this.vis.get("svg").selectAll('.label')
		.data([null])
			.enter()
				.append("text")
					.attr("class", "label")
					.attr("font-size", 12)
					.text("Rotterdam")
					.attr("y", function() {
						return (self.vis.get("innerHeight")+(this.getBBox().height/2))+(this.getBBox().height/2);
					})
					.attr("x", function(d, i) {
						return (self.vis.get("innerWidth")/2)-(this.getBBox().width/2);
					})
}

armoede.waarh2_3.prototype.create=function(parent) {
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

	this.vis.set("margin", 0, 0, 30, 0);
	this.vis.appendTo(parent);

	this.pieText.set("text", function(d, i) {
		if(i == 0) {
			return d+'%';
		} else {
			return '';
		}
	});
	
	this.pie.set("data", this.data[0]);

	this.vis.draw();

	this.pie.set("data", this.data[1]);

	this.vis.redraw();
}