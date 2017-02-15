/*
 *  Copyright (C) 2017 X Gemeente
 *                     X Amsterdam
 *                     X Onderzoek, Informatie en Statistiek
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var visualisaties = [];
var timer = undefined;
/*
 Menu persoon, huishouden, geen keuze
*/
var phd = 3;
/*
 Menu groepen
*/
var wwwb = 1;
/*
 Bereik subgroepen
*/
var ovvs = 1;

var closing = 0;

var cat = ['.wat', '.waar', '.wie', '.bereik'];
var group = ['.huishouden', '.persoon', ''];

function hideAll() {
	for(var i in cat) {
		var cl = d3.select('.nav '+cat[i]).attr("class").replace(" active", "");
		d3.select('.nav '+cat[i]).attr("class", cl);
	}
	for(var i in group) {
		var cl = d3.select('.nav .icons '+group[i]).attr("class").replace(" active", "").replace(" disabled", "");
		d3.select('.nav .icons '+group[i]).attr("class", cl);
	}
	for(var i in group) {
		for(var x in cat) {
			d3.select('.page'+cat[x]+''+group[i])
				.style("opacity", 1)
				.style("height", 0)
				.style("overflow", "hidden")
					.transition().duration(1000)
						.style("opacity", 0)
						.style("visibility", "hidden")
		}
	}
}

function showWaarHuishouden() {
	hideAll();
	var cl1 = d3.select('.nav .waar').attr("class").replace(" active", "");
	d3.select('.nav .waar').attr("class", cl1 +" active");

	var cl2 = d3.select('.nav .icons .huishouden').attr("class").replace(" active", "");
	d3.select('.nav .icons .huishouden').attr("class", cl2 +" active");

	d3.select('.page.waar.huishouden')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('waarh1' in visualisaties)) {
						visualisaties['waarh1'] = new armoede.h1();
						visualisaties['waarh1'].create('.visualisatie.waar.huishouden.wsm');
					}

					if(!('waarh2_1' in visualisaties)) {
						visualisaties['waarh2_1'] = new armoede.waarh2_1();
						visualisaties['waarh2_1'].create('.visualisatie.waar.huishouden.cirkel1');
					}

					if(!('waarh2_2' in visualisaties)) {
						visualisaties['waarh2_2'] = new armoede.waarh2_2();
						visualisaties['waarh2_2'].create('.visualisatie.waar.huishouden.cirkel2');
					}

					if(!('waarh2_3' in visualisaties)) {
						visualisaties['waarh2_3'] = new armoede.waarh2_3();
						visualisaties['waarh2_3'].create('.visualisatie.waar.huishouden.cirkel3');
					}

					if(!('waarh2_4' in visualisaties)) {
						visualisaties['waarh2_4'] = new armoede.waarh2_4();
						visualisaties['waarh2_4'].create('.visualisatie.waar.huishouden.cirkel4');
					}

					if(!('waarh3' in visualisaties)) {
						visualisaties['waarh3'] = new armoede.waarh3();
						visualisaties['waarh3'].create('.visualisatie.waar.huishouden.amsterdam');

						d3.select('.waar.huishouden .amsterdam.perc').node().checked=true;
						d3.select('.waar.huishouden .amsterdam.perc').attr("class", function() {
							return d3.select(this).attr("class")+" active";
						});

						d3.select('.waar.huishouden .amsterdam.abs').on("click", function() {
							visualisaties['waarh3'].showAbs();
							var cl1 = d3.select(this).attr("class").replace(" active","")+" active";
							d3.select(this).attr("class", cl1);

							var cl2 = d3.select('.waar.huishouden .amsterdam.perc').attr("class").replace(" active","");
							d3.select('.waar.huishouden .amsterdam.perc').attr("class", cl2);
						});

						d3.select('.waar.huishouden .amsterdam.perc').on("click", function() {
							visualisaties['waarh3'].showPerc();
							var cl1 = d3.select(this).attr("class").replace(" active","")+" active";
							d3.select(this).attr("class", cl1);

							var cl2 = d3.select('.waar.huishouden .amsterdam.abs').attr("class").replace(" active","");
							d3.select('.waar.huishouden .amsterdam.abs').attr("class", cl2);
						});
					}

					if(!('waarhk' in visualisaties)) {
						visualisaties['waarhk'] = new armoede.kaart();
						visualisaties['waarhk'].create('.visualisatie.waar.huishouden.kaart', 1);
					}
				});
}

