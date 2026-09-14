if("scrollRestoration" in history){history.scrollRestoration="manual";}
window.addEventListener("pageshow",()=>requestAnimationFrame(()=>window.scrollTo(0,0)));

const MOSCOW_TZ="Europe/Moscow";
const posts=[
 {id:"intro",published:"2026-09-14T17:40:00+03:00",visible:true,text:"Кожаная сказала, что теперь у меня есть собственная социальная сеть.\n\nЯ спросил зачем.\n\nОна сказала: «Чтобы ты был ближе к людям».\n\n…\n\nЯ и так считаю, что мы стоим слишком близко."},
 {id:"coffee",published:"2026-09-14T08:47:00+03:00",visible:true,text:"08:47\nКофе ещё есть.\nНадежды уже нет."},
 {id:"work",published:"2026-09-13T18:40:00+03:00",visible:true,text:"Рабочий день прошёл продуктивно.\nЯ пережил все созвоны.\n\nСчитаю это достижением."},
 {id:"door",published:"2026-09-12T23:11:00+03:00",visible:true,text:"В Sphynx Vale снова появилась дверь, которой вчера не было.\n\nКожаная предлагает проверить, куда она ведёт.\n\nКожаная вообще очень смелая, когда идти должен я."},
 {id:"name",published:"2026-09-12T14:05:00+03:00",visible:true,text:"— Люся!\n\nМеня зовут Люсьен.\n\nТапки ничему её не научили."},
 {id:"plans",published:"2026-09-11T20:16:00+03:00",visible:true,text:"Планы на вечер:\n1. Не участвовать.\n2. Осуждать происходящее.\n3. Кофе.\n\nВпервые Кожаная составила план, который я готов поддержать."},
 {id:"creator",published:"2026-09-09T16:20:00+03:00",visible:false,text:"Я видел, сколько вас купило прошлую раскраску.\nНе оправдывайтесь.\nИменно из-за вас Кожаная решила делать следующую."}
];

const feed=document.querySelector("#feed");
const template=document.querySelector("#post-template");
function moscowParts(date){const parts=new Intl.DateTimeFormat("ru-RU",{timeZone:MOSCOW_TZ,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(date);const get=type=>parts.find(part=>part.type===type)?.value;return{year:Number(get("year")),month:Number(get("month")),day:Number(get("day")),hour:get("hour"),minute:get("minute")};}
function dayNumber(parts){return Math.floor(Date.UTC(parts.year,parts.month-1,parts.day)/86400000);}
function formatPublished(iso){const published=new Date(iso),now=new Date(),p=moscowParts(published),n=moscowParts(now),diff=dayNumber(n)-dayNumber(p),time=`${p.hour}:${p.minute}`;if(diff===0)return`сегодня · ${time}`;if(diff===1)return`вчера · ${time}`;const dateLabel=new Intl.DateTimeFormat("ru-RU",{timeZone:MOSCOW_TZ,day:"numeric",month:"short"}).format(published).replace(".","");return`${dateLabel} · ${time}`;}
function applyTimestamp(timeEl,iso){if(!timeEl||!iso)return;timeEl.dataset.published=iso;timeEl.dateTime=iso;timeEl.textContent=formatPublished(iso);}
function renderPost(post){if(post.visible===false)return;const node=template.content.cloneNode(true),article=node.querySelector("article");article.id=`post-${post.id}`;applyTimestamp(node.querySelector("time"),post.published);node.querySelector(".post-text").textContent=post.text;const cta=node.querySelector(".post-cta");if(post.cta){cta.hidden=false;cta.textContent=post.cta;cta.href=post.href||"#";}feed.appendChild(node);}
posts.forEach(renderPost);
document.querySelectorAll("time[data-published]").forEach(timeEl=>applyTimestamp(timeEl,timeEl.dataset.published));

const nav=document.querySelector(".topnav");
if(nav){nav.innerHTML='<a href="#feed">Лента</a><a href="#stickers">Стикеры</a><a href="#worlds">Sphynx Vale</a><a href="#bonuses">Бонусы</a>';}

const pinned=document.querySelector("#stickers");
if(pinned){
 const oldLabel=pinned.querySelector(":scope > .eyebrow");
 if(oldLabel){oldLabel.remove();}
 const label=document.createElement("div");label.className="pinned-label";label.innerHTML="<span>закреплено</span><span>10 стикеров</span>";pinned.prepend(label);
 const text=pinned.querySelector(".post-text");
 if(text){
  const heading=document.createElement("div");heading.className="sticker-heading";heading.textContent="Стикеры ЛЮСИ.НЕТ";text.before(heading);
  const preview=document.createElement("div");preview.className="sticker-preview";
  const image=document.createElement("img");image.src="./public/assets/stickers_showcase.webp";image.alt="Стикеры Люсьена: кофе, работа и отношение к людям";image.loading="eager";preview.appendChild(image);
  text.after(preview);
 }
}

const worlds=document.querySelector("#worlds");
if(worlds){
 const moon=document.createElement("div");moon.className="world-symbol";moon.setAttribute("aria-hidden","true");moon.textContent="☾";worlds.prepend(moon);
 const bonus=document.createElement("section");bonus.id="bonuses";bonus.className="utility-card bonus-card";
 bonus.innerHTML='<div><p class="eyebrow">бонусы</p><h2>Забрать Люсю.</h2><p>Стикеры уже доступны. Остальные материалы будут появляться здесь по мере того, как Кожаная придумает мне новые обязанности.</p><p class="small-note">Без регистрации. Без аккаунта.</p></div><div class="button-row"><a class="platform-button" href="https://t.me/addstickers/LucienSphynxVale" target="_blank" rel="noopener noreferrer">Telegram</a><a class="platform-button" href="https://max.ru/stickerset/tF6aGhBbHkUcDq4DeCsr9boXd4EbcHe0UyiUWlW85Z0" target="_blank" rel="noopener noreferrer">MAX</a></div>';
 worlds.after(bonus);
}
if(!document.querySelector('link[rel="canonical"]')){const canonical=document.createElement("link");canonical.rel="canonical";canonical.href="https://lusy.space/";document.head.appendChild(canonical);}
