import { useState, useRef } from "react";

const T = {
  fa: {
    dir:"rtl", login:"ورود به سیستم", username:"نام کاربری", password:"رمز عبور", loginBtn:"ورود",
    loginError:"نام کاربری یا رمز عبور اشتباه است", logout:"خروج",
    dashboard:"داشبورد", customers:"مشتریان", properties:"ملک‌ها", calendar:"یادآوری‌ها",
    reports:"گزارشات", contracts:"قراردادها",
    addCustomer:"افزودن مشتری", addProperty:"افزودن ملک", addReminder:"افزودن یادآوری",
    addContract:"افزودن قرارداد",
    name:"نام", phone:"تلفن", email:"ایمیل", type:"نوع", note:"یادداشت", save:"ذخیره", cancel:"لغو",
    edit:"ویرایش", delete:"حذف", search:"جستجو...", filter:"فیلتر", all:"همه",
    buyer:"خریدار", seller:"فروشنده", tenant:"مستأجر", landlord:"موجر",
    forSale:"فروشی", forRent:"اجاری", sold:"فروخته شده", rented:"اجاره داده شده",
    address:"آدرس", price:"قیمت", area:"متراژ", rooms:"اتاق", status:"وضعیت", floor:"طبقه",
    title:"عنوان", date:"تاریخ", time:"ساعت", priority:"اولویت", high:"بالا", medium:"متوسط", low:"پایین",
    totalCustomers:"کل مشتریان", totalProperties:"کل ملک‌ها", pendingReminders:"یادآوری امروز", forSaleCount:"فروشی",
    recentActivity:"یادآوری‌های اخیر", noData:"داده‌ای وجود ندارد",
    apartment:"آپارتمان", villa:"ویلا", office:"دفتر", land:"زمین",
    lang:"EN", currency:"تومان", sqm:"m²",
    uploadPhoto:"آپلود عکس", photos:"عکس‌ها", linkedCustomer:"مشتری مرتبط",
    description:"توضیحات", parking:"پارکینگ", elevator:"آسانسور", storage:"انباری",
    yes:"دارد", no:"ندارد", features:"امکانات",
    welcome:"خوش آمدید", adminPanel:"پنل مدیریت املاک",
    // contracts
    contractNo:"شماره قرارداد", contractType:"نوع قرارداد", contractDate:"تاریخ قرارداد",
    contractStatus:"وضعیت قرارداد", startDate:"تاریخ شروع", endDate:"تاریخ پایان",
    saleContract:"قرارداد فروش", rentContract:"قرارداد اجاره", preContract:"پیش‌قرارداد",
    active:"فعال", expired:"منقضی", pending:"در انتظار", cancelled:"لغو شده",
    party1:"طرف اول (فروشنده/موجر)", party2:"طرف دوم (خریدار/مستأجر)",
    linkedProperty:"ملک مرتبط", commission:"کمیسیون", totalContracts:"کل قراردادها",
    activeContracts:"قراردادهای فعال",
    // reports
    salesReport:"گزارش فروش", rentReport:"گزارش اجاره", customerReport:"گزارش مشتریان",
    propertyReport:"گزارش ملک‌ها", totalSales:"کل فروش", totalRent:"کل اجاره",
    byType:"بر اساس نوع", byStatus:"بر اساس وضعیت", monthlySales:"فروش ماهانه",
    totalCommission:"کل کمیسیون", overview:"نمای کلی",
  },
  en: {
    dir:"ltr", login:"Login", username:"Username", password:"Password", loginBtn:"Sign In",
    loginError:"Invalid username or password", logout:"Logout",
    dashboard:"Dashboard", customers:"Customers", properties:"Properties", calendar:"Reminders",
    reports:"Reports", contracts:"Contracts",
    addCustomer:"Add Customer", addProperty:"Add Property", addReminder:"Add Reminder",
    addContract:"Add Contract",
    name:"Name", phone:"Phone", email:"Email", type:"Type", note:"Note", save:"Save", cancel:"Cancel",
    edit:"Edit", delete:"Delete", search:"Search...", filter:"Filter", all:"All",
    buyer:"Buyer", seller:"Seller", tenant:"Tenant", landlord:"Landlord",
    forSale:"For Sale", forRent:"For Rent", sold:"Sold", rented:"Rented",
    address:"Address", price:"Price", area:"Area", rooms:"Rooms", status:"Status", floor:"Floor",
    title:"Title", date:"Date", time:"Time", priority:"Priority", high:"High", medium:"Medium", low:"Low",
    totalCustomers:"Total Customers", totalProperties:"Total Properties", pendingReminders:"Today's Reminders", forSaleCount:"For Sale",
    recentActivity:"Recent Reminders", noData:"No data available",
    apartment:"Apartment", villa:"Villa", office:"Office", land:"Land",
    lang:"FA", currency:"Toman", sqm:"m²",
    uploadPhoto:"Upload Photo", photos:"Photos", linkedCustomer:"Linked Customer",
    description:"Description", parking:"Parking", elevator:"Elevator", storage:"Storage",
    yes:"Yes", no:"No", features:"Features",
    welcome:"Welcome", adminPanel:"Real Estate Admin Panel",
    contractNo:"Contract No", contractType:"Contract Type", contractDate:"Contract Date",
    contractStatus:"Status", startDate:"Start Date", endDate:"End Date",
    saleContract:"Sale Contract", rentContract:"Rent Contract", preContract:"Pre-Contract",
    active:"Active", expired:"Expired", pending:"Pending", cancelled:"Cancelled",
    party1:"Party 1 (Seller/Landlord)", party2:"Party 2 (Buyer/Tenant)",
    linkedProperty:"Linked Property", commission:"Commission", totalContracts:"Total Contracts",
    activeContracts:"Active Contracts",
    salesReport:"Sales Report", rentReport:"Rent Report", customerReport:"Customer Report",
    propertyReport:"Property Report", totalSales:"Total Sales", totalRent:"Total Rent",
    byType:"By Type", byStatus:"By Status", monthlySales:"Monthly Sales",
    totalCommission:"Total Commission", overview:"Overview",
  }
};