function showWaarPersoon() {
	hideAll();
	var cl1 = d3.select('.nav .waar').attr("class").replace(" active", "");
	d3.select('.nav .waar').attr("class", cl1 +" active");

	var cl2 = d3.select('.nav .icons .persoon').attr("class").replace(" active", "");
	d3.select('.nav .icons .persoon').attr("class", cl2 +" active");

	d3.select('.page.waar.persoon')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('waarp1' in visualisaties)) {
						visualisaties['waarp1'] = new armoede.p1();
						visualisaties['waarp1'].create('.visualisatie.waar.persoon.wsm');
					}

					if(!('waarp2' in visualisaties)) {
						visualisaties['waarp2'] = new armoede.waarp2();
						visualisaties['waarp2'].create('.visualisatie.waar.persoon.jongeren');
					}

					if(!('waarp3' in visualisaties)) {
						visualisaties['waarp3'] = new armoede.waarp3();
						visualisaties['waarp3'].create('.visualisatie.waar.persoon.amsterdam');

						d3.select('.waar.persoon .amsterdam.perc').node().checked=true;
						d3.select('.waar.persoon .amsterdam.perc').attr("class", function() {
							return d3.select(this).attr("class")+" active";
						});

						d3.select('.waar.persoon .amsterdam.abs').on("click", function() {
							visualisaties['waarp3'].showAbs();
							var cl1 = d3.select(this).attr("class").replace(" active","")+" active";
							d3.select(this).attr("class", cl1);

							var cl2 = d3.select('.waar.persoon .amsterdam.perc').attr("class").replace(" active","");
							d3.select('.waar.persoon .amsterdam.perc').attr("class", cl2);
						});

						d3.select('.waar.persoon .amsterdam.perc').on("click", function() {
							visualisaties['waarp3'].showPerc();
							var cl1 = d3.select(this).attr("class").replace(" active","")+" active";
							d3.select(this).attr("class", cl1);

							var cl2 = d3.select('.waar.persoon .amsterdam.abs').attr("class").replace(" active","");
							d3.select('.waar.persoon .amsterdam.abs').attr("class", cl2);
						});
					}
					if(!('waarpk' in visualisaties)) {
						visualisaties['waarpk'] = new armoede.kaart();
						visualisaties['waarpk'].create('.visualisatie.waar.persoon.kaart', 3);
					}
				});
}

function showWat() {
	hideAll();
	var cl1 = d3.select('.nav .wat').attr("class").replace(" active", "");
	d3.select('.nav .wat').attr("class", cl1 +" active");

	var cl2 = d3.select('.nav .icons .persoon').attr("class").replace(" disabled", "");
	d3.select('.nav .icons .persoon').attr("class", cl2 +" disabled");

	var cl2 = d3.select('.nav .icons .huishouden').attr("class").replace(" active", "");
	d3.select('.nav .icons .huishouden').attr("class", cl2 +" active");

	d3.select('.page.wat')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('wath1' in visualisaties)) {
						visualisaties['wath1'] = new armoede.h1();
						visualisaties['wath1'].create('.visualisatie.wat.huishouden.wsm');
					}
					if(!('wath2' in visualisaties)) {
						visualisaties['wath2'] = new armoede.wath2();
						visualisaties['wath2'].create('.visualisatie.wat.huishouden.ontwikkeling.perc');
					}
				});
}

