
let menu_fr = "Merci de choisir une option:" + "\n" +
              "🎫 Entez 1 pour consulter votre réservation " + "\n" +
              "✈️ Entez 2 pour avoir le statut de votre vol " + "\n" +
              "🛄 Entez 3 pour suivre votre bagage " + "\n" +
              "🎫 Entez 4 pour récupérer votre carte d'embarquement " + "\n" +
              "💳 Entez 5 pour consulter vos Miles Safar Flyer " + "\n" +
              "Choisissez OPT-OUT si vous souhaitez ne plus recevoir de messages " + "\n";

module.exports ={
  setMenu : function (){
      return menu_fr;
    }
}
// module.exports = {
//   setMenu : function (){
//     return {
//        "attachment":{
//            "type":"template",
//            "text":menu_fr,
//            "payload":{
//                "template_type":"button",
//                // "text": text,
//                "buttons":[
//                    {
//                        "type":"postback",
//                        "title":"1",
//                        "payload":"resa"
//                    },
//                    {
//                        "type":"postback",
//                        "title":"2",
//                        "payload":"stat_vol"
//                    },
//                    {
//                        "type":"postback",
//                        "title":"3",
//                        "payload":"suiv_bag"
//                    },
//                    {
//                        "type":"postback",
//                        "title":"4",
//                        "payload":"carte_embar"
//                    },
//                    {
//                        "type":"postback",
//                        "title":"5",
//                        "payload":"safar_flyer"
//                    }
//                ]
//            }
//        }
//    }
//   }
//   }
