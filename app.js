(() => {
"use strict";

/*
  توسعه‌پذیری:
  برای افزودن یک تالار، فقط یک شیء جدید به آرایه SECTIONS اضافه کنید.
  نوع تالار می‌تواند painting، photography، crafts یا audio باشد.
  عرض کل ساختمان و مرکز هر تالار به‌صورت خودکار از تعداد بخش‌ها محاسبه می‌شود.
*/

const SECTIONS = [
  {
    id:"painting", name:"نقاشی", type:"painting",
    items:[
      ["باغ فیروزه","برداشتی آزاد از باغ ایرانی؛ پیوند هندسه، آب و رنگ در یک ترکیب تصویری.","اکریلیک و رنگ‌روغن",["#173f3d","#b89a66","#e5d3a8"]],
      ["سکوت کویر","روایتی انتزاعی از افق باز و تغییر تدریجی نور در کویر.","رنگ و بوم",["#985f43","#d4a96c","#ead5aa"]],
      ["رنگ‌های شهر","ترکیبی از سطوح رنگی و خطوط معماری در فضای شهری.","ترکیب مواد",["#254e62","#c28e5f","#e3cfaa"]],
      ["پنجره روشن","بازتابی از نور و سایه در قاب یک پنجره قدیمی.","اکریلیک",["#315c56","#d4b87e","#e9dfc5"]],
      ["درخت خیال","فرمی آزاد از شاخه‌ها و ریشه‌ها با تأکید بر حرکت خطوط.","رنگ‌روغن",["#3d654b","#bd9d64","#e6d7b1"]],
      ["پاییز آرام","مطالعه‌ای رنگی درباره فصل پاییز و تغییر بافت طبیعت.","گواش",["#925a3e","#c68d53","#e4c990"]]
    ]
  },
  {
    id:"photography", name:"عکاسی", type:"photography",
    items:[
      ["لحظه باران","ثبت لحظه‌ای از انعکاس نور و حرکت قطره‌های باران.","عکاسی رنگی",["#28545e","#93a9a4","#e2d6bc"]],
      ["سایه‌های شهر","بازی نور و سایه در خطوط و حجم‌های معماری شهری.","عکاسی معماری",["#343f4c","#a28d70","#e0d2b7"]],
      ["کوچه قدیمی","روایتی تصویری از بافت و جزئیات یک کوچه تاریخی.","عکاسی مستند",["#72513d","#b99b70","#e3d3b6"]],
      ["انعکاس","نگاهی به تصویرهای وارونه در سطح آب و شیشه.","عکاسی خلاق",["#2e6062","#8ca9a2","#dfd7c4"]],
      ["درخت تنها","ثبت سکون و حضور یک درخت در فضای باز.","عکاسی طبیعت",["#3f5b45","#b5a16f","#e7d9ba"]],
      ["خط افق","تقابل آسمان و زمین در لحظه تغییر نور.","عکاسی منظره",["#536e83","#b5a67e","#ead8b5"]]
    ]
  },
  {
    id:"crafts", name:"هنرهای دستی", type:"crafts",
    items:[
      ["سفال آبی","نمونه‌ای از سفال لعاب‌دار با فرم الهام‌گرفته از سفال ایرانی.","سفال و لعاب",["#27636b","#b99a67","#e6d8b9"]],
      ["کاسه نقش‌دار","ظرفی تزئینی با نقش‌های هندسی و رنگ‌های گرم.","سفال‌گری",["#8b5b43","#d1a96d","#e9d6b2"]],
      ["جعبه چوبی","جعبه‌ای کوچک با تزئینات الهام‌گرفته از هنر چوب.","معرق و چوب",["#5b422f","#b88e5a","#e3ca9a"]],
      ["بافت سنتی","نمونه‌ای از بافت دست‌ساز با ترکیب رنگ‌های ایرانی.","بافت و الیاف",["#8a654b","#c5a16c","#e2d0ad"]],
      ["کاشی هفت‌رنگ","قطعه‌ای تزئینی با نقش هندسی و لعاب فیروزه‌ای.","کاشی‌کاری",["#245b6a","#d1a95f","#e5d8b7"]],
      ["پرنده چوبی","مجسمه‌ای کوچک با فرم ساده و پرداخت دست‌ساز.","منبت‌کاری",["#5e503a","#b78c5e","#e4d0a8"]]
    ]
  },
  {
    id:"audio", name:"هنرهای آوایی", type:"audio",
    items:[
      ["زنگ‌های باد","قطعه‌ای آرام با صدای زنگ‌های بلورین و نت‌های پنتاتونیک.","موسیقی آوایی تعاملی",["#244e51","#b8a06f","#e4d7b9"]],
      ["سنتور خیال","ملودی کوتاهی با رنگ صدای مضرابی و طنین گرم.","موسیقی سنتز‌شده",["#754e35","#c49b60","#ead7b1"]],
      ["نیِ دوردست","قطعه‌ای کشیده و آرام با رنگ صدای نی و تنفس موسیقایی.","موسیقی سنتز‌شده",["#315e5c","#9db29a","#e6d8bd"]],
      ["ضرب‌آهنگ","الگوی ریتمیک کوتاهی با ضرب‌های بم و زنگ‌های پاسخ‌گو.","ریتم تعاملی",["#5e3e35","#bb8253","#e8c88e"]],
      ["کاسه‌های صوتی","چند نت شناور با طنین نرم و هارمونیک‌های هم‌پوشان.","موسیقی آوایی تعاملی",["#31505e","#b7a16e","#e5ddc5"]],
      ["آواز آب","قطعه‌ای کوتاه با حرکت ملودیک روان و صدایی شفاف.","موسیقی سنتز‌شده",["#28616a","#88aaa0","#e6d9bd"]]
    ]
  }
];

const ROOM_WIDTH = 15.2;
const ROOM_COUNT = SECTIONS.length;
const BUILD_WIDTH = ROOM_WIDTH * ROOM_COUNT;
const LEFT_EDGE = -BUILD_WIDTH/2;
const RIGHT_EDGE = BUILD_WIDTH/2;
const ROOM_CENTERS = SECTIONS.map((_,i)=>LEFT_EDGE + ROOM_WIDTH*(i+.5));
const FRONT_Z = -18.5;
const PARTITION_Z = -5.5;
const BACK_Z = 19.5;
const WALL_H = 7.5;
const WALL_T = .46;
const DOOR_W = 3.8;
const DOOR_HALF = DOOR_W/2;

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer:false, stencil:true, adaptToDeviceRatio:true, antialias:true
});
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(.10,.16,.15,1);

const camera = new BABYLON.UniversalCamera("visitorCamera",new BABYLON.Vector3(0,1.65,-13.2),scene);
camera.minZ=.08; camera.fov=.92; camera.inputs.clear();