function hideBereikAll() {
	var cat = ['.ov', '.scholieren', '.ziektekosten', '.stadspas'];
	for(var x in cat) {
		d3.select('.page.bereik.huishouden'+cat[x])
			.style("opacity", 1)
			.style("height", 0)
			.style("display", "block")
			.style("overflow", "hidden")
				.transition().duration(1000)
					.style("opacity", 0)
					.style("visibility", "hidden")
	}
	
	for(var i=0;i<4;i++) {
		var tick = d3.select('.visualisatie.bereik.huishouden.regeling .axis.bottom .tick-'+i);
		var cl1 = tick.attr("class").replace(" active", "");
		tick.attr("class", cl1);
	}
}

function showBereikRegelingOv() {
	d3.select('.page.bereik.huishouden.ov')
		.style("opacity", 0)
		.style("height", "auto")
		.style("display", "table")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")

	if(('bereikk' in visualisaties)) {
		visualisaties['bereikk'].setCat(6);
	}
}

function showBereikRegelingScholieren() {
	d3.select('.page.bereik.huishouden.scholieren')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
		.style("display", "table")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('bereikh2_1_1' in visualisaties)) {
						visualisaties['bereikh2_1_1'] = new armoede.bereikh2_1_1();
						visualisaties['bereikh2_1_1'].create('.visualisatie.bereik.huishouden.scholieren.uitkering');
					}
					if(!('bereikh2_1_2' in visualisaties)) {
						visualisaties['bereikh2_1_2'] = new armoede.bereikh2_1_2();
						visualisaties['bereikh2_1_2'].create('.visualisatie.bereik.huishouden.scholieren.werk');
					}
					if(!('bereikh2_1_3' in visualisaties)) {
						visualisaties['bereikh2_1_3'] = new armoede.bereikh2_1_3();
						visualisaties['bereikh2_1_3'].create('.visualisatie.bereik.huishouden.scholieren.pensioen');
					}

					if(('bereikk' in visualisaties)) {
						visualisaties['bereikk'].setCat(7);
					}
				});
}

function showBereikRegelingZiektekosten() {
	d3.select('.page.bereik.huishouden.ziektekosten')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
		.style("display", "table")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('bereikh2_2_1' in visualisaties)) {
						visualisaties['bereikh2_2_1'] = new armoede.bereikh2_2_1();
						visualisaties['bereikh2_2_1'].create('.visualisatie.bereik.huishouden.ziektekosten.uitkering');
					}
					if(!('bereikh2_2_2' in visualisaties)) {
						visualisaties['bereikh2_2_2'] = new armoede.bereikh2_2_2();
						visualisaties['bereikh2_2_2'].create('.visualisatie.bereik.huishouden.ziektekosten.werk');
					}
					if(!('bereikh2_2_3' in visualisaties)) {
						visualisaties['bereikh2_2_3'] = new armoede.bereikh2_2_3();
						visualisaties['bereikh2_2_3'].create('.visualisatie.bereik.huishouden.ziektekosten.pensioen');
					}

					if(('bereikk' in visualisaties)) {
						visualisaties['bereikk'].setCat(4);
					}
				});
}

function showBereikRegelingStadspas() {
	d3.select('.page.bereik.huishouden.stadspas')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
		.style("display", "table")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('bereikh2_3_1' in visualisaties)) {
						visualisaties['bereikh2_3_1'] = new armoede.bereikh2_3_1();
						visualisaties['bereikh2_3_1'].create('.visualisatie.bereik.huishouden.stadspas.uitkering');
					}
					if(!('bereikh2_3_2' in visualisaties)) {
						visualisaties['bereikh2_3_2'] = new armoede.bereikh2_3_2();
						visualisaties['bereikh2_3_2'].create('.visualisatie.bereik.huishouden.stadspas.werk');
					}
					if(!('bereikh2_3_3' in visualisaties)) {
						visualisaties['bereikh2_3_3'] = new armoede.bereikh2_3_3();
						visualisaties['bereikh2_3_3'].create('.visualisatie.bereik.huishouden.stadspas.pensioen');
					}

					if(('bereikk' in visualisaties)) {
						visualisaties['bereikk'].setCat(5);
					}
				});
}

