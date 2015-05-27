/**
 * Created by chenguanglv on 15/1/4.
 */

var CRUISEBULLET_DEF = {
    FRAME : [
        [
            'bullet-cruise-missile-0.png',
            'bullet-cruise-fire-0-0.png',
            'bullet-cruise-fire-0-1.png',
            'bullet-cruise-burst-0.png'
        ],
        [
            'bullet-cruise-missile-0.png',
            'bullet-cruise-fire-0-0.png',
            'bullet-cruise-fire-0-1.png',
            'bullet-cruise-burst-0.png'
        ],
        [
            'bullet-cruise-missile-1.png',
            'bullet-cruise-fire-1-0.png',
            'bullet-cruise-fire-1-1.png',
            'bullet-cruise-burst-1.png'
        ],
        [
            'bullet-cruise-missile-2.png',
            'bullet-cruise-fire-2-0.png',
            'bullet-cruise-fire-2-1.png',
            'bullet-cruise-burst-2.png'
        ]
    ],

    POS : [
        {
            POS_LIGHT : cc.p(0,-25),
            POS_FIRE : cc.p(0,-50)
        },
        {
            POS_LIGHT : cc.p(0,-25),
            POS_FIRE : cc.p(0,-50)
        },
        {
            POS_LIGHT : cc.p(0,-40),
            POS_FIRE : cc.p(0,-70)
        },
        {
            POS_LIGHT : cc.p(0,-40),
            POS_FIRE : cc.p(0,-70)
        }
    ]
};

var CruiseBulletRender = BulletRender.extend({
    doRender : function(){
        var frameNames = CRUISEBULLET_DEF.FRAME[this._star.INDEX];
        var positions = CRUISEBULLET_DEF.POS[this._star.INDEX]
        this.renderBullet(frameNames,positions);
    },

    renderBullet : function(frameNames,positions){

        var fireFrames = new Array();
        fireFrames.push(cc.spriteFrameCache.getSpriteFrame(frameNames[1]));
        fireFrames.push(cc.spriteFrameCache.getSpriteFrame(frameNames[2]));

        var spriteFire = new cc.Sprite(fireFrames[0]);
        spriteFire.setPosition(positions.POS_FIRE);
        this.addChild(spriteFire);
        spriteFire.runAction(new cc.RepeatForever(
            new cc.Animate(new cc.Animation(fireFrames,0.1))
        ));

        var spriteMissile = new cc.Sprite('#' + frameNames[0]);
        this.addChild(spriteMissile);

        if(this._power === thunder.equipment.power.BURST){
            var spriteLight = new cc.Sprite('#' + frameNames[3]);
            spriteLight.setPosition(positions.POS_LIGHT);
            this.addChild(spriteLight);
            spriteLight.runAction(new cc.RepeatForever(new cc.Sequence(
                new cc.ScaleTo(0.2,1.2),
                new cc.ScaleTo(0.2,1)
            )));
        }

    },

    doRenderHit : function(){

        if(this._delegate && this._delegate.onHitEnded){
            this._delegate.onHitEnded();
        }
    },

    onHitEnded : function(selector,node){
        node.removeFromParent();
    }
});

CruiseBulletRender.prepareResource = function(star){
    cc.spriteFrameCache.addSpriteFrames(res_bullet_cruise.PLIST);
};