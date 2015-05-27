/**
 * Created by chenguanglv on 2014/12/14.
 */

var MapLayer = cc.Layer.extend({
    _speed : thunder.map.speed.GEAR_1,
    _rate : thunder.map.speed_rate.X1,
    _listeners : null,

    onEnter : function(){
        this._super();

        this.createListener();
    },

    onExit : function(){
        this.removeListener();

        this._super();
    },

    createListener : function(){
        this._listeners = new Array();

        this._listeners.push(
            cc.eventManager.addCustomListener(
                thunder.event.map.EVENT_NAME,
                this.onMapEvent.bind(this)
            )
        );
    },

    removeListener : function(){
        for(var i = 0; i < this._listeners.length; i++){
            cc.eventManager.removeListener(this._listeners[i]);
        }

        this._listeners = null;
    },

    onMapEvent : function(event){
        var eventData = event.getUserData();
        switch( eventData.getSubEvent()){
            case thunder.event.map.SUBEVENT.CHANGE_LAYER:
                break;
            case thunder.event.map.SUBEVENT.SET_SPEED_RATE:
                this._rate = eventData.getParam0();
                break;
            default :
                break;
        }
    },

    getSpeed : function(){
        return this._speed;
    },

    setSpeed : function(speed){
        this._speed = speed;
    },

    getRate : function(){
        return this._rate;
    },

    setRate : function(rate){
        this.rate = rate;
    }
});