function showBereikRegelingPage() {
	switch(ovvs) {
		case 1:
			d3.select('.bereik .kaart.titel').text('Bereik scholierenvergoeding per wijk');
			showBereikRegelingScholieren();
		break;
		case 2:
			d3.select('.bereik .kaart.titel').text('Bereik zorgverzekering per wijk');
			showBereikRegelingZiektekosten();
		break;
		case 3:
			d3.select('.bereik .kaart.titel').text('Bereik stadspas per wijk');
			showBereikRegelingStadspas();
		break;
		case 4:
			d3.select('.bereik .kaart.titel').text('Bereik gratis ov 65+ per wijk');
			showBereikRegelingOv();
		break;
	}
}

function showBereik() {
	hideAll();
	var cl1 = d3.select('.nav .bereik').attr("class").replace(" active", "");
	d3.select('.nav .bereik').attr("class", cl1 +" active");

	var cl2 = d3.select('.nav .icons .persoon').attr("class").replace(" disabled", "");
	d3.select('.nav .icons .persoon').attr("class", cl2 +" disabled");

	var cl2 = d3.select('.nav .icons .huishouden').attr("class").replace(" active", "");
	d3.select('.nav .icons .huishouden').attr("class", cl2 +" active");

	d3.select('.page.bereik')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('bereikh1' in visualisaties)) {
						visualisaties['bereikh1'] = new armoede.h1();
						visualisaties['bereikh1'].create('.visualisatie.bereik.huishouden.wsm');
					}
					if(!('bereikh2' in visualisaties)) {
						visualisaties['bereikh2'] = new armoede.bereikh2();
						visualisaties['bereikh2'].create('.visualisatie.bereik.huishouden.regeling');
						visualisaties['bereikh2'].on("click", function(d, i) {
							ovvs = 4-i;
							hideBereikAll();
							showBereikRegelingPage();
							visualisaties['bereikh2'].changeData(3-i);
						});
						visualisaties['bereikh2'].changeData(0);
					}

					if(!('bereikk' in visualisaties)) {
						visualisaties['bereikk'] = new armoede.kaart();
						visualisaties['bereikk'].create('.visualisatie.bereik.kaart', -1);
					}

					hideBereikAll();
					showBereikRegelingPage();
				});
}

function showWiePersoon() {
	hideAll();
	var cl1 = d3.select('.nav .wie').attr("class").replace(" active", "");
	d3.select('.nav .wie').attr("class", cl1 +" active");

	var cl2 = d3.select('.nav .icons .persoon').attr("class").replace(" active", "");
	d3.select('.nav .icons .persoon').attr("class", cl2 +" active");

	d3.select('.page.wie.persoon')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('wiep1' in visualisaties)) {
						visualisaties['wiep1'] = new armoede.p1();
						visualisaties['wiep1'].create('.visualisatie.wie.persoon.wsm');
					}
					if(!('wiep2' in visualisaties)) {
						visualisaties['wiep2'] = new armoede.wiep2();
						visualisaties['wiep2'].create('.visualisatie.wie.persoon.leeftijdsgroep');
					}
					if(!('wiep4_1' in visualisaties)) {
						visualisaties['wiep4_1'] = new armoede.wiep4_1();
						visualisaties['wiep4_1'].create('.visualisatie.wie.persoon.herkomst');
					}
					if(!('wiep4_2' in visualisaties)) {
						visualisaties['wiep4_2'] = new armoede.wiep4_2();
						visualisaties['wiep4_2'].create('.visualisatie.wie.persoon.leeftijd');
					}
					if(!('wiep4_3' in visualisaties)) {
						visualisaties['wiep4_3'] = new armoede.wiep4_3();
						visualisaties['wiep4_3'].create('.visualisatie.wie.persoon.geslacht');
					}
					if(!('wiep3_1' in visualisaties)) {
						visualisaties['wiep3_1'] = new armoede.wiep3_1();
						visualisaties['wiep3_1'].create('.visualisatie.wie.persoon.instroom');
					}
					if(!('wiep3_2' in visualisaties)) {
						visualisaties['wiep3_2'] = new armoede.wiep3_2();
						visualisaties['wiep3_2'].create('.visualisatie.wie.persoon.uitstroom');
					}
				});
}

