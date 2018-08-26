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

deckstring.cards = [{"name":"Acolyte of Halos","id":0,"aspect":"Divine"},{"name":"Acolyte of Horns","id":1,"aspect":"Divine"},{"name":"Aegis Elite","id":2,"aspect":"Tech"},{"name":"Aegis Infantry","id":3,"aspect":"Tech"},{"name":"AI Hack","id":4,"aspect":"Tech"},{"name":"Air Elemental","id":5,"aspect":"Nature"},{"name":"Ancient Egg","id":6,"aspect":"Nature"},{"name":"Angel","id":7,"aspect":"Divine"},{"name":"Angel of Glory","id":8,"aspect":"Divine"},{"name":"Angel of Retribution","id":9,"aspect":"Divine"},{"name":"Anseriform","id":10,"aspect":"Chaos"},{"name":"Apprentice Necromancer","id":11,"aspect":"Arcane"},{"name":"Arcane Avatar","id":12,"aspect":"Arcane"},{"name":"Arcane Boost","id":13,"aspect":"Arcane"},{"name":"Archangel","id":14,"aspect":"Divine"},{"name":"Archon of Death","id":15,"aspect":"Divine"},{"name":"Archon of Life","id":16,"aspect":"Divine"},{"name":"Armored Blockade","id":17,"aspect":"Tech"},{"name":"Arms Dealer","id":18,"aspect":"Tech"},{"name":"Assassinate","id":19,"aspect":"Tech"},{"name":"Assault Gunship","id":20,"aspect":"Tech"},{"name":"Assault Trooper","id":21,"aspect":"Tech"},{"name":"Assembler Anton","id":22,"aspect":"Chaos"},{"name":"Attractor Bolt","id":23,"aspect":"Chaos"},{"name":"Axe Rager","id":24,"aspect":"Nature"},{"name":"Befuddle","id":25,"aspect":"Arcane"},{"name":"Betrayal","id":26,"aspect":"Arcane"},{"name":"Biogenesis","id":27,"aspect":"Nature"},{"name":"Black Ops Team","id":28,"aspect":"Tech"},{"name":"Blade Symbiote","id":29,"aspect":"Nature"},{"name":"Blastbarrel Ogre","id":30,"aspect":"Chaos"},{"name":"Blind","id":31,"aspect":"Arcane"},{"name":"Blood Golem","id":32,"aspect":"Arcane"},{"name":"Blood Lord","id":33,"aspect":"Divine"},{"name":"Boar Stampede","id":34,"aspect":"Nature"},{"name":"Bog Wisps","id":35,"aspect":"Arcane"},{"name":"Bomb Juggler","id":36,"aspect":"Chaos"},{"name":"Bomb!","id":37,"aspect":"Chaos"},{"name":"Boom Tinkerer","id":38,"aspect":"Chaos"},{"name":"Boost Juice","id":39,"aspect":"Chaos"},{"name":"Bound Abomination","id":40,"aspect":"Arcane"},{"name":"Brawl","id":41,"aspect":"Nature"},{"name":"Brother Blade","id":42,"aspect":"Nature"},{"name":"Brother Meteor","id":43,"aspect":"Nature"},{"name":"Brutalize","id":44,"aspect":"Arcane"},{"name":"C-Rex","id":45,"aspect":"Tech"},{"name":"Caelia","id":46,"aspect":"Nature"},{"name":"Call the Horde","id":47,"aspect":"Chaos"},{"name":"Camouflage","id":48,"aspect":"Nature"},{"name":"Captain Marcos","id":49,"aspect":"Tech"},{"name":"Cataclysm","id":50,"aspect":"Nature"},{"name":"Cavalry Bot","id":51,"aspect":"Tech"},{"name":"Center Root","id":52,"aspect":"Nature"},{"name":"Chaos Avatar","id":53,"aspect":"Chaos"},{"name":"Chaos Boost","id":54,"aspect":"Chaos"},{"name":"Charge","id":55,"aspect":"Chaos"},{"name":"Chastise","id":56,"aspect":"Divine"},{"name":"Chill Bolt","id":57,"aspect":"Arcane"},{"name":"Circle of Power","id":58,"aspect":"Arcane"},{"name":"Clock-w-Orc","id":59,"aspect":"Chaos"},{"name":"Clockmaker Tox","id":60,"aspect":"Chaos"},{"name":"Clockwork Dragon","id":61,"aspect":"Chaos"},{"name":"Coal Colossus","id":62,"aspect":"Chaos"},{"name":"Comms Officer","id":63,"aspect":"Tech"},{"name":"Constrictor","id":64,"aspect":"Nature"},{"name":"Corpsecrafter","id":65,"aspect":"Arcane"},{"name":"Cull the Weak","id":66,"aspect":"Divine"},{"name":"Cult Leader","id":67,"aspect":"Divine"},{"name":"Cyborg Recruit","id":68,"aspect":"Tech"},{"name":"Cyclops","id":69,"aspect":"Chaos"},{"name":"Cyclopult","id":70,"aspect":"Chaos"},{"name":"Damnation","id":71,"aspect":"Divine"},{"name":"Deathmark Curse","id":72,"aspect":"Divine"},{"name":"Deathmark Witch","id":73,"aspect":"Divine"},{"name":"Defensive Formation","id":74,"aspect":"Tech"},{"name":"Deja Vu","id":75,"aspect":"Arcane"},{"name":"Demon of Bargains","id":76,"aspect":"Divine"},{"name":"Demon of Greed","id":77,"aspect":"Divine"},{"name":"Demon of Pain","id":78,"aspect":"Divine"},{"name":"Demonic Contract","id":79,"aspect":"Divine"},{"name":"Demonic Dragon","id":80,"aspect":"Divine"},{"name":"Demonist","id":81,"aspect":"Divine"},{"name":"Desert Raider","id":82,"aspect":"Chaos"},{"name":"Devourer","id":83,"aspect":"Divine"},{"name":"Devout Sentinel","id":84,"aspect":"Divine"},{"name":"Diquanomus","id":85,"aspect":"Arcane"},{"name":"Dire Crab","id":86,"aspect":"Nature"},{"name":"Disfavor","id":87,"aspect":"Divine"},{"name":"Divine Avatar","id":88,"aspect":"Divine"},{"name":"Divine Boost","id":89,"aspect":"Divine"},{"name":"Dracolich","id":90,"aspect":"Arcane"},{"name":"Drain Life","id":91,"aspect":"Arcane"},{"name":"Duck","id":92,"aspect":"Chaos"},{"name":"Dwarf Conscript","id":93,"aspect":"Chaos"},{"name":"Dwarf Gunner","id":94,"aspect":"Chaos"},{"name":"Earth Elemental","id":95,"aspect":"Nature"},{"name":"Electrocute","id":96,"aspect":"Tech"},{"name":"Elf Guardian","id":97,"aspect":"Arcane"},{"name":"Elite Hacker","id":98,"aspect":"Tech"},{"name":"EMP Blast","id":99,"aspect":"Tech"},{"name":"Enchanted Armor","id":100,"aspect":"Arcane"},{"name":"Endless War","id":101,"aspect":"Chaos"},{"name":"Enlarge","id":102,"aspect":"Nature"},{"name":"Enrage","id":103,"aspect":"Chaos"},{"name":"Eradicate","id":104,"aspect":"Arcane"},{"name":"Ethereal Devourer","id":105,"aspect":"Arcane"},{"name":"Exorcist","id":106,"aspect":"Divine"},{"name":"Eye Fiend","id":107,"aspect":"Divine"},{"name":"Fairy Sentry","id":108,"aspect":"Nature"},{"name":"Fayd","id":109,"aspect":"Chaos"},{"name":"Feral Stalker","id":110,"aspect":"Nature"},{"name":"Field Medic","id":111,"aspect":"Tech"},{"name":"Fighter-Bomber","id":112,"aspect":"Tech"},{"name":"Final Blow","id":113,"aspect":"Divine"},{"name":"Finger of Death","id":114,"aspect":"Arcane"},{"name":"Fire Elemental","id":115,"aspect":"Nature"},{"name":"Fireball","id":116,"aspect":"Nature"},{"name":"Flameaxe Barbarian","id":117,"aspect":"Nature"},{"name":"Flayed Demon","id":118,"aspect":"Divine"},{"name":"Flyborg","id":119,"aspect":"Tech"},{"name":"For the Cause!","id":120,"aspect":"Tech"},{"name":"Forcefield","id":121,"aspect":"Tech"},{"name":"Forge Barbarian","id":122,"aspect":"Nature"},{"name":"Frantic Search","id":123,"aspect":"Chaos"},{"name":"General Boz","id":124,"aspect":"Tech"},{"name":"Ghost Ship","id":125,"aspect":"Arcane"},{"name":"Glade Defender","id":126,"aspect":"Nature"},{"name":"Goatstomper","id":127,"aspect":"Chaos"},{"name":"Gobcopter","id":128,"aspect":"Chaos"},{"name":"Goblin Apprentice","id":129,"aspect":"Chaos"},{"name":"Goblin Battle Cry","id":130,"aspect":"Chaos"},{"name":"Goblin Fireworks","id":131,"aspect":"Chaos"},{"name":"Goblin Mechanics","id":132,"aspect":"Chaos"},{"name":"Goblin Rabble","id":133,"aspect":"Chaos"},{"name":"Goblin Warband","id":134,"aspect":"Chaos"},{"name":"Grand Magus","id":135,"aspect":"Arcane"},{"name":"Grasping Horror","id":136,"aspect":"Arcane"},{"name":"Heaven's Guard","id":137,"aspect":"Divine"},{"name":"Hellfire Cultist","id":138,"aspect":"Divine"},{"name":"Hellfire Storm","id":139,"aspect":"Divine"},{"name":"Herald of Giants","id":140,"aspect":"Chaos"},{"name":"Hive Drone","id":141,"aspect":"Tech"},{"name":"Hive Sniper","id":142,"aspect":"Tech"},{"name":"Hive Spy","id":143,"aspect":"Tech"},{"name":"Holo-globe","id":144,"aspect":"Tech"},{"name":"Holy Bolt","id":145,"aspect":"Divine"},{"name":"Holy Hammerer","id":146,"aspect":"Divine"},{"name":"Holy Light","id":147,"aspect":"Divine"},{"name":"Horrid Cadaver","id":148,"aspect":"Arcane"},{"name":"Hospitaller","id":149,"aspect":"Divine"},{"name":"Hovertank Mark IV","id":150,"aspect":"Tech"},{"name":"Hydra","id":151,"aspect":"Nature"},{"name":"Hyperstim","id":152,"aspect":"Tech"},{"name":"I Got A Rock","id":153,"aspect":"Chaos"},{"name":"Ice Dragon","id":154,"aspect":"Nature"},{"name":"Ice Storm","id":155,"aspect":"Nature"},{"name":"Infection Demon","id":156,"aspect":"Divine"},{"name":"Invisibility","id":157,"aspect":"Arcane"},{"name":"Irkham Djinn","id":158,"aspect":"Arcane"},{"name":"Judgement","id":159,"aspect":"Divine"},{"name":"Junkyard Tank","id":160,"aspect":"Chaos"},{"name":"Justice","id":161,"aspect":"Divine"},{"name":"Kaiju","id":162,"aspect":"Nature"},{"name":"Kariel","id":163,"aspect":"Divine"},{"name":"Kenji's Double","id":164,"aspect":"Arcane"},{"name":"Kestrel Ninja","id":165,"aspect":"Tech"},{"name":"Korgon of the Spires","id":166,"aspect":"Arcane"},{"name":"Krag Warband","id":167,"aspect":"Chaos"},{"name":"Kraken","id":168,"aspect":"Nature"},{"name":"Krank","id":169,"aspect":"Tech"},{"name":"Landshark","id":170,"aspect":"Nature"},{"name":"Lantern Lich","id":171,"aspect":"Arcane"},{"name":"Levitation","id":172,"aspect":"Arcane"},{"name":"Leyline Druid","id":173,"aspect":"Nature"},{"name":"Lockdown Bot","id":174,"aspect":"Tech"},{"name":"Lord of Heaven","id":175,"aspect":"Divine"},{"name":"Lord of Hell","id":176,"aspect":"Divine"},{"name":"Lord of Rot","id":177,"aspect":"Arcane"},{"name":"Madness","id":178,"aspect":"Divine"},{"name":"Master Zirell","id":179,"aspect":"Nature"},{"name":"Mechadragon","id":180,"aspect":"Tech"},{"name":"MegaZeppelin","id":181,"aspect":"Chaos"},{"name":"Merfolk Healer","id":182,"aspect":"Nature"},{"name":"Merfolk Scout","id":183,"aspect":"Nature"},{"name":"Meteor Symbiote","id":184,"aspect":"Nature"},{"name":"Mightcaster","id":185,"aspect":"Nature"},{"name":"Militia Guard","id":186,"aspect":"Tech"},{"name":"Mind Control","id":187,"aspect":"Arcane"},{"name":"Mindhack","id":188,"aspect":"Tech"},{"name":"Minotaur Charger","id":189,"aspect":"Nature"},{"name":"Minotaur Guide","id":190,"aspect":"Nature"},{"name":"Minotaur Shaman","id":191,"aspect":"Nature"},{"name":"Miracle","id":192,"aspect":"Divine"},{"name":"Mirror Image","id":193,"aspect":"Arcane"},{"name":"Mist Curse","id":194,"aspect":"Divine"},{"name":"Mist Witch","id":195,"aspect":"Divine"},{"name":"Murder","id":196,"aspect":"Arcane"},{"name":"Mutate","id":197,"aspect":"Chaos"},{"name":"Nature Avatar","id":198,"aspect":"Nature"},{"name":"Nature Boost","id":199,"aspect":"Nature"},{"name":"Necromancer","id":200,"aspect":"Arcane"},{"name":"Night Stalker","id":201,"aspect":"Arcane"},{"name":"Nightmare","id":202,"aspect":"Divine"},{"name":"Nullmage","id":203,"aspect":"Arcane"},{"name":"Octoborg","id":204,"aspect":"Tech"},{"name":"Ogre Rocketeer","id":205,"aspect":"Chaos"},{"name":"Orc Berserker","id":206,"aspect":"Chaos"},{"name":"Orc Captain","id":207,"aspect":"Chaos"},{"name":"Overcharger","id":208,"aspect":"Chaos"},{"name":"Overshock","id":209,"aspect":"Tech"},{"name":"Pacifism","id":210,"aspect":"Divine"},{"name":"Pack Hunt","id":211,"aspect":"Nature"},{"name":"Painbringer","id":212,"aspect":"Divine"},{"name":"Phantom Destroyer","id":213,"aspect":"Arcane"},{"name":"Phoenix","id":214,"aspect":"Nature"},{"name":"Plague of Weakness","id":215,"aspect":"Arcane"},{"name":"Primal Hunter","id":216,"aspect":"Nature"},{"name":"Proliferate","id":217,"aspect":"Nature"},{"name":"Purify","id":218,"aspect":"Divine"},{"name":"Queen Ordelia","id":219,"aspect":"Arcane"},{"name":"Raging Goblin","id":220,"aspect":"Chaos"},{"name":"Rainbow Unicorn","id":221,"aspect":"Divine"},{"name":"Razorbiker","id":222,"aspect":"Chaos"},{"name":"Reap","id":223,"aspect":"Arcane"},{"name":"Rebirth","id":224,"aspect":"Nature"},{"name":"Redeemer","id":225,"aspect":"Divine"},{"name":"Regal Unicorn","id":226,"aspect":"Divine"},{"name":"Reinforcements","id":227,"aspect":"Tech"},{"name":"Rejuvenate","id":228,"aspect":"Nature"},{"name":"Replenish","id":229,"aspect":"Nature"},{"name":"Resupply","id":230,"aspect":"Tech"},{"name":"Rhinosaur","id":231,"aspect":"Chaos"},{"name":"Rifle Dwarf","id":232,"aspect":"Chaos"},{"name":"Rigged To Blow","id":233,"aspect":"Chaos"},{"name":"Rise from the Grave","id":234,"aspect":"Arcane"},{"name":"Robo-Centaur","id":235,"aspect":"Tech"},{"name":"Rock Guardian","id":236,"aspect":"Nature"},{"name":"Rocket Sled","id":237,"aspect":"Chaos"},{"name":"Rusty Gobcopter","id":238,"aspect":"Chaos"},{"name":"Rusty Uniblaster","id":239,"aspect":"Chaos"},{"name":"Sacrificial Victim","id":240,"aspect":"Divine"},{"name":"Sanctum Healer","id":241,"aspect":"Divine"},{"name":"Scion of Lightning","id":242,"aspect":"Nature"},{"name":"Secret Cache","id":243,"aspect":"Arcane"},{"name":"Shadow Ninja","id":244,"aspect":"Tech"},{"name":"Shield Bot","id":245,"aspect":"Tech"},{"name":"Shield Force","id":246,"aspect":"Tech"},{"name":"Shield of Faith","id":247,"aspect":"Divine"},{"name":"Shield Wall","id":248,"aspect":"Divine"},{"name":"Shieldcaster Mech","id":249,"aspect":"Tech"},{"name":"Shifting Ooze","id":250,"aspect":"Nature"},{"name":"Shockwave","id":251,"aspect":"Tech"},{"name":"Shockwave Tank","id":252,"aspect":"Tech"},{"name":"Singularity","id":253,"aspect":"Tech"},{"name":"Sister Vigor","id":254,"aspect":"Nature"},{"name":"Smash and Grab","id":255,"aspect":"Chaos"},{"name":"Soul Swap","id":256,"aspect":"Divine"},{"name":"Specter","id":257,"aspect":"Arcane"},{"name":"Spellweaver","id":258,"aspect":"Arcane"},{"name":"Splash Damage","id":259,"aspect":"Chaos"},{"name":"Stalwart Paladin","id":260,"aspect":"Divine"},{"name":"Steamwing Scout","id":261,"aspect":"Chaos"},{"name":"Stoneskin","id":262,"aspect":"Nature"},{"name":"Strike Mech","id":263,"aspect":"Tech"},{"name":"Supersize","id":264,"aspect":"Nature"},{"name":"Support Bot","id":265,"aspect":"Tech"},{"name":"Suppression Gel","id":266,"aspect":"Tech"},{"name":"Surprise Attack","id":267,"aspect":"Chaos"},{"name":"Swordfly","id":268,"aspect":"Arcane"},{"name":"System Operative","id":269,"aspect":"Tech"},{"name":"Tac Nuke","id":270,"aspect":"Tech"},{"name":"Tangle","id":271,"aspect":"Nature"},{"name":"Tar Golem","id":272,"aspect":"Arcane"},{"name":"Taunt","id":273,"aspect":"Chaos"},{"name":"Tech Avatar","id":274,"aspect":"Tech"},{"name":"Tech Boost","id":275,"aspect":"Tech"},{"name":"Teddy Bomb","id":276,"aspect":"Chaos"},{"name":"Teleport","id":277,"aspect":"Chaos"},{"name":"The Foundation","id":278,"aspect":"Arcane"},{"name":"Thorn Spray","id":279,"aspect":"Nature"},{"name":"Thought Anomaly","id":280,"aspect":"Arcane"},{"name":"Timestop","id":281,"aspect":"Chaos"},{"name":"Tinsnipper","id":282,"aspect":"Chaos"},{"name":"Total Recall","id":283,"aspect":"Tech"},{"name":"Tower Guard","id":284,"aspect":"Tech"},{"name":"Tranquility","id":285,"aspect":"Nature"},{"name":"Tunnel Kren","id":286,"aspect":"Arcane"},{"name":"Twist of Fate","id":287,"aspect":"Arcane"},{"name":"Ultrabot","id":288,"aspect":"Tech"},{"name":"Unceasing Golem","id":289,"aspect":"Arcane"},{"name":"Uniblaster","id":290,"aspect":"Chaos"},{"name":"Unstable Cyborg","id":291,"aspect":"Tech"},{"name":"Upgrade","id":292,"aspect":"Tech"},{"name":"Vampire Duchess","id":293,"aspect":"Arcane"},{"name":"Vampire Duke","id":294,"aspect":"Arcane"},{"name":"Varyn, The Hidden","id":295,"aspect":"Tech"},{"name":"Vault Kren","id":296,"aspect":"Arcane"},{"name":"Vengeance","id":297,"aspect":"Divine"},{"name":"Vengeance Demon","id":298,"aspect":"Divine"},{"name":"Verdant Druid","id":299,"aspect":"Nature"},{"name":"Vigor Symbiote","id":300,"aspect":"Nature"},{"name":"Vine Elemental","id":301,"aspect":"Nature"},{"name":"Walking Bomb","id":302,"aspect":"Chaos"},{"name":"Warboss Shika","id":303,"aspect":"Chaos"},{"name":"Warlord Grumax","id":304,"aspect":"Chaos"},{"name":"Wave Elemental","id":305,"aspect":"Nature"},{"name":"Weakness Curse","id":306,"aspect":"Divine"},{"name":"Weakness Witch","id":307,"aspect":"Divine"},{"name":"Web","id":308,"aspect":"Nature"},{"name":"Weirdbolt","id":309,"aspect":"Chaos"},{"name":"Worldcrush Giant","id":310,"aspect":"Chaos"},{"name":"Zendak Wurm","id":311,"aspect":"Nature"},{"name":"Zombie","id":312,"aspect":"Arcane"},{"name":"Zombie Plague","id":313,"aspect":"Arcane"},{"name":"Zombify","id":314,"aspect":"Arcane"}]

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
