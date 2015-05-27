/**
 * Created by lcg on 14/12/25.
 */

var res_bullet_striker = {
    PLIST_S2 : "res/bullet/bullet-striker-s2.plist",
    PNG_S2 : "res/bullet/bullet-striker-s2.png",

    PLIST_S3 : "res/bullet/bullet-striker-s3.plist",
    PNG_S3 : "res/bullet/bullet-striker-s3.png",

    PLIST_S4 : "res/bullet/bullet-striker-s4.plist",
    PNG_S4 : "res/bullet/bullet-striker-s4.png",

    PLIST_S5 : "res/bullet/bullet-striker-s5.plist",
    PNG_S5 : "res/bullet/bullet-striker-s5.png"
};

var res_fire = {
    PLIST_FIRE : "res/bullet/fire.plist",
    PNG_FIRE : "res/bullet/fire.png"
};

var res_bullet_cruise = {
    PLIST : "res/bullet/bullet-cruise.plist",
    PNG : "res/bullet/bullet-cruise.png",
};

var g_res_bullet_striker = [];
for(var i in res_bullet_striker){
    g_res_bullet_striker.push(res_bullet_striker[i]);
}

var g_res_fire = [];
for(var i in res_fire){
    g_res_fire.push(res_fire[i]);
}

var g_res_bullet_cruise = [];
for(var i in res_bullet_cruise){
    g_res_bullet_cruise.push(res_bullet_cruise[i]);
}