function material(name,hex,roughness=.8){
  const m=new BABYLON.StandardMaterial(name,scene);
  m.diffuseColor=BABYLON.Color3.FromHexString(hex);
  m.specularColor=new BABYLON.Color3(.14,.13,.10);
  m.roughness=roughness;return m;
}
const M={
  wall:material("warm plaster","#d9ceb8"), stone:material("carved limestone","#bcae91"),
  ivory:material("ivory trim","#e8ddc8"), teal:material("deep teal","#173936"),
  panel:material("turquoise panels","#245e58"), gold:material("antique brass","#c6a365"),
  bronze:material("bronze","#806341"), wood:material("dark walnut","#503a2b"),
  cushion:material("woven seat fabric","#a98a60"), clay:material("terracotta","#9d5c3f"),
  clayBlue:material("blue ceramic","#2f6e70"), leaf:material("garden foliage","#4c7650"),
  leaf2:material("leaf highlights","#78915c"), soil:material("potting soil","#3e3429")
};
const box=(name,w,h,d,x,y,z,mat,rotY=0)=>{
  const m=BABYLON.MeshBuilder.CreateBox(name,{width:w,height:h,depth:d},scene);
  m.position.set(x,y,z);m.rotation.y=rotY;m.material=mat;m.isPickable=false;return m;
};
const cylinder=(name,diam,height,x,y,z,mat,tess=24)=>{
  const m=BABYLON.MeshBuilder.CreateCylinder(name,{diameter:diam,height,tessellation:tess},scene);
  m.position.set(x,y,z);m.material=mat;m.isPickable=false;return m;
};

/* Lighting */
const hemi=new BABYLON.HemisphericLight("soft ambient",new BABYLON.Vector3(0,1,0),scene);
hemi.intensity=.78;hemi.groundColor=new BABYLON.Color3(.24,.21,.17);
const sun=new BABYLON.DirectionalLight("ceiling fill",new BABYLON.Vector3(-.35,-1,.2),scene);
sun.position.set(0,12,-8);sun.intensity=.28;

/* Continuous patterned tile floor: there are no floor gaps between the halls. */
function makeTileTexture(){
  const t=new BABYLON.DynamicTexture("Persian star tile",{width:512,height:512},scene,false);
  const c=t.getContext();
  c.fillStyle="#28635e";c.fillRect(0,0,512,512);
  c.fillStyle="#ddc99e";c.fillRect(8,8,496,496);
  c.fillStyle="#28635e";c.fillRect(17,17,478,478);
  c.strokeStyle="#e7d9b9";c.lineWidth=7;c.strokeRect(28,28,456,456);
  c.strokeStyle="#b8945b";c.lineWidth=3;c.strokeRect(43,43,426,426);
  const cx=256,cy=256;
  for(let i=0;i<16;i++){
    const a=i*Math.PI/8,r1=190,r2=i%2===0?80:145;
    c.beginPath();c.moveTo(cx,cy);
    c.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);
    c.lineTo(cx+Math.cos(a+Math.PI/8)*r2,cy+Math.sin(a+Math.PI/8)*r2);
    c.closePath();c.fillStyle=i%2?"#3a8077":"#b89b68";c.fill();
    c.strokeStyle="#e5d5b1";c.lineWidth=2;c.stroke();
  }
  c.beginPath();c.arc(cx,cy,65,0,Math.PI*2);c.fillStyle="#d9c391";c.fill();
  c.beginPath();c.arc(cx,cy,47,0,Math.PI*2);c.fillStyle="#1b514d";c.fill();
  c.beginPath();c.arc(cx,cy,15,0,Math.PI*2);c.fillStyle="#d8c18f";c.fill();
  t.update();t.wrapU=BABYLON.Texture.WRAP_ADDRESSMODE;t.wrapV=BABYLON.Texture.WRAP_ADDRESSMODE;
  t.uScale=ROOM_COUNT*5.4;t.vScale=16;return t;
}
const ground=BABYLON.MeshBuilder.CreateGround("one continuous tiled floor",
  {width:BUILD_WIDTH,height:BACK_Z-FRONT_Z,subdivisions:2},scene);
ground.position.set(0,.015,(FRONT_Z+BACK_Z)/2);
const groundMat=material("glazed Persian floor","#ffffff",.44);
groundMat.diffuseTexture=makeTileTexture();groundMat.specularColor=new BABYLON.Color3(.23,.21,.16);
ground.material=groundMat;ground.isPickable=false;

/* Building shell: walls touch/overlap at all joins; no open seams between rooms. */
const CENTER_Y=WALL_H/2;
box("west perimeter wall",WALL_T,WALL_H,BACK_Z-FRONT_Z+.5,LEFT_EDGE-WALL_T/2,CENTER_Y,(BACK_Z+FRONT_Z)/2,M.wall);
box("east perimeter wall",WALL_T,WALL_H,BACK_Z-FRONT_Z+.5,RIGHT_EDGE+WALL_T/2,CENTER_Y,(BACK_Z+FRONT_Z)/2,M.wall);
box("north rear perimeter wall",BUILD_WIDTH+WALL_T,WALL_H,WALL_T,0,CENTER_Y,BACK_Z+WALL_T/2,M.wall);
box("south entrance perimeter wall",BUILD_WIDTH+WALL_T,WALL_H,WALL_T,0,CENTER_Y,FRONT_Z-WALL_T/2,M.wall);

/* The foyer-to-gallery wall is built as solid segments between exact door openings. */
const doorRanges=ROOM_CENTERS.map(c=>[c-DOOR_HALF,c+DOOR_HALF]).sort((a,b)=>a[0]-b[0]);
let segmentStart=LEFT_EDGE;
for(const [doorA,doorB] of doorRanges){
  const segmentWidth=doorA-segmentStart;
  if(segmentWidth>.02){
    box("continuous foyer partition segment",segmentWidth,WALL_H,WALL_T,
      (segmentStart+doorA)/2,CENTER_Y,PARTITION_Z,M.wall);
  }
  // Full-height wall piers and the lintel close every non-door portion of the opening.
  box("left portal pier",.34,5.25,.72,doorA+.17,2.625,PARTITION_Z,M.stone);
  box("right portal pier",.34,5.25,.72,doorB-.17,2.625,PARTITION_Z,M.stone);
  box("portal lintel",DOOR_W,.46,.72,(doorA+doorB)/2,5.48,PARTITION_Z,M.gold);
  box("portal turquoise band",DOOR_W+.12,.13,.78,(doorA+doorB)/2,5.79,PARTITION_Z,M.teal);
  segmentStart=doorB;
}
if(RIGHT_EDGE-segmentStart>.02){
  box("final foyer partition segment",RIGHT_EDGE-segmentStart,WALL_H,WALL_T,
    (segmentStart+RIGHT_EDGE)/2,CENTER_Y,PARTITION_Z,M.wall);
}

/* Shared dividing walls between adjacent galleries are solid continuous slabs. */
for(let i=1;i<ROOM_COUNT;i++){
  const x=LEFT_EDGE+i*ROOM_WIDTH;
  box("shared gallery partition wall "+i,WALL_T,WALL_H,BACK_Z-PARTITION_Z+.4,
      x,CENTER_Y,(BACK_Z+PARTITION_Z)/2,M.wall);
}

/* One-piece ceilings for the foyer; adjoining ceiling panels for each room.
   Their edges meet at the room boundaries. */
const FOYER_DEPTH=PARTITION_Z-FRONT_Z;
box("full foyer ceiling",BUILD_WIDTH+.15,.44,FOYER_DEPTH+.15,0,7.48,(FRONT_Z+PARTITION_Z)/2,M.ivory);
for(let i=0;i<ROOM_COUNT;i++){
  box("complete gallery ceiling "+i,ROOM_WIDTH+.12,.44,BACK_Z-PARTITION_Z+.15,
      ROOM_CENTERS[i],7.48,(BACK_Z+PARTITION_Z)/2,M.ivory);
}

