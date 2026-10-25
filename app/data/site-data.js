export const navigation = [
 {href:"/",label:"首页"},{href:"/projects",label:"项目"},{href:"/services",label:"服务"},{href:"/blog",label:"博客"},{href:"/about",label:"关于"}
];
export const projects = [
 {name:"CDPC",category:"创作工具",status:"持续开发",description:"面向 Minecraft 玩家与创作者的皮肤、穿搭与创作平台。",href:"https://cdpc.cc",tags:["Next.js","Minecraft","Creator tools"]},
 {name:"SeeEN",category:"学习平台",status:"持续开发",description:"围绕英语音频、歌词与学习资料构建的学习空间。",href:"https://seeen.liseezn.top",tags:["English","Audio","Learning"]},
 {name:"个人数字花园",category:"个人项目",status:"在线",description:"记录技术实践、兴趣探索与正在构建的网络项目。",href:"https://www.liseezn.top",tags:["Personal","Web","Notes"]}
];
export const services = [
 {name:"个人博客",group:"内容",description:"技术记录与日常思考。",href:"https://blog.liseezn.top"},
 {name:"网站导航",group:"效率",description:"常用站点与网络服务入口。",href:"https://web.liseezn.top"},
 {name:"文件分享",group:"效率",description:"个人文件与资料共享。",href:"https://pan.liseezn.top"},
 {name:"Minecraft 官网",group:"Minecraft",description:"服务器信息与玩家入口。",href:"https://mc.liseezn.top"},
 {name:"玩家论坛",group:"Minecraft",description:"玩家社区与交流空间。",href:"https://bbs.mc.liseezn.top"},
 {name:"在线地图",group:"Minecraft",description:"浏览 Minecraft 世界地图。",href:"https://map.mc.liseezn.top"},
 {name:"IT 工具箱",group:"工具",description:"开发与网络工具集合。",href:"https://litool.liseezn.top"},
 {name:"证书管理",group:"工具",description:"HTTPS 证书管理入口。",href:"https://certd.liseezn.top"},
 {name:"站点监测",group:"工具",description:"自托管服务可用性监测。",href:"https://uptime.liseezn.top"},
 {name:"影音工具",group:"工具",description:"图片与视频处理工具。",href:"https://vert.liseezn.top"},
 {name:"英语资源",group:"学习",description:"英语音频与学习内容。",href:"https://seeen.liseezn.top"},
 {name:"游戏资源",group:"娱乐",description:"游戏内容与资源入口。",href:"https://game.liseezn.top"}
];
export const profileLinks = [{label:"GitHub",href:"https://github.com/liseezn"},{label:"Bilibili",href:"https://space.bilibili.com/586867478"},{label:"Email",href:"mailto:mail@liseezn.top"}];
export const searchItems = [
 ...navigation.map((item)=>({...item,description:"页面"})),
 ...projects.map((item)=>({href:item.href,label:item.name,description:item.description})),
 ...services.map((item)=>({href:item.href,label:item.name,description:item.description})),
 {href:"https://blog.liseezn.top",label:"全部博客文章",description:"前往个人博客查看全部文章"}
];
