import { useState, useEffect } from "react";
import "./App.css";
import BrandLogo from "./components/BrandLogo";
import FeatureCarousel from "./components/FeatureCarousel";
import heroMatatu from "./assets/hero-tokea-bg.png";
import whyTokea from "./assets/why-tokea.png";
import footerIcon from "./assets/footer-icon.png";
import superMetroLogo from "./assets/super-metro-logo.png";
import CityShuttleLogo from "./assets/city-shuttle-logo.png";
import gtsLogo from "./assets/gts-logo.png";
import kakaTravellersLogo from "./assets/kaka-travellers.png";
import mobileTopBlob from "./assets/mobile-top-blob.png";
import mobileBg from "./assets/mobile-bg.png";

const SACCO_LOGOS = {
  "Super Metro": superMetroLogo,
  "City Shuttle": CityShuttleLogo,
  "GTS": gtsLogo,
  "Kaka Travellers": kakaTravellersLogo,
};

const HERO_BADGES = [
  { icon: "fa-regular fa-clock", title: "Save time", sub: "No more waiting for hours." },
  { icon: "fa-solid fa-tag", title: "Fair fares", sub: "See current fare prices." },
  { icon: "fa-solid fa-bell", title: "Live updates", sub: "Get real-time vehicle updates." },
];

const ROUTE_DATA = { 
  Githurai: { 
    CBD:   ["All","Super Metro","GTS","City Shuttle"], 
    Ruiru: ["All","Super Metro", "GTS","City Shuttle"], 
    Thika: ["All","Super Metro", "City Shuttle"],
    Kenyatta_Road: ["ALL","GTS","Super Metro","City Shuttle"] ,
    Gatundu:  ["All","GTS"], 
  }, 
   Ruiru: { 
    Githurai:    ["All","Super Metro","GTS","City Shuttle"],    
    Gatundu:  ["All","GTS"], 
    Githunguri: ["All","Kaka Travellers"], 
    CBD: ["All","Super Metro","GTS","City Shuttle"], 
    Thika:  ["All","Super Metro","City Shuttle"],
  }, 
  CBD: { 
    Githurai:   ["All","Super Metro","GTS","City Shuttle"], 
    Ruiru: ["All","Super Metro", "GTS","City Shuttle"], 
    Thika: ["All","Super Metro", "City Shuttle"],
    Kenyatta_Road: ["ALL","GTS","Super Metro","City Shuttle"] ,
    Gatundu:  ["All","GTS"], 
    Githunguri: ["All","Kaka Travellers"], 
    Ngong:["All","SuperMetro","City Shuttle"]
  }, 
  Thika: { 
    CBD:        ["All","Super Metro","GTS","City Shuttle"], 
    Githurai:  ["All","Super Metro","GTS","City Shuttle"], 
    Ruiru:  ["All","Super Metro","City Shuttle"], 
    Kenyatta_Road:  ["All","Super Metro","GTS","City Shuttle"], 
    Gatundu:  ["All","GTS"], 
  }, 
   Kenyatta_Road: { 
    Githurai:   ["All","Super Metro","GTS","City Shuttle"], 
    Thika: ["All","Super Metro", "GTS", "City Shuttle"],
    CBD: ["All","Super Metro", "GTS", "City Shuttle"],
    Gatundu:  ["All","GTS"], 
   },
   Kiambu: { 
    Githunguri:    ["All","Kaka Travellers"],   
   
  }, 
  Westlands : {
    Ngong: ["All", "Super Metro"],
  },

  Gatundu: { 
    CBD:       ["All","GTS"], 
    Githurai: ["All","GTS"], 
    Ruiru: ["All","GTS"],
    Thika:     ["All","GTS"],
    Kenyatta_Road: ["ALL","GTS"] ,
  }, 
   Githunguri: { 
    CBD:       ["All","Kaka Travellers"], 
    Ruiru: ["All","Kaka Travellers"], 
    Kiambu: ["All","Kaka Travellers"], 

  }, 
  Ngong: { 
    CBD:       ["All","Super Metro","City Shuttle"], 
    Westlands: ["All","Super Metro"], 
  }, 
 
}; 
 
