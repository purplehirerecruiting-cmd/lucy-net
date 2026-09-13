const posts=[
{id:"intro",date:"12 сент. · 18:30",text:"Кожаная сказала, что теперь у меня есть собственная социальная сеть.\n\nЯ спросил зачем.\n\nОна сказала: «Для продвижения».\n\n…\n\nДаже здесь работать."},
{id:"coffee",date:"11 сент. · 09:10",text:"08:47\nКофе ещё есть.\nНадежды уже нет."},
{id:"work",date:"10 сент. · 18:40",text:"Рабочий день прошёл продуктивно.\nНикого не убил."},
{id:"creator",date:"9 сент. · 16:20",text:"Я видел, сколько вас купило прошлую раскраску.\nНе оправдывайтесь.\nИменно из-за вас Кожаная решила делать следующую."}
];

const feed=document.querySelector("#feed");
const template=document.querySelector("#post-template");

function renderPost(post){
 const node=template.content.cloneNode(true);
 const article=node.querySelector("article");
 article.id=`post-${post.id}`;
 node.querySelector("time").textContent=post.date;
 node.querySelector(".post-text").textContent=post.text;
 const cta=node.querySelector(".post-cta");
 if(post.cta){
  cta.hidden=false;
  cta.textContent=post.cta;
  cta.href=post.href||"#";
 }
 feed.appendChild(node);
}

posts.forEach(renderPost);
