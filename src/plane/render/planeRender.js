/**
 * Created by chenguanglv on 14/12/20.
 */

var PlaneRenderDelegate = {
    onAirCrashEnded : function(){
    }
};

var HeroPoint = cc.Node.extend({
    ctor : function(){
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res_effect.HERO_PLIST);

        this.initPoint();
    },

    initPoint : function(){
        var spritePointReal = new cc.Sprite("#hero-2.png");
        var spritePointEmpty = new cc.Sprite("#hero-1.png");

        spritePointReal.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.ScaleTo(0.08,0),
            new cc.DelayTime(0.08),
            new cc.ScaleTo(0.08,1)
        )));

        spritePointEmpty.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.DelayTime(0.08),
            new cc.FadeOut(0.08),
            new cc.FadeIn(0.08)
        )));

        this.addChild(spritePointEmpty);
        this.addChild(spritePointReal);
    }
});

var PLANERENDER_DEF = {
    TAG : {
        HERO_POINT : 1000
    },

    ORDER : {
        HERO_POINT : 4,
        BURST_PART : 3,
        PLANE : 2,
        FIRE : 1
    }
};

var PlaneRender = cc.Node.extend({
    _star : 0,
    _isMoveRight : false,
    _moveIndex : -1,
    _delegate : null,
    _showCenter : true,

    ctor : function(star){
        this._super();

        this.render(star);
        this.showCenter(true);
    },

    combine : function(render){
        this.addChild(render);
    },

    setDelegate : function(delegate){
        this._delegate = delegate;
    },

    showCenter : function(visible){
        var heroPoint = this.getChildByTag(PLANERENDER_DEF.TAG.HERO_POINT);
        if(!heroPoint){
            heroPoint = new HeroPoint();
            this.addChild(heroPoint,PLANERENDER_DEF.ORDER.HERO_POINT,PLANERENDER_DEF.TAG.HERO_POINT);
        }

        heroPoint.setVisible(visible);
    },

    render : function(star){
        if(this._star === star){
            return ;
        }

        this._star = star;
        this.doInitResource(star);
        this.doRender();
    },

    renderMove : function(index,isMoveRight){
        if(this._moveIndex === index && this._isMoveRight === isMoveRight){
            return ;
        }

        this._isMoveRight = isMoveRight;
        this._moveIndex = index;

        if(isMoveRight){
            this.doRenderMoveRight(index);
        }
        else{
            this.doRenderMoveLeft(index);
        }
    },

    isMoveRight : function(){
        return this._isMoveRight;
    },

    getMoveIndex : function(){
        return this._moveIndex;
    },

    renderMoveRecovery : function(){
        if(this._moveIndex === -1){
            return ;
        }

        this.doRenderMoveRecovery();
        this._moveIndex = -1;
    },

    renderBurst : function(){
        this.doRenderBurst();
    },

    renderBurstRecovery : function(){
        this.doRenderBurstRecovery();
    },

    renderAirCrash : function(){
        this.doAirCrash();
    },

    doInitResource : function(star){
        cc.assert(false,"you must implement your plane's doInitResource.");
    },

    doRender : function(){
        cc.assert(false,"you must implement your plane's doRender method.");
    },

    doRenderMoveRight : function(index){
    },

    doRenderMoveLeft : function(index){
    },

    doRenderMoveRecovery : function(){
    },

    doRenderBurst : function(){
    },

    doRenderBurstRecovery : function(){
    },

    doAirCrash : function(){
    }
});