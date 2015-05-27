/**
 * Created by lcg on 14/12/15.
 */

var RandomMapLayer = TopMapLayer.extend({
    doCreateItem: function () {
        var mapItem = new TopMapItem();

        this.initSprites(mapItem);

        this.addChild(mapItem);
        this.item = mapItem;
    },

    initSprites : function(mapItem){
        var sprite = new cc.Sprite(this.images[0]);
        var size = sprite.getContentSize();
        var position = cc.p(
            this.getRandomX(size.width),
            1136
        );

        sprite.setPosition(position);
        sprite.setAnchorPoint(cc.p(1,0));
        mapItem.addChild(sprite);
        mapItem.addContentHeight(size.height);
    },

    getRandomX : function(width){
        return (Math.random() * (640 + width));
    }
});