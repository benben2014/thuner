/**
 * Created by chenguanglv on 15/1/4.
 */

var CRUISEWEAPON_DEF = {
    SPEED : [1000, 1050, 1100, 1150],
    INTERVAL : [1.2, 1.1, 1.0, 0.9],
    BULLET_COUNT : [2,4,6,8]
};

var CruiseWeaponRender = WeaponRender.extend({
    speed : CRUISEWEAPON_DEF.SPEED[0],

    doPowerChange : function(){
        this.speed = CRUISEWEAPON_DEF.SPEED[this._power];
        if(this._bursting){
            this.setFireInterval(CRUISEWEAPON_DEF.INTERVAL[this._power] / 2);
        }
        else {
            this.setFireInterval(CRUISEWEAPON_DEF.INTERVAL[this._power]);
        }
    },

    doPrepareBullet : function(){
        bulletManager.prepareBullet(thunder.bullet.ids.CRUISE,this._star);

        this.doPowerChange();
    },

    doCreateBullet : function(){
        var count = CRUISEWEAPON_DEF.BULLET_COUNT[this._star.INDEX];

        for(var i = 0; i < count; i++){
            bullet = bulletManager.getBullet(
                thunder.bullet.ids.CRUISE,
                this._star,
                this._bursting ? thunder.equipment.power.BURST : this._power,
                this.speed,
                0
            );

            bullet.setPosition(this.convertToWorldSpace(cc.p(0,0)));
            gameLayerManager.getGameLayer().addToOurBulletLayer(bullet);
        }
    }
});