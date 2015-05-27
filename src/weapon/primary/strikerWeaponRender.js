/**
 * Created by chenguanglv on 15/1/4.
 */


var STRIKER_DEF = {
    SPEED : [1400, 1450, 1500, 1550],
    INTERVAL : [0.2, 0.195, 0.19, 0.185],
    TAG : {
        FIRE_LEFT : 101,
        FIRE_RIGHT : 102
    },

    POS : {
        FIRE_LEFT : cc.p(-10,0),
        FIRE_RIGHT : cc.p(10,0)
    }
};

var StrikerWeaponRender = WeaponRender.extend({
    speed : STRIKER_DEF.SPEED[0],

    doPowerChange : function(){
        this.speed = STRIKER_DEF.SPEED[this._power];
        if(this._bursting){
            this.setFireInterval(STRIKER_DEF.INTERVAL[this._power] / 2);
        }
        else {
            this.setFireInterval(STRIKER_DEF.INTERVAL[this._power]);
        }
    },

    doPrepareBullet : function(){
        bulletManager.prepareBullet(thunder.bullet.ids.STRIKER,this._star);

        this.doPowerChange();
    },

    doCreateBullet : function(){
        bullet = bulletManager.getBullet(
            thunder.bullet.ids.STRIKER,
            this._star,
            this._bursting ? thunder.equipment.power.BURST : this._power,
            this.speed,
            0
        );

        bullet.setPosition(this.convertToWorldSpace(cc.p(0,0)));
        gameLayerManager.getGameLayer().addToOurBulletLayer(bullet);

        this.showBulletFire();
    },

    showBulletFire : function(){
        var frames = new Array();

        if( this._star === thunder.equipment.stars.S5){
            frames.push(cc.spriteFrameCache.getSpriteFrame('striker-bulletfire-3.png'));
            frames.push(cc.spriteFrameCache.getSpriteFrame('striker-bulletfire-4.png'));
        }
        else {
            frames.push(cc.spriteFrameCache.getSpriteFrame('striker-bulletfire-1.png'));
            frames.push(cc.spriteFrameCache.getSpriteFrame('striker-bulletfire-2.png'));
        }

        var fireLeft = this.getChildByTag(STRIKER_DEF.TAG.FIRE_LEFT);
        var fireRight = this.getChildByTag(STRIKER_DEF.TAG.FIRE_RIGHT);

        if(!fireLeft){
            fireLeft = new cc.Sprite(frames[0]);
            fireLeft.setFlippedX(true);
            fireLeft.setPosition(STRIKER_DEF.POS.FIRE_LEFT);
            this.addChild(fireLeft,0,STRIKER_DEF.TAG.FIRE_LEFT);
        }

        if(!fireRight){
            fireRight = new cc.Sprite(frames[0]);
            fireRight.setPosition(STRIKER_DEF.POS.FIRE_RIGHT);
            this.addChild(fireRight,0,STRIKER_DEF.TAG.FIRE_RIGHT);
        }

        fireLeft.setOpacity(255);
        fireRight.setOpacity(255);

        var actions = new cc.Sequence(
            new cc.Animate(new cc.Animation(frames,0.005)),
            new cc.FadeOut(0.001)
        );

        fireLeft.runAction(actions);
        fireRight.runAction(actions.clone());

    }
});