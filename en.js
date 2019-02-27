
let menu_en = "Please choose an option:" + "\n" +
              "🎫 Type 1 to retrieve your booking information " + "\n" +
              "✈️ Type 2 to check your flight status " + "\n" +
              "🛄 Enter 3 to retrieve your bag status " + "\n" +
              "🎫 Enter 4 to get your boarding pass " + "\n" +
              "💳 Enter 5 to check your Safar Flyer miles " + "\n" +
              "Select OPT-OUT if you do not wish to receive any message from us via Messenger " + "\n" +
              "\n" + "Entrez FR si vous voulez continuer l'échange en Français";

let flightStat_en = "Please insert your flight number and flight date" + "\n" +
                    "For example : AT800 09JAN";
let trackBag_en = "Please enter your bag tag number, flight date and your name" + "\n" +
                  "For example : AT123456 07JAN LASTNAME";
let default_msg_en = "Je crois que je ne vous suis pas.";
let miles_en = "Please insert your Safar Flyer number"+ "\n" +
                    "For example : 908677831";
let out_en = "Thank you for choosing Royal Air Maroc ! See you later 👋";
let backto0 = "🔙 Enter 0 if you wish to go back to the menu "
let claim_en = "Please enter you claim number "+ "\n" +
                    "Example : 12345678";
let pnr_en = "Please insert your Booking number and your name" + "\n" +
                    "For example : E45RGH YOURNAME";
module.exports ={
  setMenu : function (){
      return menu_en;
    },
  setPNR: function (){
        return pnr_en;
      },
  setFlightStat: function (){
      return flightStat_en;
    },
  setTrackBag: function (){
        return trackBag_en;
      },
  sendDefault: function (){
        return default_msg_en;
      },
  setMiles: function (){
        return miles_en;
      },
  setClaim: function (){
        return claim_en;
              },
  optOut: function (){
        return out_en;
      },
  backToZero : function (){
        return backto0;
      }
}

//
// function backToZero(sender){
//   setTimeout(function(){
//     sendTextMessage(sender, backto0);
//   }, 500);
// }