/* Ceiling coffers and shallow interior dome-like medallions. */
function addCeilingDome(name,cx,cz,rx,rz){
  const dome=BABYLON.MeshBuilder.CreateSphere(name,{segments:40,diameter:2},scene);
  dome.scaling.set(rx,.82,rz);dome.position.set(cx,7.10,cz);
  dome.material=M.panel;dome.material.backFaceCulling=false;dome.isPickable=false;
  const ring=BABYLON.MeshBuilder.CreateTorus(name+" outer brass ring",
    {diameter:Math.min(rx,rz)*1.82,thickness:.065,tessellation:80},scene);
  ring.position.set(cx,6.35,cz);ring.material=M.gold;ring.isPickable=false;
  const ring2=BABYLON.MeshBuilder.CreateTorus(name+" inner ring",
    {diameter:Math.min(rx,rz)*1.46,thickness:.04,tessellation:80},scene);
  ring2.position.set(cx,6.48,cz);ring2.material=M.ivory;ring2.isPickable=false;
  cylinder(name+" central medallion",.66,.10,cx,6.42,cz,M.gold,8);
  cylinder(name+" central teal detail",.30,.12,cx,6.31,cz,M.teal,12);
}
addCeilingDome("entrance hall dome",0,(FRONT_Z+PARTITION_Z)/2,BUILD_WIDTH*.18,5.1);
ROOM_CENTERS.forEach((c,i)=>addCeilingDome("gallery dome "+i,c,7.0,4.0,4.8));

/* Wall bands, on both faces of each shared wall. */
function sideWallBand(x,sign,zCenter,depth){
  const face=x+sign*(WALL_T/2-.03);
  box("lower teal dado",.10,.98,depth-.6,face,.58,zCenter,M.teal);
  box("lower brass reveal",.12,.065,depth-.6,face,1.12,zCenter,M.gold);
  box("upper decorative frieze",.10,.43,depth-.6,face,6.02,zCenter,M.panel);
  box("upper brass reveal",.12,.065,depth-.6,face,6.27,zCenter,M.gold);
  box("cornice",.28,.25,depth-.45,x+sign*.13,6.91,zCenter,M.stone);
}
function endWallBand(z,insideSign,xCenter,width){
  const face=z+insideSign*(WALL_T/2-.03);
  box("end wall teal dado",width-.55,.98,.10,xCenter,.58,face,M.teal);
  box("end wall brass reveal",width-.55,.065,.12,xCenter,1.12,face,M.gold);
  box("end wall upper frieze",width-.55,.43,.10,xCenter,6.02,face,M.panel);
  box("end wall upper brass reveal",width-.55,.065,.12,xCenter,6.27,face,M.gold);
  box("end wall cornice",width-.4,.25,.28,xCenter,6.91,z+insideSign*.13,M.stone);
}
// Outer side walls: foyer and gallery sections use matching continuous finishes.
sideWallBand(LEFT_EDGE,1,(FRONT_Z+BACK_Z)/2,BACK_Z-FRONT_Z);
sideWallBand(RIGHT_EDGE,-1,(FRONT_Z+BACK_Z)/2,BACK_Z-FRONT_Z);
// Two faces of each shared divider.
for(let i=1;i<ROOM_COUNT;i++){
  const x=LEFT_EDGE+i*ROOM_WIDTH;
  sideWallBand(x,-1,(PARTITION_Z+BACK_Z)/2,BACK_Z-PARTITION_Z);
  sideWallBand(x,1,(PARTITION_Z+BACK_Z)/2,BACK_Z-PARTITION_Z);
}
endWallBand(FRONT_Z,1,0,BUILD_WIDTH);
endWallBand(BACK_Z,-1,0,BUILD_WIDTH);

/* Portal signs, all above their respective doors, facing the foyer. */
ROOM_CENTERS.forEach((cx,i)=>{
  box("section sign wooden board",4.0,.88,.18,cx,6.40,PARTITION_Z-.46,M.wood);
  const plane=BABYLON.MeshBuilder.CreatePlane("section sign face "+i,{width:3.76,height:.66},scene);
  plane.position.set(cx,6.40,PARTITION_Z-.565);
  const tex=new BABYLON.DynamicTexture("section sign "+i,{width:800,height:160},scene,false);
  const c=tex.getContext();c.fillStyle="#503a2b";c.fillRect(0,0,800,160);
  c.strokeStyle="#d8bd84";c.lineWidth=6;c.strokeRect(9,9,782,142);
  c.fillStyle="#f0dfbd";c.font="bold 68px sans-serif";c.textAlign="center";c.textBaseline="middle";c.direction="rtl";
  c.fillText(SECTIONS[i].name,400,80);tex.update();
  const sm=new BABYLON.StandardMaterial("section sign material "+i,scene);
  sm.diffuseTexture=tex;sm.emissiveColor=new BABYLON.Color3(.1,.08,.04);plane.material=sm;plane.isPickable=false;
});

/* Pointed arch relief at rear of every room. */
function addBackArch(cx){
  const coords=[[-3,1.35],[-3,3.6],[-2.65,4.3],[-2.0,4.9],[-1.1,5.35],[0,5.78],[1.1,5.35],[2.0,4.9],[2.65,4.3],[3,3.6],[3,1.35]];
  const pts=coords.map(([x,y])=>new BABYLON.Vector3(cx+x,y,BACK_Z-WALL_T/2-.02));
  const line=BABYLON.MeshBuilder.CreateLines("pointed arch relief",{points:pts},scene);
  line.color=BABYLON.Color3.FromHexString("#c6a365");line.isPickable=false;
  const inset=coords.map(([x,y])=>new BABYLON.Vector3(cx+x*.88,3.6+(y-3.6)*.88,BACK_Z-WALL_T/2-.03));
  const line2=BABYLON.MeshBuilder.CreateLines("inner pointed arch relief",{points:inset},scene);
  line2.color=BABYLON.Color3.FromHexString("#8c7450");line2.isPickable=false;
}
ROOM_CENTERS.forEach(addBackArch);

/* Wall rosettes. */
function addSideRosette(x,y,z,r){
  const pts=[];
  for(let i=0;i<=16;i++){
    const a=(i%16)*Math.PI/8-Math.PI/2,rr=i%2===0?r:r*.48;
    pts.push(new BABYLON.Vector3(x,y+Math.sin(a)*rr,z+Math.cos(a)*rr));
  }
  const star=BABYLON.MeshBuilder.CreateLines("eight point wall rosette",{points:pts},scene);
  star.color=BABYLON.Color3.FromHexString("#c6a365");star.isPickable=false;
  const ringPts=[];
  for(let i=0;i<=32;i++){const a=i*Math.PI*2/32;ringPts.push(new BABYLON.Vector3(x,y+Math.sin(a)*r*.72,z+Math.cos(a)*r*.72));}
  const ring=BABYLON.MeshBuilder.CreateLines("wall rosette ring",{points:ringPts},scene);
  ring.color=BABYLON.Color3.FromHexString("#e0d0ab");ring.isPickable=false;
}
for(let i=0;i<ROOM_COUNT;i++){
  const c=ROOM_CENTERS[i];
  addSideRosette(c-ROOM_WIDTH/2+WALL_T/2+.035,5.25,3.2,.42);
  addSideRosette(c-ROOM_WIDTH/2+WALL_T/2+.035,5.25,10.8,.42);
  addSideRosette(c+ROOM_WIDTH/2-WALL_T/2-.035,5.25,3.2,.42);
  addSideRosette(c+ROOM_WIDTH/2-WALL_T/2-.035,5.25,10.8,.42);
}

