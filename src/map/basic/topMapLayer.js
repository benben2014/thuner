/**
 * Created by chenguanglv on 2014/12/14.
 */

var TOPMAPLAYER_DEF = {

};

var TopMapItem = cc.Node.extend({
    _contentHeight: 0,

    addContentHeight: function (height) {
        this._contentHeight += height;
    },

    getMaxOffset: function () {
        var size = cc.director.getWinSize();

        return (size.height + this._contentHeight);
    }
});

var TopMapLayer = MapLayer.extend({
    images: null,
    item: null,
    type: thunder.map.topmap.LORR,
    interval_min: 0,
    interval_max: 10,
    repeatMin: 1,
    repeatMax: 5,

    ctor: function (images, type, speed) {
        this._super();

        cc.assert(type && images);

        this.images = thunder.utils.ObjectClone(images);
        this.type = type;

        if (speed) {
            this.setSpeed(speed);
        }
    },

    setIntervalMin: function (min) {
        this.interval_min = min;
    },

    setIntervalMax: function (max) {
        this.interval_max = max;
    },

    setRepeatMin: function (min) {
        this.repeatMin = min;
    },

    setRepeatMax: function (max) {
        this.repeatMax = max;
    },

    onEnter: function () {
        this._super();

        this.scheduleUpdate();
        this.createItem();
    },

    createItem: function () {
        var delay = Math.random() * (this.interval_max - this.interval_min) + this.interval_min;
        
        this.runAction(new cc.Sequence(
            new cc.DelayTime(delay),
            new cc.CallFunc(this.doCreateItem, this)
        ));
    },

    doCreateItem: function () {
        cc.warn("child does implement doCreateItems.");
    },

    update: function (dt) {
        if (!this.item) {
            return;
        }

        var offsetY = this.getSpeed() * dt * this.getRate();
        var pos = this.item.getPosition();
        var size = this.item.getContentSize();
        pos.y -= offsetY;
        this.item.setPosition(pos);

        if (pos.y < -this.item.getMaxOffset()) {
            this.removeChild(this.item);
            this.item = null;

            this.createItem();
        }
    }
});