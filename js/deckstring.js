const deckstring = {};


// https://github.com/HearthSim/npm-deckstrings/blob/master/src/buffer.ts
// Copyright (c) 2017-2018, Benedict Etzel

class Iterator {
  constructor() {
    this.index = 0;
  }

  next(repeat = 1) {
    this.index += repeat;
  }
}

class BufferWriter extends Iterator {
  constructor() {
    super();
    this.buffer = [];
  }

  varint(value) {
    encode(value, this.buffer, this.index);
    this.next(encode.bytes);
  }

  toString() {
    const binary = String.fromCharCode(...this.buffer);
    return btoa(binary);
  }
}

class BufferReader extends Iterator {
  constructor(string) {
    super();
    const binary = atob(string);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    this.buffer = buffer;
  }

  nextByte() {
    const value = this.buffer[this.index];
    this.next();
    return value;
  }

  nextVarint() {
    const value = decode(this.buffer, this.index);
    this.next(decode.bytes);
    return value;
  }
}

// https://github.com/chrisdickinson/varint

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function decode(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length

  do {
    if (counter >= l) {
      decode.bytes = 0
      throw new RangeError('Could not decode varint')
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)

  decode.bytes = counter - offset

  return res
}

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}

deckstring.cards = [{"name":"Acolyte of Halos","id":0,"aspect":"Divine","cost":2},{"name":"Acolyte of Horns","id":1,"aspect":"Divine","cost":2},{"name":"Aegis Elite","id":2,"aspect":"Tech","cost":2},{"name":"Aegis Infantry","id":3,"aspect":"Tech","cost":1},{"name":"AI Hack","id":4,"aspect":"Tech","cost":2},{"name":"Air Elemental","id":5,"aspect":"Nature","cost":5},{"name":"Ancient Egg","id":6,"aspect":"Nature","cost":3},{"name":"Angel","id":7,"aspect":"Divine","cost":4},{"name":"Angel of Glory","id":8,"aspect":"Divine","cost":6},{"name":"Angel of Retribution","id":9,"aspect":"Divine","cost":4},{"name":"Anseriform","id":10,"aspect":"Chaos","cost":5},{"name":"Apprentice Necromancer","id":11,"aspect":"Arcane","cost":1},{"name":"Arcane Avatar","id":12,"aspect":"Arcane","cost":6},{"name":"Arcane Boost","id":13,"aspect":"Arcane","cost":3},{"name":"Archangel","id":14,"aspect":"Divine","cost":7},{"name":"Archon of Death","id":15,"aspect":"Divine","cost":3},{"name":"Archon of Life","id":16,"aspect":"Divine","cost":5},{"name":"Armored Blockade","id":17,"aspect":"Tech","cost":3},{"name":"Arms Dealer","id":18,"aspect":"Tech","cost":1},{"name":"Assassinate","id":19,"aspect":"Tech","cost":6},{"name":"Assault Gunship","id":20,"aspect":"Tech","cost":4},{"name":"Assault Trooper","id":21,"aspect":"Tech","cost":4},{"name":"Assembler Anton","id":22,"aspect":"Chaos","cost":3},{"name":"Attractor Bolt","id":23,"aspect":"Chaos","cost":5},{"name":"Axe Rager","id":24,"aspect":"Nature","cost":2},{"name":"Befuddle","id":25,"aspect":"Arcane","cost":3},{"name":"Betrayal","id":26,"aspect":"Arcane","cost":3},{"name":"Biogenesis","id":27,"aspect":"Nature","cost":3},{"name":"Black Ops Team","id":28,"aspect":"Tech","cost":3},{"name":"Blade Symbiote","id":29,"aspect":"Nature","cost":2},{"name":"Blastbarrel Ogre","id":30,"aspect":"Chaos","cost":5},{"name":"Blind","id":31,"aspect":"Arcane","cost":2},{"name":"Blood Golem","id":32,"aspect":"Arcane","cost":2},{"name":"Blood Lord","id":33,"aspect":"Divine","cost":7},{"name":"Boar Stampede","id":34,"aspect":"Nature","cost":7},{"name":"Bog Wisps","id":35,"aspect":"Arcane","cost":1},{"name":"Bomb Juggler","id":36,"aspect":"Chaos","cost":2},{"name":"Bomb!","id":37,"aspect":"Chaos","cost":2},{"name":"Boom Tinkerer","id":38,"aspect":"Chaos","cost":1},{"name":"Boost Juice","id":39,"aspect":"Chaos","cost":2},{"name":"Bound Abomination","id":40,"aspect":"Arcane","cost":3},{"name":"Brawl","id":41,"aspect":"Nature","cost":4},{"name":"Brother Blade","id":42,"aspect":"Nature","cost":4},{"name":"Brother Meteor","id":43,"aspect":"Nature","cost":1},{"name":"Brutalize","id":44,"aspect":"Arcane","cost":2},{"name":"C-Rex","id":45,"aspect":"Tech","cost":4},{"name":"Caelia","id":46,"aspect":"Nature","cost":4},{"name":"Call the Horde","id":47,"aspect":"Chaos","cost":3},{"name":"Camouflage","id":48,"aspect":"Nature","cost":3},{"name":"Captain Marcos","id":49,"aspect":"Tech","cost":3},{"name":"Cataclysm","id":50,"aspect":"Nature","cost":6},{"name":"Cavalry Bot","id":51,"aspect":"Tech","cost":6},{"name":"Center Root","id":52,"aspect":"Nature","cost":6},{"name":"Chaos Avatar","id":53,"aspect":"Chaos","cost":6},{"name":"Chaos Boost","id":54,"aspect":"Chaos","cost":3},{"name":"Charge","id":55,"aspect":"Chaos","cost":3},{"name":"Chastise","id":56,"aspect":"Divine","cost":3},{"name":"Chill Bolt","id":57,"aspect":"Arcane","cost":1},{"name":"Circle of Power","id":58,"aspect":"Arcane","cost":2},{"name":"Clock-w-Orc","id":59,"aspect":"Chaos","cost":2},{"name":"Clockmaker Tox","id":60,"aspect":"Chaos","cost":3},{"name":"Clockwork Dragon","id":61,"aspect":"Chaos","cost":7},{"name":"Coal Colossus","id":62,"aspect":"Chaos","cost":6},{"name":"Comms Officer","id":63,"aspect":"Tech","cost":2},{"name":"Constrictor","id":64,"aspect":"Nature","cost":3},{"name":"Corpsecrafter","id":65,"aspect":"Arcane","cost":3},{"name":"Cull the Weak","id":66,"aspect":"Divine","cost":2},{"name":"Cult Leader","id":67,"aspect":"Divine","cost":3},{"name":"Cyborg Recruit","id":68,"aspect":"Tech","cost":1},{"name":"Cyclops","id":69,"aspect":"Chaos","cost":0},{"name":"Cyclopult","id":70,"aspect":"Chaos","cost":3},{"name":"Damnation","id":71,"aspect":"Divine","cost":5},{"name":"Deathmark Curse","id":72,"aspect":"Divine","cost":3},{"name":"Deathmark Witch","id":73,"aspect":"Divine","cost":3},{"name":"Defensive Formation","id":74,"aspect":"Tech","cost":2},{"name":"Deja Vu","id":75,"aspect":"Arcane","cost":2},{"name":"Demon of Bargains","id":76,"aspect":"Divine","cost":3},{"name":"Demon of Greed","id":77,"aspect":"Divine","cost":3},{"name":"Demon of Pain","id":78,"aspect":"Divine","cost":4},{"name":"Demonic Contract","id":79,"aspect":"Divine","cost":2},{"name":"Demonic Dragon","id":80,"aspect":"Divine","cost":7},{"name":"Demonist","id":81,"aspect":"Divine","cost":2},{"name":"Desert Raider","id":82,"aspect":"Chaos","cost":4},{"name":"Devourer","id":83,"aspect":"Divine","cost":1},{"name":"Devout Sentinel","id":84,"aspect":"Divine","cost":4},{"name":"Diquanomus","id":85,"aspect":"Arcane","cost":6},{"name":"Dire Crab","id":86,"aspect":"Nature","cost":2},{"name":"Disfavor","id":87,"aspect":"Divine","cost":2},{"name":"Divine Avatar","id":88,"aspect":"Divine","cost":6},{"name":"Divine Boost","id":89,"aspect":"Divine","cost":3},{"name":"Dracolich","id":90,"aspect":"Arcane","cost":7},{"name":"Drain Life","id":91,"aspect":"Arcane","cost":3},{"name":"Duck","id":92,"aspect":"Chaos","cost":0},{"name":"Dwarf Conscript","id":93,"aspect":"Chaos","cost":2},{"name":"Dwarf Gunner","id":94,"aspect":"Chaos","cost":2},{"name":"Earth Elemental","id":95,"aspect":"Nature","cost":7},{"name":"Electrocute","id":96,"aspect":"Tech","cost":1},{"name":"Elf Guardian","id":97,"aspect":"Arcane","cost":3},{"name":"Elite Hacker","id":98,"aspect":"Tech","cost":3},{"name":"EMP Blast","id":99,"aspect":"Tech","cost":2},{"name":"Enchanted Armor","id":100,"aspect":"Arcane","cost":3},{"name":"Endless War","id":101,"aspect":"Chaos","cost":2},{"name":"Enlarge","id":102,"aspect":"Nature","cost":1},{"name":"Enrage","id":103,"aspect":"Chaos","cost":4},{"name":"Eradicate","id":104,"aspect":"Arcane","cost":5},{"name":"Ethereal Devourer","id":105,"aspect":"Arcane","cost":4},{"name":"Exorcist","id":106,"aspect":"Divine","cost":2},{"name":"Eye Fiend","id":107,"aspect":"Divine","cost":3},{"name":"Fairy Sentry","id":108,"aspect":"Nature","cost":1},{"name":"Fayd","id":109,"aspect":"Chaos","cost":2},{"name":"Feral Stalker","id":110,"aspect":"Nature","cost":3},{"name":"Field Medic","id":111,"aspect":"Tech","cost":4},{"name":"Fighter-Bomber","id":112,"aspect":"Tech","cost":4},{"name":"Final Blow","id":113,"aspect":"Divine","cost":1},{"name":"Finger of Death","id":114,"aspect":"Arcane","cost":2},{"name":"Fire Elemental","id":115,"aspect":"Nature","cost":4},{"name":"Fireball","id":116,"aspect":"Nature","cost":4},{"name":"Flameaxe Barbarian","id":117,"aspect":"Nature","cost":3},{"name":"Flayed Demon","id":118,"aspect":"Divine","cost":5},{"name":"Flyborg","id":119,"aspect":"Tech","cost":3},{"name":"For the Cause!","id":120,"aspect":"Tech","cost":4},{"name":"Forcefield","id":121,"aspect":"Tech","cost":3},{"name":"Forge Barbarian","id":122,"aspect":"Nature","cost":3},{"name":"Frantic Search","id":123,"aspect":"Chaos","cost":2},{"name":"General Boz","id":124,"aspect":"Tech","cost":5},{"name":"Ghost Ship","id":125,"aspect":"Arcane","cost":4},{"name":"Glade Defender","id":126,"aspect":"Nature","cost":4},{"name":"Goatstomper","id":127,"aspect":"Chaos","cost":6},{"name":"Gobcopter","id":128,"aspect":"Chaos","cost":3},{"name":"Goblin Apprentice","id":129,"aspect":"Chaos","cost":3},{"name":"Goblin Battle Cry","id":130,"aspect":"Chaos","cost":1},{"name":"Goblin Fireworks","id":131,"aspect":"Chaos","cost":0},{"name":"Goblin Mechanics","id":132,"aspect":"Chaos","cost":3},{"name":"Goblin Rabble","id":133,"aspect":"Chaos","cost":1},{"name":"Goblin Warband","id":134,"aspect":"Chaos","cost":3},{"name":"Grand Magus","id":135,"aspect":"Arcane","cost":4},{"name":"Grasping Horror","id":136,"aspect":"Arcane","cost":7},{"name":"Heaven's Guard","id":137,"aspect":"Divine","cost":2},{"name":"Hellfire Cultist","id":138,"aspect":"Divine","cost":1},{"name":"Hellfire Storm","id":139,"aspect":"Divine","cost":4},{"name":"Herald of Giants","id":140,"aspect":"Chaos","cost":4},{"name":"Hive Drone","id":141,"aspect":"Tech","cost":2},{"name":"Hive Sniper","id":142,"aspect":"Tech","cost":4},{"name":"Hive Spy","id":143,"aspect":"Tech","cost":2},{"name":"Holo-globe","id":144,"aspect":"Tech","cost":4},{"name":"Holy Bolt","id":145,"aspect":"Divine","cost":2},{"name":"Holy Hammerer","id":146,"aspect":"Divine","cost":1},{"name":"Holy Light","id":147,"aspect":"Divine","cost":4},{"name":"Horrid Cadaver","id":148,"aspect":"Arcane","cost":4},{"name":"Hospitaller","id":149,"aspect":"Divine","cost":1},{"name":"Hovertank Mark IV","id":150,"aspect":"Tech","cost":5},{"name":"Hydra","id":151,"aspect":"Nature","cost":6},{"name":"Hyperstim","id":152,"aspect":"Tech","cost":3},{"name":"I Got A Rock","id":153,"aspect":"Chaos","cost":7},{"name":"Ice Dragon","id":154,"aspect":"Nature","cost":7},{"name":"Ice Storm","id":155,"aspect":"Nature","cost":3},{"name":"Infection Demon","id":156,"aspect":"Divine","cost":8},{"name":"Invisibility","id":157,"aspect":"Arcane","cost":1},{"name":"Irkham Djinn","id":158,"aspect":"Arcane","cost":5},{"name":"Judgement","id":159,"aspect":"Divine","cost":5},{"name":"Junkyard Tank","id":160,"aspect":"Chaos","cost":4},{"name":"Justice","id":161,"aspect":"Divine","cost":4},{"name":"Kaiju","id":162,"aspect":"Nature","cost":10},{"name":"Kariel","id":163,"aspect":"Divine","cost":5},{"name":"Kenji's Double","id":164,"aspect":"Arcane","cost":1},{"name":"Kestrel Ninja","id":165,"aspect":"Tech","cost":3},{"name":"Korgon of the Spires","id":166,"aspect":"Arcane","cost":4},{"name":"Krag Warband","id":167,"aspect":"Chaos","cost":3},{"name":"Kraken","id":168,"aspect":"Nature","cost":8},{"name":"Krank","id":169,"aspect":"Tech","cost":2},{"name":"Landshark","id":170,"aspect":"Nature","cost":5},{"name":"Lantern Lich","id":171,"aspect":"Arcane","cost":3},{"name":"Levitation","id":172,"aspect":"Arcane","cost":3},{"name":"Leyline Druid","id":173,"aspect":"Nature","cost":3},{"name":"Lockdown Bot","id":174,"aspect":"Tech","cost":2},{"name":"Lord of Heaven","id":175,"aspect":"Divine","cost":6},{"name":"Lord of Hell","id":176,"aspect":"Divine","cost":6},{"name":"Lord of Rot","id":177,"aspect":"Arcane","cost":3},{"name":"Madness","id":178,"aspect":"Divine","cost":6},{"name":"Master Zirell","id":179,"aspect":"Nature","cost":4},{"name":"Mechadragon","id":180,"aspect":"Tech","cost":7},{"name":"MegaZeppelin","id":181,"aspect":"Chaos","cost":4},{"name":"Merfolk Healer","id":182,"aspect":"Nature","cost":1},{"name":"Merfolk Scout","id":183,"aspect":"Nature","cost":1},{"name":"Meteor Symbiote","id":184,"aspect":"Nature","cost":2},{"name":"Mightcaster","id":185,"aspect":"Nature","cost":2},{"name":"Militia Guard","id":186,"aspect":"Tech","cost":3},{"name":"Mind Control","id":187,"aspect":"Arcane","cost":6},{"name":"Mindhack","id":188,"aspect":"Tech","cost":1},{"name":"Minotaur Charger","id":189,"aspect":"Nature","cost":2},{"name":"Minotaur Guide","id":190,"aspect":"Nature","cost":2},{"name":"Minotaur Shaman","id":191,"aspect":"Nature","cost":1},{"name":"Miracle","id":192,"aspect":"Divine","cost":8},{"name":"Mirror Image","id":193,"aspect":"Arcane","cost":9},{"name":"Mist Curse","id":194,"aspect":"Divine","cost":2},{"name":"Mist Witch","id":195,"aspect":"Divine","cost":2},{"name":"Murder","id":196,"aspect":"Arcane","cost":4},{"name":"Mutate","id":197,"aspect":"Chaos","cost":1},{"name":"Nature Avatar","id":198,"aspect":"Nature","cost":6},{"name":"Nature Boost","id":199,"aspect":"Nature","cost":3},{"name":"Necromancer","id":200,"aspect":"Arcane","cost":2},{"name":"Night Stalker","id":201,"aspect":"Arcane","cost":2},{"name":"Nightmare","id":202,"aspect":"Divine","cost":5},{"name":"Nullmage","id":203,"aspect":"Arcane","cost":2},{"name":"Octoborg","id":204,"aspect":"Tech","cost":5},{"name":"Ogre Rocketeer","id":205,"aspect":"Chaos","cost":4},{"name":"Orc Berserker","id":206,"aspect":"Chaos","cost":3},{"name":"Orc Captain","id":207,"aspect":"Chaos","cost":2},{"name":"Overcharger","id":208,"aspect":"Chaos","cost":7},{"name":"Overshock","id":209,"aspect":"Tech","cost":0},{"name":"Pacifism","id":210,"aspect":"Divine","cost":3},{"name":"Pack Hunt","id":211,"aspect":"Nature","cost":1},{"name":"Painbringer","id":212,"aspect":"Divine","cost":1},{"name":"Phantom Destroyer","id":213,"aspect":"Arcane","cost":5},{"name":"Phoenix","id":214,"aspect":"Nature","cost":5},{"name":"Plague of Weakness","id":215,"aspect":"Arcane","cost":4},{"name":"Primal Hunter","id":216,"aspect":"Nature","cost":4},{"name":"Proliferate","id":217,"aspect":"Nature","cost":2},{"name":"Purify","id":218,"aspect":"Divine","cost":2},{"name":"Queen Ordelia","id":219,"aspect":"Arcane","cost":8},{"name":"Raging Goblin","id":220,"aspect":"Chaos","cost":1},{"name":"Rainbow Unicorn","id":221,"aspect":"Divine","cost":1},{"name":"Razorbiker","id":222,"aspect":"Chaos","cost":1},{"name":"Reap","id":223,"aspect":"Arcane","cost":1},{"name":"Rebirth","id":224,"aspect":"Nature","cost":0},{"name":"Redeemer","id":225,"aspect":"Divine","cost":3},{"name":"Regal Unicorn","id":226,"aspect":"Divine","cost":3},{"name":"Reinforcements","id":227,"aspect":"Tech","cost":1},{"name":"Rejuvenate","id":228,"aspect":"Nature","cost":4},{"name":"Replenish","id":229,"aspect":"Nature","cost":1},{"name":"Resupply","id":230,"aspect":"Tech","cost":2},{"name":"Rhinosaur","id":231,"aspect":"Chaos","cost":6},{"name":"Rifle Dwarf","id":232,"aspect":"Chaos","cost":1},{"name":"Rigged To Blow","id":233,"aspect":"Chaos","cost":3},{"name":"Rise from the Grave","id":234,"aspect":"Arcane","cost":4},{"name":"Robo-Centaur","id":235,"aspect":"Tech","cost":1},{"name":"Rock Guardian","id":236,"aspect":"Nature","cost":3},{"name":"Rocket Sled","id":237,"aspect":"Chaos","cost":2},{"name":"Rusty Gobcopter","id":238,"aspect":"Chaos","cost":3},{"name":"Rusty Uniblaster","id":239,"aspect":"Chaos","cost":1},{"name":"Sacrificial Victim","id":240,"aspect":"Divine","cost":1},{"name":"Sanctum Healer","id":241,"aspect":"Divine","cost":1},{"name":"Scion of Lightning","id":242,"aspect":"Nature","cost":2},{"name":"Secret Cache","id":243,"aspect":"Arcane","cost":3},{"name":"Shadow Ninja","id":244,"aspect":"Tech","cost":4},{"name":"Shield Bot","id":245,"aspect":"Tech","cost":6},{"name":"Shield Force","id":246,"aspect":"Tech","cost":7},{"name":"Shield of Faith","id":247,"aspect":"Divine","cost":1},{"name":"Shield Wall","id":248,"aspect":"Divine","cost":3},{"name":"Shieldcaster Mech","id":249,"aspect":"Tech","cost":1},{"name":"Shifting Ooze","id":250,"aspect":"Nature","cost":2},{"name":"Shockwave","id":251,"aspect":"Tech","cost":1},{"name":"Shockwave Tank","id":252,"aspect":"Tech","cost":6},{"name":"Singularity","id":253,"aspect":"Tech","cost":6},{"name":"Sister Vigor","id":254,"aspect":"Nature","cost":5},{"name":"Smash and Grab","id":255,"aspect":"Chaos","cost":1},{"name":"Soul Swap","id":256,"aspect":"Divine","cost":8},{"name":"Specter","id":257,"aspect":"Arcane","cost":2},{"name":"Spellweaver","id":258,"aspect":"Arcane","cost":2},{"name":"Splash Damage","id":259,"aspect":"Chaos","cost":5},{"name":"Stalwart Paladin","id":260,"aspect":"Divine","cost":3},{"name":"Steamwing Scout","id":261,"aspect":"Chaos","cost":2},{"name":"Stoneskin","id":262,"aspect":"Nature","cost":4},{"name":"Strike Mech","id":263,"aspect":"Tech","cost":3},{"name":"Supersize","id":264,"aspect":"Nature","cost":3},{"name":"Support Bot","id":265,"aspect":"Tech","cost":5},{"name":"Suppression Gel","id":266,"aspect":"Tech","cost":3},{"name":"Surprise Attack","id":267,"aspect":"Chaos","cost":5},{"name":"Swordfly","id":268,"aspect":"Arcane","cost":3},{"name":"System Operative","id":269,"aspect":"Tech","cost":2},{"name":"Tac Nuke","id":270,"aspect":"Tech","cost":7},{"name":"Tangle","id":271,"aspect":"Nature","cost":1},{"name":"Tar Golem","id":272,"aspect":"Arcane","cost":3},{"name":"Taunt","id":273,"aspect":"Chaos","cost":1},{"name":"Tech Avatar","id":274,"aspect":"Tech","cost":6},{"name":"Tech Boost","id":275,"aspect":"Tech","cost":3},{"name":"Teddy Bomb","id":276,"aspect":"Chaos","cost":2},{"name":"Teleport","id":277,"aspect":"Chaos","cost":4},{"name":"The Foundation","id":278,"aspect":"Arcane","cost":5},{"name":"Thorn Spray","id":279,"aspect":"Nature","cost":2},{"name":"Thought Anomaly","id":280,"aspect":"Arcane","cost":2},{"name":"Timestop","id":281,"aspect":"Chaos","cost":2},{"name":"Tinsnipper","id":282,"aspect":"Chaos","cost":5},{"name":"Total Recall","id":283,"aspect":"Tech","cost":3},{"name":"Tower Guard","id":284,"aspect":"Tech","cost":2},{"name":"Tranquility","id":285,"aspect":"Nature","cost":2},{"name":"Tunnel Kren","id":286,"aspect":"Arcane","cost":1},{"name":"Twist of Fate","id":287,"aspect":"Arcane","cost":2},{"name":"Ultrabot","id":288,"aspect":"Tech","cost":3},{"name":"Unceasing Golem","id":289,"aspect":"Arcane","cost":2},{"name":"Uniblaster","id":290,"aspect":"Chaos","cost":1},{"name":"Unstable Cyborg","id":291,"aspect":"Tech","cost":1},{"name":"Upgrade","id":292,"aspect":"Tech","cost":2},{"name":"Vampire Duchess","id":293,"aspect":"Arcane","cost":7},{"name":"Vampire Duke","id":294,"aspect":"Arcane","cost":1},{"name":"Varyn, The Hidden","id":295,"aspect":"Tech","cost":5},{"name":"Vault Kren","id":296,"aspect":"Arcane","cost":6},{"name":"Vengeance","id":297,"aspect":"Divine","cost":3},{"name":"Vengeance Demon","id":298,"aspect":"Divine","cost":1},{"name":"Verdant Druid","id":299,"aspect":"Nature","cost":1},{"name":"Vigor Symbiote","id":300,"aspect":"Nature","cost":2},{"name":"Vine Elemental","id":301,"aspect":"Nature","cost":6},{"name":"Walking Bomb","id":302,"aspect":"Chaos","cost":4},{"name":"Warboss Shika","id":303,"aspect":"Chaos","cost":4},{"name":"Warlord Grumax","id":304,"aspect":"Chaos","cost":5},{"name":"Wave Elemental","id":305,"aspect":"Nature","cost":5},{"name":"Weakness Curse","id":306,"aspect":"Divine","cost":3},{"name":"Weakness Witch","id":307,"aspect":"Divine","cost":2},{"name":"Web","id":308,"aspect":"Nature","cost":1},{"name":"Weirdbolt","id":309,"aspect":"Chaos","cost":2},{"name":"Worldcrush Giant","id":310,"aspect":"Chaos","cost":8},{"name":"Zendak Wurm","id":311,"aspect":"Nature","cost":7},{"name":"Zombie","id":312,"aspect":"Arcane","cost":1},{"name":"Zombie Plague","id":313,"aspect":"Arcane","cost":3},{"name":"Zombify","id":314,"aspect":"Arcane","cost":1}]

// 'Arcane': 0,
// 'Chaos': 1,
// 'Divine': 2,
// 'Nature': 3,
// 'Tech': 4


deckstring.card_to_id = function(card_name) {
  for (let card of cards) {
    if (card_name.toLowerCase().split(" ").join("") == card["name"].toLowerCase().split(" ").join("")) {
      return card["id"];
    }
  }
}


deckstring.id_to_card = function(id_) {
  for (let card of cards) {
    if (id_ == card["id"]) {
      return card["name"];
    }
  }
}

// https://github.com/HearthSim/npm-deckstrings/blob/master/src/index.ts
// Copyright (c) 2017-2018, Benedict Etzel


deckstring.encode_deck = function(card_list, aspects) {
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

deckstring.decode_deck = function(deckstring) {
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
