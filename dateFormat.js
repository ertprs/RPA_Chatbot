
function formatDate(date) {
  let month;
  date = date.toLowerCase();
  switch (date) {
  case 'jan' :
  case 'janvier' :
  case 'january' :
  case '01' :
    month = 'jan';
    break;
  case 'feb' :
  case 'fev' :
  case 'fév' :
  case 'février' :
  case 'february' :
  case '02' :
    month = 'feb';
    break;
  case 'mar' :
  case 'mars' :
  case 'march' :
  case '03' :
    month = 'mar';
    break;
  case 'avr' :
  case 'apr' :
  case 'avril':
  case 'april' :
  case '04' :
    month = 'apr';
    break;
  case 'mai' :
  case 'may' :
  case '05' :
    month = 'may';
    break;
  case 'jui' :
  case 'jun' :
  case 'juin' :
  case 'june' :
  case '06' :
    month = 'jun';
    break;
  case 'jul' :
  case 'juillet' :
  case 'july' :
  case '07' :
    month = 'jul';
    break;
  case 'aou' :
  case 'aug' :
  case 'aout' :
  case 'août' :
  case 'august' :
  case '08' :
    month = 'aug';
    break;
  case 'sep' :
  case 'septembre' :
  case 'september' :
  case '09' :
    month = 'sep';
    break;
  case 'oct' :
  case 'octobre' :
  case 'october' :
  case '10' :
    month = 'oct';
    break;
  case 'nov' :
  case 'novembre' :
  case 'november' :
  case '11' :
    month = 'nov';
    break;
  case 'dec' :
  case 'déc' :
  case 'décembre' :
  case 'decembre' :
  case 'december' :
  case '12' :
    month = 'dec';
    break;
  default:
   month = '';
}
  return month;
}

module.exports = formatDate;
