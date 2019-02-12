
let menu_en = "Please choose an option:" + "\n" +
              "🎫 Enter 1 to retreive your booking information " + "\n" +
              "✈️ Enter 2 to check your flight status " + "\n" +
              "🛄 Enter 3 to keep track of your luggage " + "\n" +
              "🎫 Enter 4 to get your boarding pass " + "\n" +
              "💳 Enter 5 to check your Safar Flyer Miles " + "\n" +
              "Select OPT-OUT if you do not wish to receive any message " + "\n";

let flightStat_en = "Please enter your flight number" + "\n" +
                    "Example : AT123";
let trackBag_en = "Type <luggage tag><SPACE><flight date><SPACE><LastName>" + "\n" +
                  "Example : AT123456 01JAN Doe";
let default_msg_en = "Je crois que je ne vous suis pas.";
let miles_en = "Please enter your Safar Flyer number"+ "\n" +
                    "Example : 123456789";
let out_en = "Bye !";

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