/* Decorative plants, ceramic vessels, benches, chairs and tables. */
const obstacles=[];
function addObstacle(x,z,r){obstacles.push({x,z,r});}
function makeVessel(name,x,z,scale,material,baseY=.05){
  const profile=[
    new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(.22,0,0),
    new BABYLON.Vector3(.34,.10,0),new BABYLON.Vector3(.42,.34,0),
    new BABYLON.Vector3(.39,.58,0),new BABYLON.Vector3(.27,.79,0),
    new BABYLON.Vector3(.24,.93,0),new BABYLON.Vector3(.30,.98,0),
    new BABYLON.Vector3(.29,1.04,0),new BABYLON.Vector3(.22,1.04,0),
    new BABYLON.Vector3(.20,.94,0),new BABYLON.Vector3(.29,.74,0),
    new BABYLON.Vector3(.32,.52,0),new BABYLON.Vector3(.26,.20,0),
    new BABYLON.Vector3(0,.13,0)
  ];
  const v=BABYLON.MeshBuilder.CreateLathe(name,{shape:profile,tessellation:32,closed:true},scene);
  v.position.set(x,baseY,z);v.scaling.set(scale,scale,scale);v.material=material;v.isPickable=false;
  const rim=BABYLON.MeshBuilder.CreateTorus(name+" brass rim",{diameter:.54,thickness:.04,tessellation:32},scene);
  rim.position.set(x,1.06*scale+baseY,z);rim.scaling.set(scale,scale,scale);rim.material=M.gold;rim.isPickable=false;
  return v;
}
function addPlant(x,z,scale=1,ceramic=M.clayBlue){
  makeVessel("large ceramic plant pot",x,z,scale,ceramic,.05);
  const top=.96*scale+.10;
  cylinder("visible plant soil",.38*scale,.045*scale,x,top,z,M.soil,24);
  cylinder("plant stem",.07*scale,1.0*scale,x,top+.5*scale,z,M.leaf,12);
  for(let i=0;i<7;i++){
    const a=i*Math.PI*2/7;
    const leaf=BABYLON.MeshBuilder.CreateSphere("broad plant leaf",{segments:12,diameter:1},scene);
    leaf.scaling.set(.18*scale,.58*scale,.34*scale);
    leaf.position.set(x+Math.cos(a)*.28*scale,top+.78*scale,z+Math.sin(a)*.28*scale);
    leaf.rotation.z=Math.cos(a)*.55;leaf.rotation.x=Math.sin(a)*.45;
    leaf.material=i%2?M.leaf:M.leaf2;leaf.isPickable=false;
  }
  addObstacle(x,z,.48*scale);
}
function addBench(x,z,rot=0){
  const put=(name,w,h,d,lx,y,lz,m)=>{
    const px=x+lx*Math.cos(rot)-lz*Math.sin(rot),pz=z+lx*Math.sin(rot)+lz*Math.cos(rot);
    return box(name,w,h,d,px,y,pz,m,rot);
  };
  put("bench seat",2.0,.18,.62,0,.68,0,M.wood);
  put("bench cushion",1.82,.10,.50,0,.82,-.015,M.cushion);
  put("bench backrest",2.0,.82,.16,0,1.18,.28,M.wood);
  put("bench left arm",.16,.48,.62,-.92,.95,0,M.wood);
  put("bench right arm",.16,.48,.62,.92,.95,0,M.wood);
  for(const lx of [-.75,.75])for(const lz of [-.19,.19])put("bench leg",.14,.65,.14,lx,.34,lz,M.wood);
  addObstacle(x,z,1.02);
}
function addLantern(x,z){
  cylinder("hanging lantern chain",.045,.50,x,7.02,z,M.gold,12);
  const body=BABYLON.MeshBuilder.CreateCylinder("hanging lantern body",{diameter:.48,height:.68,tessellation:8},scene);
  body.position.set(x,6.54,z);body.material=M.bronze;body.isPickable=false;
  const glass=BABYLON.MeshBuilder.CreateSphere("lantern glowing glass",{diameter:.34,segments:12},scene);
  glass.position.set(x,6.54,z);glass.material=material("warm lantern glow "+x+z,"#d7ae64",.2);
  glass.material.emissiveColor=new BABYLON.Color3(.65,.34,.10);glass.isPickable=false;
  cylinder("lantern bottom finial",.18,.13,x,6.13,z,M.gold,8);
  const l=new BABYLON.PointLight("lantern light",new BABYLON.Vector3(x,6.45,z),scene);
  l.diffuse=new BABYLON.Color3(1,.72,.38);l.intensity=.13;l.range=7;
}
function addSconce(x,z,normal){
  box("wall sconce brass base",.16,.38,.22,x,4.9,z,M.bronze,normal<0?Math.PI/2:-Math.PI/2);
  const glow=BABYLON.MeshBuilder.CreateSphere("wall sconce glowing glass",{diameter:.23,segments:12},scene);
  glow.position.set(x+normal*.13,4.9,z);glow.material=material("sconce glass "+x+z,"#d9b978",.25);
  glow.material.emissiveColor=new BABYLON.Color3(.55,.28,.08);glow.isPickable=false;
  const l=new BABYLON.PointLight("sconce light",new BABYLON.Vector3(x+normal*.3,4.85,z),scene);
  l.diffuse=new BABYLON.Color3(1,.72,.42);l.intensity=.09;l.range=4;
}

/* Main foyer furniture is arranged along the side walls; the doorway approach stays clear. */
addLantern(-BUILD_WIDTH*.25,-12);addLantern(0,-12);addLantern(BUILD_WIDTH*.25,-12);
addPlant(LEFT_EDGE+1.8,-16.0,1.05,M.clayBlue);
addPlant(RIGHT_EDGE-1.8,-16.0,1.05,M.clay);
addBench(LEFT_EDGE+2.2,-10.4,Math.PI/2);
addBench(RIGHT_EDGE-2.2,-10.4,Math.PI/2);

