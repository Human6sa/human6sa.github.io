
//随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var bannerimg =[
  "url(/img/Bing/AnnularEclipse_ZH-CN2345201060_1920x1080.webp)",
  "url(/img/Bing/BubbleNebula_ZH-CN2787112807_1920x1080.webp)",
  "url(/img/Bing/ChateauBeynac_ZH-CN8777586167_1920x1080.webp)",
  "url(/img/Bing/Calakmul_ZH-CN5969688954_1920x1080.webp)",
  "url(/img/Bing/CuscoCathedral_ZH-CN9834821723_1920x1080.webp)",
  "url(/img/Bing/HallwylfjelletSunset_ZH-CN9300910376_1920x1080.webp)",
  "url(/img/Bing/GCVenice_ZH-CN0993336331_1920x1080.webp)",
  "url(/img/Bing/GoldenGinkgo_ZH-CN8507013452_1920x1080.webp)"
];
//获取banner图片总数，生成随机数
var bannerindex =Math.ceil(Math.random() * (bannerimg.length)-1);
//重设banner图片
document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];
document.getElementById("footer").style.backgroundImage = bannerimg[bannerindex];