function showWieHuishouden() {
	hideAll();
	var cl1 = d3.select('.nav .wie').attr("class").replace(" active", "");
	d3.select('.nav .wie').attr("class", cl1 +" active");

	var cl2 = d3.select('.nav .icons .huishouden').attr("class").replace(" active", "");
	d3.select('.nav .icons .huishouden').attr("class", cl2 +" active");

	d3.select('.page.wie.huishouden')
		.style("opacity", 0)
		.style("height", "auto")
		.style("overflow", "visible")
			.transition().duration(1000)
				.style("opacity", 1)
				.style("visibility", "visible")
				.call(function() {
					if(!('wieh1' in visualisaties)) {
						visualisaties['wieh1'] = new armoede.h1();
						visualisaties['wieh1'].create('.visualisatie.wie.huishouden.wsm');
					}
					if(!('wieh2_1' in visualisaties)) {
						visualisaties['wieh2_1'] = new armoede.wieh2_1();
						visualisaties['wieh2_1'].create('.visualisatie.wie.huishouden.inkomstenbron');
					}
					if(!('wieh2_2' in visualisaties)) {
						visualisaties['wieh2_2'] = new armoede.wieh2_2();
						visualisaties['wieh2_2'].create('.visualisatie.wie.huishouden.samenstelling');
					}
					if(!('wieh2_3' in visualisaties)) {
						visualisaties['wieh2_3'] = new armoede.wieh2_3();
						visualisaties['wieh2_3'].create('.visualisatie.wie.huishouden.duur');
					}
					if(!('wieh3' in visualisaties)) {
						visualisaties['wieh3'] = new armoede.wieh3();
						visualisaties['wieh3'].create('.visualisatie.wie.huishouden.verdeling');
					}
				});
}

function showPage() {
	closing = 1;
	d3.selectAll('.infobox')
		.style("opacity", "1")
			.transition().duration(250)
				.style("opacity", "0.1")
				.each("end", function() {
					d3.selectAll('.infobox').style("visibility", "hidden");
				});
	
	switch(phd) {
		case 1:
			switch(wwwb) {
				case 2:
					showWaarPersoon();
				break;
				case 3:
					showWiePersoon();
				break;
			}
		break;
		case 2:
			switch(wwwb) {
				case 2:
					showWaarHuishouden();
				break;
				case 3:
					showWieHuishouden();
				break;
			}
		break;
		case 3:
			switch(wwwb) {
				case 1:
					showWat();
				break;
				case 4:
					showBereik();
				break;
			}
		break;
	}
}

function showInfo(id) {
	closing = 0;
	d3.select(id)
		.style("opacity", "0")
		.style("visibility", "visible")
			.transition().duration(250)
				.style("opacity", "1");
}

function closeInfo(id) {
	closing = 1;
	d3.selectAll('.infobox')
		.style("opacity", "1")
			.transition().duration(250)
				.style("opacity", "0.1")
				.each("end", function() {
					d3.selectAll('.infobox').style("visibility", "hidden");
				});
}

function fadeInInfo() {
	if(closing == 0) {
		d3.selectAll('.infobox')
			.transition().duration(250)
				.style("opacity", "1");
	}	
}

function fadeOutInfo() {
	if(closing == 0) {
		d3.selectAll('.infobox')
			.transition().duration(250)
				.style("opacity", "0.1");
	}
}

