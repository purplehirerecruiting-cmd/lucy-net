const reactionTypes=["Ну конечно","Осуждаю","Жизненно","Нужен кофе","Пиздец"];
const posts=[
{id:"intro",date:"сегодня · 14:37",text:"Кожаная сказала, что теперь у меня есть собственная социальная сеть.\n\nЯ спросил зачем.\n\nОна сказала: «Для продвижения».\n\n…\n\nДаже здесь работать."},
{id:"coffee",date:"сегодня · 08:47",text:"08:47\nКофе ещё есть.\nНадежды уже нет."},
{id:"stickers",date:"вчера · 19:12",text:"Меня превратили в стикеры.\nНаконец-то можно молча осуждать людей дистанционно.",cta:"Забрать Люсю →",href:"#stickers"},
{id:"mini-human-1",date:"вчера · 17:03",text:"МЕНЯ ОПЯТЬ НАРИСОВАЛИ #01\n\nМини Человек выдал мне новый портрет.\nСпросил, почему я фиолетовый.\nМне сообщили: «Так красивее».\nАргументация исчерпывающая."},
{id:"work",date:"12 сент. · 18:40",text:"Рабочий день прошёл продуктивно.\nНикого не убил."},
{id:"creator",date:"11 сент. · 16:20",text:"Я видел, сколько вас купило прошлую раскраску.\nНе оправдывайтесь.\nИменно из-за вас Кожаная решила делать следующую."}
];
const feed=document.querySelector("#feed");
const template=document.querySelector("#post-template");

function keyFor(postId){return `lucy-reaction:${postId}`}
function countKey(postId,type){return `lucy-count:${postId}:${type}`}
function getCount(postId,type,index){const stored=localStorage.getItem(countKey(postId,type));return stored?Number(stored):[17,23,41,29,12][index]}
function setCount(postId,type,value){localStorage.setItem(countKey(postId,type),String(Math.max(0,value)))}

function renderPost(post){
 const node=template.content.cloneNode(true);
 const article=node.querySelector("article");article.id=`post-${post.id}`;
 node.querySelector("time").textContent=post.date;
 node.querySelector(".post-text").textContent=post.text;
 const cta=node.querySelector(".post-cta");
 if(post.cta){cta.hidden=false;cta.textContent=post.cta;cta.href=post.href||"#"}
 const reactions=node.querySelector(".reactions");
 const selected=localStorage.getItem(keyFor(post.id));
 reactionTypes.forEach((type,index)=>{
  const b=document.createElement("button");b.type="button";b.className="reaction";b.dataset.reaction=type;
  if(selected===type)b.classList.add("active");
  b.innerHTML=`<span class="reaction-label">${type}</span><span class="reaction-count">${getCount(post.id,type,index)}</span>`;
  b.addEventListener("click",()=>chooseReaction(post.id,type,reactions));
  reactions.appendChild(b);
 });
 const share=node.querySelector(".share-button");
 share.addEventListener("click",async()=>{
  const url=`${location.origin}${location.pathname}#post-${post.id}`;
  try{if(navigator.share){await navigator.share({title:"ЛЮСИ.НЕТ",text:post.text,url})}else{await navigator.clipboard.writeText(url);share.textContent="Ссылка скопирована"}}catch(e){}
 });
 feed.appendChild(node);
}

function chooseReaction(postId,next,reactions){
 const previous=localStorage.getItem(keyFor(postId));
 if(previous===next){setCount(postId,next,getCount(postId,next,reactionTypes.indexOf(next))-1);localStorage.removeItem(keyFor(postId));}
 else{
  if(previous)setCount(postId,previous,getCount(postId,previous,reactionTypes.indexOf(previous))-1);
  setCount(postId,next,getCount(postId,next,reactionTypes.indexOf(next))+1);
  localStorage.setItem(keyFor(postId),next);
 }
 reactions.querySelectorAll(".reaction").forEach((button)=>{
  const type=button.dataset.reaction;button.classList.toggle("active",localStorage.getItem(keyFor(postId))===type);
  button.querySelector(".reaction-count").textContent=getCount(postId,type,reactionTypes.indexOf(type));
 });
}
posts.forEach(renderPost);
