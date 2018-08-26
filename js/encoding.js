const cards = [{"name":"Acolyte of Halos","id":0},{"name":"Acolyte of Horns","id":1},{"name":"Aegis Elite","id":2},{"name":"Aegis Infantry","id":3},{"name":"AI Hack","id":4},{"name":"Air Elemental","id":5},{"name":"Ancient Egg","id":6},{"name":"Angel","id":7},{"name":"Angel of Glory","id":8},{"name":"Angel of Retribution","id":9},{"name":"Anseriform","id":10},{"name":"Apprentice Necromancer","id":11},{"name":"Arcane Avatar","id":12},{"name":"Arcane Boost","id":13},{"name":"Archangel","id":14},{"name":"Archon of Death","id":15},{"name":"Archon of Life","id":16},{"name":"Armored Blockade","id":17},{"name":"Arms Dealer","id":18},{"name":"Assassinate","id":19},{"name":"Assault Gunship","id":20},{"name":"Assault Trooper","id":21},{"name":"Assembler Anton","id":22},{"name":"Attractor Bolt","id":23},{"name":"Axe Rager","id":24},{"name":"Befuddle","id":25},{"name":"Betrayal","id":26},{"name":"Biogenesis","id":27},{"name":"Black Ops Team","id":28},{"name":"Blade Symbiote","id":29},{"name":"Blastbarrel Ogre","id":30},{"name":"Blind","id":31},{"name":"Blood Golem","id":32},{"name":"Blood Lord","id":33},{"name":"Boar Stampede","id":34},{"name":"Bog Wisps","id":35},{"name":"Bomb Juggler","id":36},{"name":"Bomb!","id":37},{"name":"Boom Tinkerer","id":38},{"name":"Boost Juice","id":39},{"name":"Bound Abomination","id":40},{"name":"Brawl","id":41},{"name":"Brother Blade","id":42},{"name":"Brother Meteor","id":43},{"name":"Brutalize","id":44},{"name":"C-Rex","id":45},{"name":"Caelia","id":46},{"name":"Call the Horde","id":47},{"name":"Camouflage","id":48},{"name":"Captain Marcos","id":49},{"name":"Cataclysm","id":50},{"name":"Cavalry Bot","id":51},{"name":"Center Root","id":52},{"name":"Chaos Avatar","id":53},{"name":"Chaos Boost","id":54},{"name":"Charge","id":55},{"name":"Chastise","id":56},{"name":"Chill Bolt","id":57},{"name":"Circle of Power","id":58},{"name":"Clock-w-Orc","id":59},{"name":"Clockmaker Tox","id":60},{"name":"Clockwork Dragon","id":61},{"name":"Coal Colossus","id":62},{"name":"Comms Officer","id":63},{"name":"Constrictor","id":64},{"name":"Corpsecrafter","id":65},{"name":"Cull the Weak","id":66},{"name":"Cult Leader","id":67},{"name":"Cyborg Recruit","id":68},{"name":"Cyclops","id":69},{"name":"Cyclopult","id":70},{"name":"Damnation","id":71},{"name":"Deathmark Curse","id":72},{"name":"Deathmark Witch","id":73},{"name":"Defensive Formation","id":74},{"name":"Deja Vu","id":75},{"name":"Demon of Bargains","id":76},{"name":"Demon of Greed","id":77},{"name":"Demon of Pain","id":78},{"name":"Demonic Contract","id":79},{"name":"Demonic Dragon","id":80},{"name":"Demonist","id":81},{"name":"Desert Raider","id":82},{"name":"Devourer","id":83},{"name":"Devout Sentinel","id":84},{"name":"Diquanomus","id":85},{"name":"Dire Crab","id":86},{"name":"Disfavor","id":87},{"name":"Divine Avatar","id":88},{"name":"Divine Boost","id":89},{"name":"Dracolich","id":90},{"name":"Drain Life","id":91},{"name":"Duck","id":92},{"name":"Dwarf Conscript","id":93},{"name":"Dwarf Gunner","id":94},{"name":"Earth Elemental","id":95},{"name":"Electrocute","id":96},{"name":"Elf Guardian","id":97},{"name":"Elite Hacker","id":98},{"name":"EMP Blast","id":99},{"name":"Enchanted Armor","id":100},{"name":"Endless War","id":101},{"name":"Enlarge","id":102},{"name":"Enrage","id":103},{"name":"Eradicate","id":104},{"name":"Ethereal Devourer","id":105},{"name":"Exorcist","id":106},{"name":"Eye Fiend","id":107},{"name":"Fairy Sentry","id":108},{"name":"Fayd","id":109},{"name":"Feral Stalker","id":110},{"name":"Field Medic","id":111},{"name":"Fighter-Bomber","id":112},{"name":"Final Blow","id":113},{"name":"Finger of Death","id":114},{"name":"Fire Elemental","id":115},{"name":"Fireball","id":116},{"name":"Flameaxe Barbarian","id":117},{"name":"Flayed Demon","id":118},{"name":"Flyborg","id":119},{"name":"For the Cause!","id":120},{"name":"Forcefield","id":121},{"name":"Forge Barbarian","id":122},{"name":"Frantic Search","id":123},{"name":"General Boz","id":124},{"name":"Ghost Ship","id":125},{"name":"Glade Defender","id":126},{"name":"Goatstomper","id":127},{"name":"Gobcopter","id":128},{"name":"Goblin Apprentice","id":129},{"name":"Goblin Battle Cry","id":130},{"name":"Goblin Fireworks","id":131},{"name":"Goblin Mechanics","id":132},{"name":"Goblin Rabble","id":133},{"name":"Goblin Warband","id":134},{"name":"Grand Magus","id":135},{"name":"Grasping Horror","id":136},{"name":"Heaven's Guard","id":137},{"name":"Hellfire Cultist","id":138},{"name":"Hellfire Storm","id":139},{"name":"Herald of Giants","id":140},{"name":"Hive Drone","id":141},{"name":"Hive Sniper","id":142},{"name":"Hive Spy","id":143},{"name":"Holo-globe","id":144},{"name":"Holy Bolt","id":145},{"name":"Holy Hammerer","id":146},{"name":"Holy Light","id":147},{"name":"Horrid Cadaver","id":148},{"name":"Hospitaller","id":149},{"name":"Hovertank Mark IV","id":150},{"name":"Hydra","id":151},{"name":"Hyperstim","id":152},{"name":"I Got A Rock","id":153},{"name":"Ice Dragon","id":154},{"name":"Ice Storm","id":155},{"name":"Infection Demon","id":156},{"name":"Invisibility","id":157},{"name":"Irkham Djinn","id":158},{"name":"Judgement","id":159},{"name":"Junkyard Tank","id":160},{"name":"Justice","id":161},{"name":"Kaiju","id":162},{"name":"Kariel","id":163},{"name":"Kenji's Double","id":164},{"name":"Kestrel Ninja","id":165},{"name":"Korgon of the Spires","id":166},{"name":"Krag Warband","id":167},{"name":"Kraken","id":168},{"name":"Krank","id":169},{"name":"Landshark","id":170},{"name":"Lantern Lich","id":171},{"name":"Levitation","id":172},{"name":"Leyline Druid","id":173},{"name":"Lockdown Bot","id":174},{"name":"Lord of Heaven","id":175},{"name":"Lord of Hell","id":176},{"name":"Lord of Rot","id":177},{"name":"Madness","id":178},{"name":"Master Zirell","id":179},{"name":"Mechadragon","id":180},{"name":"MegaZeppelin","id":181},{"name":"Merfolk Healer","id":182},{"name":"Merfolk Scout","id":183},{"name":"Meteor Symbiote","id":184},{"name":"Mightcaster","id":185},{"name":"Militia Guard","id":186},{"name":"Mind Control","id":187},{"name":"Mindhack","id":188},{"name":"Minotaur Charger","id":189},{"name":"Minotaur Guide","id":190},{"name":"Minotaur Shaman","id":191},{"name":"Miracle","id":192},{"name":"Mirror Image","id":193},{"name":"Mist Curse","id":194},{"name":"Mist Witch","id":195},{"name":"Murder","id":196},{"name":"Mutate","id":197},{"name":"Nature Avatar","id":198},{"name":"Nature Boost","id":199},{"name":"Necromancer","id":200},{"name":"Night Stalker","id":201},{"name":"Nightmare","id":202},{"name":"Nullmage","id":203},{"name":"Octoborg","id":204},{"name":"Ogre Rocketeer","id":205},{"name":"Orc Berserker","id":206},{"name":"Orc Captain","id":207},{"name":"Overcharger","id":208},{"name":"Overshock","id":209},{"name":"Pacifism","id":210},{"name":"Pack Hunt","id":211},{"name":"Painbringer","id":212},{"name":"Phantom Destroyer","id":213},{"name":"Phoenix","id":214},{"name":"Plague of Weakness","id":215},{"name":"Primal Hunter","id":216},{"name":"Proliferate","id":217},{"name":"Purify","id":218},{"name":"Queen Ordelia","id":219},{"name":"Raging Goblin","id":220},{"name":"Rainbow Unicorn","id":221},{"name":"Razorbiker","id":222},{"name":"Reap","id":223},{"name":"Rebirth","id":224},{"name":"Redeemer","id":225},{"name":"Regal Unicorn","id":226},{"name":"Reinforcements","id":227},{"name":"Rejuvenate","id":228},{"name":"Replenish","id":229},{"name":"Resupply","id":230},{"name":"Rhinosaur","id":231},{"name":"Rifle Dwarf","id":232},{"name":"Rigged To Blow","id":233},{"name":"Rise from the Grave","id":234},{"name":"Robo-Centaur","id":235},{"name":"Rock Guardian","id":236},{"name":"Rocket Sled","id":237},{"name":"Rusty Gobcopter","id":238},{"name":"Rusty Uniblaster","id":239},{"name":"Sacrificial Victim","id":240},{"name":"Sanctum Healer","id":241},{"name":"Scion of Lightning","id":242},{"name":"Secret Cache","id":243},{"name":"Shadow Ninja","id":244},{"name":"Shield Bot","id":245},{"name":"Shield Force","id":246},{"name":"Shield of Faith","id":247},{"name":"Shield Wall","id":248},{"name":"Shieldcaster Mech","id":249},{"name":"Shifting Ooze","id":250},{"name":"Shockwave","id":251},{"name":"Shockwave Tank","id":252},{"name":"Singularity","id":253},{"name":"Sister Vigor","id":254},{"name":"Smash and Grab","id":255},{"name":"Soul Swap","id":256},{"name":"Specter","id":257},{"name":"Spellweaver","id":258},{"name":"Splash Damage","id":259},{"name":"Stalwart Paladin","id":260},{"name":"Steamwing Scout","id":261},{"name":"Stoneskin","id":262},{"name":"Strike Mech","id":263},{"name":"Supersize","id":264},{"name":"Support Bot","id":265},{"name":"Suppression Gel","id":266},{"name":"Surprise Attack","id":267},{"name":"Swordfly","id":268},{"name":"System Operative","id":269},{"name":"Tac Nuke","id":270},{"name":"Tangle","id":271},{"name":"Tar Golem","id":272},{"name":"Taunt","id":273},{"name":"Tech Avatar","id":274},{"name":"Tech Boost","id":275},{"name":"Teddy Bomb","id":276},{"name":"Teleport","id":277},{"name":"The Foundation","id":278},{"name":"Thorn Spray","id":279},{"name":"Thought Anomaly","id":280},{"name":"Timestop","id":281},{"name":"Tinsnipper","id":282},{"name":"Total Recall","id":283},{"name":"Tower Guard","id":284},{"name":"Tranquility","id":285},{"name":"Tunnel Kren","id":286},{"name":"Twist of Fate","id":287},{"name":"Ultrabot","id":288},{"name":"Unceasing Golem","id":289},{"name":"Uniblaster","id":290},{"name":"Unstable Cyborg","id":291},{"name":"Upgrade","id":292},{"name":"Vampire Duchess","id":293},{"name":"Vampire Duke","id":294},{"name":"Varyn, The Hidden","id":295},{"name":"Vault Kren","id":296},{"name":"Vengeance","id":297},{"name":"Vengeance Demon","id":298},{"name":"Verdant Druid","id":299},{"name":"Vigor Symbiote","id":300},{"name":"Vine Elemental","id":301},{"name":"Walking Bomb","id":302},{"name":"Warboss Shika","id":303},{"name":"Warlord Grumax","id":304},{"name":"Wave Elemental","id":305},{"name":"Weakness Curse","id":306},{"name":"Weakness Witch","id":307},{"name":"Web","id":308},{"name":"Weirdbolt","id":309},{"name":"Worldcrush Giant","id":310},{"name":"Zendak Wurm","id":311},{"name":"Zombie","id":312},{"name":"Zombie Plague","id":313},{"name":"Zombify","id":314}]

