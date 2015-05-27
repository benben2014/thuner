/**
 * Created by chenguanglv on 15/1/4.
 */


var CruiseBullet = BulletFollow.extend({
    doInitRender : function(){
        this._render = new CruiseBulletRender(this._star,this._power);
        this._render.setDelegate(this);
        this.addChild(this._render);
    },

    doHitTarget : function(){
        this._render.doRenderHit();
    }
});