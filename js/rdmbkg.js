
//随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var bannerimg =[
  "url(/img/Bing/AnnularEclipse.webp)",
  "url(/img/Bing/BubbleNebula.webp)",
  "url(/img/Bing/ChateauBeynac.webp)",
  "url(/img/Bing/Calakmul.webp)",
  "url(/img/Bing/CuscoCathedral.webp)",
  "url(/img/Bing/HallwylfjelletSunset.webp)",
  "url(/img/Bing/GCVenice.webp)",
  "url(/img/Bing/GoldenGinkgo.webp)"
];
//获取banner图片总数，生成随机数
var bannerindex =Math.ceil(Math.random() * (bannerimg.length)-1);
//重设banner图片
document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];
document.getElementById("footer").style.backgroundImage = bannerimg[bannerindex];
