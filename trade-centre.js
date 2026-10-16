import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
const $=id=>document.getElementById(id);
const commissioner='rv8JxmfSl6gKkefiNo3EGpMiY1U2';
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
let user=null,items=[];
const admin=()=>user?.uid===commissioner;
const msg=(id,value)=>$(id).textContent=value;
$('setupNotice').hidden=true;
$('signIn').onclick=async()=>{try{await signInWithEmailAndPassword(auth,$('email').value.trim(),$('password').value);$('password').value='';msg('authMessage','')}catch(e){msg('authMessage','Sign-in failed. Check your email and password.')}};
$('signOut').onclick=()=>signOut(auth);
$('resetPassword').onclick=async()=>{if(!$('email').value.trim())return msg('authMessage','Enter your email first.');try{await sendPasswordResetEmail(auth,$('email').value.trim());msg('authMessage','If the account exists, a reset email was sent.')}catch(e){msg('authMessage','Password reset unavailable.')}};
onAuthStateChanged(auth,u=>{user=u;$('loggedOut').hidden=!!u;$('loggedIn').hidden=!u;$('publish').disabled=!u;$('identity').textContent=u?.email||'';$('memberTeam').textContent=u?(admin()?'Commissioner':'League member'):'';render()});
$('listingForm').onsubmit=async e=>{e.preventDefault();if(!user)return;const button=$('publish');button.disabled=true;try{await addDoc(collection(db,'tradeListings'),{team:$('teamChoice').value,type:$('kind').value,player:$('player').value.trim(),wanted:$('lookingFor').value.trim(),createdBy:user.uid,createdAt:serverTimestamp()});$('player').value='';$('lookingFor').value='';msg('postMessage','Listing published.')}catch(e){msg('postMessage','Publishing failed. Check Firestore rules.')}finally{button.disabled=!user}};
function el(tag,value,cls){const n=document.createElement(tag);n.textContent=value;if(cls)n.className=cls;return n}
function render(){for(const [type,id] of [['trade','tradingListings'],['wanted','wantedListings']]){const target=$(id);target.replaceChildren();const rows=items.filter(x=>x.type===type);if(!rows.length)target.append(el('p','No listings yet.','muted'));for(const item of rows){const card=el('article','','listing');card.append(el('h3',item.team),el('p',item.player),el('p','Looking for: '+item.wanted));if(admin()){const edit=el('button','Edit','button'),del=el('button','Remove','button');edit.onclick=async()=>{const player=prompt('Player or category',item.player);if(player===null)return;const wanted=prompt('Looking for',item.wanted);if(wanted===null)return;if(!player.trim()||player.length>120||wanted.length>300)return alert('Check input length.');try{await updateDoc(doc(db,'tradeListings',item.id),{player:player.trim(),wanted:wanted.trim()})}catch(e){alert('Update failed.')}};del.onclick=async()=>{if(!confirm('Remove listing?'))return;try{await deleteDoc(doc(db,'tradeListings',item.id))}catch(e){alert('Remove failed.')}};card.append(edit,del)}target.append(card)}}}
onSnapshot(collection(db,'tradeListings'),snap=>{items=snap.docs.map(d=>({id:d.id,...d.data()}));items.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));render()},()=>{msg('postMessage','Unable to load listings. Check Firebase permissions.')});
