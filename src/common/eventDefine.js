/**
 * Created by chenguanglv on 2014/12/14.
 */

var thunder = thunder || {};

thunder.event = thunder.event || {};

//地图事件

thunder.event.map = {
    EVENT_NAME : "event.map",

    SUBEVENT : {
        SET_SPEED_RATE : "map-set-speed-rate",
        CHANGE_LAYER : "map-change-layer"
    }
};

//飞机事件
thunder.event.plane = {
    EVENT_NAME : "event.plane",

    SUBEVENT : {
        AIR_CRASH : "plane-air-crash",
        BURST_BEGIN : "plane-burst-begin",
        BURST_END : "plane-burst-end"
    }
};

thunder.event.EventData = function(subEvent,param0,param1){
    this.subEvent = subEvent;
    this.param0 = param0;
    this.param1 = param1;

    this.getSubEvent = function(){
        return this.subEvent;
    };

    this.getParam0 = function(){
        return this.param0;
    };

    this.getParam1 = function(){
        return this.param1;
    };
};