import { useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const T = {
  fa: {
    dir:"rtl", login:"ورود به سیستم", username:"نام کاربری", password:"رمز عبور", loginBtn:"ورود",
    loginError:"نام کاربری یا رمز عبور اشتباه است", logout:"خروج",
    dashboard:"داشبورد", customers:"مشتریان", properties:"ملک‌ها", calendar:"یادآوری‌ها",
    reports:"گزارشات", contracts:"قراردادها", profile:"پروفایل",
    addCustomer:"افزودن مشتری", addProperty:"افزودن ملک", addReminder:"افزودن یادآوری", addContract:"افزودن قرارداد",
    name:"نام", phone:"تلفن", email:"ایمیل", type:"نوع", note:"یادداشت", save:"ذخیره", cancel:"لغو",
    edit:"ویرایش", delete:"حذف", search:"جستجو...", filter:"فیلتر", all:"همه",
    buyer:"خریدار", seller:"فروشنده", tenant:"مستأجر", landlord:"موجر",
    forSale:"فروشی", forRent:"اجاری", sold:"فروخته شده", rented:"اجاره داده شده",
    address:"آدرس", price:"قیمت", area:"متراژ", rooms:"اتاق", status:"وضعیت", floor:"طبقه",
    title:"عنوان", date:"تاریخ", time:"ساعت", priority:"اولویت", high:"بالا", medium:"متوسط", low:"پایین",
    totalCustomers:"کل مشتریان", totalProperties:"کل ملک‌ها", pendingReminders:"یادآوری امروز",
    recentActivity:"یادآوری‌های اخیر", noData:"داده‌ای وجود ندارد",
    apartment:"آپارتمان", villa:"ویلا", office:"دفتر", land:"زمین",
    lang:"EN", currency:"تومان", sqm:"m²",
    uploadPhoto:"آپلود عکس", linkedCustomer:"مشتری مرتبط", description:"توضیحات",
    parking:"پارکینگ", elevator:"آسانسور", storage:"انباری", yes:"دارد", no:"ندارد",
    adminPanel:"پنل مدیریت املاک",
    contractNo:"شماره قرارداد", contractType:"نوع قرارداد", contractDate:"تاریخ قرارداد",
    contractStatus:"وضعیت قرارداد", startDate:"تاریخ شروع", endDate:"تاریخ پایان",
    saleContract:"قرارداد فروش", rentContract:"قرارداد اجاره", preContract:"پیش‌قرارداد",
    active:"فعال", expired:"منقضی", pending:"در انتظار", cancelled:"لغو شده",
    party1:"طرف اول (فروشنده/موجر)", party2:"طرف دوم (خریدار/مستأجر)",
    linkedProperty:"ملک مرتبط", commission:"کمیسیون", totalContracts:"کل قراردادها",
    activeContracts:"قراردادهای فعال", totalCommission:"کل کمیسیون", overview:"نمای کلی",
    propertyReport:"گزارش ملک‌ها", customerReport:"گزارش مشتریان",
    byStatus:"بر اساس وضعیت", byType:"بر اساس نوع", darkMode:"تاریک", lightMode:"روشن",
  },
  en: {
    dir:"ltr", login:"Login", username:"Username", password:"Password", loginBtn:"Sign In",
    loginError:"Invalid username or password", logout:"Logout",
    dashboard:"Dashboard", customers:"Customers", properties:"Properties", calendar:"Reminders",
    reports:"Reports", contracts:"Contracts", profile:"Profile",
    addCustomer:"Add Customer", addProperty:"Add Property", addReminder:"Add Reminder", addContract:"Add Contract",
    name:"Name", phone:"Phone", email:"Email", type:"Type", note:"Note", save:"Save", cancel:"Cancel",
    edit:"Edit", delete:"Delete", search:"Search...", filter:"Filter", all:"All",
    buyer:"Buyer", seller:"Seller", tenant:"Tenant", landlord:"Landlord",
    forSale:"For Sale", forRent:"For Rent", sold:"Sold", rented:"Rented",
    address:"Address", price:"Price", area:"Area", rooms:"Rooms", status:"Status", floor:"Floor",
    title:"Title", date:"Date", time:"Time", priority:"Priority", high:"High", medium:"Medium", low:"Low",
    totalCustomers:"Total Customers", totalProperties:"Total Properties", pendingReminders:"Today's Reminders",
    recentActivity:"Recent Reminders", noData:"No data available",
    apartment:"Apartment", villa:"Villa", office:"Office", land:"Land",
    lang:"FA", currency:"Toman", sqm:"m²",
    uploadPhoto:"Upload Photo", linkedCustomer:"Linked Customer", description:"Description",
    parking:"Parking", elevator:"Elevator", storage:"Storage", yes:"Yes", no:"No",
    adminPanel:"Real Estate Admin Panel",
    contractNo:"Contract No", contractType:"Contract Type", contractDate:"Contract Date",
    contractStatus:"Status", startDate:"Start Date", endDate:"End Date",
    saleContract:"Sale Contract", rentContract:"Rent Contract", preContract:"Pre-Contract",
    active:"Active", expired:"Expired", pending:"Pending", cancelled:"Cancelled",
    party1:"Party 1 (Seller/Landlord)", party2:"Party 2 (Buyer/Tenant)",
    linkedProperty:"Linked Property", commission:"Commission", totalContracts:"Total Contracts",
    activeContracts:"Active Contracts", totalCommission:"Total Commission", overview:"Overview",
    propertyReport:"Property Report", customerReport:"Customer Report",
    byStatus:"By Status", byType:"By Type", darkMode:"Dark", lightMode:"Light",
  }
};

const USERS = [{ username:"admin", password:"1234", role:"مدیر" },{ username:"agent", password:"agent", role:"مشاور" }];

const initCustomers = [
  { id:1, name:"علی رضایی", phone:"09121234567", email:"ali@email.com", type:"buyer", note:"دنبال آپارتمان ۳ خوابه در تهرانپارس" },
  { id:2, name:"مریم احمدی", phone:"09351112233", email:"", type:"seller", note:"ملک در تهرانپارس" },
  { id:3, name:"سعید کریمی", phone:"09201234567", email:"", type:"tenant", note:"دنبال اجاره اداری در ونک" },
];
const initProperties = [
  { id:1, title:"آپارتمان تهرانپارس", address:"تهران، تهرانپارس", price:"5500000000", area:"120", rooms:"3", floor:"4", type:"apartment", status:"forSale", parking:"yes", elevator:"yes", storage:"yes", description:"آپارتمان نوساز", linkedCustomer:2, photos:[] },
  { id:2, title:"ویلا لواسان", address:"لواسان", price:"15000000000", area:"300", rooms:"5", floor:"1", type:"villa", status:"forSale", parking:"yes", elevator:"no", storage:"yes", description:"ویلای باغ دار", linkedCustomer:"", photos:[] },
  { id:3, title:"دفتر ونک", address:"تهران، ونک", price:"8000000", area:"80", rooms:"2", floor:"7", type:"office", status:"forRent", parking:"yes", elevator:"yes", storage:"no", description:"دفتر مناسب", linkedCustomer:3, photos:[] },
];
const initReminders = [
  { id:1, title:"بازدید آپارتمان تهرانپارس", date:new Date().toISOString().split("T")[0], time:"10:00", priority:"high", done:false },
  { id:2, title:"تماس با مریم احمدی", date:new Date().toISOString().split("T")[0], time:"14:00", priority:"medium", done:false },
  { id:3, title:"ارسال مدارک", date:new Date(Date.now()+86400000).toISOString().split("T")[0], time:"09:00", priority:"low", done:false },
];
const initContracts = [
  { id:1, contractNo:"Q-1401-001", contractType:"saleContract", contractDate:"2024-01-15", startDate:"2024-01-15", endDate:"2024-03-15", status:"active", party1:2, party2:1, linkedProperty:1, commission:"55000000", note:"قرارداد فروش آپارتمان" },
  { id:2, contractNo:"Q-1401-002", contractType:"rentContract", contractDate:"2024-02-01", startDate:"2024-02-01", endDate:"2025-02-01", status:"active", party1:"", party2:3, linkedProperty:3, commission:"8000000", note:"قرارداد اجاره دفتر" },
];

const statusColor:any = { forSale:"#3b82f6", forRent:"#f59e0b", sold:"#10b981", rented:"#8b5cf6" };
const typeColor:any = { buyer:"#3b82f6", seller:"#ef4444", tenant:"#f59e0b", landlord:"#10b981" };
const prioColor:any = { high:"#ef4444", medium:"#f59e0b", low:"#10b981" };
const contractStatusColor:any = { active:"#10b981", expired:"#ef4444", pending:"#f59e0b", cancelled:"#94a3b8" };
const fmt = (n:any) => Number(n||0).toLocaleString();

export default function App() {
  const [lang, setLang] = useState("fa");
  const [dark, setDark] = useState(false);
  const t:any = T[lang as keyof typeof T];

  const th = {
    bg: dark ? "#0f172a" : "#f1f5f9",
    card: dark ? "#1e293b" : "#ffffff",
    sidebar: dark ? "linear-gradient(160deg,#020817,#0f2444)" : "linear-gradient(160deg,#0f2444,#1d4ed8)",
    text: dark ? "#f1f5f9" : "#1e293b",
    subtext: dark ? "#94a3b8" : "#64748b",
    border: dark ? "#334155" : "#e2e8f0",
    input: dark ? "#0f172a" : "#fafafa",
    inputText: dark ? "#f1f5f9" : "#1e293b",
    hover: dark ? "#334155" : "#f8fafc",
  };

  const useLS = (key:string, init:any) => {
    const [val, setVal] = useState(() => {
      try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
    });
    const set = (v:any) => { const next = typeof v === "function" ? v(val) : v; setVal(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch {} };
    return [val, set] as const;
  };

  const [user, setUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ username:"", password:"" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [customers, setCustomers] = useLS("crm_customers", initCustomers);
  const [properties, setProperties] = useLS("crm_properties", initProperties);
  const [reminders, setReminders] = useLS("crm_reminders", initReminders);
  const [contracts, setContracts] = useLS("crm_contracts", initContracts);
  const [profilePhoto, setProfilePhoto] = useLS("crm_profile_photo", "");
  const [profileForm, setProfileForm] = useState({ name:"", phone:"", email:"", bio:"" });
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [reportTab, setReportTab] = useState("overview");
  const [modal, setModal] = useState<string|null>(null);
  const [form, setForm] = useState<any>({});
  const [photoPreview, setPhotoPreview] = useState<string|null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const profileFileRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const todayReminders = reminders.filter((r:any) => r.date === today && !r.done);
  const activeContracts = contracts.filter((c:any) => c.status === "active").length;
  const totalCommission = contracts.reduce((s:number,c:any) => s + Number(c.commission||0), 0);

  const propByStatus = ["forSale","forRent","sold","rented"].map(st => ({ label:t[st], count:properties.filter((p:any)=>p.status===st).length, color:statusColor[st] }));
  const custByType = ["buyer","seller","tenant","landlord"].map(tp => ({ label:t[tp], count:customers.filter((c:any)=>c.type===tp).length, color:typeColor[tp] }));
  const contractByType = ["saleContract","rentContract","preContract"].map(ct => ({ label:t[ct], count:contracts.filter((c:any)=>c.contractType===ct).length }));
  const propByType = ["apartment","villa","office","land"].map(tp => ({ label:t[tp], count:properties.filter((p:any)=>p.type===tp).length }));
  const totalSaleValue = contracts.filter((c:any)=>c.contractType==="saleContract").reduce((s:number,c:any)=>{
    const p:any = properties.find((pr:any)=>pr.id===Number(c.linkedProperty));
    return s + Number(p?.price||0);
  },0);

  const handleLogin = () => {
    const u = USERS.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (u) { setUser(u); setLoginError(""); } else setLoginError(t.loginError);
  };
  const openModal = (type:string, data:any={}) => { setForm({...data, photos:data.photos||[]}); setModal(type); };
  const closeModal = () => { setModal(null); setForm({}); };
  const handlePhotoUpload = (e:any) => {
    Array.from(e.target.files as FileList).forEach((file:any) => {
      const r = new FileReader(); r.onload=(ev:any)=>setForm((f:any)=>({...f,photos:[...(f.photos||[]),ev.target.result]})); r.readAsDataURL(file);
    });
  };
  const handleProfilePhoto = (e:any) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader(); r.onload=(ev:any)=>setProfilePhoto(ev.target.result); r.readAsDataURL(file);
  };
  const saveCustomer = () => { if(!form.name)return; form.id?setCustomers((c:any)=>c.map((x:any)=>x.id===form.id?form:x)):setCustomers((c:any)=>[...c,{...form,id:Date.now()}]); closeModal(); };
  const saveProperty = () => { if(!form.title)return; form.id?setProperties((p:any)=>p.map((x:any)=>x.id===form.id?form:x)):setProperties((p:any)=>[...p,{...form,id:Date.now(),status:form.status||"forSale",photos:form.photos||[]}]); closeModal(); };
  const saveReminder = () => { if(!form.title)return; form.id?setReminders((r:any)=>r.map((x:any)=>x.id===form.id?form:x)):setReminders((r:any)=>[...r,{...form,id:Date.now(),done:false}]); closeModal(); };
  const saveContract = () => { if(!form.contractNo)return; form.id?setContracts((c:any)=>c.map((x:any)=>x.id===form.id?form:x)):setContracts((c:any)=>[...c,{...form,id:Date.now()}]); closeModal(); };

  const filteredCustomers = customers.filter((c:any)=>(filterType==="all"||c.type===filterType)&&(c.name.includes(search)||c.phone.includes(search)));
  const filteredProperties = properties.filter((p:any)=>(filterType==="all"||p.status===filterType)&&(p.title.includes(search)||p.address.includes(search)));
  const filteredReminders = reminders.filter((r:any)=>filterType==="all"||(filterType==="pending"&&!r.done)||(filterType==="done"&&r.done));
  const filteredContracts = contracts.filter((c:any)=>(filterType==="all"||c.status===filterType)&&(c.contractNo.includes(search)||(c.note||"").includes(search)));

  const s:any = {
    app:{ fontFamily:lang==="fa"?"'Vazirmatn',Tahoma,sans-serif":"system-ui,sans-serif", minHeight:"100vh", background:th.bg, direction:t.dir, color:th.text, transition:"background 0.3s,color 0.3s" },
    sidebar:{ width:220, background:th.sidebar, color:"#fff", display:"flex", flexDirection:"column", padding:"24px 0", minHeight:"100vh", flexShrink:0 },
    logo:{ padding:"0 20px 24px", fontSize:18, fontWeight:800, borderBottom:"1px solid rgba(255,255,255,0.12)", marginBottom:16 },
    nav:(a:boolean)=>({ padding:"10px 20px", cursor:"pointer", borderRadius:10, margin:"2px 10px", background:a?"rgba(255,255,255,0.18)":"transparent", fontWeight:a?700:400, display:"flex", alignItems:"center", gap:10, transition:"all .2s", fontSize:13, color:"#fff" }),
    main:{ flex:1, padding:24, overflow:"auto", maxHeight:"100vh" },
    card:{ background:th.card, borderRadius:14, padding:20, boxShadow:dark?"0 1px 8px rgba(0,0,0,0.3)":"0 1px 8px rgba(0,0,0,0.07)", marginBottom:16, transition:"background 0.3s" },
    stat:(c:string)=>({ background:`linear-gradient(135deg,${c},${c}cc)`, borderRadius:14, padding:20, color:"#fff", flex:1, minWidth:120 }),
    btn:(c="#2563eb",tx="#fff")=>({ background:c, color:tx, border:"none", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }),
    badge:(c:string)=>({ background:c+"22", color:c, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700, display:"inline-block" }),
    input:{ border:`1px solid ${th.border}`, borderRadius:8, padding:"9px 12px", fontSize:14, width:"100%", boxSizing:"border-box", outline:"none", background:th.input, color:th.inputText, transition:"background 0.3s" },
    th:{ padding:"10px 14px", background:th.hover, fontWeight:700, fontSize:12, color:th.subtext, borderBottom:`1px solid ${th.border}`, textAlign:lang==="fa"?"right":"left" },
    td:{ padding:"11px 14px", borderBottom:`1px solid ${th.hover}`, fontSize:13, verticalAlign:"middle", color:th.text },
    overlay:{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:16 },
    modal:{ background:th.card, borderRadius:18, padding:28, width:520, maxWidth:"95vw", maxHeight:"88vh", overflowY:"auto", direction:t.dir, color:th.text },
  };

  const navTo = (id:string) => { setTab(id); setSearch(""); setFilterType("all"); setReportTab("overview"); setShowNotif(false); };

  // LOGIN
  if (!user) return (
    <div style={{...s.app, display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:dark?"linear-gradient(135deg,#020817,#0f2444)":"linear-gradient(135deg,#0f2444,#1d4ed8)"}}>
      <div style={{background:th.card, borderRadius:20, padding:40, width:360, maxWidth:"95vw", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", direction:t.dir, color:th.text}}>
        <div style={{textAlign:"center", marginBottom:28}}>
          <div style={{fontSize:48, marginBottom:8}}>🏠</div>
          <h2 style={{margin:0, fontSize:22}}>{t.adminPanel}</h2>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          <input style={s.input} placeholder={t.username} value={loginForm.username} onChange={e=>setLoginForm(f=>({...f,username:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
          <input style={s.input} type="password" placeholder={t.password} value={loginForm.password} onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
          {loginError && <div style={{background:"#fee2e2", color:"#ef4444", borderRadius:8, padding:"8px 12px", fontSize:13}}>{loginError}</div>}
          <button style={{...s.btn(), padding:"12px", fontSize:15, borderRadius:10}} onClick={handleLogin}>{t.loginBtn}</button>
        </div>
        <p style={{textAlign:"center", color:th.subtext, fontSize:12, marginTop:20}}>admin / 1234 &nbsp;|&nbsp; agent / agent</p>
        <div style={{display:"flex", justifyContent:"center", gap:8, marginTop:8}}>
          <button style={{background:"none", border:`1px solid ${th.border}`, borderRadius:8, padding:"6px 16px", cursor:"pointer", fontSize:13, color:th.subtext}} onClick={()=>setLang(l=>l==="fa"?"en":"fa")}>{t.lang}</button>
          <button style={{background:"none", border:`1px solid ${th.border}`, borderRadius:8, padding:"6px 16px", cursor:"pointer", fontSize:13, color:th.subtext}} onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{...s.app, display:"flex"}}>
      {/* SIDEBAR */}
      <div style={s.sidebar}>
        <div style={s.logo}>🏠 {lang==="fa"?"CRM املاک":"Estate CRM"}</div>
        <div style={{padding:"0 10px 16px", borderBottom:"1px solid rgba(255,255,255,0.1)", marginBottom:12}}>
          <div style={{width:44, height:44, borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(255,255,255,0.3)", margin:"0 10px 8px", background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center"}}>
            {profilePhoto ? <img src={profilePhoto} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} /> : <span style={{fontSize:22}}>👤</span>}
          </div>
          <div style={{fontSize:12, opacity:.7, padding:"0 10px"}}>{user.role}</div>
          <div style={{fontWeight:700, padding:"2px 10px"}}>{user.username}</div>
        </div>
        {[["dashboard","📊",t.dashboard],["customers","👥",t.customers],["properties","🏢",t.properties],["contracts","📄",t.contracts],["calendar","📅",t.calendar],["reports","📈",t.reports],["profile","👤",t.profile]].map(([id,icon,label])=>(
          <div key={id} style={s.nav(tab===id)} onClick={()=>navTo(id)}>{icon} {label}</div>
        ))}
        <div style={{flex:1}} />
        <div style={{padding:"0 10px", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:12, display:"flex", flexDirection:"column", gap:6}}>
          <div style={s.nav(false)} onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"} {dark?t.lightMode:t.darkMode}</div>
          <div style={s.nav(false)} onClick={()=>setLang(l=>l==="fa"?"en":"fa")}>🌐 {t.lang}</div>
          <div style={s.nav(false)} onClick={()=>setUser(null)}>🚪 {t.logout}</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={s.main}>
        {/* HEADER */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, position:"relative"}}>
          <h2 style={{margin:0}}>
            {tab==="dashboard"?"📊 "+t.dashboard:tab==="customers"?"👥 "+t.customers:tab==="properties"?"🏢 "+t.properties:tab==="contracts"?"📄 "+t.contracts:tab==="calendar"?"📅 "+t.calendar:tab==="profile"?"👤 "+t.profile:"📈 "+t.reports}
          </h2>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowNotif(n=>!n)} style={{background:"none", border:`1px solid ${th.border}`, borderRadius:10, padding:"8px 14px", cursor:"pointer", fontSize:18, position:"relative", color:th.text}}>
              🔔
              {todayReminders.length>0 && <span style={{position:"absolute", top:-6, right:-6, background:"#ef4444", color:"#fff", borderRadius:"50%", width:18, height:18, fontSize:11, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center"}}>{todayReminders.length}</span>}
            </button>
            {showNotif && (
              <div style={{position:"absolute", top:44, ...(lang==="fa"?{left:0}:{right:0}), background:th.card, border:`1px solid ${th.border}`, borderRadius:14, boxShadow:"0 8px 32px rgba(0,0,0,0.15)", width:300, zIndex:50, overflow:"hidden"}}>
                <div style={{padding:"12px 16px", borderBottom:`1px solid ${th.border}`, fontWeight:700, fontSize:13}}>🔔 {lang==="fa"?"یادآوری‌های امروز":"Today's Reminders"} ({todayReminders.length})</div>
                {todayReminders.length===0
                  ? <div style={{padding:20, textAlign:"center", color:th.subtext, fontSize:13}}>{t.noData}</div>
                  : todayReminders.map((r:any)=>(
                    <div key={r.id} style={{padding:"11px 16px", borderBottom:`1px solid ${th.hover}`, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13, fontWeight:600}}>{r.title}</div>
                        <div style={{fontSize:11, color:th.subtext, marginTop:2}}>🕐 {r.time}</div>
                      </div>
                      <span style={s.badge(prioColor[r.priority]||"#f59e0b")}>{t[r.priority]}</span>
                    </div>
                  ))
                }
                <div style={{padding:"10px 16px"}}>
                  <button style={{...s.btn(), width:"100%", borderRadius:8}} onClick={()=>navTo("calendar")}>{lang==="fa"?"مشاهده همه":"View All"}</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DASHBOARD */}
        {tab==="dashboard" && <>
          <div style={{display:"flex", gap:14, marginBottom:20, flexWrap:"wrap"}}>
            <div style={s.stat("#2563eb")}><div style={{fontSize:34, fontWeight:800}}>{customers.length}</div><div style={{opacity:.85, fontSize:12, marginTop:4}}>{t.totalCustomers}</div></div>
            <div style={s.stat("#10b981")}><div style={{fontSize:34, fontWeight:800}}>{properties.length}</div><div style={{opacity:.85, fontSize:12, marginTop:4}}>{t.totalProperties}</div></div>
            <div style={s.stat("#f59e0b")}><div style={{fontSize:34, fontWeight:800}}>{todayReminders.length}</div><div style={{opacity:.85, fontSize:12, marginTop:4}}>{t.pendingReminders}</div></div>
            <div style={s.stat("#8b5cf6")}><div style={{fontSize:34, fontWeight:800}}>{activeContracts}</div><div style={{opacity:.85, fontSize:12, marginTop:4}}>{t.activeContracts}</div></div>
            <div style={s.stat("#ef4444")}><div style={{fontSize:22, fontWeight:800}}>{fmt(totalCommission)}</div><div style={{opacity:.85, fontSize:12, marginTop:4}}>{t.totalCommission}</div></div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16}}>
            <div style={s.card}>
              <h3 style={{margin:"0 0 16px", fontSize:14}}>🏠 {t.byStatus}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={propByStatus}>
                  <XAxis dataKey="label" tick={{fontSize:11, fill:th.subtext}} />
                  <YAxis tick={{fontSize:11, fill:th.subtext}} />
                  <Tooltip contentStyle={{background:th.card, border:`1px solid ${th.border}`, borderRadius:8, color:th.text}} />
                  <Bar dataKey="count" radius={[6,6,0,0]}>
                    {propByStatus.map((e,i)=><Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={s.card}>
              <h3 style={{margin:"0 0 16px", fontSize:14}}>👥 {t.customerReport}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={custByType} dataKey="count" nameKey="label" cx="50%" cy="50%" outerRadius={70}>
                    {custByType.map((e,i)=><Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{background:th.card, border:`1px solid ${th.border}`, borderRadius:8, color:th.text}} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
            <div style={s.card}>
              <h3 style={{margin:"0 0 14px", fontSize:15}}>🔔 {t.recentActivity}</h3>
              {reminders.slice(0,5).map((r:any)=>(
                <div key={r.id} style={{display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${th.hover}`}}>
                  <span style={{fontSize:13}}>{r.done?"✅":"🔔"} {r.title}</span>
                  <span style={{fontSize:11, color:th.subtext}}>{r.time}</span>
                </div>
              ))}
            </div>
            <div style={s.card}>
              <h3 style={{margin:"0 0 14px", fontSize:15}}>📄 {t.contracts}</h3>
              {contracts.slice(0,4).map((c:any)=>(
                <div key={c.id} style={{display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${th.hover}`}}>
                  <span style={{fontSize:13}}>{c.contractNo}</span>
                  <span style={s.badge(contractStatusColor[c.status])}>{t[c.status]}</span>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* CUSTOMERS */}
        {tab==="customers" && <>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10}}>
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <input style={{...s.input, width:170}} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              <select style={{...s.input, width:120}} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                {["buyer","seller","tenant","landlord"].map(v=><option key={v} value={v}>{t[v]}</option>)}
              </select>
              <button style={s.btn()} onClick={()=>openModal("customer")}>+ {t.addCustomer}</button>
            </div>
          </div>
          <div style={s.card}>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead><tr>{[t.name,t.phone,t.email,t.type,t.note,""].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {filteredCustomers.length===0&&<tr><td colSpan={6} style={{...s.td, textAlign:"center", color:th.subtext, padding:30}}>{t.noData}</td></tr>}
                {filteredCustomers.map((c:any)=>(
                  <tr key={c.id}>
                    <td style={s.td}><b>{c.name}</b></td>
                    <td style={s.td}>{c.phone}</td>
                    <td style={{...s.td, color:th.subtext}}>{c.email||"—"}</td>
                    <td style={s.td}><span style={s.badge(typeColor[c.type]||"#64748b")}>{t[c.type]}</span></td>
                    <td style={{...s.td, color:th.subtext, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{c.note}</td>
                    <td style={s.td}><div style={{display:"flex", gap:6}}>
                      <button style={s.btn(dark?"#334155":"#f1f5f9", dark?"#f1f5f9":"#374151")} onClick={()=>openModal("customer",{...c})}>{t.edit}</button>
                      <button style={s.btn("#fee2e2","#ef4444")} onClick={()=>setCustomers((cs:any)=>cs.filter((x:any)=>x.id!==c.id))}>{t.delete}</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}

        {/* PROPERTIES */}
        {tab==="properties" && <>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10}}>
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <input style={{...s.input, width:170}} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              <select style={{...s.input, width:120}} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                {["forSale","forRent","sold","rented"].map(v=><option key={v} value={v}>{t[v]}</option>)}
              </select>
              <button style={s.btn()} onClick={()=>openModal("property")}>+ {t.addProperty}</button>
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16}}>
            {filteredProperties.length===0&&<div style={{color:th.subtext, padding:20}}>{t.noData}</div>}
            {filteredProperties.map((p:any)=>{
              const linked:any = customers.find((c:any)=>c.id===Number(p.linkedCustomer));
              return (
                <div key={p.id} style={{...s.card, padding:0, overflow:"hidden"}}>
                  <div style={{height:160, background:dark?"#334155":"#f1f5f9", overflow:"hidden", position:"relative", cursor:"pointer"}} onClick={()=>p.photos&&p.photos[0]&&setPhotoPreview(p.photos[0])}>
                    {p.photos&&p.photos[0]?<img src={p.photos[0]} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />:<div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", color:th.subtext}}><span style={{fontSize:40}}>🏠</span></div>}
                    <div style={{position:"absolute", top:8, left:8}}><span style={s.badge(statusColor[p.status])}>{t[p.status]}</span></div>
                  </div>
                  <div style={{padding:14}}>
                    <div style={{fontWeight:700, fontSize:14, marginBottom:4}}>{p.title}</div>
                    <div style={{color:th.subtext, fontSize:12, marginBottom:6}}>📍 {p.address}</div>
                    <div style={{display:"flex", gap:8, fontSize:12, marginBottom:8, flexWrap:"wrap"}}>
                      <span>💰 {fmt(p.price)}</span><span>📐 {p.area}{t.sqm}</span><span>🛏 {p.rooms}</span>
                    </div>
                    {linked&&<div style={{fontSize:12, color:th.subtext, marginBottom:8}}>👤 {linked.name}</div>}
                    <div style={{display:"flex", gap:8}}>
                      <button style={{...s.btn(dark?"#334155":"#f1f5f9", dark?"#f1f5f9":"#374151"), flex:1}} onClick={()=>openModal("property",{...p})}>{t.edit}</button>
                      <button style={{...s.btn("#fee2e2","#ef4444"), flex:1}} onClick={()=>setProperties((ps:any)=>ps.filter((x:any)=>x.id!==p.id))}>{t.delete}</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>}

        {/* CONTRACTS */}
        {tab==="contracts" && <>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10}}>
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <input style={{...s.input, width:170}} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              <select style={{...s.input, width:130}} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                {["active","pending","expired","cancelled"].map(v=><option key={v} value={v}>{t[v]}</option>)}
              </select>
              <button style={s.btn()} onClick={()=>openModal("contract",{contractDate:today,startDate:today,status:"active",contractType:"saleContract"})}>+ {t.addContract}</button>
            </div>
          </div>
          <div style={s.card}>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead><tr>{[t.contractNo,t.contractType,t.contractDate,t.party1,t.party2,t.linkedProperty,t.commission,t.contractStatus,""].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {filteredContracts.length===0&&<tr><td colSpan={9} style={{...s.td, textAlign:"center", color:th.subtext, padding:30}}>{t.noData}</td></tr>}
                {filteredContracts.map((c:any)=>{
                  const p1:any=customers.find((x:any)=>x.id===Number(c.party1));
                  const p2:any=customers.find((x:any)=>x.id===Number(c.party2));
                  const prop:any=properties.find((x:any)=>x.id===Number(c.linkedProperty));
                  return (
                    <tr key={c.id}>
                      <td style={{...s.td, fontWeight:700}}>{c.contractNo}</td>
                      <td style={s.td}><span style={s.badge("#6366f1")}>{t[c.contractType]}</span></td>
                      <td style={{...s.td, fontSize:12}}>{c.contractDate}</td>
                      <td style={s.td}>{p1?.name||"—"}</td>
                      <td style={s.td}>{p2?.name||"—"}</td>
                      <td style={{...s.td, fontSize:12}}>{prop?.title||"—"}</td>
                      <td style={{...s.td, color:"#10b981", fontWeight:600}}>{fmt(c.commission)}</td>
                      <td style={s.td}><span style={s.badge(contractStatusColor[c.status])}>{t[c.status]}</span></td>
                      <td style={s.td}><div style={{display:"flex", gap:6}}>
                        <button style={s.btn(dark?"#334155":"#f1f5f9", dark?"#f1f5f9":"#374151")} onClick={()=>openModal("contract",{...c})}>{t.edit}</button>
                        <button style={s.btn("#fee2e2","#ef4444")} onClick={()=>setContracts((cs:any)=>cs.filter((x:any)=>x.id!==c.id))}>{t.delete}</button>
                      </div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{display:"flex", gap:14, flexWrap:"wrap"}}>
            <div style={s.stat("#10b981")}><div style={{fontSize:28, fontWeight:800}}>{activeContracts}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.activeContracts}</div></div>
            <div style={s.stat("#2563eb")}><div style={{fontSize:22, fontWeight:800}}>{fmt(totalCommission)}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.totalCommission}</div></div>
            <div style={s.stat("#8b5cf6")}><div style={{fontSize:28, fontWeight:800}}>{contracts.length}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.totalContracts}</div></div>
          </div>
        </>}

        {/* CALENDAR */}
        {tab==="calendar" && <>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10}}>
            <div style={{display:"flex", gap:8}}>
              <select style={{...s.input, width:140}} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                <option value="pending">{lang==="fa"?"در انتظار":"Pending"}</option>
                <option value="done">{lang==="fa"?"انجام شده":"Done"}</option>
              </select>
              <button style={s.btn()} onClick={()=>openModal("reminder",{date:today,time:"09:00",priority:"medium"})}>+ {t.addReminder}</button>
            </div>
          </div>
          <div style={s.card}>
            {filteredReminders.length===0&&<div style={{color:th.subtext, textAlign:"center", padding:30}}>{t.noData}</div>}
            {filteredReminders.sort((a:any,b:any)=>a.date>b.date?1:-1).map((r:any)=>(
              <div key={r.id} style={{display:"flex", alignItems:"center", gap:12, padding:"13px 0", borderBottom:`1px solid ${th.hover}`, opacity:r.done?.6:1}}>
                <input type="checkbox" checked={r.done} onChange={()=>setReminders((rs:any)=>rs.map((x:any)=>x.id===r.id?{...x,done:!x.done}:x))} style={{width:18, height:18, cursor:"pointer", accentColor:"#2563eb"}} />
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, fontSize:14, textDecoration:r.done?"line-through":"none", display:"flex", alignItems:"center", gap:8}}>
                    {r.title}<span style={s.badge(prioColor[r.priority]||"#f59e0b")}>{t[r.priority]}</span>
                  </div>
                  <div style={{fontSize:12, color:th.subtext, marginTop:3}}>📅 {r.date} &nbsp; 🕐 {r.time}</div>
                </div>
                <div style={{display:"flex", gap:6}}>
                  <button style={s.btn(dark?"#334155":"#f1f5f9", dark?"#f1f5f9":"#374151")} onClick={()=>openModal("reminder",{...r})}>{t.edit}</button>
                  <button style={s.btn("#fee2e2","#ef4444")} onClick={()=>setReminders((rs:any)=>rs.filter((x:any)=>x.id!==r.id))}>{t.delete}</button>
                </div>
              </div>
            ))}
          </div>
        </>}

        {/* REPORTS */}
        {tab==="reports" && <>
          <div style={{display:"flex", gap:8, marginBottom:20, flexWrap:"wrap"}}>
            {[["overview",t.overview],["properties",t.propertyReport],["customers",t.customerReport],["contracts",t.contracts]].map(([id,label])=>(
              <button key={id} style={{...s.btn(reportTab===id?"#2563eb":dark?"#334155":"#f1f5f9", reportTab===id?"#fff":th.text), borderRadius:10}} onClick={()=>setReportTab(id)}>{label}</button>
            ))}
          </div>
          {reportTab==="overview" && <>
            <div style={{display:"flex", gap:14, marginBottom:20, flexWrap:"wrap"}}>
              <div style={s.stat("#2563eb")}><div style={{fontSize:28, fontWeight:800}}>{customers.length}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.totalCustomers}</div></div>
              <div style={s.stat("#10b981")}><div style={{fontSize:28, fontWeight:800}}>{properties.length}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.totalProperties}</div></div>
              <div style={s.stat("#8b5cf6")}><div style={{fontSize:28, fontWeight:800}}>{contracts.length}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.totalContracts}</div></div>
              <div style={s.stat("#ef4444")}><div style={{fontSize:20, fontWeight:800}}>{fmt(totalCommission)}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{t.totalCommission}</div></div>
              <div style={s.stat("#f59e0b")}><div style={{fontSize:20, fontWeight:800}}>{fmt(totalSaleValue)}</div><div style={{fontSize:12, opacity:.85, marginTop:4}}>{lang==="fa"?"ارزش کل فروش":"Total Sale Value"}</div></div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
              <div style={s.card}>
                <h3 style={{margin:"0 0 14px", fontSize:14}}>🏠 {t.byStatus}</h3>
                {propByStatus.map(x=>(
                  <div key={x.label} style={{marginBottom:10}}>
                    <div style={{display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4}}><span>{x.label}</span><b>{x.count}</b></div>
                    <div style={{height:8, background:dark?"#334155":"#f1f5f9", borderRadius:4, overflow:"hidden"}}>
                      <div style={{height:"100%", width:`${properties.length?x.count/properties.length*100:0}%`, background:x.color, borderRadius:4, transition:"width .4s"}} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <h3 style={{margin:"0 0 14px", fontSize:14}}>👥 {t.customerReport}</h3>
                {custByType.map(x=>(
                  <div key={x.label} style={{marginBottom:10}}>
                    <div style={{display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4}}><span>{x.label}</span><b>{x.count}</b></div>
                    <div style={{height:8, background:dark?"#334155":"#f1f5f9", borderRadius:4, overflow:"hidden"}}>
                      <div style={{height:"100%", width:`${customers.length?x.count/customers.length*100:0}%`, background:x.color, borderRadius:4, transition:"width .4s"}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>}
          {reportTab==="properties" && <div style={s.card}>
            <div style={{display:"flex", gap:16, flexWrap:"wrap", marginBottom:20}}>
              {propByType.map(x=>(
                <div key={x.label} style={{textAlign:"center", background:dark?"#334155":"#f8fafc", borderRadius:12, padding:"16px 24px"}}>
                  <div style={{fontSize:28, fontWeight:800, color:"#2563eb"}}>{x.count}</div>
                  <div style={{fontSize:12, color:th.subtext, marginTop:4}}>{x.label}</div>
                </div>
              ))}
            </div>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead><tr>{[t.title,t.type,t.status,t.price,t.area].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>{properties.map((p:any)=>(
                <tr key={p.id}>
                  <td style={s.td}>{p.title}</td><td style={s.td}>{t[p.type]}</td>
                  <td style={s.td}><span style={s.badge(statusColor[p.status])}>{t[p.status]}</span></td>
                  <td style={{...s.td, color:"#10b981", fontWeight:600}}>{fmt(p.price)}</td>
                  <td style={s.td}>{p.area} {t.sqm}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>}
          {reportTab==="customers" && <div style={s.card}>
            <div style={{display:"flex", gap:16, flexWrap:"wrap", marginBottom:20}}>
              {custByType.map(x=>(
                <div key={x.label} style={{textAlign:"center", background:dark?"#334155":"#f8fafc", borderRadius:12, padding:"16px 24px"}}>
                  <div style={{fontSize:28, fontWeight:800, color:x.color}}>{x.count}</div>
                  <div style={{fontSize:12, color:th.subtext, marginTop:4}}>{x.label}</div>
                </div>
              ))}
            </div>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead><tr>{[t.name,t.phone,t.type,t.note].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>{customers.map((c:any)=>(
                <tr key={c.id}>
                  <td style={s.td}><b>{c.name}</b></td><td style={s.td}>{c.phone}</td>
                  <td style={s.td}><span style={s.badge(typeColor[c.type])}>{t[c.type]}</span></td>
                  <td style={{...s.td, color:th.subtext, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{c.note}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>}
          {reportTab==="contracts" && <div style={s.card}>
            <div style={{display:"flex", gap:16, flexWrap:"wrap", marginBottom:20}}>
              {contractByType.map(x=>(
                <div key={x.label} style={{textAlign:"center", background:dark?"#334155":"#f8fafc", borderRadius:12, padding:"16px 24px"}}>
                  <div style={{fontSize:28, fontWeight:800, color:"#6366f1"}}>{x.count}</div>
                  <div style={{fontSize:12, color:th.subtext, marginTop:4}}>{x.label}</div>
                </div>
              ))}
              <div style={{textAlign:"center", background:dark?"#064e3b":"#f0fdf4", borderRadius:12, padding:"16px 24px"}}>
                <div style={{fontSize:20, fontWeight:800, color:"#10b981"}}>{fmt(totalCommission)}</div>
                <div style={{fontSize:12, color:th.subtext, marginTop:4}}>{t.totalCommission}</div>
              </div>
            </div>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead><tr>{[t.contractNo,t.contractType,t.contractDate,t.commission,t.contractStatus].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>{contracts.map((c:any)=>(
                <tr key={c.id}>
                  <td style={{...s.td, fontWeight:700}}>{c.contractNo}</td>
                  <td style={s.td}>{t[c.contractType]}</td>
                  <td style={s.td}>{c.contractDate}</td>
                  <td style={{...s.td, color:"#10b981", fontWeight:600}}>{fmt(c.commission)}</td>
                  <td style={s.td}><span style={s.badge(contractStatusColor[c.status])}>{t[c.status]}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>}
        </>}

        {/* PROFILE */}
        {tab==="profile" && <>
          <div style={{maxWidth:600, margin:"0 auto"}}>
            <div style={s.card}>
              <div style={{display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 0", borderBottom:`1px solid ${th.border}`, marginBottom:24}}>
                <div style={{position:"relative", marginBottom:16}}>
                  <div style={{width:110, height:110, borderRadius:"50%", overflow:"hidden", border:"3px solid #2563eb", background:dark?"#334155":"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {profilePhoto?<img src={profilePhoto} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />:<span style={{fontSize:48}}>👤</span>}
                  </div>
                  <button onClick={()=>profileFileRef.current?.click()} style={{position:"absolute", bottom:0, right:0, background:"#2563eb", color:"#fff", border:"none", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center"}}>📷</button>
                </div>
                <input ref={profileFileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleProfilePhoto} />
                <div style={{fontWeight:800, fontSize:20}}>{user.username}</div>
                <div style={{color:th.subtext, fontSize:14, marginTop:4}}>{user.role}</div>
                {profilePhoto&&<button style={{...s.btn("#fee2e2","#ef4444"), marginTop:12, fontSize:12}} onClick={()=>setProfilePhoto("")}>{lang==="fa"?"حذف عکس":"Remove Photo"}</button>}
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:14}}>
                <div>
                  <label style={{fontSize:12, color:th.subtext, fontWeight:600}}>{lang==="fa"?"نام و نام خانوادگی":"Full Name"}</label>
                  <input style={{...s.input, marginTop:6}} value={profileForm.name} onChange={e=>setProfileForm(f=>({...f,name:e.target.value}))} placeholder={lang==="fa"?"نام خود را وارد کنید":"Enter your name"} />
                </div>
                <div>
                  <label style={{fontSize:12, color:th.subtext, fontWeight:600}}>{t.phone}</label>
                  <input style={{...s.input, marginTop:6}} value={profileForm.phone} onChange={e=>setProfileForm(f=>({...f,phone:e.target.value}))} placeholder={lang==="fa"?"شماره تماس":"Phone number"} />
                </div>
                <div>
                  <label style={{fontSize:12, color:th.subtext, fontWeight:600}}>{t.email}</label>
                  <input style={{...s.input, marginTop:6}} value={profileForm.email} onChange={e=>setProfileForm(f=>({...f,email:e.target.value}))} placeholder={lang==="fa"?"ایمیل":"Email address"} />
                </div>
                <div>
                  <label style={{fontSize:12, color:th.subtext, fontWeight:600}}>{lang==="fa"?"درباره من":"About Me"}</label>
                  <textarea style={{...s.input, marginTop:6, height:80, resize:"vertical"}} value={profileForm.bio} onChange={e=>setProfileForm(f=>({...f,bio:e.target.value}))} placeholder={lang==="fa"?"توضیح کوتاه...":"A short bio..."} />
                </div>
                <button style={{...s.btn(), padding:"11px", borderRadius:10, fontSize:14}} onClick={()=>alert(lang==="fa"?"پروفایل ذخیره شد ✅":"Profile saved ✅")}>💾 {t.save}</button>
              </div>
            </div>
            <div style={s.card}>
              <h3 style={{margin:"0 0 16px", fontSize:14}}>{lang==="fa"?"آمار فعالیت":"Activity Stats"}</h3>
              <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
                {[{label:t.totalCustomers,value:customers.length,color:"#2563eb"},{label:t.totalProperties,value:properties.length,color:"#10b981"},{label:t.totalContracts,value:contracts.length,color:"#8b5cf6"},{label:lang==="fa"?"یادآوری‌ها":"Reminders",value:reminders.length,color:"#f59e0b"}].map(x=>(
                  <div key={x.label} style={{flex:1, minWidth:100, textAlign:"center", background:dark?"#334155":"#f8fafc", borderRadius:12, padding:"14px 10px"}}>
                    <div style={{fontSize:26, fontWeight:800, color:x.color}}>{x.value}</div>
                    <div style={{fontSize:11, color:th.subtext, marginTop:4}}>{x.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>}
      </div>

      {photoPreview&&<div style={{...s.overlay, zIndex:200}} onClick={()=>setPhotoPreview(null)}><img src={photoPreview} alt="" style={{maxWidth:"90vw", maxHeight:"85vh", borderRadius:12}} /></div>}

      {modal==="customer"&&<div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{margin:"0 0 20px"}}>{form.id?t.edit:t.addCustomer}</h3>
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <input style={s.input} placeholder={t.name+" *"} value={form.name||""} onChange={e=>setForm((f:any)=>({...f,name:e.target.value}))} />
          <input style={s.input} placeholder={t.phone} value={form.phone||""} onChange={e=>setForm((f:any)=>({...f,phone:e.target.value}))} />
          <input style={s.input} placeholder={t.email} value={form.email||""} onChange={e=>setForm((f:any)=>({...f,email:e.target.value}))} />
          <select style={s.input} value={form.type||"buyer"} onChange={e=>setForm((f:any)=>({...f,type:e.target.value}))}>
            {["buyer","seller","tenant","landlord"].map(v=><option key={v} value={v}>{t[v]}</option>)}
          </select>
          <textarea style={{...s.input, height:80, resize:"vertical"}} placeholder={t.note} value={form.note||""} onChange={e=>setForm((f:any)=>({...f,note:e.target.value}))} />
        </div>
        <div style={{display:"flex", gap:10, marginTop:20, justifyContent:"flex-end"}}>
          <button style={s.btn(dark?"#334155":"#e2e8f0", dark?"#f1f5f9":"#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveCustomer}>{t.save}</button>
        </div>
      </div></div>}

      {modal==="property"&&<div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{margin:"0 0 20px"}}>{form.id?t.edit:t.addProperty}</h3>
        <div style={{display:"flex", flexDirection:"column", gap:11}}>
          <input style={s.input} placeholder={t.title+" *"} value={form.title||""} onChange={e=>setForm((f:any)=>({...f,title:e.target.value}))} />
          <input style={s.input} placeholder={t.address} value={form.address||""} onChange={e=>setForm((f:any)=>({...f,address:e.target.value}))} />
          <div style={{display:"flex", gap:10}}>
            <input style={s.input} placeholder={t.price} value={form.price||""} onChange={e=>setForm((f:any)=>({...f,price:e.target.value}))} />
            <input style={s.input} placeholder={t.area} value={form.area||""} onChange={e=>setForm((f:any)=>({...f,area:e.target.value}))} />
          </div>
          <div style={{display:"flex", gap:10}}>
            <input style={s.input} placeholder={t.rooms} value={form.rooms||""} onChange={e=>setForm((f:any)=>({...f,rooms:e.target.value}))} />
            <input style={s.input} placeholder={t.floor} value={form.floor||""} onChange={e=>setForm((f:any)=>({...f,floor:e.target.value}))} />
          </div>
          <div style={{display:"flex", gap:10}}>
            <select style={s.input} value={form.type||"apartment"} onChange={e=>setForm((f:any)=>({...f,type:e.target.value}))}>
              {["apartment","villa","office","land"].map(v=><option key={v} value={v}>{t[v]}</option>)}
            </select>
            <select style={s.input} value={form.status||"forSale"} onChange={e=>setForm((f:any)=>({...f,status:e.target.value}))}>
              {["forSale","forRent","sold","rented"].map(v=><option key={v} value={v}>{t[v]}</option>)}
            </select>
          </div>
          <div style={{display:"flex", gap:14}}>
            {["parking","elevator","storage"].map(f2=>(
              <label key={f2} style={{display:"flex", alignItems:"center", gap:6, fontSize:13, cursor:"pointer"}}>
                <input type="checkbox" checked={form[f2]==="yes"} onChange={e=>setForm((f:any)=>({...f,[f2]:e.target.checked?"yes":"no"}))} />
                {t[f2]}
              </label>
            ))}
          </div>
          <select style={s.input} value={form.linkedCustomer||""} onChange={e=>setForm((f:any)=>({...f,linkedCustomer:e.target.value}))}>
            <option value="">— {t.linkedCustomer} —</option>
            {customers.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <textarea style={{...s.input, height:60, resize:"vertical"}} placeholder={t.description} value={form.description||""} onChange={e=>setForm((f:any)=>({...f,description:e.target.value}))} />
          <button style={{...s.btn(dark?"#334155":"#f1f5f9", dark?"#f1f5f9":"#374151"), padding:10}} onClick={()=>fileRef.current?.click()}>📷 {t.uploadPhoto}</button>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handlePhotoUpload} />
          {form.photos&&form.photos.length>0&&<div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {form.photos.map((ph:string,i:number)=>(
              <div key={i} style={{position:"relative"}}>
                <img src={ph} alt="" style={{width:65, height:65, objectFit:"cover", borderRadius:8, border:`2px solid ${th.border}`}} />
                <button onClick={()=>setForm((f:any)=>({...f,photos:f.photos.filter((_:any,j:number)=>j!==i)}))} style={{position:"absolute", top:-6, right:-6, background:"#ef4444", color:"#fff", border:"none", borderRadius:"50%", width:20, height:20, cursor:"pointer", fontSize:11}}>✕</button>
              </div>
            ))}
          </div>}
        </div>
        <div style={{display:"flex", gap:10, marginTop:20, justifyContent:"flex-end"}}>
          <button style={s.btn(dark?"#334155":"#e2e8f0", dark?"#f1f5f9":"#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveProperty}>{t.save}</button>
        </div>
      </div></div>}

      {modal==="contract"&&<div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{margin:"0 0 20px"}}>{form.id?t.edit:t.addContract}</h3>
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <div style={{display:"flex", gap:10}}>
            <input style={s.input} placeholder={t.contractNo+" *"} value={form.contractNo||""} onChange={e=>setForm((f:any)=>({...f,contractNo:e.target.value}))} />
            <select style={s.input} value={form.contractType||"saleContract"} onChange={e=>setForm((f:any)=>({...f,contractType:e.target.value}))}>
              {["saleContract","rentContract","preContract"].map(v=><option key={v} value={v}>{t[v]}</option>)}
            </select>
          </div>
          <div style={{display:"flex", gap:10}}>
            <div style={{flex:1}}><label style={{fontSize:12, color:th.subtext}}>{t.contractDate}</label><input style={{...s.input, marginTop:4}} type="date" value={form.contractDate||today} onChange={e=>setForm((f:any)=>({...f,contractDate:e.target.value}))} /></div>
            <div style={{flex:1}}><label style={{fontSize:12, color:th.subtext}}>{t.startDate}</label><input style={{...s.input, marginTop:4}} type="date" value={form.startDate||today} onChange={e=>setForm((f:any)=>({...f,startDate:e.target.value}))} /></div>
            <div style={{flex:1}}><label style={{fontSize:12, color:th.subtext}}>{t.endDate}</label><input style={{...s.input, marginTop:4}} type="date" value={form.endDate||""} onChange={e=>setForm((f:any)=>({...f,endDate:e.target.value}))} /></div>
          </div>
          <select style={s.input} value={form.party1||""} onChange={e=>setForm((f:any)=>({...f,party1:e.target.value}))}>
            <option value="">— {t.party1} —</option>
            {customers.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={s.input} value={form.party2||""} onChange={e=>setForm((f:any)=>({...f,party2:e.target.value}))}>
            <option value="">— {t.party2} —</option>
            {customers.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={s.input} value={form.linkedProperty||""} onChange={e=>setForm((f:any)=>({...f,linkedProperty:e.target.value}))}>
            <option value="">— {t.linkedProperty} —</option>
            {properties.map((p:any)=><option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <input style={s.input} placeholder={t.commission} value={form.commission||""} onChange={e=>setForm((f:any)=>({...f,commission:e.target.value}))} />
          <select style={s.input} value={form.status||"active"} onChange={e=>setForm((f:any)=>({...f,status:e.target.value}))}>
            {["active","pending","expired","cancelled"].map(v=><option key={v} value={v}>{t[v]}</option>)}
          </select>
          <textarea style={{...s.input, height:70, resize:"vertical"}} placeholder={t.note} value={form.note||""} onChange={e=>setForm((f:any)=>({...f,note:e.target.value}))} />
        </div>
        <div style={{display:"flex", gap:10, marginTop:20, justifyContent:"flex-end"}}>
          <button style={s.btn(dark?"#334155":"#e2e8f0", dark?"#f1f5f9":"#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveContract}>{t.save}</button>
        </div>
      </div></div>}

      {modal==="reminder"&&<div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{margin:"0 0 20px"}}>{form.id?t.edit:t.addReminder}</h3>
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <input style={s.input} placeholder={t.title+" *"} value={form.title||""} onChange={e=>setForm((f:any)=>({...f,title:e.target.value}))} />
          <div style={{display:"flex", gap:10}}>
            <input style={s.input} type="date" value={form.date||today} onChange={e=>setForm((f:any)=>({...f,date:e.target.value}))} />
            <input style={s.input} type="time" value={form.time||"09:00"} onChange={e=>setForm((f:any)=>({...f,time:e.target.value}))} />
          </div>
          <select style={s.input} value={form.priority||"medium"} onChange={e=>setForm((f:any)=>({...f,priority:e.target.value}))}>
            {["high","medium","low"].map(v=><option key={v} value={v}>{t[v]}</option>)}
          </select>
        </div>
        <div style={{display:"flex", gap:10, marginTop:20, justifyContent:"flex-end"}}>
          <button style={s.btn(dark?"#334155":"#e2e8f0", dark?"#f1f5f9":"#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveReminder}>{t.save}</button>
        </div>
      </div></div>}
    </div>
  );
}