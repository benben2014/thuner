/**
 * Created by chenguanglv on 14/12/27.
 */

var GameLayerManager = cc.Class.extend({
    gameLayer : null,

    getGameLayer : function(){
        if(!this.gameLayer){
            this.gameLayer = new GameLayer();
        }
        return this.gameLayer;
    },

    resetGameLayer : function(){
        this.gameLayer = new GameLayer();
    }
});

var gameLayerManager = gameLayerManager || new GameLayerManager();