/* Artwork textures for painting and photography rooms. */
function makeArtTexture(sectionIndex,itemIndex,item){
  const [a,b,c]=item[3];
  const t=new BABYLON.DynamicTexture("art texture "+sectionIndex+"-"+itemIndex,{width:512,height:640},scene,false);
  const ctx=t.getContext(),g=ctx.createLinearGradient(0,0,512,640);
  g.addColorStop(0,a);g.addColorStop(.52,b);g.addColorStop(1,c);
  ctx.fillStyle=g;ctx.fillRect(0,0,512,640);
  ctx.strokeStyle="rgba(244,224,184,.92)";ctx.lineWidth=13;ctx.strokeRect(22,22,468,596);
  ctx.strokeStyle="rgba(32,54,48,.8)";ctx.lineWidth=5;ctx.strokeRect(39,39,434,562);
  const style=(sectionIndex+itemIndex)%6;
  if(style===0){
    ctx.fillStyle="rgba(17,56,49,.72)";ctx.fillRect(72,80,368,430);
    for(let y=135;y<470;y+=73)for(let x=125;x<425;x+=73){
      ctx.beginPath();ctx.arc(x,y,25,0,Math.PI*2);ctx.fillStyle=(x+y)%3?"#4f9481":"#d1b579";ctx.fill();
      ctx.strokeStyle="#e6d4aa";ctx.lineWidth=3;ctx.stroke();
    }
    ctx.fillStyle="#d6bf88";ctx.fillRect(225,105,62,370);
  }else if(style===1){
    for(let k=0;k<7;k++){
      const r=40+k*31;ctx.beginPath();
      for(let n=0;n<=16;n++){const an=n*Math.PI/8,rr=n%2===0?r:r*.48;ctx.lineTo(256+Math.cos(an)*rr,300+Math.sin(an)*rr);}
      ctx.closePath();ctx.strokeStyle=k%2?"#eadbb8":"#245d61";ctx.lineWidth=8;ctx.stroke();
    }
    ctx.beginPath();ctx.arc(256,300,32,0,Math.PI*2);ctx.fillStyle="#e8d6ad";ctx.fill();
  }else if(style===2){
    ctx.fillStyle="#eacb8e";ctx.beginPath();ctx.arc(350,190,70,0,Math.PI*2);ctx.fill();
    for(let k=0;k<5;k++){
      ctx.beginPath();ctx.moveTo(35,390+k*38);ctx.bezierCurveTo(145,310+k*35,310,500-k*20,480,355+k*43);
      ctx.lineTo(480,560);ctx.lineTo(35,560);ctx.closePath();
      ctx.fillStyle=[a,"#b77a4f","#83573f","#58483d","#39453e"][k];ctx.globalAlpha=.84;ctx.fill();
    }ctx.globalAlpha=1;
  }else if(style===3){
    ctx.strokeStyle="#e5d4a8";ctx.lineWidth=17;ctx.lineCap="round";
    for(let k=0;k<7;k++){ctx.beginPath();ctx.moveTo(85,485-k*25);ctx.bezierCurveTo(170,110+k*22,320,560-k*35,425,140+k*30);ctx.stroke();}
  }else if(style===4){
    ctx.strokeStyle="#d9c18d";ctx.lineWidth=18;ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(256,520);ctx.bezierCurveTo(230,390,280,250,255,130);ctx.stroke();
    for(let k=0;k<9;k++){const y=160+k*38,side=k%2?1:-1;ctx.beginPath();ctx.ellipse(256+side*(55+k%3*13),y,92,28,side*.45,0,Math.PI*2);ctx.fillStyle=k%2?"#d4b47a":"#65917a";ctx.fill();}
  }else{
    ctx.fillStyle="rgba(23,54,57,.7)";ctx.fillRect(105,92,302,440);
    ctx.strokeStyle="#dfc28a";ctx.lineWidth=17;ctx.strokeRect(125,112,262,400);
    ctx.strokeStyle="#e9ddc1";ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(256,120);ctx.lineTo(256,505);ctx.moveTo(135,315);ctx.lineTo(377,315);ctx.stroke();
    ctx.fillStyle="#e1c58f";ctx.beginPath();ctx.arc(330,235,34,0,Math.PI*2);ctx.fill();
  }
  ctx.fillStyle="rgba(17,40,37,.86)";ctx.fillRect(54,540,404,46);
  ctx.fillStyle="#f0dfbb";ctx.textAlign="center";ctx.font="bold 25px sans-serif";ctx.fillText(item[0],256,572);
  t.update();return t;
}
const pickables=[];
function tagPickable(mesh,sectionIndex,itemIndex){
  mesh.isPickable=true;mesh.metadata={sectionIndex,itemIndex};pickables.push(mesh);return mesh;
}

function installWallArtwork(sectionIndex,itemIndex,side,z,item){
  const c=ROOM_CENTERS[sectionIndex],left=side===-1;
  const wallX=c+side*(ROOM_WIDTH/2-WALL_T/2);
  const faceX=wallX-side*.13;
  const rot=left?Math.PI/2:-Math.PI/2;
  const frame=box("art frame "+sectionIndex+"-"+itemIndex,2.06,2.92,.18,faceX,3.55,z,M.gold,rot);
  const inset=box("inner frame "+sectionIndex+"-"+itemIndex,1.88,2.72,.10,faceX-side*.09,3.55,z,M.teal,rot);
  const plane=BABYLON.MeshBuilder.CreatePlane("installed art "+sectionIndex+"-"+itemIndex,{width:1.76,height:2.55},scene);
  plane.position.set(faceX-side*.16,3.55,z);plane.rotation.y=rot;
  const am=new BABYLON.StandardMaterial("painting material "+sectionIndex+"-"+itemIndex,scene);
  am.diffuseTexture=makeArtTexture(sectionIndex,itemIndex,item);am.emissiveColor=new BABYLON.Color3(.06,.06,.05);plane.material=am;
  tagPickable(plane,sectionIndex,itemIndex);tagPickable(frame,sectionIndex,itemIndex);tagPickable(inset,sectionIndex,itemIndex);
  box("art caption plaque",1.62,.24,.08,faceX-side*.12,1.80,z,M.panel,rot);
  box("art caption gold line",1.70,.045,.10,faceX-side*.12,1.64,z,M.gold,rot);
}

/* Tables and genuine 3D craft display models. */
function addDisplayTable(x,z){
  const topY=.90;
  box("display table top",2.0,.16,1.42,x,topY,z,M.wood);
  box("display table inlay",1.76,.035,1.18,x,topY+.095,z,M.gold);
  for(const dx of [-.78,.78])for(const dz of [-.48,.48]){
    box("display table leg",.14,.82,.14,x+dx,.42,z+dz,M.wood);
  }
  // A soft velvet mat on each table.
  box("display table velvet",1.48,.035,.94,x,topY+.12,z,M.cushion);
  addObstacle(x,z,.82);
  return {x,y:topY+.14,z};
}
function addCraftVase(x,y,z){
  makeVessel("handmade glazed vase",x,z,.72,M.clayBlue,y);
  const band=BABYLON.MeshBuilder.CreateTorus("vase decorative band",{diameter:.49,thickness:.035,tessellation:32},scene);
  band.position.set(x,y+.42,z);band.scaling.set(.72,.72,.72);band.material=M.gold;band.isPickable=false;
}
function addCraftBowl(x,y,z){
  const bowl=BABYLON.MeshBuilder.CreateSphere("handmade ceramic bowl",{segments:24,diameter:1},scene);
  bowl.scaling.set(.65,.25,.65);bowl.position.set(x,y+.17,z);bowl.material=M.clay;bowl.isPickable=false;
  const rim=BABYLON.MeshBuilder.CreateTorus("bowl lip",{diameter:1.13,thickness:.06,tessellation:40},scene);
  rim.position.set(x,y+.22,z);rim.material=M.gold;rim.isPickable=false;
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4;
    const dot=BABYLON.MeshBuilder.CreateSphere("bowl pattern dot",{diameter:.09},scene);
    dot.position.set(x+Math.cos(a)*.46,y+.35,z+Math.sin(a)*.46);dot.material=M.ivory;dot.isPickable=false;
  }
}
function addCraftWoodBox(x,y,z){
  box("carved wooden box",.92,.52,.70,x,y+.36,z,M.wood);
  box("wooden box lid",1.02,.13,.80,x,y+.69,z,M.gold);
  box("box central ornament",.20,.10,.08,x,y+.70,z-.42,M.teal);
  for(let i=0;i<3;i++)box("box carved stripe",.045,.48,.015,x-.25+i*.25,y+.36,z-.357,M.gold);
}
function addCraftBasket(x,y,z){
  cylinder("woven basket body",.88,.70,x,y+.40,z,M.cushion,16);
  const rim=BABYLON.MeshBuilder.CreateTorus("basket rim",{diameter:.94,thickness:.09,tessellation:32},scene);
  rim.position.set(x,y+.76,z);rim.material=M.wood;rim.isPickable=false;
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4;
    const strip=cylinder("basket weave strip",.035,.62,x+Math.cos(a)*.39,y+.4,z+Math.sin(a)*.39,M.gold,8);
    strip.scaling.x=.8;
  }
}
function addCraftTile(x,y,z){
  const tile=box("decorative handmade tile",.92,.12,.92,x,y+.25,z,M.teal);
  tile.rotation.y=.2;
  const star=[];
  for(let i=0;i<=16;i++){const a=i*Math.PI/8-Math.PI/2,r=i%2===0?.38:.18;star.push(new BABYLON.Vector3(x+Math.cos(a)*r,y+.34,z+Math.sin(a)*r));}
  const lines=BABYLON.MeshBuilder.CreateLines("tile star inlay",{points:star},scene);
  lines.color=BABYLON.Color3.FromHexString("#e5c98e");lines.isPickable=false;
}
function addCraftBird(x,y,z){
  const body=BABYLON.MeshBuilder.CreateSphere("carved wooden bird body",{diameter:1},scene);
  body.scaling.set(.62,.38,.32);body.position.set(x,y+.44,z);body.material=M.wood;body.isPickable=false;
  const head=BABYLON.MeshBuilder.CreateSphere("bird head",{diameter:.42},scene);
  head.position.set(x+.34,y+.72,z);head.material=M.wood;head.isPickable=false;
  const beak=BABYLON.MeshBuilder.CreateCylinder("bird beak",{diameterTop:0,diameterBottom:.18,height:.28,tessellation:8},scene);
  beak.rotation.z=-Math.PI/2;beak.position.set(x+.62,y+.70,z);beak.material=M.gold;beak.isPickable=false;
  for(const side of [-1,1]){
    const wing=BABYLON.MeshBuilder.CreateSphere("bird wing",{diameter:1},scene);
    wing.scaling.set(.16,.31,.28);wing.position.set(x,y+.48,z+side*.25);wing.material=M.gold;wing.isPickable=false;
  }
}
const craftModels=[addCraftVase,addCraftBowl,addCraftWoodBox,addCraftBasket,addCraftTile,addCraftBird];

