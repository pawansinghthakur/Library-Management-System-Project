/* main.js - shared utilities & simulated storage for frontend-only app */
const u = getCurrentUser();
if(!u) { alert('Please login first'); location.href = 'index.html'; return false }
if(Array.isArray(allowedRoles) && !allowedRoles.includes(u.role)){
alert('Access denied for your role'); location.href = (u.role==='admin'? 'admin.html' : 'user.html'); return false
}
return true
}


function getQueryParam(name){
const url = new URL(location.href);
return url.searchParams.get(name);
}


// date utilities
function todayStr(){ const d=new Date(); d.setHours(0,0,0,0); return d.toISOString().slice(0,10)}
function addDaysStr(base, days){ const d = new Date(base); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10)}


// simple book DB in localStorage
function getBooks(){
const b = localStorage.getItem('lms_books');
if(!b) {
const sample = [
{id:1,title:'Java Programming',author:'James Gosling',serial:'S-100',available:true},
{id:2,title:'Database Systems',author:'Raghu Ramakrishnan',serial:'S-101',available:true},
{id:3,title:'Learning Python',author:'Mark Lutz',serial:'S-102',available:true}
];
localStorage.setItem('lms_books', JSON.stringify(sample));
return sample;
}
return JSON.parse(b);
}
function saveBooks(list){ localStorage.setItem('lms_books', JSON.stringify(list)); }


// utility to prefill book selection (used by search -> issue)
function setSelectedBook(obj){ localStorage.setItem('lms_selectedBook', JSON.stringify(obj)); }
function getSelectedBook(){ try{ return JSON.parse(localStorage.getItem('lms_selectedBook')) }catch(e){return null} }


// transaction store
function addTransaction(tx){ const arr = JSON.parse(localStorage.getItem('lms_tx')||'[]'); arr.push(tx); localStorage.setItem('lms_tx', JSON.stringify(arr)); }
function getTransactions(){ return JSON.parse(localStorage.getItem('lms_tx')||'[]'); }


// common populate header
function injectHeader(){
const user = getCurrentUser();
const header = document.createElement('div'); header.className='top-nav';
if(user){
header.innerHTML = `<span>Hi, ${user.username} (${user.role})</span> | <a href=\"index.html\">Logout</a> | <a href=\"chart.html\">Chart</a> | <a href=\"search.html\">Search</a> | <a href=\"transactions.html\">Transactions</a> | <a href=\"reports.html\">Reports</a>`;
if(user.role==='admin') header.innerHTML += ` | <a href=\"maintenance.html\">Maintenance</a> | <a href=\"user_mgmt.html\">User Mgmt</a>`;
} else {
header.innerHTML = `<a href=\"index.html\">Login</a>`;
}
document.body.insertBefore(header, document.body.firstChild);
}


// run on pages
window.addEventListener('DOMContentLoaded', ()=>{
// try inject header where appropriate
try{ injectHeader(); }catch(e){}
});