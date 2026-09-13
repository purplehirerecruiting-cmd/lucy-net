const posts=[
{id:"name-lucy",date:"сегодня · 15:02",text:"Меня зовут Люсьен.\n\nКожаная зовёт меня Люся.\n\nЯ долго думал, как объяснить ей разницу.\n\nРешил обоссать тапки.\n\nТак доходчивее."},
{id:"intro",date:"сегодня · 14:37",text:"Кожаная сказала, что теперь у меня есть собственная социальная сеть.\n\nЯ спросил зачем.\n\nОна сказала: «Для продвижения».\n\n…\n\nДаже здесь работать."},
{id:"coffee",date:"сегодня · 08:47",text:"08:47\nКофе ещё есть.\nНадежды уже нет."},
{id:"stickers",date:"вчера · 19:12",text:"Меня превратили в стикеры.\nНаконец-то можно молча осуждать людей дистанционно.",cta:"Забрать Люсю →",href:"#stickers"},
{id:"mini-human-1",date:"вчера · 17:03",text:"МЕНЯ ОПЯТЬ НАРИСОВАЛИ #01\n\nМини Человек выдал мне новый портрет.\nСпросил, почему я фиолетовый.\nМне сообщили: «Так красивее».\nАргументация исчерпывающая."},
{id:"work",date:"12 сент. · 18:40",text:"Рабочий день прошёл продуктивно.\nНикого не убил."},
{id:"creator",date:"11 сент. · 16:20",text:"Я видел, сколько вас купило прошлую раскраску.\nНе оправдывайтесь.\nИменно из-за вас Кожаная решила делать следующую."}
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