const MATATU_DB = [ 
  /*From Githurai */
  { id:1, plate:"KDG 252H", sacco:"Super Metro", from:"Githurai", to:"CBD",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:2, plate:"KAG 845B",  sacco:"GTS",         from:"Githurai", to:"CBD",       via:"Thika Road",     fare:50,  
baseEta:1, logo:"GTS", color: "#F5B800" }, 
  { id:3, plate:"KCF 426P",  sacco:"City Shuttle",from:"Githurai", to:"CBD",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
  { id:4, plate:"KBM 862T",  sacco:"Super Metro",   from:"Githurai", to:"Ruiru",       via:"Thika Road",     fare:20,  
baseEta:2, logo:"KM",  color:"#F5B800" }, 
  { id:5, plate:"KDE 692Q",  sacco:"GTS",         from:"Githurai", to:"Ruiru", via:"Thika Road", fare:30,  
baseEta:2, logo:"SM",  color:"#F5B800" }, 
 { id:6, plate:"KCH 769K",  sacco:"City Shuttle",from:"Githurai", to:"Ruiru",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
  { id:7, plate:"KCM 194K",  sacco:"Super Metro", from:"Githurai", to:"Thika",     via:"Thika Road",     fare:100, 
baseEta:8, logo:"SM",  color:"#F5B800" }, 
 { id:8, plate:"KBJ 957U",  sacco:"City Shuttle",from:"Githurai", to:"Thika",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
  { id:9, plate:"KAT 261E",  sacco:"GTS",         from:"Githurai", to:"Kenyatta_Road",       via:"Thika Road",   fare:50,  
baseEta:8,  logo:"GTS", color:"#F5B800" }, 
  { id:10, plate:"KBD 657Y",  sacco:"Super Metro",from:"Githurai", to:"Kenyatta_Road",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
 { id:11, plate:"KBM 901J",  sacco:"City Shuttle",from:"Githurai", to:"Kenyatta_Road",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"}, 
  { id:12, plate:"KDC 849L", sacco:"GTS",  from:"Githurai", to:"Gatundu",       via:"Thika Road",   fare:100,  
baseEta:10, logo:"CH",  color:"#F5B800"}, 
/* From Gatundu */
  { id:13, plate:"KAE 432F", sacco:"GTS",         from:"Gatundu", to:"CBD", via:"Thika Road",      fare:150,  
baseEta:35, logo:"GTS", color:"#F5B800" }, 
  { id:14, plate:"KEB 745K", sacco:"GTS",      from:"Gatundu",    to:"Githurai",       via:"Thika Road",     fare:100,  
baseEta:10, logo:"NB",  color:"#F5B800" }, 
  { id:15, plate:"KEA 829T", sacco:"GTS",from:"Gatundu",    to:"Ruiru",       via:"Thika Road",     fare:80,  
baseEta:5, logo:"CS", color:"#F5B800" }, 
  { id:16, plate:"KDM 278Y", sacco:"GTS", from:"Gatundu", to:"Thika",       via:"Thika Road",     fare:100,  
baseEta:7,  logo:"SM",  color:"#F5B800" }, 
  { id:17, plate:"KDK 281L", sacco:"GTS",         from:"Gatundu", to:"Kenyatta_Road",       via:"Kenyatta Road",     fare:50,  
baseEta:5, logo:"GTS", color:"#F5B800" }, 
/*From Githunguri */
  { id:18, plate:"KDS 548E", sacco:"Kaka Travellers",   from:"Githunguri", to:"Ruiru",       via:"Githunguri-Ruiru Road",     fare:70,  
baseEta:2, logo:"KT",  color:"#F5B800" }, 
{ id:19, plate:"KAF 762W", sacco:"Kaka Travellers",   from:"Githunguri", to:"CBD",       via:"Kiambu Road",     fare:150,  
baseEta:12, logo:"KT",  color:"#F5B800" }, 
{ id:20, plate:"KCM 968K", sacco:"Kaka Travellers",   from:"Githunguri", to:"Kiambu",       via:"Githunguri-Ruturu Road",     fare:100,  
baseEta:8, logo:"KT",  color:"#F5B800" }, 
/*From ngong */
{ id:21, plate:"KEB 875E", sacco:"Super Metro",   from:"Ngong", to:"CBD",       via:"Ngong Road",     fare:70,  
baseEta:4, logo:"KT",  color:"#F5B800" }, 
{ id:22, plate:"KDK 828W", sacco:"City Shuttle",   from:"Ngong", to:"Westlands",       via:"Ngong Road",     fare:80,  
baseEta:6, logo:"KT",  color:"#F5B800" }, 
/*From CBD*/
 { id:23, plate:"KDG 252H", sacco:"Super Metro", from:"CBD", to:"Githurai",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:24, plate:"KAG 845B",  sacco:"GTS",         from:"CBD", to:"Githurai",       via:"Thika Road",     fare:50,  
baseEta:1, logo:"GTS", color: "#F5B800" }, 
  { id:25, plate:"KCF 426P",  sacco:"City Shuttle",from:"CBD", to:"Githurai",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
 { id:26, plate:"KAE 432F", sacco:"GTS",         from:"CBD", to:"Gatundu", via:"Thika Road",      fare:150,  
baseEta:35, logo:"GTS", color:"#F5B800" },
{ id:27, plate:"KAF 762W", sacco:"Kaka Travellers",   from:"CBD", to:"Githunguri",       via:"Kiambu Road",     fare:150,  
baseEta:12, logo:"KT",  color:"#F5B800" }, 
{ id:28, plate:"KEB 875E", sacco:"Super Metro",   from:"CBD", to:"Ngong",       via:"Ngong Road",     fare:70,  
baseEta:4, logo:"KT",  color:"#F5B800" },
 { id:29, plate:"KCG 628Y", sacco:"Super Metro", from:"CBD", to:"Ruiru",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:30, plate:"KBE 720U",  sacco:"GTS",         from:"CBD", to:"Ruiru",       via:"Thika Road",     fare:50,  
baseEta:1, logo:"GTS", color: "#F5B800" }, 
  { id:31, plate:"KEB 620P",  sacco:"City Shuttle",from:"CBD", to:"Ruiru",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
 { id:32, plate:"KBS 563R", sacco:"Super Metro", from:"CBD", to:"Thika",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:33, plate:"KDT 702E",  sacco:"City Shuttle",from:"CBD", to:"Thika",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
 { id:34, plate:"KBS 563R", sacco:"Super Metro", from:"CBD", to:"Kenyatta_Road",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:35, plate:"KDT 702E",  sacco:"City Shuttle",from:"CBD", to:"Kenyatta_Road",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 

/*From Ruiru*/
 { id:36, plate:"KBM 862T",  sacco:"Super Metro",   from:"Ruiru", to:"Githurai",       via:"Thika Road",     fare:20,  
baseEta:2, logo:"KM",  color:"#F5B800" }, 
  { id:37, plate:"KDE 692Q",  sacco:"GTS",         from:"Ruiru", to:"Githurai", via:"Thika Road", fare:30,  
baseEta:2, logo:"SM",  color:"#F5B800" }, 
 { id:38, plate:"KCH 769K",  sacco:"City Shuttle",from:"Ruiru", to:"Githurai",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
{ id:39, plate:"KEA 829T", sacco:"GTS",from:"Ruiru",    to:"Gatundu",       via:"Thika Road",     fare:80,  
baseEta:5, logo:"CS", color:"#F5B800" },
  { id:40, plate:"KDS 548E", sacco:"Kaka Travellers",   from:"Ruiru", to:"Githunguri",       via:"Githunguri-Ruiru Road",     fare:70,  
baseEta:2, logo:"KT",  color:"#F5B800" }, 
{ id:41, plate:"KCG 628Y", sacco:"Super Metro", from:"Ruiru", to:"CBD",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:42, plate:"KBE 720U",  sacco:"GTS",         from:"Ruiru", to:"CBD",       via:"Thika Road",     fare:50,  
baseEta:1, logo:"GTS", color: "#F5B800" }, 
  { id:43, plate:"KEB 620P",  sacco:"City Shuttle",from:"Ruiru", to:"CBD",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
{ id:44, plate:"KCN 639G",  sacco:"Super Metro",         from:"Ruiru", to:"Thika",       via:"Thika Road",     fare:50,  
baseEta:1, logo:"GTS", color: "#F5B800" }, 
  { id:45, plate:"KCY 987O",  sacco:"City Shuttle",from:"Ruiru", to:"Thika",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
/*From Thika */
{ id:46, plate:"KBS 563R", sacco:"Super Metro", from:"Thika", to:"CBD",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:47, plate:"KDT 702E",  sacco:"City Shuttle",from:"Thika", to:"CBD",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
 { id:48, plate:"KCM 194K",  sacco:"Super Metro", from:"Thika", to:"Githurai",     via:"Thika Road",     fare:100, 
baseEta:16, logo:"SM",  color:"#F5B800" }, 
 { id:49, plate:"KBJ 957U",  sacco:"City Shuttle",from:"Thika", to:"Githurai",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
{ id:50, plate:"KDM 278Y", sacco:"GTS", from:"Thika", to:"Gatundu",       via:"Thika Road",     fare:100,  
baseEta:7,  logo:"SM",  color:"#F5B800" }, 
{ id:51, plate:"KCN 639G",  sacco:"GTS",         from:"Thika", to:"Ruiru",       via:"Thika Road",     fare:50,  
baseEta:1, logo:"GTS", color: "#F5B800" }, 
  { id:52, plate:"KCY 987O",  sacco:"City Shuttle",from:"Thika", to:"Ruiru",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
{ id:53, plate:"KBM 862T",  sacco:"Super Metro",   from:"Thika", to:"Kenyatta_Road",       via:"Thika Road",     fare:20,  
baseEta:2, logo:"KM",  color:"#F5B800" }, 
  { id:54, plate:"KDE 692Q",  sacco:"GTS",         from:"Thika", to:"Kenyatta_Road", via:"Thika Road", fare:30,  
baseEta:2, logo:"SM",  color:"#F5B800" }, 
 { id:55, plate:"KCH 769K",  sacco:"City Shuttle",from:"Thika", to:"Kenyatta_Road",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
/*From Kenyatta Road*/
{ id:56, plate:"KBM 862T",  sacco:"Super Metro",   from:"Kenyatta_Road", to:"Thika",       via:"Thika Road",     fare:20,  
baseEta:2, logo:"KM",  color:"#F5B800" }, 
  { id:57, plate:"KDE 692Q",  sacco:"GTS",         from:"Kenyatta_Road", to:"Thika", via:"Thika Road", fare:30,  
baseEta:2, logo:"SM",  color:"#F5B800" }, 
 { id:58, plate:"KCH 769K",  sacco:"City Shuttle",from:"Kenyatta_Road", to:"Thika",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
 { id:59, plate:"KAT 261E",  sacco:"GTS",         from:"Kenyatta_Road", to:"Githurai",       via:"Thika Road",   fare:50,  
baseEta:8,  logo:"GTS", color:"#F5B800" }, 
  { id:60, plate:"KBD 657Y",  sacco:"Super Metro",from:"Kenyatta_Road", to:"Githurai",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"},
 { id:61, plate:"KBM 901J",  sacco:"City Shuttle",from:"Kenyatta_Road", to:"Githurai",       via:"Thika Road",   fare:60,  
baseEta:14, logo:"CS",  color:"#F5B800"}, 
  { id:62, plate:"KDK 281L", sacco:"GTS",         from:"Kenyatta_Road", to:"Gatundu",       via:"Kenyatta Road",     fare:50,  
baseEta:5, logo:"GTS", color:"#F5B800" }, 
{ id:63, plate:"KBS 563R", sacco:"Super Metro", from:"Kenyatta_Road", to:"CBD",       via:"Thika Road",     fare:50,  
baseEta:2,  logo:"SM",  color:"#F5B800" }, 
  { id:64, plate:"KDT 702E",  sacco:"City Shuttle",from:"Kenyatta_Road", to:"CBD",       via:"Thika Road",     fare:60,  
baseEta:2, logo:"CS",  color:"#F5B800" }, 
/*From Westlands and from Kiambu*/
{ id:65, plate:"KDK 828W", sacco:"City Shuttle",   from:"Westlands", to:"Ngong",       via:"Ngong Road",     fare:80,  
baseEta:6, logo:"KT",  color:"#F5B800" }, 
{ id:66, plate:"KCM 968K", sacco:"Kaka Travellers",   from:"Kiambu", to:"Githunguri",       via:"Githunguri-Ruturu Road",     fare:100,  
baseEta:8, logo:"KT",  color:"#F5B800" }, 

]; 


 
const MARSHAL_ACCOUNTS = [ 
  { email:"marshal@supermetro.co.ke", password:"metro123", name:"James Kariuki", 
sacco:"Super Metro", role:"Marshal" }, 
  { email:"marshal@GTS.co.ke",        password:"GTS1234",  name:"Ann Wanjiku",   sacco:"GTS",         
role:"Marshal" }, 
  { email:"admin@tokea.co.ke",        password:"admin123", name:"Tokea Admin",   sacco:"All",         
role:"Admin"   }, 
]; 
 
function randomEta(base) { 
  return Math.max(1, base + Math.floor(Math.random() * 7 - 3)); 
} 
function queryMatatus(area, stage, sacco) { 
  return MATATU_DB 
    .filter(m => m.from === area && m.to === stage && (sacco === "All" || m.sacco === sacco)) 
    .map(m => ({ ...m, eta: randomEta(m.baseEta) })); 
} 
 
function SaccoBadge({ logo, color, size = 52, sacco }) { 
  const imgSrc = SACCO_LOGOS[sacco];
  return ( 
    <div className="sacco-badge" style={{ background: color, width: size, height: size }}> 
      {imgSrc 
      ? <img src={imgSrc} alt={sacco} style={{ width: '100%', height: '100%', objectFit: 'cover'}}/>
      :logo
  }
    </div> 
  ); 
} 
 
function MatutuCard({ m, onOpen }) { 
  return ( 
    <div className="matatu-card" onClick={() => onOpen(m)}> 
      <div className="mc-left"> 
        <SaccoBadge logo={m.logo} color={m.color} sacco={m.sacco} /> 
        <div className="mc-info"> 
          <div className="mc-sacco">{m.sacco} <span className="mc-plate">{m.plate}</span></div> 
          <div className="mc-route"> 
            {m.from}<i className="fa-solid fa-arrow-right mc-arrow" />{m.to} 
          </div> 
          <div className="mc-via"><i className="fa-solid fa-road" /> Via: {m.via}</div> 
        </div> 
      </div> 
      <div className="mc-right"> 
        <div className="mc-pill"> 
          <div className="pill-label">Fare</div> 
          <div className="pill-val">KSh {m.fare}</div> 
        </div> 
        <div className={`mc-pill ${m.eta <= 8 ? "pill-green" : ""}`}> 
          <div className="pill-label">ETA</div> 
          <div className="pill-val">{m.eta} mins</div> 
        </div> 
        <button className="mc-chev" aria-label="Details"> 
          <i className="fa-solid fa-chevron-right" /> 
        </button> 
      </div> 
    </div> 
  ); 
} 
 
function Modal({ m, onClose }) { 
  if (!m) return null; 
  return ( 
    <div className="modal-overlay" onClick={onClose}> 
      <div className="modal-card" onClick={e => e.stopPropagation()}> 
        <div className="modal-head" style={{ background: m.color }}> 
          <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark" 
/></button> 
          <SaccoBadge logo={m.logo} color="rgba(0,0,0,0.18)" size={56} sacco={m.sacco}/> 
          <div> 
            <div className="modal-sacco">{m.sacco} <span className="mc-plate">{m.plate}</span></div> 
            <div className="modal-route">{m.from} <i className="fa-solid fa-arrow-right" /> 
{m.to}</div> 
          </div> 
        </div> 
        <div className="modal-body"> 
          <div className="mrow"> 
            <span className="mrow-label"><i className="fa-solid fa-route" /> Route</span> 
            <span className="mrow-val">Via {m.via}</span> 
          </div> 
          <div className="mrow"> 
            <span className="mrow-label"><i className="fa-solid fa-coins" /> Fare</span> 
            <span className="mrow-val">KSh {m.fare}</span> 
          </div> 
          <div className="mrow"> 
            <span className="mrow-label"><i className="fa-solid fa-clock" /> ETA</span> 
            <span className="mrow-val green">{m.eta} mins away</span> 
          </div> 
          <div className="mrow"> 
            <span className="mrow-label"><i className="fa-solid fa-signal" /> Status</span> 
            <span className="mrow-val green"><i className="fa-solid fa-circle" style={{ fontSize: 
7 }} /> Live</span> 
          </div> 
          <button className="modal-track-btn"> 
            <i className="fa-solid fa-location-crosshairs" /> Track this Matatu 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
function Navbar({ page, setPage, user, onLogout }) { 
  const [open, setOpen] = useState(false); 
  
  const links = ["Home","Sacco","Routes","How it works","About us"]; 
  return ( 
    <nav className= "navbar">
      <img src={mobileTopBlob} alt="" className="nav-blob" aria-hidden="true" />
      <div className="nav-inner"> 
        <button className="nav-logo" onClick={() => { setPage("Home"); setOpen(false); }}>
          <BrandLogo className="nav-brand-wrap" />
          <span className="nav-tag">Matatu iko njiani.</span>
        </button> 
        <ul className="nav-links"> 
          {links.map(l => ( 
            <li key={l}> 
              <button className={`nav-link ${page === l ? "nav-link-active" : ""}`} onClick={() => 
setPage(l)}> 
                {l} 
              </button> 
            </li> 
          ))} 
        </ul> 
        <div className="nav-right"> 
          {user ? ( 
            <div className="nav-user-pill"> 
              <i className="fa-solid fa-user-check" /> 
              <span>{user.name.split(" ")[0]}</span> 
              <button className="nav-logout" onClick={onLogout}><i className="fa-solid 
fa-right-from-bracket" /></button> 
            </div> 
          ) : ( 
            <button className="nav-login-btn" onClick={() => setPage("Login")}> 
              <i className="fa-regular fa-user" /> Login 
            </button> 
          )} 
        </div> 
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu"> 
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} /> 
        </button> 
      </div> 
      {open && ( 
        <div className="nav-drawer"> 
          {links.map(l => ( 
            <button key={l} className={`drawer-btn ${page === l ? "drawer-active" : ""}`} 
              onClick={() => { setPage(l); setOpen(false); }}> 
              {l} 
            </button> 
          ))} 
          {user ? ( 
            <button className="drawer-btn drawer-logout" onClick={() => { onLogout(); 
setOpen(false); }}> 
              <i className="fa-solid fa-right-from-bracket" /> Logout ({user.name.split(" ")[0]}) 
            </button> 
          ) : ( 
            <button className="drawer-btn drawer-login" onClick={() => { setPage("Login"); 
setOpen(false); }}> 
              <i className="fa-regular fa-user" /> Login 
            </button> 
          )} 
        </div> 
      )} 
    </nav> 
  ); 
} 
 
function BottomNav({ page, setPage, user }) {
  const profilePage = user ? "Dashboard" : "Login";
  const tabs = [
    { id: "Home", icon: "fa-house", label: "Home" },
    { id: "Routes", icon: "fa-route", label: "Routes" },
    { id: "Favourites", icon: "fa-heart", label: "Favourites" },
    { id: profilePage, icon: "fa-user", label: "Profile" },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`bottom-tab ${page === t.id ? "bottom-active" : ""}`}
          onClick={() => setPage(t.id)}
        >
          <i className={`fa-solid ${t.icon}`} />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
} 
 
function HomePage() { 
  const areas  = Object.keys(ROUTE_DATA); 
  const [area,  setArea]  = useState("Githurai"); 
  const [stage, setStage] = useState("CBD"); 
  const [sacco, setSacco] = useState("All"); 
  const stages = Object.keys(ROUTE_DATA[area] || {}); 
  const saccos = ROUTE_DATA[area]?.[stage] || ["All"]; 
  const [matatus, setMatatus] = useState(() => queryMatatus("Githurai","CBD","All")); 
  const [showAll, setShowAll] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [updated, setUpdated] = useState("Just now"); 
  const [modal,   setModal]   = useState(null); 
 
  function handleAreaChange(e) { 
    const a = e.target.value; 
    setArea(a); 
    const firstStage = Object.keys(ROUTE_DATA[a])[0]; 
    setStage(firstStage); 
    setSacco("All"); 
  } 
  function handleStageChange(e) { setStage(e.target.value); setSacco("All"); } 
  function handleCheck() { 
    setLoading(true); setShowAll(false); 
    setTimeout(() => { setMatatus(queryMatatus(area, stage, sacco)); setUpdated("Just now"); 
     setLoading(false); 
      document.querySelector('.live-section').scrollIntoView({ behavior: 'smooth'})}, 700); 
  } 
  const displayed = showAll ? matatus : matatus.slice(0, 3); 
 
  return ( 
    <div className="home"> 
 
      {/* ── HERO ── */} 
      <section className="hero">
        

        <div className="hero-desktop">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Know before<br />you go.</h1>
              <p className="hero-desc">
                Check which matatus are on the way, the fare and the estimated time to your road.
              </p>
              
            </div>
            <div className="hero-img-wrap">
              <img src={heroMatatu} alt="Super Metro matatu" className="hero-bus" />
            </div>
          </div>
        </div>

        <div className="hero-mobile">
          <div className="hero-mobile-stage">
            <img src={mobileBg} alt="" className="hero-m-bus" aria-hidden="true" />
            <div className="hero-m-copy">
              <h1 className="hero-title">Know before<br/> you go.</h1>
              <p className="hero-desc">
                Check which matatus are on the way, the fare and the estimated time to your road.
              </p>
            </div>
            
          </div>
        
        </div>
      </section>
 
      {/* ── SEARCH CARD ── */} 
      <section className="search-wrap"> 
        <div className="search-card"> 
          <div className="search-fields"> 
            <div className="search-field"> 
              <label><i className="fa-solid fa-location-dot" /> SELECT AREA</label> 
              <div className="sel-wrap"> 
                <select value={area} onChange={handleAreaChange}>{areas.map(a => <option 
key={a}>{a}</option>)}</select> 
                <i className="fa-solid fa-chevron-down sel-icon" /> 
              </div> 
            </div> 
            <div className="search-field"> 
              <label><i className="fa-solid fa-flag" />DESTINATION</label> 
              <div className="sel-wrap"> 
                <select value={stage} onChange={handleStageChange}>{stages.map(s => <option 
key={s}>{s}</option>)}</select> 
                <i className="fa-solid fa-chevron-down sel-icon" /> 
              </div> 
            </div> 
            <div className="search-field"> 
              <label><i className="fa-solid fa-bus" /> SELECT SACCO</label> 
              <div className="sel-wrap"> 
                <select value={sacco} onChange={e => setSacco(e.target.value)}>{saccos.map(s => 
<option key={s}>{s}</option>)}</select> 
                <i className="fa-solid fa-chevron-down sel-icon" /> 
              </div> 
            </div> 
          </div> 
          <button className="check-btn" onClick={handleCheck} disabled={loading}> 
            {loading 
              ? <><i className="fa-solid fa-spinner fa-spin" /> Checking...</> 
              : <>Check Now <i className="fa-solid fa-arrow-right" /></>} 
          </button> 
        </div> 
      </section> 
 
      {/* ── LIVE RESULTS ── */} 
      <section className="live-section"> 
        <div className="live-header"> 
          <div> 
            <div className="live-badge-row"><i className="fa-solid fa-circle live-dot" 
/><span>LIVE UPDATES</span></div> 
            <h2 className="live-title">Matatus on the way</h2> 
          </div> 
          <div className="live-updated"><i className="fa-solid fa-rotate" /> Last updated: 
{updated}</div> 
        </div> 
        {loading ? ( 
          <div className="state-center"><i className="fa-solid fa-spinner fa-spin fa-2x" 
/><p>Fetching matatus…</p></div> 
        ) : matatus.length === 0 ? ( 
          <div className="state-center"><i className="fa-solid fa-bus-slash fa-2x" style={{ 
color:"#ccc" }} /><p>No matatus found. Try different filters.</p></div> 
        ) : ( 
          <> 
            <div className="matatu-list"> 
              {displayed.map(m => <MatutuCard key={m.id} m={m} onOpen={setModal} />)} 
            </div> 
            {matatus.length > 3 && ( 
              <button className="view-more-btn" onClick={() => setShowAll(!showAll)}> 
                {showAll ? "Show less" : "View more matatus"} <i className={`fa-solid 
fa-chevron-${showAll ? "up" : "down"}`} /> 
              </button> 
            )} 
          </> 
        )} 
      </section> 
 
      {/* ── WHY TOKEA ── */} 
      {/* Desktop */} 
      <section className="why-section">
        <div className="why-card">
          <img src={whyTokea} alt="" className="why-card-bg" aria-hidden="true" />
          <div className="why-card-grid">
            <div className="why-on-image">
              <h2>Why Tokea?</h2>
              <ul className="why-list">
                <li>
                  <div className="why-icon"><i className="fa-regular fa-clock" /></div>
                  <div><strong>Save time</strong><p>Stop waiting for hours. Know when your matatu is on the way.</p></div>
                </li>
                <li>
                  <div className="why-icon"><i className="fa-solid fa-coins" /></div>
                  <div><strong>Know the fare</strong><p>View current fare prices before you board.</p></div>
                </li>
                <li>
                  <div className="why-icon"><i className="fa-solid fa-shield-halved" /></div>
                  <div><strong>Travel smart</strong><p>Plan your journey better and travel with confidence.</p></div>
                </li>
              </ul>
            </div>
            <div className="how-col">
              <h3>How it works</h3>
              <div className="how-steps">
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-location-dot" /></div><span>Select your area, destination and sacco.</span></div>
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-magnifying-glass" /></div><span>See matatus on the way, fare and ETA.</span></div>
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-bell" /></div><span>Get updates in real time.</span></div>
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-check" /></div><span>Board on time and go!</span></div>
              </div>
            </div>
          </div>
        </div>
      </section> 
      
 
      {/* Mobile Why Tokea */} 
      <section className="why-mobile-section">
         <div className="how-mobile">
              <h3>How it works</h3>
              <div className="how-steps">
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-location-dot" /></div><span>Select your areas and sacco.</span></div>
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-magnifying-glass" /></div><span>See matatus on the way & fare.</span></div>
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-bell" /></div><span>Get updates in real time.</span></div>
                <div className="step-item"><div className="step-dot"><i className="fa-solid fa-check" /></div><span>Board on time and go!</span></div>
              </div>
              </div>
        <div className="why-mobile-card">
          <img src={whyTokea} alt="" className="why-mobile-bg" aria-hidden="true" />
          <div className="why-mobile-overlay">
            <h2>Why Tokea?</h2>
            <ul className="why-mobile-list">
              {[
                <>Know when your matatu<br/> is coming</>,
                "Compare fare prices",
                <>Plan your journey<br/> better</>,
                <>Travel smart,<br/> stress-free</>,
              ].map((t, i) => (
                <li key={t}><i className="fa-solid fa-circle-check" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
       
      </section> 
 
      <Modal m={modal} onClose={() => setModal(null)} /> 
    </div> 
  ); 
} 
function LoginPage({ setPage, setUser }) { 
  const [email,    setEmail]    = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showPw,   setShowPw]   = useState(false); 
  const [error,    setError]    = useState(""); 
  const [loading,  setLoading]  = useState(false); 
 
  function handleLogin(e) { 
    e.preventDefault(); 
    setError(""); 
    if (!email || !password) { setError("Please fill in all fields."); return; } 
    setLoading(true); 
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    setTimeout(() => {
      // Demo mode: any non-empty email/password logs in. We still check
      // MARSHAL_ACCOUNTS first so known accounts keep their real name/sacco;
      // anything else gets a generic marshal profile built from the email.
      const knownAccount = MARSHAL_ACCOUNTS.find(
        (a) => a.email === normalizedEmail && a.password === normalizedPassword
      );
      const account = knownAccount || {
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0] || "Marshal",
        sacco: "All",
        role: "Marshal",
      };
      setUser(account);
      setPage("Dashboard");
      setLoading(false);
    }, 400); 
  } 
 
  return ( 
    <div className="login-page"> 
      <div className="login-card"> 
        <div className="login-logo">
          <BrandLogo className="login-brand-wrap" />
          <div className="login-tag">Matatu iko njiani.</div>
        </div> 
        <h2 className="login-title">Marshal Login</h2> 
        <p className="login-sub">Sign in to manage your sacco routes</p> 
        {error && <div className="login-error"><i className="fa-solid fa-circle-exclamation" /> 
{error}</div>} 
        <form onSubmit={handleLogin} className="login-form" noValidate> 
          <div className="form-group"> 
            <label htmlFor="email"><i className="fa-solid fa-envelope" /> Email Address</label> 
            <input id="email" type="email" placeholder="marshal@sacco.co.ke" value={email} 
onChange={e => setEmail(e.target.value)} autoComplete="email" /> 
          </div> 
          <div className="form-group"> 
            <label htmlFor="password"><i className="fa-solid fa-lock" /> Password</label> 
            <div className="pw-wrap"> 
              <input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" 
value={password} onChange={e => setPassword(e.target.value)} 
autoComplete="current-password" /> 
              <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)} 
aria-label="Toggle password"> 
                <i className={`fa-solid ${showPw ? "fa-eye-slash" : "fa-eye"}`} /> 
              </button> 
            </div> 
          </div> 
          <button type="submit" className="login-submit" disabled={loading}> 
            {loading ? <><i className="fa-solid fa-spinner fa-spin" /> Signing in…</> : <><i 
className="fa-solid fa-right-to-bracket" /> Sign In</>} 
          </button> 
        </form> 
        
      </div> 
    </div> 
  ); 
} 
 
function Dashboard({ user, onLogout }) { 
  const myMatatus = user.sacco === "All" ? MATATU_DB : MATATU_DB.filter(m => m.sacco 
=== user.sacco); 
  const [matatus, setMatatus] = useState(myMatatus.map(m => ({ ...m, eta: 
randomEta(m.baseEta), active: true }))); 
 
  function toggleActive(id) { setMatatus(prev => prev.map(m => m.id === id ? { ...m, active: 
!m.active } : m)); } 
  function refreshEtas()    { setMatatus(prev => prev.map(m => ({ ...m, eta: 
randomEta(m.baseEta) }))); } 
 
  return ( 
    <div className="dashboard"> 
      <div className="dash-header"> 
        <div> 
          <h1 className="dash-title"><i className="fa-solid fa-gauge-high" /> Marshal 
Dashboard</h1> 
          <p className="dash-sub">Welcome, <strong>{user.name}</strong> {user.sacco} · 
{user.role}</p> 
        </div> 
        <div className="dash-actions"> 
          <button className="dash-refresh-btn" onClick={refreshEtas}><i className="fa-solid 
fa-rotate" /> Refresh ETAs</button> 
          <button className="dash-logout-btn"  onClick={onLogout}><i className="fa-solid 
fa-right-from-bracket" /> Logout</button> 
        </div> 
      </div> 
      <div className="dash-stats"> 
        <div className="stat-card"><i className="fa-solid fa-bus" /><div><div 
className="stat-num">{matatus.length}</div><div className="stat-label">Total 
Vehicles</div></div></div> 
        <div className="stat-card"><i className="fa-solid fa-circle-check" style={{ 
color:"#22c55e" }} /><div><div className="stat-num">{matatus.filter(m => 
m.active).length}</div><div className="stat-label">Active</div></div></div> 
        <div className="stat-card"><i className="fa-solid fa-circle-xmark" style={{ 
color:"#ef4444" }} /><div><div className="stat-num">{matatus.filter(m => 
!m.active).length}</div><div className="stat-label">Inactive</div></div></div> 
        <div className="stat-card"><i className="fa-solid fa-route" /><div><div 
className="stat-num">{[...new Set(matatus.map(m => `${m.from}-${m.to}`))].length}</div><div 
className="stat-label">Routes</div></div></div> 
      </div> 
      <div className="dash-table-wrap"> 
        <h2 className="dash-table-title"><i className="fa-solid fa-list" /> Your Vehicles</h2> 
        <div className="dash-table-scroll"> 
          <table className="dash-table"> 
            <thead> 
              
<tr><th>Sacco</th><th>Route</th><th>Via</th><th>Fare</th><th>ETA</th><th>Status</th><th
>Action</th></tr> 
            </thead> 
            <tbody> 
              {matatus.map(m => ( 
                <tr key={m.id} className={m.active ? "" : "row-inactive"}> 
                  <td><div className="td-sacco"><SaccoBadge logo={m.logo} color={m.color} 
size={34} sacco={m.sacco} /><span>{m.sacco}</span></div></td> 
                  <td>{m.from} → {m.to}</td> 
                  <td>{m.via}</td> 
                  <td>KSh {m.fare}</td> 
                  <td className={m.eta <= 8 ? "green" : ""}>{m.active ? `${m.eta} mins` : "—"}</td> 
                  <td> 
                    <span className={`status-chip ${m.active ? "chip-active" : "chip-inactive"}`}> 
                      <i className="fa-solid fa-circle" style={{ fontSize:7 }} /> 
                      {m.active ? "Active" : "Inactive"} 
                    </span> 
                  </td> 
                  <td> 
                    <button className={`toggle-btn ${m.active ? "toggle-off" : "toggle-on"}`} onClick={() => toggleActive(m.id)}> 
                      {m.active ? <><i className="fa-solid fa-pause" /> Deactivate</> : <><i 
className="fa-solid fa-play" /> Activate</>} 
                    </button> 
                  </td> 
                </tr> 
              ))} 
            </tbody> 
          </table> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
function RoutesPage() { 
  const routes = [ 
    { from:"Kenyatta Road", to:"CBD",       via:"Thika Road",   saccos:["GTS","City Shuttle","Super Metro"], fare:"KSh 100" }, 
    { from:"Githurai", to:"CBD",       via:"Thika Road",   saccos:["Super Metro","GTS","City Shuttle"],    fare:"KSh 50" }, 
    { from:"Gatundu", to:"Thika",       via:"Thika Road", saccos:["GTS"],                 
fare:"KSh 100" }, 
    { from:"Ngong",    to:"CBD",       via:"Ngong Road",   saccos:["Super Metro","City Shuttle"],          
fare:"KSh 80" }, 
    { from:"Githunguri", to:"CBD", via:"Kiambu Road",    saccos:["Kaka Travellers"],                
fare:"KSh 150" }, 
    { from:"Gatundu", to:"Ruiru", via:"Kenyatta  Road",    saccos:["GTS","City Shuttle"],                 
fare:"KSh 80" }, 
  ]; 
  return ( 
    <div className="inner-page"> 
      <div className="inner-head"><h1><i className="fa-solid fa-route" /> 
Routes</h1><p>Browse all available matatu routes in Nairobi</p></div> 
      <div className="cards-grid"> 
        {routes.map((r,i) => ( 
          <div key={i} className="route-card"> 
            <div className="rc-top"><span className="rc-city">{r.from}</span><i 
className="fa-solid fa-arrow-right" style={{ color:"#F5B800" }} /><span 
className="rc-city">{r.to}</span></div> 
            <div className="rc-via"><i className="fa-solid fa-road" /> Via {r.via}</div> 
            <div className="rc-saccos">{r.saccos.map(s => <span key={s} 
className="rc-tag">{s}</span>)}</div> 
            <div className="rc-fare"><i className="fa-solid fa-coins" /> {r.fare}</div> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 
 
function SaccoPage() { 
  // Only saccos we have real logo assets for (see SACCO_LOGOS above).
  const saccos = [ 
    { name:"Super Metro",    routes:"Kasarani, Githurai → CBD", sacco:"Super Metro",    color:"#F5B800", vehicles:120 }, 
    { name:"GTS",            routes:"Kasarani, Embakasi → CBD", sacco:"GTS",            color:"#1a1a1a", vehicles:85  }, 
    { name:"City Shuttle",   routes:"Kasarani, Ngong → CBD",    sacco:"City Shuttle",   color:"#E63946", vehicles:60  }, 
    { name:"Kaka Travellers",routes:"Githurai → CBD",           sacco:"Kaka Travellers",color:"#2A9D8F", vehicles:45  }, 
  ]; 
  return ( 
    <div className="inner-page"> 
      <div className="inner-head"><h1><i className="fa-solid fa-bus" /> Saccos</h1><p>All 
registered matatu saccos on the Tokea platform</p></div> 
      <div className="cards-grid"> 
        {saccos.map(s => ( 
          <div key={s.name} className="sacco-card"> 
            <SaccoBadge color={s.color} size={60} sacco={s.sacco} /> 
            <div className="sc-info"><h3>{s.name}</h3><p><i className="fa-solid fa-route" /> 
{s.routes}</p><p><i className="fa-solid fa-bus" /> {s.vehicles} vehicles</p></div> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 
 
function HowPage() { 
  const steps = [ 
    { icon:"fa-location-dot",    title:"Select your area",   desc:"Choose your pickup area, destination stage, and preferred sacco." }, 
    { icon:"fa-magnifying-glass",title:"Check availability", desc:"Hit Check Now to see matatus currently on the way for your route." }, 
    { icon:"fa-bell",            title:"Get live updates",   desc:"View real-time ETA and current fare prices for each matatu." }, 
    { icon:"fa-check-circle",    title:"Board and go",       desc:"Head to your stage at the right time and board with confidence." }, 
  ]; 
  return ( 
    <div className="inner-page"> 
      <div className="inner-head"><h1><i className="fa-solid fa-circle-info" /> How it 
works</h1><p>Get started with Tokea in four simple steps</p></div> 
      <div className="how-grid"> 
        {steps.map((s,i) => ( 
          <div key={i} className="how-card"> 
            <div className="how-num">{i+1}</div> 
            <div className="how-icon-wrap"><i className={`fa-solid ${s.icon}`} /></div> 
            <h3>{s.title}</h3> 
            <p>{s.desc}</p> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 
 
function AboutPage() { 
  return ( 
    <div className="inner-page"> 
      <div className="inner-head"><h1><i className="fa-solid fa-circle-info" /> About 
Tokea</h1><p>Matatu iko njiani.</p></div> 
      <div className="about-grid"> 
        {[ 
          { icon:"fa-bullseye",  title:"Our Mission", desc:"To make public transport in Nairobi smarter and less stressful by providing real-time matatu information." }, 
          { icon:"fa-eye",       title:"Our Vision",  desc:"A Nairobi where every commuter knows exactly when their matatu is coming and can plan with confidence." }, 
          { icon:"fa-handshake", title:"Our Partners",desc:"We work with Super Metro, GTS, City Shuttle, Kaka Travellers and more to bring you accurate live information." }, 
        ].map(c => ( 
          <div key={c.title} className="about-card"> 
            <i className={`fa-solid ${c.icon} fa-2x`} style={{ color:"#F5B800" }} /> 
            <h3>{c.title}</h3> 
            <p>{c.desc}</p> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 
 
function FavouritesPage() { 
  return ( 
    <div className="inner-page"> 
      <div className="inner-head"><h1><i className="fa-solid fa-heart" /> 
Favourites</h1><p>Your saved routes will appear here</p></div> 
      <div className="empty-state"> 
        <i className="fa-regular fa-heart fa-3x" style={{ color:"#F5B800" }} /> 
        <h3>No favourites yet</h3> 
        <p>Save your regular routes for quick access</p> 
      </div> 
    </div> 
  ); 
} 
 
function Footer({ setPage }) { 
  return ( 
    <footer className="footer"> 
      <div className="footer-inner"> 
        <div className="footer-brand"> 
          <img src={footerIcon} alt="" className="footer-icon" aria-hidden="true" /> 
          <div> 
            <div className="footer-name">Tokea.</div> 
            <div className="footer-tag">Matatu iko njiani.</div> 
          </div> 
        </div> 
        <div className="footer-apps"> 
          <button type="button" className="store-btn" aria-label="Get it on Google Play"> 
            <i className="fa-brands fa-google-play" /> 
            <span className="store-btn-text"><small>GET IT ON</small> Google Play</span> 
          </button> 
          <button type="button" className="store-btn" aria-label="Download on the App Store"> 
            <i className="fa-brands fa-apple" /> 
            <span className="store-btn-text"><small>Download on the</small> App Store</span> 
          </button> 
        </div> 
        <div className="footer-social"> 
          <span>Follow us</span> 
          <div className="social-row"> 
            <button aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></button> 
            <button aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></button> 
            <button aria-label="Instagram"><i className="fa-brands fa-instagram" /></button> 
          </div> 
        </div> 
      </div> 
    </footer> 
  ); 
} 
 
export default function App() { 
  const [page, setPage] = useState("Home"); 
  const [user, setUser] = useState(null); 
 
  function handleLogout() { setUser(null); setPage("Home"); } 
 
  const renderPage = () => { 
    switch (page) { 
      case "Home":         return <HomePage />; 
      case "Sacco":        return <SaccoPage />; 
      case "Routes":       return <RoutesPage />; 
      case "How it works": return <HowPage />; 
      case "About us":     return <AboutPage />; 
      case "Login":        return <LoginPage setPage={setPage} setUser={setUser} />;
      case "Dashboard":
        return user
          ? <Dashboard user={user} onLogout={handleLogout} />
          : <LoginPage setPage={setPage} setUser={setUser} />; 
      case "Favourites":   return <FavouritesPage />; 
      default:             return <HomePage />; 
    } 
  }; 
 
  return ( 
    <> 
      <link rel="stylesheet" 
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" /> 
      <link rel="stylesheet" 
href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" /> 
      <div className="app"> 
        <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} /> 
        <main className="main">{renderPage()}</main> 
        <Footer setPage={setPage} /> 
        <BottomNav page={page} setPage={setPage} user={user} /> 
      </div> 
    </> 
  ); 
}