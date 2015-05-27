/**
 * Created by chenguanglv on 14/12/27.
 */

var BulletRenderDelegate = {
    onHitEnded : function(){
    }
};

var BulletRender = cc.Node.extend({
    _star : null,
    _power : thunder.equipment.power.MIN,
    _delegate : null,
    _validSize : cc.size(0,0),

    ctor : function(star, power){
        this._super();

        this._star = star;
        this._power = power;

        this.doRender();
    },

    getValidRect : function(){
        var pos = this.getPosition();
        pos = this.getParent().convertToWorldSpace(pos);

        return cc.rect(
            pos.x - this._validSize.width / 2 ,
            pos.y - this._validSize.height,
            this._validSize.width,
            this._validSize.height
        );
    },

    setDelegate : function(delegate){
        this._delegate = delegate;
    },

    doRender : function(){
        cc.assert(false, "derived class must implement 'doInitRender' method.");
    },

    doRenderHit : function(){
        cc.assert(false, "derived class must implement 'doRenderHit' method.");
    }
});