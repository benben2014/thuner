/**
 * Created by chenguanglv on 14/12/27.
 */

var STRIKERBULLETRENDER_DEF = {
    BULLET_FRAMES: {
        S2: [
            "bullet-striker-s2-0.png",
            "bullet-striker-s2-1.png",
            "bullet-striker-s2-2.png",
            "bullet-striker-s2-3.png"
        ],
        S3: [
            "bullet-striker-s3-0.png",
            "bullet-striker-s3-1.png",
            "bullet-striker-s3-2.png",
            "bullet-striker-s3-3.png"
        ],
        S4: [
            ["bullet-striker-s4-0-0.png", "bullet-striker-s4-0-1.png"],
            ["bullet-striker-s4-1-0.png", "bullet-striker-s4-1-1.png"],
            ["bullet-striker-s4-2-0.png", "bullet-striker-s4-2-1.png"],
            ["bullet-striker-s4-3-0.png", "bullet-striker-s4-3-1.png"]
        ],
        S5: [
            ["bullet-striker-s5-0-0.png", "bullet-striker-s5-0-1.png"],
            ["bullet-striker-s5-1-0.png", "bullet-striker-s5-1-1.png"],
            ["bullet-striker-s5-2-0.png", "bullet-striker-s5-2-1.png"],
            ["bullet-striker-s5-3-0.png", "bullet-striker-s5-3-1.png"]
        ]
    },

    VALID_SIZE : {
        POWER0 : [cc.size(28,14),cc.size(64,14)],
        POWER1 : [cc.size(28,14),cc.size(64,14)],
        POWER2 : cc.size(88,14),
        POWER3 : cc.size(120,14),
        BURST : cc.size(120,14)
    }
};

var StrikerBulletRender = BulletRender.extend({

    doRender : function(){
        switch (this._power) {
            case 0 :
                this.initPower0();
                break;
            case 1 :
                this.initPower1();
                break;
            case 2 :
                this.initPower2();
                break;
            case 3 :
                this.initPower3();
                break;
            case thunder.equipment.power.BURST :
                this.initPowerBurst();
            default :
                break;
        }
    },

    addBullet : function(frameItem,pos,scaleX,scaleY){
        var spriteBullet = null;
        if(typeof(frameItem) === 'string'){
            spriteBullet = new cc.Sprite('#' + frameItem);
        }
        else{
            spriteBullet = new cc.Sprite('#' + frameItem[0]);
            var frames = new Array();
            for(var i = 0; i < frameItem.length; i++){
                frames.push(cc.spriteFrameCache.getSpriteFrame(frameItem[i]));
            }
            var animation = new cc.Animation(frames,0.1);
            var animate = new cc.Animate(animation);
            spriteBullet.runAction(new cc.RepeatForever(animate));
        }

        if(scaleX){
            spriteBullet.setScaleX(scaleX);
        }

        if(scaleY){
            spriteBullet.setScaleY(scaleY);
        }

        spriteBullet.setPosition(pos);
        this.addChild(spriteBullet);
    },

    doRenderHit : function(){

        //code for test。
        cc.spriteFrameCache.addSpriteFrames(res_effect.HIT_PLIST);

        var spriteHit = new cc.Sprite('#hit-1.png');
        var frames = new Array();
        frames.push(cc.spriteFrameCache.getSpriteFrame("hit-1.png"));
        frames.push(cc.spriteFrameCache.getSpriteFrame("hit-2.png"));
        frames.push(cc.spriteFrameCache.getSpriteFrame("hit-3.png"));
        frames.push(cc.spriteFrameCache.getSpriteFrame("hit-4.png"));

        var animation = new cc.Animation(frames,0.02);
        var animate = new cc.Animate(animation);
        spriteHit.runAction(new cc.Sequence(
            animate,
            new cc.CallFunc(this.onHitEnded,this,spriteHit)
        ));

        var pos = this.getPosition();
        pos = this.getParent().convertToWorldSpace(pos);
        spriteHit.setPosition(pos);
        gameLayerManager.getGameLayer().addToEffectLayer(spriteHit);

        if(this._delegate && this._delegate.onHitEnded){
            this._delegate.onHitEnded();
        }
    },

    onHitEnded : function(selector,node){
        node.removeFromParent();
    }

});

StrikerBulletRender.prepareResource = function(star){
    cc.spriteFrameCache.addSpriteFrames(res_effect.STRIKER_BULLETFIRE_PLIST);

    switch(star){
        case thunder.equipment.stars.S2:
            cc.spriteFrameCache.addSpriteFrames(res_bullet_striker.PLIST_S2);
            break;
        case thunder.equipment.stars.S3:
            cc.spriteFrameCache.addSpriteFrames(res_bullet_striker.PLIST_S3);
            break;
        case thunder.equipment.stars.S4:
            cc.spriteFrameCache.addSpriteFrames(res_bullet_striker.PLIST_S4);
            break;
        case thunder.equipment.stars.S5:
            cc.spriteFrameCache.addSpriteFrames(res_bullet_striker.PLIST_S5);
            break;
        default :
            break;
    }
};

