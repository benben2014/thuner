/**
 * Created by chenguanglv on 2014/12/14.
 */

var thunder = thunder || {};

thunder.map = thunder.map || {};

//地图，暂时不从配置文件读取。
thunder.map.ids = {
    BLACK : 0,
    FOREST : 1,
    PURPLE : 2,
    FIRE : 3
};

//速度定义(pixel / second)
thunder.map.speed = {
    GEAR_1 : 20,
    GEAR_2 : 150,
    GEAR_3 : 300,
    GEAR_4 : 400,
    GEAR_5 : 500
};

//速度倍率
thunder.map.speed_rate = {
    X1 : 1,
    X2 : 2,
    X3 : 3,
    X4 : 4,
    X5 : 5
};

thunder.map.topmap = {
    LANDR : "landr",
    LORR : "lorr",
    RANDOM : "random",
    MULTI : "multi"
};



