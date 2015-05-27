/**
 * Created by chenguanglv on 2014/12/12.
 */

var res_music = {
    BG_MENU : "res/media/menubg.mp3"
};

var res_sound = {
    TOUCH : "res/media/touch.mp3"
};

var g_res_sound = [];

for (var i in res_music) {
    g_res_sound.push(res_music[i]);
}

for (var i in res_effect) {
    g_res_sound.push(res_effect[i]);
}