const USERS = [{ username:"admin", password:"1234", role:"مدیر" },{ username:"agent", password:"agent", role:"مشاور" }];

const initCustomers = [
  { id:1, name:"علی رضایی", phone:"09121234567", email:"ali@email.com", type:"buyer", note:"دنبال آپارتمان ۳ خوابه در تهرانپارس، بودجه ۶ میلیارد" },
  { id:2, name:"مریم احمدی", phone:"09351112233", email:"", type:"seller", note:"ملک در تهرانپارس، قیمت قابل مذاکره" },
  { id:3, name:"سعید کریمی", phone:"09201234567", email:"", type:"tenant", note:"دنبال اجاره اداری در ونک" },
];
const initProperties = [
  { id:1, title:"آپارتمان تهرانپارس", address:"تهران، تهرانپارس، خیابان شکوفه", price:"5500000000", area:"120", rooms:"3", floor:"4", type:"apartment", status:"forSale", parking:"yes", elevator:"yes", storage:"yes", description:"آپارتمان نوساز با ویو عالی", linkedCustomer:2, photos:[] },
  { id:2, title:"ویلا لواسان", address:"لواسان، خیابان اصلی", price:"15000000000", area:"300", rooms:"5", floor:"1", type:"villa", status:"forSale", parking:"yes", elevator:"no", storage:"yes", description:"ویلای باغ دار با استخر", linkedCustomer:"", photos:[] },
  { id:3, title:"دفتر ونک", address:"تهران، ونک، خیابان ملاصدرا", price:"8000000", area:"80", rooms:"2", floor:"7", type:"office", status:"forRent", parking:"yes", elevator:"yes", storage:"no", description:"دفتر مناسب شرکت‌های کوچک", linkedCustomer:3, photos:[] },
];
const initReminders = [
  { id:1, title:"بازدید آپارتمان تهرانپارس", date:new Date().toISOString().split("T")[0], time:"10:00", priority:"high", done:false },
  { id:2, title:"تماس با مریم احمدی", date:new Date().toISOString().split("T")[0], time:"14:00", priority:"medium", done:false },
  { id:3, title:"ارسال مدارک به علی رضایی", date:new Date(Date.now()+86400000).toISOString().split("T")[0], time:"09:00", priority:"low", done:false },
];
const initContracts = [
  { id:1, contractNo:"Q-1401-001", contractType:"saleContract", contractDate:"2024-01-15", startDate:"2024-01-15", endDate:"2024-03-15", status:"active", party1:2, party2:1, linkedProperty:1, commission:"55000000", note:"قرارداد فروش آپارتمان تهرانپارس" },
  { id:2, contractNo:"Q-1401-002", contractType:"rentContract", contractDate:"2024-02-01", startDate:"2024-02-01", endDate:"2025-02-01", status:"active", party1:"", party2:3, linkedProperty:3, commission:"8000000", note:"قرارداد اجاره دفتر ونک" },
];

const statusColor = { forSale:"#3b82f6", forRent:"#f59e0b", sold:"#10b981", rented:"#8b5cf6" };
const typeColor = { buyer:"#3b82f6", seller:"#ef4444", tenant:"#f59e0b", landlord:"#10b981" };
const prioColor = { high:"#ef4444", medium:"#f59e0b", low:"#10b981" };
const contractStatusColor = { active:"#10b981", expired:"#ef4444", pending:"#f59e0b", cancelled:"#94a3b8" };

const fmt = (n) => Number(n||0).toLocaleString();