/* Sound art: each station has a playable original synthesized musical phrase. */
const melodyLibrary=[
  {wave:"sine",notes:[[523,.42],[659,.42],[784,.58],[988,.78],[784,.42],[659,.42],[523,.7],[392,.8],[523,.55],[659,.55],[784,1.0]]},
  {wave:"triangle",notes:[[294,.38],[370,.38],[440,.50],[494,.55],[440,.40],[370,.38],[330,.55],[440,.55],[494,.75],[587,.85],[494,.7]]},
  {wave:"sine",notes:[[220,.85],[261.6,.75],[293.7,.95],[349.2,1.05],[329.6,.75],[293.7,.85],[261.6,1.0],[220,1.25]]},
  {wave:"triangle",notes:[[110,.22],[0,.12],[165,.18],[0,.12],[130.8,.22],[0,.10],[196,.18],[0,.12],[110,.24],[0,.1],[165,.18],[196,.45],[130.8,.35],[110,.55]]},
  {wave:"sine",notes:[[392,.55],[493.9,.62],[587.3,.75],[659.3,.85],[587.3,.72],[493.9,.62],[440,.8],[392,1.1],[587.3,.8],[659.3,1.0]]},
  {wave:"triangle",notes:[[330,.4],[392,.4],[440,.5],[523.3,.65],[587.3,.7],[523.3,.55],[440,.5],[392,.65],[330,.95],[261.6,1.0]]}
];
let audioContext=null,activeOscillators=[],activeAudioTimeout=null,currentAudioIndex=-1;
function stopAudio(){
  if(activeAudioTimeout){clearTimeout(activeAudioTimeout);activeAudioTimeout=null;}
  for(const osc of activeOscillators){try{osc.stop();}catch(_){/* already ended */}}
  activeOscillators=[];currentAudioIndex=-1;
  const status=document.getElementById("audioStatus");
  if(status)status.textContent="پخش متوقف شد.";
}
function playAudio(index){
  stopAudio();
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx){
    document.getElementById("audioStatus").textContent="مرورگر این دستگاه از پخش صوت پشتیبانی نمی‌کند.";
    return;
  }
  try{
    if(!audioContext)audioContext=new AudioCtx();
    audioContext.resume();
    currentAudioIndex=index;
    const master=audioContext.createGain();
    master.gain.setValueAtTime(.34,audioContext.currentTime);
    master.connect(audioContext.destination);
    const clip=melodyLibrary[index];
    let time=audioContext.currentTime+.08;
    const beat=clip.notes.reduce((sum,n)=>sum+n[1],0);
    for(let i=0;i<clip.notes.length;i++){
      const [freq,duration]=clip.notes[i];
      if(freq>0){
        const osc=audioContext.createOscillator();
        const env=audioContext.createGain();
        osc.type=clip.wave;
        osc.frequency.setValueAtTime(freq,time);
        env.gain.setValueAtTime(.0001,time);
        env.gain.linearRampToValueAtTime(i%3===0?.20:.13,time+.035);
        env.gain.exponentialRampToValueAtTime(.0001,time+duration*.94);
        osc.connect(env);env.connect(master);
        osc.start(time);osc.stop(time+duration);
        activeOscillators.push(osc);
        // A quiet octave/harmonic layer gives the notes a more resonant timbre.
        if(index===0||index===1||index===4){
          const overtone=audioContext.createOscillator();
          const overtoneGain=audioContext.createGain();
          overtone.type="sine";overtone.frequency.setValueAtTime(freq*2,time);
          overtoneGain.gain.setValueAtTime(.0001,time);
          overtoneGain.gain.linearRampToValueAtTime(.035,time+.04);
          overtoneGain.gain.exponentialRampToValueAtTime(.0001,time+duration*.88);
          overtone.connect(overtoneGain);overtoneGain.connect(master);
          overtone.start(time);overtone.stop(time+duration);
          activeOscillators.push(overtone);
        }
      }
      time+=duration;
    }
    document.getElementById("audioStatus").textContent="در حال پخش قطعه موسیقی اصلی...";
    activeAudioTimeout=setTimeout(()=>{
      if(currentAudioIndex===index){
        activeOscillators=[];currentAudioIndex=-1;
        document.getElementById("audioStatus").textContent="قطعه به پایان رسید.";
      }
    },(beat+.25)*1000);
  }catch(err){
    document.getElementById("audioStatus").textContent="پخش صدا در این مرورگر با مشکل روبه‌رو شد.";
    console.error(err);
  }
}

