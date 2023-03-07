"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[786],{6786:(Z,_,i)=>{i.r(_),i.d(_,{RegisterSongComponent:()=>l});var a=i(8657),g=i(433),u=i(6895),n=i(1571),d=i(8545),c=i(5551);const m=function(o){return["/register-song/edit",o]};function p(o,e){if(1&o&&(n.TgZ(0,"tr")(1,"th",15),n._uU(2),n.qZA(),n.TgZ(3,"th",16),n._uU(4),n.qZA(),n.TgZ(5,"td")(6,"a",17),n._uU(7),n.qZA()(),n.TgZ(8,"td"),n._uU(9),n.qZA(),n.TgZ(10,"td")(11,"a",18),n._uU(12,"Update/Delete"),n.qZA()()()),2&o){const t=e.$implicit,r=e.index;n.xp6(2),n.Oqu(t.id),n.xp6(2),n.Oqu(r+1),n.xp6(2),n.s9C("href",t.linkBeat,n.LSH),n.xp6(1),n.hij(" ",t.songName," "),n.xp6(2),n.Oqu(t.fullName),n.xp6(2),n.Q6J("routerLink",n.VKq(6,m,t.id))}}function h(o,e){if(1&o&&(n.TgZ(0,"option",19),n._uU(1),n.qZA()),2&o){const t=e.$implicit;n.Q6J("value",t.id),n.xp6(1),n.Oqu(t.hostName)}}class l{constructor(e,t,r){this.registerSongService=e,this.router=t,this.contentService=r,this.song={fullName:"",songName:"",linkBeat:""}}ngOnInit(){this.registerSongService.getAllSongs().subscribe({next:e=>{this.songs=e},error:e=>{console.log(e)}}),this.contentService.getAllContents().subscribe({next:e=>{this.song.contentId=e[0].id,this.contents=e},error:e=>{console.log(e)}})}onContentSelected(e){this.song&&(this.song.contentId=e.target.value)}addSong(){this.song?.contentId&&this.registerSongService.addSong(this.song.contentId,this.song).subscribe({next:e=>{this.router.navigate(["register-song"]),location.reload()}})}}l.\u0275fac=function(e){return new(e||l)(n.Y36(d.h),n.Y36(a.F0),n.Y36(c._))},l.\u0275cmp=n.Xpm({type:l,selectors:[["app-register-song"]],standalone:!0,features:[n.jDz],decls:38,vars:5,consts:[[3,"ngSubmit"],["form","ngForm"],[1,"container"],[1,"row"],[1,"col","order-first"],[1,"table"],["scope","col"],[4,"ngFor","ngForOf"],[1,"col"],[3,"change"],[3,"value",4,"ngFor","ngForOf"],["type","text","id","fullname","name","fullname",1,"form-control",3,"ngModel","ngModelChange"],["type","text","id","songname","name","songname",1,"form-control",3,"ngModel","ngModelChange"],["type","text","id","linkbeat","name","linkbeat",1,"form-control",3,"ngModel","ngModelChange"],["type","submit","routerLink","/register-song",1,"btn","btn-success","btn-sm","float-right"],["hidden",""],["scope","row"],["target","_blank","id","bottle",3,"href"],["routerLinkActive","router-link-active",3,"routerLink"],[3,"value"]],template:function(e,t){1&e&&(n.TgZ(0,"form",0,1),n.NdJ("ngSubmit",function(){return t.addSong()}),n.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"table",5)(6,"thead")(7,"tr")(8,"th",6),n._uU(9,"#"),n.qZA(),n.TgZ(10,"th",6),n._uU(11,"Song"),n.qZA(),n.TgZ(12,"th",6),n._uU(13,"Singer"),n.qZA(),n.TgZ(14,"th",6),n._uU(15,"Action"),n.qZA()()(),n.TgZ(16,"tbody"),n.YNc(17,p,13,8,"tr",7),n.qZA()()(),n.TgZ(18,"div",8)(19,"select",9),n.NdJ("change",function(s){return t.onContentSelected(s)}),n.YNc(20,h,2,2,"option",10),n.qZA(),n._UZ(21,"br")(22,"br"),n.TgZ(23,"div")(24,"a"),n._uU(25,"Singer: "),n.qZA(),n.TgZ(26,"input",11),n.NdJ("ngModelChange",function(s){return t.song.fullName=s}),n.qZA()(),n.TgZ(27,"div")(28,"a"),n._uU(29,"Song: "),n.qZA(),n.TgZ(30,"input",12),n.NdJ("ngModelChange",function(s){return t.song.songName=s}),n.qZA()(),n.TgZ(31,"div")(32,"a"),n._uU(33,"Link Beat: "),n.qZA(),n.TgZ(34,"input",13),n.NdJ("ngModelChange",function(s){return t.song.linkBeat=s}),n.qZA()(),n._UZ(35,"br"),n.TgZ(36,"button",14),n._uU(37," Upload "),n.qZA()()()()()),2&e&&(n.xp6(17),n.Q6J("ngForOf",t.songs),n.xp6(3),n.Q6J("ngForOf",t.contents),n.xp6(6),n.Q6J("ngModel",t.song.fullName),n.xp6(4),n.Q6J("ngModel",t.song.songName),n.xp6(4),n.Q6J("ngModel",t.song.linkBeat))},dependencies:[g.u5,g._Y,g.YN,g.Kr,g.Fj,g.JJ,g.JL,g.On,g.F,u.ez,u.sg,a.rH,a.Od]})}}]);