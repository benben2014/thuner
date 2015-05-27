/**
 * Created by lcg on 14/12/15.
 */

var LRMAPLAYER_DEF = {
    ITEM : [
        {
            POS : cc.p(0,1136),
            ANCHOR : cc.p(0,0),
            FLIP : true
        },
        {
            POS : cc.p(640,1136),
            ANCHOR : cc.p(1,0),
            FLIP : false
        }
    ]
};

var LRMapLayer = TopMapLayer.extend({

    doCreateItem: function () {
        var mapItem = new TopMapItem();
        var group = this.getRandomGroup();
        var randomCount = parseInt(Math.random() * (this.repeatMax - this.repeatMin) + this.repeatMin);

        if(this.type === thunder.map.topmap.LANDR){
            for(var i = 0; i < LRMAPLAYER_DEF.ITEM.length; i ++){
                this.initSprites(mapItem,LRMAPLAYER_DEF.ITEM[i],group,randomCount);
            }
        }
        else if(this.type === thunder.map.topmap.LORR){
            var item = thunder.utils.getRandomArray(LRMAPLAYER_DEF.ITEM)[0];
            this.initSprites(mapItem,item,group,randomCount);
        }

        this.addChild(mapItem);
        this.item = mapItem;
    },

    getRandomGroup : function(){
        var count = this.images.length;
        if(count === 1){
            return this.images[0];
        }
        else {
            return thunder.utils.getRandomArray(this.images)[0];
        }
    },

    initSprites : function(mapItem,item,group,randomCount){
        var position = cc.p(
            item.POS.x,
            item.POS.y
        );

        var count = group.length;
        this.createSprite(group[count - 1],position,item.ANCHOR,item.FLIP,mapItem);

        if(count > 2){
            for(var i = 0; i < randomCount; i++){
                for(var j = count - 2; j > 0; j--){
                    this.createSprite(group[j],position,item.ANCHOR,item.FLIP,mapItem);
                }
            }
        }

        if(count > 1){
            this.createSprite(group[0],position,item.ANCHOR,item.FLIP,mapItem);
        }
    },

    createSprite : function(image,position,anchor,flip,mapItem){
        var sprite = new cc.Sprite(image);
        var size = sprite.getContentSize();
        sprite.setFlippedX(flip);
        sprite.setAnchorPoint(anchor);
        sprite.setPosition(position);

        position.y += size.height;

        mapItem.addContentHeight(size.height);
        mapItem.addChild(sprite);
    }
});