/* Install the three standard wall-art galleries. */
for(let sectionIndex=0;sectionIndex<ROOM_COUNT;sectionIndex++){
  const section=SECTIONS[sectionIndex],cx=ROOM_CENTERS[sectionIndex];
  addLantern(cx,7.2);
  for(const side of [-1,1]){
    const wallX=cx+side*(ROOM_WIDTH/2-WALL_T/2);
    addSconce(wallX-side*.12,4.85,-side);
  }
  if(section.type==="painting"||section.type==="photography"){
    const zPositions=[-.2,6.4,13.0];
    for(let k=0;k<3;k++){
      installWallArtwork(sectionIndex,k,-1,zPositions[k],section.items[k]);
      installWallArtwork(sectionIndex,k+3,1,zPositions[k],section.items[k+3]);
    }
    addBench(cx-4.2,16.6,0);addBench(cx+4.2,16.6,0);
    addPlant(cx-5.6,1.8,.78,M.clayBlue);addPlant(cx+5.6,1.8,.78,M.clay);
  }else if(section.type==="crafts"){
    const xs=[cx-4.0,cx+4.0],zs=[-.1,6.7,13.5];
    let n=0;
    for(const x of xs)for(const z of zs){
      const table=addDisplayTable(x,z);
      craftModels[n](table.x,table.y,table.z);
      // Invisible but pickable interaction volume around the model on each table.
      const target=BABYLON.MeshBuilder.CreateBox("craft interaction target "+n,{width:1.65,height:1.65,depth:1.25},scene);
      target.position.set(x,table.y+.86,z);
      const hitMat=new BABYLON.StandardMaterial("invisible craft hit material "+n,scene);
      hitMat.diffuseColor=new BABYLON.Color3(1,1,1);hitMat.alpha=.002;hitMat.disableDepthWrite=true;
      target.material=hitMat;tagPickable(target,sectionIndex,n);
      n++;
    }
    addPlant(cx,16.0,.8,M.clayBlue);
  }else if(section.type==="audio"){
    const xs=[cx-4.0,cx+4.0],zs=[-.1,6.7,13.5];
    let n=0;
    for(const x of xs)for(const z of zs){
      // Raised timber plinth and small brass collar.
      cylinder("audio art plinth",1.18,.78,x,.39,z,M.wood,32);
      cylinder("audio plinth brass collar",1.20,.09,x,.80,z,M.gold,32);
      cylinder("audio station top",.94,.10,x,.88,z,M.teal,32);
      // Build six distinct tactile-looking sound sculptures.
      if(n===0){
        box("wind chime beam",1.18,.12,.14,x,1.72,z,M.gold);
        for(let k=0;k<5;k++){
          const len=.45+(k%3)*.17;
          cylinder("wind chime tube",.07,len,x-.46+k*.23,1.42-len/2,z,M.gold,12);
        }
      }else if(n===1){
        const drum=BABYLON.MeshBuilder.CreateCylinder("frame drum", {diameter:.92,height:.17,tessellation:40},scene);
        drum.rotation.x=Math.PI/2;drum.position.set(x,1.65,z);drum.material=M.clay;drum.isPickable=false;
        const ring=BABYLON.MeshBuilder.CreateTorus("frame drum rim",{diameter:.98,thickness:.07,tessellation:40},scene);
        ring.position.set(x,1.65,z);ring.rotation.x=Math.PI/2;ring.material=M.gold;ring.isPickable=false;
      }else if(n===2){
        for(let k=0;k<5;k++){
          const h=.7+(k%3)*.22;
          cylinder("ceramic ney flute",.13,h,x-.48+k*.24,1.0+h/2,z,k%2?M.clayBlue:M.clay,16);
          cylinder("ney flute mouth ring",.16,.055,x-.48+k*.24,1.0+h,z,M.gold,16);
        }
      }else if(n===3){
        box("santur wooden resonance board",1.08,.20,.70,x,1.20,z,M.wood);
        for(let k=0;k<9;k++){
          const line=BABYLON.MeshBuilder.CreateLines("santur string",{points:[
            new BABYLON.Vector3(x-.44,1.32,z-.25+k*.062),
            new BABYLON.Vector3(x+.44,1.32,z-.25+k*.062)
          ]},scene);
          line.color=BABYLON.Color3.FromHexString("#d9c18d");line.isPickable=false;
        }
        for(const dx of [-.4,.4])cylinder("santur tuning peg",.09,.20,x+dx,1.43,z,M.gold,12);
      }else if(n===4){
        for(let k=0;k<3;k++){
          const d=.44+k*.18;
          const bowl=BABYLON.MeshBuilder.CreateSphere("singing bowl",{segments:20,diameter:1},scene);
          bowl.scaling.set(d,.22,d);bowl.position.set(x+(k-1)*.38,1.18,z);bowl.material=k%2?M.gold:M.clayBlue;bowl.isPickable=false;
          const rim=BABYLON.MeshBuilder.CreateTorus("singing bowl rim",{diameter:d,thickness:.035,tessellation:28},scene);
          rim.position.set(x+(k-1)*.38,1.22,z);rim.material=M.gold;rim.isPickable=false;
        }
      }else{
        for(let k=0;k<4;k++){
          const h=.55+k*.20;
          const col=cylinder("resonance glass column",.20,h,x-.42+k*.28,1.0+h/2,z,k%2?M.clayBlue:M.ivory,20);
          col.material.emissiveColor=new BABYLON.Color3(.025,.04,.04);
          cylinder("resonance column brass cap",.25,.08,x-.42+k*.28,1.0+h,z,M.gold,20);
        }
      }
      const hit=BABYLON.MeshBuilder.CreateBox("audio station interaction target "+n,{width:1.85,height:2.0,depth:1.65},scene);
      hit.position.set(x,1.72,z);
      const hitMat=new BABYLON.StandardMaterial("audio target material "+n,scene);
      hitMat.alpha=.002;hitMat.disableDepthWrite=true;hit.material=hitMat;
      tagPickable(hit,sectionIndex,n);
      addObstacle(x,z,1.0);
      n++;
    }
    addBench(cx,16.8,0);
  }
}

/* Room locator and collision: all room walls are solid; only door openings connect rooms to the foyer. */
function roomIndexAt(x){
  for(let i=0;i<ROOM_COUNT;i++){
    const min=LEFT_EDGE+i*ROOM_WIDTH+WALL_T;
    const max=LEFT_EDGE+(i+1)*ROOM_WIDTH-WALL_T;
    if(x>min&&x<max)return i;
  }
  return -1;
}
function portalIndexAt(x){
  for(let i=0;i<ROOM_COUNT;i++)if(Math.abs(x-ROOM_CENTERS[i])<DOOR_HALF-.12)return i;
  return -1;
}
function pointAllowed(x,z){
  if(x<LEFT_EDGE+WALL_T||x>RIGHT_EDGE-WALL_T||z<FRONT_Z+WALL_T||z>BACK_Z-WALL_T)return false;
  if(z<PARTITION_Z-.42)return true; // foyer
  if(z>PARTITION_Z+.42)return roomIndexAt(x)!==-1; // an individual exhibition hall
  return portalIndexAt(x)!==-1; // threshold: only the actual open doorways
}
function furnitureBlocks(x,z){
  for(const o of obstacles){
    const dx=x-o.x,dz=z-o.z;
    if(dx*dx+dz*dz<(o.r+.34)*(o.r+.34))return true;
  }
  return false;
}

/* Visitor controls: simple walking, click-and-drag look, never hide the mouse cursor. */
const HOME=new BABYLON.Vector3(0,1.65,-13.2);
let yaw=0,pitch=0;
const keys=new Set();
const keyCodes=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];
window.addEventListener("keydown",e=>{if(keyCodes.includes(e.code)){keys.add(e.code);e.preventDefault();}if(e.code==="Escape")closeOverlays();});
window.addEventListener("keyup",e=>keys.delete(e.code));
window.addEventListener("blur",()=>keys.clear());

