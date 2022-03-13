const version = 'v0.1';
const itemName = 'Potion of Growth';
const icon = 'icons/consumables/potions/potion-flask-corked-cyan.webp';

const myActiveEffect = {
  changes: [{
    "key": "data.stats.size",
    "mode": CONST.ACTIVE_EFFECT_MODES.ADD,
    "value": "2"
  }],
  icon: icon,
  label: itemName,
  duration: {
    seconds: 30,
    rounds: 5,
  }  
}  

/* 
source: 
icon: 
*/
let tokenD=canvas.tokens.controlled[0];
const myTitle = `Potion`;
let message1 = ``;
let message2 = itemName;
  
if (tokenD===undefined) {
  ui.notifications.error("Please select a token."); // No Token is Selected
} else {
  main();
} 

// Modified from a macro by spacemandev
async function main() {
  let myItem = await sm.getItem(tokenD, itemName);
  if(undefined == myItem) {
    return; 
  }
  
  // Active Effect On?
  const temp = sm.getActiveEffect(tokenD, itemName);
  if( temp != undefined ) {
    console.log(sm.getActiveEffect(tokenD, itemName));
    sm.styledChatMessage(itemName, '', `You already used it.`)       
    return;
  }

  // Subtract item
  await sm.useItem(tokenD, itemName);
  
  // Item does stuff
  sm.addActiveEffectToOwnedToken(tokenD, myActiveEffect); 

  // message
  sm.styledChatMessage(itemName, '', `${tokenD.actor.name} used a ${itemName}.`);
}