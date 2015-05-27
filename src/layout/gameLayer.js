/**
 * Created by chenguanglv on 14/12/27.
 */

var GameLayer = cc.Layer.extend({
    mapLayer : null,
    enemyPlaneLayer : null,
    enemyBulletLayer : null,
    ourPlaneLayer : null,
    ourBulletLayer : null,
    effectLayer: null,

    ctor : function(){
        this._super();

        this.mapLayer = new cc.Layer();
        this.enemyPlaneLayer = new cc.Layer();
        this.enemyBulletLayer = new cc.Layer();
        this.ourPlaneLayer = new cc.Layer();
        this.ourBulletLayer = new cc.Layer();
        this.effectLayer = new cc.Layer();

        this.addChild(this.mapLayer,0);
        this.addChild(this.enemyPlaneLayer,1);
        this.addChild(this.ourBulletLayer,2);
        this.addChild(this.ourPlaneLayer,3);
        this.addChild(this.enemyBulletLayer,4);
        this.addChild(this.effectLayer,5);
    },

    addToMapLayer : function(node){
        this.mapLayer.addChild(node);
    },

    addToEnemyPlaneLayer : function(node){
        this.enemyPlaneLayer.addChild(node);
    },

    addToOurBulletLayer : function(node){
        this.ourBulletLayer.addChild(node);
    },

    addToOurPlaneLayer : function(node){
        this.ourPlaneLayer.addChild(node);
    },

    addToEnemyBulletLayer : function(node){
        this.enemyBulletLayer.addChild(node);
    },

    addToEffectLayer : function(node){
        this.effectLayer.addChild(node);
    },

    removeFromMapLayer : function(node){
        this.mapLayer.removeChild(node);
    },

    removeFromEnemyPlaneLayer : function(node){
        this.enemyPlaneLayer.removeChild(node);
    },

    removeFromOurBulletLayer : function(node){
        this.ourBulletLayer.removeChild(node);
    },

    removeFromOurPlaneLayer : function(node){
        this.ourPlaneLayer.removeChild(node);
    },

    removeFromEnemyBulletLayer : function(node){
        this.enemyBulletLayer.removeChild(node);
    },

    removeFromEffectLayer : function(node){
        this.effectLayer.removeChild(node);
    }
});