export default function App() {
  const [lang, setLang] = useState("fa");
  const t = T[lang];
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username:"", password:"" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("dashboard");
  const useLS = (key, init) => {
    const [val, setVal] = useState(() => {
      try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
    });
    const set = (v) => { const next = typeof v === "function" ? v(val) : v; setVal(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch {} };
    return [val, set];
  };
  const [customers, setCustomers] = useLS("crm_customers", initCustomers);
  const [properties, setProperties] = useLS("crm_properties", initProperties);
  const [reminders, setReminders] = useLS("crm_reminders", initReminders);
  const [contracts, setContracts] = useLS("crm_contracts", initContracts);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [reportTab, setReportTab] = useState("overview");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileRef = useRef();

  const today = new Date().toISOString().split("T")[0];
  const todayReminders = reminders.filter(r => r.date === today && !r.done);
  const forSaleCount = properties.filter(p => p.status === "forSale").length;
  const activeContracts = contracts.filter(c => c.status === "active").length;
  const totalCommission = contracts.reduce((s,c) => s + Number(c.commission||0), 0);

  const handleLogin = () => {
    const u = USERS.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (u) { setUser(u); setLoginError(""); } else setLoginError(t.loginError);
  };

  const openModal = (type, data = {}) => { setForm({ ...data, photos: data.photos || [] }); setModal(type); setPhotoPreview(null); };
  const closeModal = () => { setModal(null); setForm({}); setPhotoPreview(null); };

  const handlePhotoUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      const r = new FileReader();
      r.onload = (ev) => setForm(f => ({ ...f, photos: [...(f.photos||[]), ev.target.result] }));
      r.readAsDataURL(file);
    });
  };

  const saveCustomer = () => { if (!form.name) return; form.id ? setCustomers(c=>c.map(x=>x.id===form.id?form:x)) : setCustomers(c=>[...c,{...form,id:Date.now()}]); closeModal(); };
  const saveProperty = () => { if (!form.title) return; form.id ? setProperties(p=>p.map(x=>x.id===form.id?form:x)) : setProperties(p=>[...p,{...form,id:Date.now(),status:form.status||"forSale",photos:form.photos||[]}]); closeModal(); };
  const saveReminder = () => { if (!form.title) return; form.id ? setReminders(r=>r.map(x=>x.id===form.id?form:x)) : setReminders(r=>[...r,{...form,id:Date.now(),done:false}]); closeModal(); };
  const saveContract = () => { if (!form.contractNo) return; form.id ? setContracts(c=>c.map(x=>x.id===form.id?form:x)) : setContracts(c=>[...c,{...form,id:Date.now()}]); closeModal(); };

  const filteredCustomers = customers.filter(c => (filterType==="all"||c.type===filterType) && (c.name.includes(search)||c.phone.includes(search)));
  const filteredProperties = properties.filter(p => (filterType==="all"||p.status===filterType) && (p.title.includes(search)||p.address.includes(search)));
  const filteredReminders = reminders.filter(r => filterType==="all"||(filterType==="pending"&&!r.done)||(filterType==="done"&&r.done));
  const filteredContracts = contracts.filter(c => (filterType==="all"||c.status===filterType) && (c.contractNo.includes(search)||(c.note||"").includes(search)));

  // Report data
  const propByType = ["apartment","villa","office","land"].map(tp => ({ label:t[tp], count:properties.filter(p=>p.type===tp).length }));
  const propByStatus = ["forSale","forRent","sold","rented"].map(st => ({ label:t[st], count:properties.filter(p=>p.status===st).length, color:statusColor[st] }));
  const custByType = ["buyer","seller","tenant","landlord"].map(tp => ({ label:t[tp], count:customers.filter(c=>c.type===tp).length, color:typeColor[tp] }));
  const contractByType = ["saleContract","rentContract","preContract"].map(ct => ({ label:t[ct], count:contracts.filter(c=>c.contractType===ct).length }));
  const totalSaleValue = contracts.filter(c=>c.contractType==="saleContract").reduce((s,c)=>{
    const p = properties.find(pr=>pr.id===Number(c.linkedProperty));
    return s + Number(p?.price||0);
  },0);

  const s = {
    app:{ fontFamily:lang==="fa"?"'Vazirmatn',Tahoma,sans-serif":"system-ui,sans-serif", minHeight:"100vh", background:"#f1f5f9", direction:t.dir },
    sidebar:{ width:220, background:"linear-gradient(160deg,#0f2444,#1d4ed8)", color:"#fff", display:"flex", flexDirection:"column", padding:"24px 0", minHeight:"100vh", flexShrink:0 },
    logo:{ padding:"0 20px 24px", fontSize:18, fontWeight:800, borderBottom:"1px solid rgba(255,255,255,0.12)", marginBottom:16 },
    nav:(a)=>({ padding:"10px 20px", cursor:"pointer", borderRadius:10, margin:"2px 10px", background:a?"rgba(255,255,255,0.18)":"transparent", fontWeight:a?700:400, display:"flex", alignItems:"center", gap:10, transition:"all .2s", fontSize:13 }),
    main:{ flex:1, padding:24, overflow:"auto", maxHeight:"100vh" },
    card:{ background:"#fff", borderRadius:14, padding:20, boxShadow:"0 1px 8px rgba(0,0,0,0.07)", marginBottom:16 },
    stat:(c)=>({ background:`linear-gradient(135deg,${c},${c}cc)`, borderRadius:14, padding:20, color:"#fff", flex:1, minWidth:120 }),
    btn:(c="#2563eb",tx="#fff")=>({ background:c, color:tx, border:"none", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }),
    badge:(c)=>({ background:c+"22", color:c, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700, display:"inline-block" }),
    input:{ border:"1px solid #e2e8f0", borderRadius:8, padding:"9px 12px", fontSize:14, width:"100%", boxSizing:"border-box", outline:"none", background:"#fafafa" },
    th:{ padding:"10px 14px", background:"#f8fafc", fontWeight:700, fontSize:12, color:"#64748b", borderBottom:"1px solid #e2e8f0", textAlign:lang==="fa"?"right":"left" },
    td:{ padding:"11px 14px", borderBottom:"1px solid #f8fafc", fontSize:13, verticalAlign:"middle" },
    overlay:{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:16 },
    modal:{ background:"#fff", borderRadius:18, padding:28, width:520, maxWidth:"95vw", maxHeight:"88vh", overflowY:"auto", direction:t.dir },
  };

  if (!user) return (
    <div style={{ ...s.app, display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"linear-gradient(135deg,#0f2444,#1d4ed8)" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:40, width:360, maxWidth:"95vw", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", direction:t.dir }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🏠</div>
          <h2 style={{ margin:0, color:"#1e293b", fontSize:22 }}>{t.adminPanel}</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div><label style={{ fontSize:13, color:"#64748b", fontWeight:600 }}>{t.username}</label><input style={{ ...s.input, marginTop:6 }} value={loginForm.username} onChange={e=>setLoginForm(f=>({...f,username:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} /></div>
          <div><label style={{ fontSize:13, color:"#64748b", fontWeight:600 }}>{t.password}</label><input style={{ ...s.input, marginTop:6 }} type="password" value={loginForm.password} onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} /></div>
          {loginError && <div style={{ background:"#fee2e2", color:"#ef4444", borderRadius:8, padding:"8px 12px", fontSize:13 }}>{loginError}</div>}
          <button style={{ ...s.btn(), padding:"12px", fontSize:15, borderRadius:10 }} onClick={handleLogin}>{t.loginBtn}</button>
        </div>
        <p style={{ textAlign:"center", color:"#94a3b8", fontSize:12, marginTop:20 }}>admin / 1234 &nbsp;|&nbsp; agent / agent</p>
        <div style={{ textAlign:"center", marginTop:8 }}><button style={{ background:"none", border:"1px solid #e2e8f0", borderRadius:8, padding:"6px 16px", cursor:"pointer", fontSize:13, color:"#64748b" }} onClick={()=>setLang(l=>l==="fa"?"en":"fa")}>{t.lang}</button></div>
      </div>
    </div>
  );

  return (
    <div style={{ ...s.app, display:"flex" }}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.logo}>🏠 {lang==="fa"?"CRM املاک":"Estate CRM"}</div>
        <div style={{ padding:"0 10px 16px", borderBottom:"1px solid rgba(255,255,255,0.1)", marginBottom:12 }}>
          <div style={{ fontSize:12, opacity:.7, padding:"0 10px" }}>{user.role}</div>
          <div style={{ fontWeight:700, padding:"2px 10px" }}>{user.username}</div>
        </div>
        {[["dashboard","📊",t.dashboard],["customers","👥",t.customers],["properties","🏢",t.properties],["contracts","📄",t.contracts],["calendar","📅",t.calendar],["reports","📈",t.reports]].map(([id,icon,label])=>(
          <div key={id} style={s.nav(tab===id)} onClick={()=>{setTab(id);setSearch("");setFilterType("all");setReportTab("overview")}}>{icon} {label}</div>
        ))}
        <div style={{ flex:1 }} />
        <div style={{ padding:"0 10px", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:12, display:"flex", flexDirection:"column", gap:6 }}>
          <div style={s.nav(false)} onClick={()=>setLang(l=>l==="fa"?"en":"fa")}>🌐 {t.lang}</div>
          <div style={s.nav(false)} onClick={()=>setUser(null)}>🚪 {t.logout}</div>
        </div>
      </div>

      <div style={s.main}>

        {/* DASHBOARD */}
        {tab==="dashboard" && <>
          <h2 style={{ margin:"0 0 20px", color:"#1e293b" }}>📊 {t.dashboard}</h2>
          <div style={{ display:"flex", gap:14, marginBottom:20, flexWrap:"wrap" }}>
            <div style={s.stat("#2563eb")}><div style={{ fontSize:34, fontWeight:800 }}>{customers.length}</div><div style={{ opacity:.85, fontSize:12, marginTop:4 }}>{t.totalCustomers}</div></div>
            <div style={s.stat("#10b981")}><div style={{ fontSize:34, fontWeight:800 }}>{properties.length}</div><div style={{ opacity:.85, fontSize:12, marginTop:4 }}>{t.totalProperties}</div></div>
            <div style={s.stat("#f59e0b")}><div style={{ fontSize:34, fontWeight:800 }}>{todayReminders.length}</div><div style={{ opacity:.85, fontSize:12, marginTop:4 }}>{t.pendingReminders}</div></div>
            <div style={s.stat("#8b5cf6")}><div style={{ fontSize:34, fontWeight:800 }}>{activeContracts}</div><div style={{ opacity:.85, fontSize:12, marginTop:4 }}>{t.activeContracts}</div></div>
            <div style={s.stat("#ef4444")}><div style={{ fontSize:22, fontWeight:800 }}>{fmt(totalCommission)}</div><div style={{ opacity:.85, fontSize:12, marginTop:4 }}>{t.totalCommission}</div></div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div style={s.card}>
              <h3 style={{ margin:"0 0 14px", color:"#374151", fontSize:15 }}>🔔 {t.recentActivity}</h3>
              {reminders.slice(0,5).map(r=>(
                <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #f8fafc" }}>
                  <span style={{ fontSize:13 }}>{r.done?"✅":"🔔"} {r.title}</span>
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{r.time}</span>
                </div>
              ))}
            </div>
            <div style={s.card}>
              <h3 style={{ margin:"0 0 14px", color:"#374151", fontSize:15 }}>📄 {t.contracts}</h3>
              {contracts.slice(0,4).map(c=>(
                <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #f8fafc" }}>
                  <span style={{ fontSize:13 }}>{c.contractNo}</span>
                  <span style={s.badge(contractStatusColor[c.status])}>{t[c.status]}</span>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* CUSTOMERS */}
        {tab==="customers" && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
            <h2 style={{ margin:0, color:"#1e293b" }}>👥 {t.customers}</h2>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <input style={{ ...s.input, width:170 }} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              <select style={{ ...s.input, width:120 }} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                {["buyer","seller","tenant","landlord"].map(v=><option key={v} value={v}>{t[v]}</option>)}
              </select>
              <button style={s.btn()} onClick={()=>openModal("customer")}>+ {t.addCustomer}</button>
            </div>
          </div>
          <div style={s.card}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{[t.name,t.phone,t.email,t.type,t.note,""].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {filteredCustomers.length===0&&<tr><td colSpan={6} style={{ ...s.td, textAlign:"center", color:"#94a3b8", padding:30 }}>{t.noData}</td></tr>}
                {filteredCustomers.map(c=>(
                  <tr key={c.id}>
                    <td style={s.td}><b>{c.name}</b></td>
                    <td style={s.td}>{c.phone}</td>
                    <td style={{ ...s.td, color:"#64748b" }}>{c.email||"—"}</td>
                    <td style={s.td}><span style={s.badge(typeColor[c.type]||"#64748b")}>{t[c.type]}</span></td>
                    <td style={{ ...s.td, color:"#64748b", maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.note}</td>
                    <td style={s.td}><div style={{ display:"flex", gap:6 }}>
                      <button style={s.btn("#f1f5f9","#374151")} onClick={()=>openModal("customer",{...c})}>{t.edit}</button>
                      <button style={s.btn("#fee2e2","#ef4444")} onClick={()=>setCustomers(cs=>cs.filter(x=>x.id!==c.id))}>{t.delete}</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}

        {/* PROPERTIES */}
        {tab==="properties" && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
            <h2 style={{ margin:0, color:"#1e293b" }}>🏢 {t.properties}</h2>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <input style={{ ...s.input, width:170 }} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              <select style={{ ...s.input, width:120 }} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                {["forSale","forRent","sold","rented"].map(v=><option key={v} value={v}>{t[v]}</option>)}
              </select>
              <button style={s.btn()} onClick={()=>openModal("property")}>+ {t.addProperty}</button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {filteredProperties.length===0&&<div style={{ color:"#94a3b8", padding:20 }}>{t.noData}</div>}
            {filteredProperties.map(p=>{
              const linked = customers.find(c=>c.id===Number(p.linkedCustomer));
              return (
                <div key={p.id} style={{ ...s.card, padding:0, overflow:"hidden" }}>
                  <div style={{ height:160, background:"#f1f5f9", overflow:"hidden", position:"relative", cursor:"pointer" }} onClick={()=>p.photos&&p.photos[0]&&setPhotoPreview(p.photos[0])}>
                    {p.photos&&p.photos[0] ? <img src={p.photos[0]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:"#cbd5e1" }}><span style={{ fontSize:40 }}>🏠</span></div>}
                    <div style={{ position:"absolute", top:8, left:8 }}><span style={s.badge(statusColor[p.status])}>{t[p.status]}</span></div>
                  </div>
                  <div style={{ padding:14 }}>
                    <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{p.title}</div>
                    <div style={{ color:"#64748b", fontSize:12, marginBottom:6 }}>📍 {p.address}</div>
                    <div style={{ display:"flex", gap:8, fontSize:12, marginBottom:8, flexWrap:"wrap" }}>
                      <span>💰 {fmt(p.price)}</span><span>📐 {p.area}{t.sqm}</span><span>🛏 {p.rooms}</span>
                    </div>
                    {linked&&<div style={{ fontSize:12, color:"#64748b", marginBottom:8 }}>👤 {linked.name}</div>}
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={{ ...s.btn("#f1f5f9","#374151"), flex:1 }} onClick={()=>openModal("property",{...p})}>{t.edit}</button>
                      <button style={{ ...s.btn("#fee2e2","#ef4444"), flex:1 }} onClick={()=>setProperties(ps=>ps.filter(x=>x.id!==p.id))}>{t.delete}</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>}

        {/* CONTRACTS */}
        {tab==="contracts" && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
            <h2 style={{ margin:0, color:"#1e293b" }}>📄 {t.contracts}</h2>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <input style={{ ...s.input, width:170 }} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              <select style={{ ...s.input, width:130 }} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                {["active","pending","expired","cancelled"].map(v=><option key={v} value={v}>{t[v]}</option>)}
              </select>
              <button style={s.btn()} onClick={()=>openModal("contract",{ contractDate:today, startDate:today, status:"active", contractType:"saleContract" })}>+ {t.addContract}</button>
            </div>
          </div>
          <div style={s.card}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{[t.contractNo, t.contractType, t.contractDate, t.party1, t.party2, t.linkedProperty, t.commission, t.contractStatus, ""].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {filteredContracts.length===0&&<tr><td colSpan={9} style={{ ...s.td, textAlign:"center", color:"#94a3b8", padding:30 }}>{t.noData}</td></tr>}
                {filteredContracts.map(c=>{
                  const p1 = customers.find(x=>x.id===Number(c.party1));
                  const p2 = customers.find(x=>x.id===Number(c.party2));
                  const prop = properties.find(x=>x.id===Number(c.linkedProperty));
                  return (
                    <tr key={c.id}>
                      <td style={{ ...s.td, fontWeight:700 }}>{c.contractNo}</td>
                      <td style={s.td}><span style={s.badge("#6366f1")}>{t[c.contractType]}</span></td>
                      <td style={{ ...s.td, fontSize:12 }}>{c.contractDate}</td>
                      <td style={s.td}>{p1?.name||"—"}</td>
                      <td style={s.td}>{p2?.name||"—"}</td>
                      <td style={{ ...s.td, fontSize:12 }}>{prop?.title||"—"}</td>
                      <td style={{ ...s.td, color:"#10b981", fontWeight:600 }}>{fmt(c.commission)}</td>
                      <td style={s.td}><span style={s.badge(contractStatusColor[c.status])}>{t[c.status]}</span></td>
                      <td style={s.td}><div style={{ display:"flex", gap:6 }}>
                        <button style={s.btn("#f1f5f9","#374151")} onClick={()=>openModal("contract",{...c})}>{t.edit}</button>
                        <button style={s.btn("#fee2e2","#ef4444")} onClick={()=>setContracts(cs=>cs.filter(x=>x.id!==c.id))}>{t.delete}</button>
                      </div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Summary */}
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <div style={s.stat("#10b981")}><div style={{ fontSize:28, fontWeight:800 }}>{activeContracts}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.activeContracts}</div></div>
            <div style={s.stat("#2563eb")}><div style={{ fontSize:22, fontWeight:800 }}>{fmt(totalCommission)}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.totalCommission} ({t.currency})</div></div>
            <div style={s.stat("#8b5cf6")}><div style={{ fontSize:28, fontWeight:800 }}>{contracts.length}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.totalContracts}</div></div>
          </div>
        </>}

        {/* CALENDAR */}
        {tab==="calendar" && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
            <h2 style={{ margin:0, color:"#1e293b" }}>📅 {t.calendar}</h2>
            <div style={{ display:"flex", gap:8 }}>
              <select style={{ ...s.input, width:140 }} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="all">{t.all}</option>
                <option value="pending">{lang==="fa"?"در انتظار":"Pending"}</option>
                <option value="done">{lang==="fa"?"انجام شده":"Done"}</option>
              </select>
              <button style={s.btn()} onClick={()=>openModal("reminder",{ date:today, time:"09:00", priority:"medium" })}>+ {t.addReminder}</button>
            </div>
          </div>
          <div style={s.card}>
            {filteredReminders.length===0&&<div style={{ color:"#94a3b8", textAlign:"center", padding:30 }}>{t.noData}</div>}
            {filteredReminders.sort((a,b)=>a.date>b.date?1:-1).map(r=>(
              <div key={r.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 0", borderBottom:"1px solid #f8fafc", opacity:r.done?.6:1 }}>
                <input type="checkbox" checked={r.done} onChange={()=>setReminders(rs=>rs.map(x=>x.id===r.id?{...x,done:!x.done}:x))} style={{ width:18, height:18, cursor:"pointer", accentColor:"#2563eb" }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14, textDecoration:r.done?"line-through":"none", display:"flex", alignItems:"center", gap:8 }}>
                    {r.title}<span style={s.badge(prioColor[r.priority||"medium"])}>{t[r.priority||"medium"]}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:3 }}>📅 {r.date} &nbsp; 🕐 {r.time}</div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button style={s.btn("#f1f5f9","#374151")} onClick={()=>openModal("reminder",{...r})}>{t.edit}</button>
                  <button style={s.btn("#fee2e2","#ef4444")} onClick={()=>setReminders(rs=>rs.filter(x=>x.id!==r.id))}>{t.delete}</button>
                </div>
              </div>
            ))}
          </div>
        </>}

        {/* REPORTS */}
        {tab==="reports" && <>
          <h2 style={{ margin:"0 0 16px", color:"#1e293b" }}>📈 {t.reports}</h2>
          {/* Sub-tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            {[["overview",t.overview],["properties",t.propertyReport],["customers",t.customerReport],["contracts",t.contracts]].map(([id,label])=>(
              <button key={id} style={{ ...s.btn(reportTab===id?"#2563eb":"#f1f5f9", reportTab===id?"#fff":"#374151"), borderRadius:10 }} onClick={()=>setReportTab(id)}>{label}</button>
            ))}
          </div>

          {reportTab==="overview" && <>
            <div style={{ display:"flex", gap:14, marginBottom:20, flexWrap:"wrap" }}>
              <div style={s.stat("#2563eb")}><div style={{ fontSize:28, fontWeight:800 }}>{customers.length}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.totalCustomers}</div></div>
              <div style={s.stat("#10b981")}><div style={{ fontSize:28, fontWeight:800 }}>{properties.length}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.totalProperties}</div></div>
              <div style={s.stat("#8b5cf6")}><div style={{ fontSize:28, fontWeight:800 }}>{contracts.length}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.totalContracts}</div></div>
              <div style={s.stat("#ef4444")}><div style={{ fontSize:20, fontWeight:800 }}>{fmt(totalCommission)}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{t.totalCommission}</div></div>
              <div style={s.stat("#f59e0b")}><div style={{ fontSize:20, fontWeight:800 }}>{fmt(totalSaleValue)}</div><div style={{ fontSize:12, opacity:.85, marginTop:4 }}>{lang==="fa"?"ارزش کل فروش":"Total Sale Value"}</div></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={s.card}>
                <h3 style={{ margin:"0 0 14px", fontSize:14, color:"#374151" }}>🏠 {t.byStatus}</h3>
                {propByStatus.map(x=>(
                  <div key={x.label} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}><span>{x.label}</span><b>{x.count}</b></div>
                    <div style={{ height:8, background:"#f1f5f9", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${properties.length?x.count/properties.length*100:0}%`, background:x.color, borderRadius:4, transition:"width .4s" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <h3 style={{ margin:"0 0 14px", fontSize:14, color:"#374151" }}>👥 {t.customerReport}</h3>
                {custByType.map(x=>(
                  <div key={x.label} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}><span>{x.label}</span><b>{x.count}</b></div>
                    <div style={{ height:8, background:"#f1f5f9", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${customers.length?x.count/customers.length*100:0}%`, background:x.color, borderRadius:4, transition:"width .4s" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {reportTab==="properties" && <div style={s.card}>
            <h3 style={{ margin:"0 0 16px", color:"#374151" }}>🏢 {t.propertyReport}</h3>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:20 }}>
              {propByType.map(x=>(
                <div key={x.label} style={{ textAlign:"center", background:"#f8fafc", borderRadius:12, padding:"16px 24px" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:"#2563eb" }}>{x.count}</div>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{x.label}</div>
                </div>
              ))}
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{[t.title,t.type,t.status,t.price,t.area].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {properties.map(p=>(
                  <tr key={p.id}>
                    <td style={s.td}>{p.title}</td>
                    <td style={s.td}>{t[p.type]}</td>
                    <td style={s.td}><span style={s.badge(statusColor[p.status])}>{t[p.status]}</span></td>
                    <td style={{ ...s.td, color:"#10b981", fontWeight:600 }}>{fmt(p.price)}</td>
                    <td style={s.td}>{p.area} {t.sqm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}

          {reportTab==="customers" && <div style={s.card}>
            <h3 style={{ margin:"0 0 16px", color:"#374151" }}>👥 {t.customerReport}</h3>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:20 }}>
              {custByType.map(x=>(
                <div key={x.label} style={{ textAlign:"center", background:"#f8fafc", borderRadius:12, padding:"16px 24px" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:x.color }}>{x.count}</div>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{x.label}</div>
                </div>
              ))}
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{[t.name,t.phone,t.type,t.note].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {customers.map(c=>(
                  <tr key={c.id}>
                    <td style={s.td}><b>{c.name}</b></td>
                    <td style={s.td}>{c.phone}</td>
                    <td style={s.td}><span style={s.badge(typeColor[c.type])}>{t[c.type]}</span></td>
                    <td style={{ ...s.td, color:"#64748b", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}

          {reportTab==="contracts" && <div style={s.card}>
            <h3 style={{ margin:"0 0 16px", color:"#374151" }}>📄 {t.contracts}</h3>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:20 }}>
              {contractByType.map(x=>(
                <div key={x.label} style={{ textAlign:"center", background:"#f8fafc", borderRadius:12, padding:"16px 24px" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:"#6366f1" }}>{x.count}</div>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{x.label}</div>
                </div>
              ))}
              <div style={{ textAlign:"center", background:"#f0fdf4", borderRadius:12, padding:"16px 24px" }}>
                <div style={{ fontSize:20, fontWeight:800, color:"#10b981" }}>{fmt(totalCommission)}</div>
                <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{t.totalCommission}</div>
              </div>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{[t.contractNo,t.contractType,t.contractDate,t.commission,t.contractStatus].map((h,i)=><th key={i} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {contracts.map(c=>(
                  <tr key={c.id}>
                    <td style={{ ...s.td, fontWeight:700 }}>{c.contractNo}</td>
                    <td style={s.td}>{t[c.contractType]}</td>
                    <td style={s.td}>{c.contractDate}</td>
                    <td style={{ ...s.td, color:"#10b981", fontWeight:600 }}>{fmt(c.commission)}</td>
                    <td style={s.td}><span style={s.badge(contractStatusColor[c.status])}>{t[c.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
        </>}
      </div>

      {/* Photo preview */}
      {photoPreview && <div style={{ ...s.overlay, zIndex:200 }} onClick={()=>setPhotoPreview(null)}><img src={photoPreview} alt="" style={{ maxWidth:"90vw", maxHeight:"85vh", borderRadius:12 }} /></div>}

      {/* Modal: Customer */}
      {modal==="customer" && <div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{ margin:"0 0 20px" }}>{form.id?t.edit:t.addCustomer}</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input style={s.input} placeholder={t.name+" *"} value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          <input style={s.input} placeholder={t.phone} value={form.phone||""} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
          <input style={s.input} placeholder={t.email} value={form.email||""} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
          <select style={s.input} value={form.type||"buyer"} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
            {["buyer","seller","tenant","landlord"].map(v=><option key={v} value={v}>{t[v]}</option>)}
          </select>
          <textarea style={{ ...s.input, height:80, resize:"vertical" }} placeholder={t.note} value={form.note||""} onChange={e=>setForm(f=>({...f,note:e.target.value}))} />
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
          <button style={s.btn("#e2e8f0","#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveCustomer}>{t.save}</button>
        </div>
      </div></div>}

      {/* Modal: Property */}
      {modal==="property" && <div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{ margin:"0 0 20px" }}>{form.id?t.edit:t.addProperty}</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
          <input style={s.input} placeholder={t.title+" *"} value={form.title||""} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          <input style={s.input} placeholder={t.address} value={form.address||""} onChange={e=>setForm(f=>({...f,address:e.target.value}))} />
          <div style={{ display:"flex", gap:10 }}>
            <input style={s.input} placeholder={t.price} value={form.price||""} onChange={e=>setForm(f=>({...f,price:e.target.value}))} />
            <input style={s.input} placeholder={t.area} value={form.area||""} onChange={e=>setForm(f=>({...f,area:e.target.value}))} />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <input style={s.input} placeholder={t.rooms} value={form.rooms||""} onChange={e=>setForm(f=>({...f,rooms:e.target.value}))} />
            <input style={s.input} placeholder={t.floor} value={form.floor||""} onChange={e=>setForm(f=>({...f,floor:e.target.value}))} />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <select style={s.input} value={form.type||"apartment"} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
              {["apartment","villa","office","land"].map(v=><option key={v} value={v}>{t[v]}</option>)}
            </select>
            <select style={s.input} value={form.status||"forSale"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
              {["forSale","forRent","sold","rented"].map(v=><option key={v} value={v}>{t[v]}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:14 }}>
            {["parking","elevator","storage"].map(f2=>(
              <label key={f2} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, cursor:"pointer" }}>
                <input type="checkbox" checked={form[f2]==="yes"} onChange={e=>setForm(f=>({...f,[f2]:e.target.checked?"yes":"no"}))} />
                {t[f2]||f2}
              </label>
            ))}
          </div>
          <select style={s.input} value={form.linkedCustomer||""} onChange={e=>setForm(f=>({...f,linkedCustomer:e.target.value}))}>
            <option value="">— {t.linkedCustomer} —</option>
            {customers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <textarea style={{ ...s.input, height:60, resize:"vertical" }} placeholder={t.description} value={form.description||""} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          <button style={{ ...s.btn("#f1f5f9","#374151"), padding:10 }} onClick={()=>fileRef.current.click()}>📷 {t.uploadPhoto}</button>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={handlePhotoUpload} />
          {form.photos&&form.photos.length>0&&<div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {form.photos.map((ph,i)=>(
              <div key={i} style={{ position:"relative" }}>
                <img src={ph} alt="" style={{ width:65, height:65, objectFit:"cover", borderRadius:8, border:"2px solid #e2e8f0" }} />
                <button onClick={()=>setForm(f=>({...f,photos:f.photos.filter((_,j)=>j!==i)}))} style={{ position:"absolute", top:-6, right:-6, background:"#ef4444", color:"#fff", border:"none", borderRadius:"50%", width:20, height:20, cursor:"pointer", fontSize:11 }}>✕</button>
              </div>
            ))}
          </div>}
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
          <button style={s.btn("#e2e8f0","#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveProperty}>{t.save}</button>
        </div>
      </div></div>}

      {/* Modal: Contract */}
      {modal==="contract" && <div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{ margin:"0 0 20px" }}>{form.id?t.edit:t.addContract}</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", gap:10 }}>
            <input style={s.input} placeholder={t.contractNo+" *"} value={form.contractNo||""} onChange={e=>setForm(f=>({...f,contractNo:e.target.value}))} />
            <select style={s.input} value={form.contractType||"saleContract"} onChange={e=>setForm(f=>({...f,contractType:e.target.value}))}>
              {["saleContract","rentContract","preContract"].map(v=><option key={v} value={v}>{t[v]}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <div style={{ flex:1 }}><label style={{ fontSize:12, color:"#64748b" }}>{t.contractDate}</label><input style={{ ...s.input, marginTop:4 }} type="date" value={form.contractDate||today} onChange={e=>setForm(f=>({...f,contractDate:e.target.value}))} /></div>
            <div style={{ flex:1 }}><label style={{ fontSize:12, color:"#64748b" }}>{t.startDate}</label><input style={{ ...s.input, marginTop:4 }} type="date" value={form.startDate||today} onChange={e=>setForm(f=>({...f,startDate:e.target.value}))} /></div>
            <div style={{ flex:1 }}><label style={{ fontSize:12, color:"#64748b" }}>{t.endDate}</label><input style={{ ...s.input, marginTop:4 }} type="date" value={form.endDate||""} onChange={e=>setForm(f=>({...f,endDate:e.target.value}))} /></div>
          </div>
          <select style={s.input} value={form.party1||""} onChange={e=>setForm(f=>({...f,party1:e.target.value}))}>
            <option value="">— {t.party1} —</option>
            {customers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={s.input} value={form.party2||""} onChange={e=>setForm(f=>({...f,party2:e.target.value}))}>
            <option value="">— {t.party2} —</option>
            {customers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={s.input} value={form.linkedProperty||""} onChange={e=>setForm(f=>({...f,linkedProperty:e.target.value}))}>
            <option value="">— {t.linkedProperty} —</option>
            {properties.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <input style={s.input} placeholder={t.commission} value={form.commission||""} onChange={e=>setForm(f=>({...f,commission:e.target.value}))} />
          <select style={s.input} value={form.status||"active"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
            {["active","pending","expired","cancelled"].map(v=><option key={v} value={v}>{t[v]}</option>)}
          </select>
          <textarea style={{ ...s.input, height:70, resize:"vertical" }} placeholder={t.note} value={form.note||""} onChange={e=>setForm(f=>({...f,note:e.target.value}))} />
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
          <button style={s.btn("#e2e8f0","#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveContract}>{t.save}</button>
        </div>
      </div></div>}

      {/* Modal: Reminder */}
      {modal==="reminder" && <div style={s.overlay} onClick={closeModal}><div style={s.modal} onClick={e=>e.stopPropagation()}>
        <h3 style={{ margin:"0 0 20px" }}>{form.id?t.edit:t.addReminder}</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input style={s.input} placeholder={t.title+" *"} value={form.title||""} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          <div style={{ display:"flex", gap:10 }}>
            <input style={s.input} type="date" value={form.date||today} onChange={e=>setForm(f=>({...f,date:e.target.value}))} />
            <input style={s.input} type="time" value={form.time||"09:00"} onChange={e=>setForm(f=>({...f,time:e.target.value}))} />
          </div>
          <select style={s.input} value={form.priority||"medium"} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>
            {["high","medium","low"].map(v=><option key={v} value={v}>{t[v]}</option>)}
          </select>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
          <button style={s.btn("#e2e8f0","#374151")} onClick={closeModal}>{t.cancel}</button>
          <button style={s.btn()} onClick={saveReminder}>{t.save}</button>
        </div>
      </div></div>}
    </div>
  );
}
