// console.log(message.text, '!!!!!!!!!!!!!!!!!!!!!!');
// ////message par défaut
// let req = exportReq(rows[0].language);
// let def = req.sendDefault(); //message default
// language = rows[0].language;
// step = '0';
// updateDB(sender, step, rows[0].flight,rows[0].flightDate, language, rows[0].tagBag);
// sendTextMessage(sender, def);
//
// let menu = req.setMenu();
// let reply = [{
//                   "content_type": "text",
//                   "title": "OPT-OUT",
//                   "payload": "OPT-OUT",
//                 }];
// setTimeout(function(){
//   sendQuickReply(sender, menu, reply)
// }, 500);
console.log(pad(10,4));
console.log(pad(9,5));

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