// 'Arcane': 0,
// 'Chaos': 1,
// 'Divine': 2,
// 'Nature': 3,
// 'Tech': 4


function card_to_id(card_name) {
	for (let card of cards) {
		if (card_name.toLowerCase().split(" ").join("") == card["name"].toLowerCase().split(" ").join("")) {
			return card["id"];
		}
	}
}


function id_to_card(id_) {
	for (let card of cards) {
		if (id_ == card["id"]) {
			return card["name"];
		}
	}
}

// https://github.com/HearthSim/npm-deckstrings/blob/master/src/index.ts
// Copyright (c) 2017-2018, Benedict Etzel


function encode_deck(card_list, aspects) {
	const writer = new BufferWriter();

	writer.varint(1);

	writer.varint(aspects.length);
	aspects.forEach(aspect => {
		writer.varint(aspect);
	});

	for (let x=1; x < 4; x++) {
		const places = card_list.filter(card => card[1] == x);

		writer.varint(places.length);

		places.forEach(card => {
			writer.varint(card[0]);
		});
	}

	return writer.toString();
}

function decode_deck(deckstring) {
	const reader = new BufferReader(deckstring);

	const version = reader.nextVarint();

	const aspects = [];
	const num_aspects = reader.nextVarint();
	for (let x=0; x < num_aspects; x++) {
		aspects.push(reader.nextVarint());
	}

	const cards = [];

	const num_cards_1 = reader.nextVarint();
	for (let x=0; x < num_cards_1; x++) {
		cards.push([reader.nextVarint(), 1])
	}

	const num_cards_2 = reader.nextVarint();
	for (let x=0; x < num_cards_2; x++) {
		cards.push([reader.nextVarint(), 2])
	}

	const num_cards_3 = reader.nextVarint();
	for (let x=0; x < num_cards_3; x++) {
		cards.push([reader.nextVarint(), 3])
	}

	return [version, aspects, cards];
}
