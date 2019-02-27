
let menu_fr = "Merci de choisir une option:" + "\n" +
              "🎫 Entez 1 pour consulter votre réservation " + "\n" +
              "✈️ Entez 2 pour avoir le statut de votre vol " + "\n" +
              "🛄 Entez 3 pour suivre votre bagage " + "\n" +
              "🎫 Entez 4 pour récupérer votre carte d'embarquement " + "\n" +
              "💳 Entez 5 pour consulter vos Miles Safar Flyer " + "\n" +
              "Choisissez OPT-OUT si vous souhaitez ne plus recevoir de messages de nous à travers Messenger" + "\n" +
              "\n" + "Type EN if you want to switch back to English";
let flightStat_fr = "Merci de renseigner le numéro de votre vol et la date du vol" + "\n" +
                    "Par exemple : AT800 09JAN";
let trackBag_fr = "Merci de renseigner le tag de votre bagage, la date du vol et votre nom." + "\n" +
                  "Par exemple : AT123456 07JAN VOTRENOM";
let default_msg_fr = "Je crois que je ne vous suis pas.";
let miles_fr = "Veuillez renseigner votre numéro Safar Flyer"+ "\n" +
                    "Par exemple : 908677831";
let out_fr = "Merci d'avoir choisi la Royal Air Maroc ! À la prochaine 👋";
let backto0 = "🔙 Entez 0 si vous souhaitez revenir au menu ";
let claim_fr = "Veuillez renseigner le n° de votre réclamation "+ "\n" +
                    "Exemple : 12345678";
let pnr_fr = "Merci de renseigner votre numéro de réservation et votre nom" + "\n" +
                  "Par exemple : E45RGH VOTRENOM";
module.exports ={
  setMenu : function (){
      return menu_fr;
    },
  setPNR: function (){
      return pnr_fr;
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
  setClaim: function (){
        return claim_fr;
          },
  optOut: function (){
        return out_fr;
      },
  backToZero : function (){
        return backto0;
      }
}


// function backToZero(sender){
//   setTimeout(function(){
//     sendTextMessage(sender, backto0);
//   }, 500);
// }
