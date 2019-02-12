
let menu_fr = "Merci de choisir une option:" + "\n" +
              "🎫 Entez 1 pour consulter votre réservation " + "\n" +
              "✈️ Entez 2 pour avoir le statut de votre vol " + "\n" +
              "🛄 Entez 3 pour suivre votre bagage " + "\n" +
              "🎫 Entez 4 pour récupérer votre carte d'embarquement " + "\n" +
              "💳 Entez 5 pour consulter vos Miles Safar Flyer " + "\n" +
              "Choisissez OPT-OUT si vous souhaitez ne plus recevoir de messages " + "\n";
let flightStat_fr = "Veuillez renseigner votre n° de vol" + "\n" +
                    "Exemple : AT123";
let trackBag_fr = "Tapez <Tag bagage><ESPACE><Date de vol><ESPACE><Nom>" + "\n" +
                  "Exemple : AT123456 01JAN Doe";
let default_msg_fr = "Je crois que je ne vous suis pas.";
let miles_fr = "Veuillez renseigner votre n° Safar Flyer"+ "\n" +
                    "Exemple : 123456789";
let out_fr = "Bye !";

module.exports ={
  setMenu : function (){
      return menu_fr;
    },
  setFlightStat: function (){
      return flightStat_fr;
    },
  setTrackBag: function (){
        return trackBag_fr;
      },
  sendDefault: function (){
        return default_msg_fr;
      },
  setMiles: function (){
        return miles_fr;
      },
  optOut: function (){
        return out_fr;
      }
}

let backto0 = "🔙 Entez 0 pour afficher le menu. "
function backToZero(sender){
  setTimeout(function(){
    sendTextMessage(sender, backto0);
  }, 500);
}
