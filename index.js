import moment from 'moment';

let today = moment().hour(0).minute(0).second(0).millisecond(0);
let date = today.format('YY.MM.DD. (ddd.)');
let dday = moment('2024-11-14', 'YYYY-MM-DD');
let diff = dday.diff(today) / (24*60*60*1000);

console.log(date)
console.log(diff);
