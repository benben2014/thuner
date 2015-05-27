/**
 * Created by chenguanglv on 14/12/27.
 */

var StrikerBullet = BulletBasic.extend({
    doInitRender : function(){
        switch(this._star){
            case thunder.equipment.stars.S2:
                this._render = new StrikerBulletRenderS2(this._star, this._power);
                break;
            case thunder.equipment.stars.S3:
                this._render = new StrikerBulletRenderS3(this._star, this._power);
                break;
            case thunder.equipment.stars.S4:
                this._render = new StrikerBulletRenderS4(this._star, this._power);
                break;
            case thunder.equipment.stars.S5:
                this._render = new StrikerBulletRenderS5(this._star, this._power);
                break;
            default :
                break;
        }

        if(this._render){
            this._render.setDelegate(this);
            this.addChild(this._render);
        }

    },

    doHitTarget : function(){
        this._render.doRenderHit();
    }
});