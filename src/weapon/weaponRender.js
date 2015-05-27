/**
 * Created by chenguanglv on 15/1/4.
 */

var WeaponRender = cc.Node.extend({
    _power : thunder.equipment.power.MIN,
    _fireEnable : false,
    _star : null,
    _bursting : false,
    _fireInterval : 0.2,
    _passTime : 0,

    ctor : function(star){
        this._super();

        this._bullets = new Array();

        this.setStar(star);
        this.scheduleUpdate();
    },

    fireEnable : function(enable){
        this._fireEnable = enable;
    },

    setStar : function(star){
        if(this._star !== star){
            this._star = star;
            this.doPrepareBullet();
        }
    },

    setPower : function(power){
        if(this._power !== power){
            this._power = power;
            this.doPowerChange();
        }
    },

    renderBurst : function(){
        if(!this._bursting){
            this._bursting = true;
            this._fireInterval = this._fireInterval / 2;
        }
    },

    renderBurstRecovery : function(){
        if(this._bursting){
            this._bursting = false;
            this._fireInterval = this._fireInterval * 2;
        }
    },

    setFireInterval: function (interval) {
        this._fireInterval = interval;
    },

    update : function(dt){
        this._passTime += dt;
        if(this._passTime >= this._fireInterval){
            this._passTime -= this._fireInterval;
            this.doCreateBullet();
        }
    },

    doCreateBullet : function(){
        cc.assert(false,"derived class must implement 'doCreateBullet' method.");
    },

    doPrepareBullet : function(){
        cc.assert(false,"derived class must implement 'doPrepareBullet' method.");
    },

    doPowerChange : function(){
        cc.assert(false,"derived class must implement 'doPowerChange' method.");
    }
});