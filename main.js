if (WP === undefined)
	var WP = {};


// CONFIG
WP.name = 'Wrinkler Popper';
WP.release = 1;
WP.interval = 1000 * 5;

WP.getTheFattestWrinklerId = function() {
	let theFattestWrinklerId = undefined;

	for (let i = 0; i < Game.wrinklers.length; i++) {
		let currentWrinkler = Game.wrinklers[i];
		let { sucked } = Game.wrinklers[i];

		// wrinkler.type = 1 => Shiny
		if (currentWrinkler.type || !sucked)
			continue;

		if (theFattestWrinklerId === undefined) {
			theFattestWrinklerId = i;

			continue;
		}

		if (sucked > Game.wrinklers[theFattestWrinklerId].sucked)
			theFattestWrinklerId = i;
	}

	return theFattestWrinklerId;
}

WP.getSuckingWrinklers = function() {
	let getSuckingWrinklers = 0;

	Game.wrinklers.forEach(wrinkler => {
		if (wrinkler.sucked)
			getSuckingWrinklers++;
	});

	return getSuckingWrinklers;
}

WP.init = function() {
	setInterval(function() {
		if (Game.getWrinklersMax() === WP.getSuckingWrinklers()) {
			let theFattestWrinklerId = WP.getTheFattestWrinklerId();

			console.log(theFattestWrinklerId);

			if (theFattestWrinklerId !== undefined)
				Game.wrinklers[theFattestWrinklerId].hp = 0;
		}
	}, this.interval);

	Game.Notify(
		`${this.name} R${this.release} loaded successfully`,
		'',
		[16,5]
	);
}

Game.registerMod(WP.name, WP);
