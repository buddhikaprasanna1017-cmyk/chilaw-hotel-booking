export const rooms = [
 {id:'garden',name:'Garden Room',tag:'A little hideaway',rate:18500,capacity:2,inventory:3,size:32,bed:'1 king bed',description:'Earthy textures, soft linen, and a private terrace opening onto the garden.',features:['Garden terrace','Rain shower','Air conditioning']},
 {id:'pool',name:'Poolside Suite',tag:'Wake up by the water',rate:28500,capacity:3,inventory:2,size:48,bed:'1 king + daybed',description:'Slow mornings, a spacious sitting area, and the pool just beyond your door.',features:['Pool-facing terrace','Lounge area','Air conditioning']},
 {id:'family',name:'Family Villa',tag:'Room for everyone',rate:42000,capacity:5,inventory:1,size:82,bed:'2 bedrooms',description:'Your own generous retreat, with two bedrooms and spaces to come together.',features:['Private veranda','Two bathrooms','Air conditioning']}
];
export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Colombo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function addDays(date,n){const d=new Date(date+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
export function nights(a,b){return Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000);}
export function validateStay(s,now=today()){
 const valid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d+'T00:00:00Z'))&&new Date(d+'T00:00:00Z').toISOString().slice(0,10)===d;
 if(!valid(s.checkin)||!valid(s.checkout))return 'Choose valid check-in and check-out dates.';
 if(s.checkin<now)return 'Check-in cannot be in the past.';
 if(nights(s.checkin,s.checkout)<1)return 'Check-out must be after check-in.';
 if(nights(s.checkin,s.checkout)>30)return 'For this demo, choose a stay of 1–30 nights.';
 if(s.checkout>addDays(now,365))return 'Choose dates within the next 12 months.';
 if(!Number.isInteger(s.adults)||s.adults<1||s.adults>5||!Number.isInteger(s.children)||s.children<0||s.children>4)return 'Choose at least one adult and a valid number of guests.';
 return '';
}
export function fixtures(now=today()){return [{roomId:'family',checkin:addDays(now,7),checkout:addDays(now,10),quantity:1},{roomId:'pool',checkin:addDays(now,14),checkout:addDays(now,16),quantity:2}];}
export function remaining(room,stay,bookings=[]){
 let min=room.inventory;
 for(let d=stay.checkin;d<stay.checkout;d=addDays(d,1)){
  const used=bookings.filter(b=>b.roomId===room.id&&b.checkin<=d&&b.checkout>d).reduce((n,b)=>n+b.quantity,0);
  min=Math.min(min,room.inventory-used);
 }
 return Math.max(0,min);
}
export function quote(room,stay,extras={}){const count=nights(stay.checkin,stay.checkout);const roomTotal=count*room.rate;const breakfast=extras.breakfast?1800*(stay.adults+stay.children)*count:0;const transfer=extras.transfer?18000:0;return {nights:count,roomTotal,breakfast,transfer,total:roomTotal+breakfast+transfer};}
export function validateGuest(g){
 if(!g.firstName?.trim()||!g.lastName?.trim())return 'Please enter the guest’s first and last name.';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g.email||''))return 'Enter a valid email address.';
 if(!/^\+[1-9]\d{6,14}$/.test((g.phone||'').replace(/[\s()-]/g,'')))return 'Enter a phone number with its country code, for example +94 77 123 4567.';
 if(!g.country?.trim())return 'Please enter your country of residence.';
 return '';
}
