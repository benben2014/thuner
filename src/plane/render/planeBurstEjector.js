/**
 * Created by chenguanglv on 14/12/28.
 */

var BurstEjectorDelegate = {
    onEjectorStop: function () {
    }
};

var PlaneBurstEjector = cc.Node.extend({
    frameFire: null,
    frameFireHole: null,
    offset: null,
    delegate: null,
    leftCount: 0,
    rightCount: 0,
    stopping: false,

    ctor: function (frameFire, frameFireHole, offset) {
        this._super();

        this.frameFire = frameFire;
        this.frameFireHole = frameFireHole;
        this.offset = cc.p(offset.x, offset.y);

        this.showFireHole();
        this.showFireStart();
    },

    setDelegate: function (delegate) {
        this.delegate = delegate;
    },

    showFireHole: function () {
        var spriteHoleLeft = new cc.Sprite('#' + this.frameFireHole);
        spriteHoleLeft.setPosition(this.offset);
        this.addChild(spriteHoleLeft);

        var spriteHoleRight = new cc.Sprite('#' + this.frameFireHole);
        spriteHoleRight.setFlippedX(true);
        spriteHoleRight.setPosition(cc.p(-this.offset.x, this.offset.y));
        this.addChild(spriteHoleRight);
    },

    showFireStart: function () {
        this.showSingleFireStart(90, cc.p(this.offset.x - 2, this.offset.y - 2));
        this.showSingleFireStart(-90, cc.p(-this.offset.x + 2, this.offset.y - 2));

        this.runAction(new cc.Sequence(
            new cc.DelayTime(0.2),
            new cc.CallFunc(this.showFire, this)
        ));
    },

    showSingleFireStart: function (rotation, pos) {
        var spriteFire = new cc.Sprite('#' + this.frameFire);
        spriteFire.setPosition(pos);
        spriteFire.setAnchorPoint(cc.p(0.5, 0.8));
        spriteFire.setScaleY(0.2);
        spriteFire.setRotation(rotation);
        this.addChild(spriteFire);

        spriteFire.runAction(new cc.Sequence(
            new cc.ScaleTo(0.2, 1.5),
            new cc.ScaleTo(0.3, 0.5)
        ));
        spriteFire.runAction(new cc.Sequence(
            new cc.RotateBy(0.5, -rotation),
            new cc.CallFunc(this.removeNode, this, spriteFire)
        ));
    },

    showFire: function () {
        this.showLeftFire();
        this.showRightFire();
    },

    showFireStop: function () {
        this.stopping = true;

        this.showSingleFireStop(54,36, cc.p(this.offset.x - 2, this.offset.y - 2));
        this.showSingleFireStop(-54,-36, cc.p(-this.offset.x + 2, this.offset.y - 2));
        this.runAction(new cc.Sequence(
            new cc.DelayTime(0.5),
            new cc.CallFunc(this.onBurstEnded,this),
            new cc.CallFunc(this.removeNode,this,this)
        ));
    },

    showSingleFireStop : function(oriRotation,rotation,pos){
        var spriteFire = new cc.Sprite('#' + this.frameFire);
        spriteFire.setPosition(pos);
        spriteFire.setAnchorPoint(cc.p(0.5, 0.8));
        spriteFire.setScaleY(0.2);
        spriteFire.setRotation(oriRotation);
        this.addChild(spriteFire);

        spriteFire.runAction(new cc.Sequence(
            new cc.ScaleTo(0.2, 1.5),
            new cc.ScaleTo(0.3, 0.5)
        ));
        spriteFire.runAction(new cc.Sequence(
            new cc.RotateBy(0.5, rotation),
            new cc.CallFunc(this.removeNode, this, spriteFire)
        ));
    },

    onBurstEnded : function(){
        if(this.delegate && this.delegate.onEjectorStop){
            this.delegate.onEjectorStop();
        }
    },

    showLeftFire: function () {
        this.showSingleFire(
            90,
            cc.p(this.offset.x - 2, this.offset.y - 2),
            this.showLeftFire,
            this.leftCount
        );
    },

    showRightFire: function () {
        this.showSingleFire(
            -90,
            cc.p(-this.offset.x + 2, this.offset.y - 2),
            this.showRightFire,
            this.rightCount
        );
    },

    showSingleFire: function (rotation, pos, showFunc, count) {
        if (this.stopping) {
            return;
        }

        var spriteFire = new cc.Sprite('#' + this.frameFire);
        spriteFire.setAnchorPoint(cc.p(0.5, 0.8));
        spriteFire.setRotation(rotation);
        spriteFire.setScale(0.5);
        spriteFire.setPosition(pos);
        this.addChild(spriteFire);

        spriteFire.runAction(new cc.Sequence(
            new cc.RotateBy(0.5, -rotation)
        ));
        spriteFire.runAction(new cc.Sequence(
            new cc.ScaleTo(0.2, 1.5),
            new cc.CallFunc(showFunc, this),
            new cc.ScaleTo(0.3, 0.5),
            new cc.CallFunc(this.removeNode, this, spriteFire)
        ));
    },

    removeNode: function (selector, spriteFire) {
        spriteFire.removeFromParent(true);
    }
});