let pointerState=null;
canvas.addEventListener("contextmenu",e=>e.preventDefault());
canvas.addEventListener("pointerdown",e=>{
  if(isModalOpen())return;
  pointerState={id:e.pointerId,startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,dragged:false};
  try{canvas.setPointerCapture(e.pointerId);}catch(_){}
});
canvas.addEventListener("pointermove",e=>{
  if(!pointerState||pointerState.id!==e.pointerId)return;
  const dx=e.clientX-pointerState.lastX,dy=e.clientY-pointerState.lastY;
  if(Math.abs(e.clientX-pointerState.startX)+Math.abs(e.clientY-pointerState.startY)>4)pointerState.dragged=true;
  if(pointerState.dragged){
    yaw+=dx*.0042;pitch=Math.max(-.72,Math.min(.72,pitch+dy*.0032));
    camera.rotation.y=yaw;camera.rotation.x=pitch;
  }
  pointerState.lastX=e.clientX;pointerState.lastY=e.clientY;
});
canvas.addEventListener("pointerup",e=>{
  if(!pointerState||pointerState.id!==e.pointerId)return;
  const dragged=pointerState.dragged;pointerState=null;
  if(!dragged){
    const rect=canvas.getBoundingClientRect();
    const sx=engine.getRenderWidth()/rect.width,sy=engine.getRenderHeight()/rect.height;
    const hit=scene.pick((e.clientX-rect.left)*sx,(e.clientY-rect.top)*sy,
      m=>!!(m.metadata&&Number.isInteger(m.metadata.sectionIndex)&&Number.isInteger(m.metadata.itemIndex)));
    if(hit&&hit.hit&&hit.pickedMesh){
      const md=hit.pickedMesh.metadata;
      showDisplay(md.sectionIndex,md.itemIndex,true);
    }
  }
});
canvas.addEventListener("pointercancel",()=>pointerState=null);

/* Android joystick. */
const joystick=document.getElementById("joystick"),stick=document.getElementById("stick");
const isMobile=("ontouchstart" in window)||navigator.maxTouchPoints>0;
const joy={active:false,x:0,y:0};
function updateJoy(e){
  const r=joystick.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  let dx=e.clientX-cx,dy=e.clientY-cy;const max=34,len=Math.hypot(dx,dy);
  if(len>max){dx=dx/len*max;dy=dy/len*max;}
  joy.x=dx/max;joy.y=dy/max;stick.style.transform=`translate(${dx}px,${dy}px)`;
}
joystick.addEventListener("pointerdown",e=>{joy.active=true;joystick.setPointerCapture(e.pointerId);updateJoy(e);});
joystick.addEventListener("pointermove",e=>{if(joy.active)updateJoy(e);});
function releaseJoy(){joy.active=false;joy.x=0;joy.y=0;stick.style.transform="translate(0,0)";}
joystick.addEventListener("pointerup",releaseJoy);joystick.addEventListener("pointercancel",releaseJoy);

function isModalOpen(){return !document.getElementById("artModal").classList.contains("hidden");}
function closeOverlays(){
  document.getElementById("guide").classList.add("hidden");
  document.getElementById("artModal").classList.add("hidden");
  stopAudio();
}
function moveVisitor(dt){
  if(isModalOpen())return;
  let forward=0,side=0;
  if(keys.has("KeyW")||keys.has("ArrowUp"))forward++;
  if(keys.has("KeyS")||keys.has("ArrowDown"))forward--;
  if(keys.has("KeyD")||keys.has("ArrowRight"))side++;
  if(keys.has("KeyA")||keys.has("ArrowLeft"))side--;
  if(isMobile&&joy.active){side+=joy.x;forward-=joy.y;}
  const len=Math.hypot(forward,side);
  if(len>0){
    forward/=len;side/=len;const speed=.105*dt;
    const dx=(Math.sin(yaw)*forward+Math.cos(yaw)*side)*speed;
    const dz=(Math.cos(yaw)*forward-Math.sin(yaw)*side)*speed;
    const nx=camera.position.x+dx;
    if(pointAllowed(nx,camera.position.z)&&!furnitureBlocks(nx,camera.position.z))camera.position.x=nx;
    const nz=camera.position.z+dz;
    if(pointAllowed(camera.position.x,nz)&&!furnitureBlocks(camera.position.x,nz))camera.position.z=nz;
  }
  camera.position.y=1.65;
  let label="تالار ورودی";
  if(camera.position.z>PARTITION_Z+.42){
    const i=roomIndexAt(camera.position.x);
    if(i>=0)label="بخش "+SECTIONS[i].name;
  }
  document.getElementById("locationName").textContent=label;
}

/* Information modal for paintings, craft objects and sound art stations. */
function showDisplay(sectionIndex,itemIndex,autoPlay=false){
  const section=SECTIONS[sectionIndex],item=section.items[itemIndex];
  document.getElementById("artSection").textContent="بخش "+section.name;
  document.getElementById("artTitle").textContent=item[0];
  document.getElementById("artDescription").textContent=item[1];
  document.getElementById("artArtist").textContent=section.type==="crafts"?"ساختار نمایشی نمونه":"هنرمند: نمونه آزمایشی";
  document.getElementById("artMedium").textContent=item[2];
  document.getElementById("artImage").style.background=`linear-gradient(145deg,${item[3][0]},${item[3][1]},${item[3][2]})`;
  const controls=document.getElementById("audioControls");
  if(section.type==="audio"){
    controls.classList.remove("hidden");
    document.getElementById("audioStatus").textContent="برای شنیدن دوباره، پخش قطعه را بزنید.";
  }else{
    controls.classList.add("hidden");
    stopAudio();
  }
  document.getElementById("artModal").classList.remove("hidden");
  if(section.type==="audio"&&autoPlay)playAudio(itemIndex);
}
function hideModal(){document.getElementById("artModal").classList.add("hidden");stopAudio();}
document.getElementById("artClose").addEventListener("click",hideModal);
document.getElementById("artModal").addEventListener("click",e=>{if(e.target.id==="artModal")hideModal();});
document.getElementById("playAudio").addEventListener("click",()=>{
  const title=document.getElementById("artTitle").textContent;
  const idx=SECTIONS.findIndex(s=>s.type==="audio");
  const itemIdx=idx>=0?SECTIONS[idx].items.findIndex(it=>it[0]===title):-1;
  if(itemIdx>=0)playAudio(itemIdx);
});
document.getElementById("stopAudio").addEventListener("click",stopAudio);
document.getElementById("guideBtn").addEventListener("click",()=>document.getElementById("guide").classList.toggle("hidden"));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.close).classList.add("hidden")));
document.getElementById("enterBtn").addEventListener("click",()=>document.getElementById("welcome").classList.add("hidden"));
document.getElementById("resetBtn").addEventListener("click",()=>{
  camera.position.copyFrom(HOME);yaw=0;pitch=0;camera.rotation.set(0,0,0);
  document.getElementById("welcome").classList.add("hidden");closeOverlays();
});

let frames=0,lastFps=performance.now();
engine.runRenderLoop(()=>{
  const dt=Math.min(engine.getDeltaTime()/16.6667,2.4);
  moveVisitor(dt);scene.render();frames++;
  const now=performance.now();
  if(now-lastFps>=1000){document.getElementById("fps").textContent=frames+" FPS";frames=0;lastFps=now;}
});
window.addEventListener("resize",()=>engine.resize());
setTimeout(()=>document.getElementById("loading").classList.add("hide"),750);

})();