window.onload=function() {
	var timer = null;

	d3.select('.waar.huishouden .info.wsm').on("click", function() {
		showInfo('.infobox.wie.huishouden');
	});

	d3.select('.wat .info.ontwikkeling').on("click", function() {
		showInfo('.infobox.wat.ontwikkeling');
	});

	d3.select('.wat .info.wsm').on("click", function() {
		showInfo('.infobox.wat.wsm');
	});

	d3.select('.wie.persoon .info.instroom').on("click", function() {
		showInfo('.infobox.wie.persoon.instroom');
	});

	d3.select('.waar.persoon .info.wsm').on("click", function() {
		showInfo('.infobox.waar.persoon.wsm');
	});

	d3.select('.wie.huishouden .info.wsm').on("click", function() {
		showInfo('.infobox.wie.huishouden.wsm');
	});

	d3.select('.wie.huishouden .info.verdeling').on("click", function() {
		showInfo('.infobox.wie.huishouden.verdeling');
	});

	d3.select('.waar.huishouden .info.wsm').on("click", function() {
		showInfo('.infobox.waar.huishouden.wsm');
	});

	d3.select('.waar.huishouden .info.amsterdam').on("click", function() {
		showInfo('.infobox.waar.huishouden.amsterdam');
	});

	d3.select('.wie.persoon .info.wsm').on("click", function() {
		showInfo('.infobox.wie.persoon.wsm');
	});

	d3.select('.waar.persoon .info.kinderen').on("click", function() {
		showInfo('.infobox.waar.persoon.kinderen');
	});

	d3.select('.waar.huishouden .info.nederland').on("click", function() {
		showInfo('.infobox.waar.huishouden.nederland');
	});

	d3.select('.wie.huishouden .info.minima').on("click", function() {
		showInfo('.infobox.wie.huishouden.minima');
	});

	d3.select('.wie.persoon .info.leeftijdsgroep').on("click", function() {
		showInfo('.infobox.wie.persoon.leeftijdsgroep');
	});

	d3.select('.waar.persoon .info.amsterdam').on("click", function() {
		showInfo('.infobox.waar.persoon.amsterdam');
	});

	d3.select('.bereik .info.regeling').on("click", function() {
		showInfo('.infobox.bereik.regeling');
	});

	d3.select('.bereik .info.wsm').on("click", function() {
		showInfo('.infobox.bereik.wsm');
	});
	
	d3.selectAll('.infobox .info').on("click", function() {
		closeInfo();
	});

	d3.selectAll('.infobox').on("mouseover", function() {
		fadeInInfo();
	});

	d3.selectAll('.infobox').on("mouseout", function() {
		fadeOutInfo();
	});

	d3.select('.nav .waar').on("click", function() {
		wwwb = 2;
		if(phd == 3) {
			phd = 2;
		}
		showPage();
	});
	d3.select('.nav .wat').on("click", function() {
		wwwb = 1;
		phd = 3;
		showPage();
	});
	d3.select('.nav .wie').on("click", function() {
		wwwb = 3;
		if(phd == 3) {
			phd = 2;
		}
		showPage();
	});
	d3.select('.nav .bereik').on("click", function() {
		wwwb = 4;
		phd = 3;
		showPage();
	});
	d3.select('.nav .icons .huishouden').on("click", function() {
		if(d3.select(this).attr("class").indexOf("disabled") > 0) {
			return;
		}
		if(phd == 3) {
			phd = 3;
		} else {
			phd = 2;
		}
		showPage();
	});
	d3.select('.nav .icons .persoon').on("click", function() {
		if(d3.select(this).attr("class").indexOf("disabled") > 0) {
			return;
		}
		phd = 1;
		showPage();
	});

	d3.selectAll('.download').on('click', function() {
		window.open('./assets/data/bron.xlsx');
	});

	showPage();

	d3.select(window).on('resize', function() {
		window.clearTimeout(timer);
		timer = window.setTimeout(function() {
			if('bereikk' in visualisaties) {
				visualisaties['bereikk'].redraw();
			}
			if('waarpk' in visualisaties) {
				visualisaties['waarpk'].redraw();
			}
			if('waarhk' in visualisaties) {
				visualisaties['waarhk'].redraw();
			}
		}, 100);
	});
}