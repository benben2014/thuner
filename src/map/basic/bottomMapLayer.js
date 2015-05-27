/**
 * Created by chenguanglv on 2014/12/14.
 */

var BOTTOMMAPLAYER_DEF = {
    ANCHOR : {
        SPRITE : cc.p(0.5,0)
    },

    POS : {
        BOTTOM : cc.p(320,0)
    }
};

var BottomMapLayer = MapLayer.extend({
    sprites : null,
    topSprite : null,

    ctor : function(images,speed){
        this._super();

        this.initSprites(images);
        if(speed){
            this.setSpeed(speed);
        }
        this.scheduleUpdate();
    },

    initSprites : function(images){
        this.sprites = new Array();

        if(images instanceof Array && images.length > 1){
            this.initWithImageArray(images);
        }
        else {
            this.initWithImage(images);
        }
    },

    initWithImageArray : function(images){
        var winSize = cc.director.getWinSize();
        var height = 0;
        do{
            for(var i = 0; i < images.length; i++){
                height += this.createSprite(images[i]);
            }
        }while(height < winSize.height * 2)
    },

    initWithImage : function(image){
        var winSize = cc.director.getWinSize();
        var height = 0;
        do{
            height += this.createSprite(image);
        }while(height < winSize.height * 2)
    },

    createSprite : function(image){
        var spriteBk = new cc.Sprite(image);
        spriteBk.setAnchorPoint(BOTTOMMAPLAYER_DEF.ANCHOR.SPRITE);
        this.replacingSprite(spriteBk);
        this.sprites.push(spriteBk);
        this.addChild(spriteBk);

        var size = spriteBk.getContentSize();
        return size.height;
    },

    replacingSprite : function(sprite){
        var position = cc.p(
            BOTTOMMAPLAYER_DEF.POS.BOTTOM.x,
            BOTTOMMAPLAYER_DEF.POS.BOTTOM.y
        );

        if(this.topSprite){
            var topPosition = this.topSprite.getPosition();
            var topSpriteSize = this.topSprite.getContentSize();
            position.y += topPosition.y + topSpriteSize.height;
        }

        this.topSprite = sprite;
        sprite.setPosition(position);
    },

    update : function(dt){
        var offsetY = this.getSpeed() * dt * this.getRate();
        var needReplaceSprite = null;
        for(var i = this.sprites.length - 1; i >= 0; i--){
            var pos = this.sprites[i].getPosition();
            var size = this.sprites[i].getContentSize();

            pos.y -= offsetY;
            if(pos.y + size.height < 0){
                needReplaceSprite = this.sprites[i];
            }
            else{
                this.sprites[i].setPosition(pos);
            }
        }

        if(needReplaceSprite){
            this.replacingSprite(needReplaceSprite);
        }
    }
});