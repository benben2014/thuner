/**
 * Created by lcg on 14/12/12.
 */

var TOUCHEFFECT_LAYER_DEF = {
    POS : {
        ROUND_CENTER : cc.p(0,0),
        ROUND_SECOND : [
            cc.p(14,-8),
            cc.p(0,-16),
            cc.p(-14,-8),
            cc.p(-14,8),
            cc.p(0,16),
            cc.p(14,8)
        ],
        ROUND_THIRD : [
            cc.p(14,-24),
            cc.p(-14,-24),
            cc.p(-28,0),
            cc.p(-14,24),
            cc.p(14,24),
            cc.p(28,0)
        ]
    }
};

var TouchEffectLayer = cc.Layer.extend({
    _listener: null,
    _animateNode : null,
    _center : null,
    _second : null,
    _third : null,
    _waitingShow : false,
    _waitingTime : 0,
    _waitingPos : null,

    ctor : function(){
        this._super();

        this.createAnimation();
    },

    createAnimation : function(){
        this._animateNode = new cc.Node();
        this.addChild(this._animateNode);

        this._center = new cc.Sprite(res_effect.ICO_TOUCH_CENTER);
        this._center.setPosition(TOUCHEFFECT_LAYER_DEF.POS.ROUND_CENTER);
        this._center.setOpacity(0);
        this._animateNode.addChild(this._center);

        this._second = new Array();
        for(var i = 0; i < TOUCHEFFECT_LAYER_DEF.POS.ROUND_SECOND.length; i++){
            var spriteSecond = new cc.Sprite(res_effect.ICO_TOUCH_AROUND);
            spriteSecond.setPosition(TOUCHEFFECT_LAYER_DEF.POS.ROUND_SECOND[i]);
            spriteSecond.setOpacity(0);
            this._animateNode.addChild(spriteSecond);
            this._second.push(spriteSecond);
        }

        this._third = new Array();
        for(var i = 0; i < TOUCHEFFECT_LAYER_DEF.POS.ROUND_THIRD.length; i++){
            var spriteThird = new cc.Sprite(res_effect.ICO_TOUCH_AROUND);
            spriteThird.setPosition(TOUCHEFFECT_LAYER_DEF.POS.ROUND_THIRD[i]);
            spriteThird.setOpacity(0);
            this._animateNode.addChild(spriteThird);
            this._third.push(spriteThird);
        }
    },

    showAnimation : function(){
        var now = new Date().getTime();

        if(this._waitingShow && now - this._waitingTime < 300){
            this._animateNode.setPosition(this._waitingPos);
            this.runAnimateAction();
        }
    },

    runAnimateAction : function(){
        var actFadeIn = new cc.FadeIn(0.1);
        var actFadeOut = new cc.FadeOut(0.1);

        this._center.runAction(new cc.Sequence(
            actFadeIn,
            actFadeOut
        ));

        for(var i = 0; i < this._second.length; i++){
            this._second[i].runAction(new cc.Sequence(
                new cc.DelayTime(0.05 * (i % 3 + 1)),
                new cc.FadeTo(0.2,(1 - ((i % 3) / 3)) * 255),
                new cc.FadeTo(0.1,0)
            ));
        }

        for(var i = 0; i < this._third.length; i++){
            this._third[i].runAction(new cc.Sequence(
                new cc.DelayTime(0.05 * (i % 3 + 1)),
                new cc.FadeTo(0.1,(1 - ((i % 3) / 3)) * 255),
                new cc.FadeTo(0.1,0)
            ));
        }
    },

    stopAnimation : function(){
        this._animateNode.stopAllActions();
        this.resetAnimation();
    },

    resetAnimation : function(){
//        this._center.setVisible(false);
//
//        for(var i = 0; i < this._second.length; i++){
//            this._second[i].setVisible(false);
//        }
//
//        for(var i = 0; i < this._third.length; i++){
//            this._third[i].setVisible(false);
//        }
    },

    waitShow : function(pos){
        this._waitingShow = true;
        this._waitingTime = new Date().getTime();
        this._waitingPos = pos
    },

    onEnter : function(){
        this._super();

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved : this.onTouchMoved.bind(this),
            onTouchEnded : this.onTouchEnded.bind(this)
        });

        cc.eventManager.addListener(this._listener,this);
    },

    onExit : function(){
        if(this._listener){
            cc.eventManager.removeListener(this._listener);
        }
        this._super();
    },

    onTouchBegan : function(touch,event){
        var location = touch.getLocation();
        this.waitShow(this.convertToNodeSpace(location));
        return true;
    },

    onTouchMoved : function(touch,event){
        var location = touch.getLocation();
        this.showAnimation();
    },

    onTouchEnded : function(touch,event){
        var location = touch.getLocation();
        this.showAnimation();
    }
});