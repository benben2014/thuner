/**
 * Created by chenguanglv on 14/12/27.
 */

var FlyerManager = cc.Class.extend({
    enemyArray : null,
    ourPlane : null,

    ctor : function(){
        this.enemyArray = new Array();
    },

    addEnemy : function(enemy){
        this.enemyArray.push(enemy);
    },

    getEnemys : function(){
        return this.enemyArray;
    },

    removeEnemy : function(enemy){
        var index = this.enemyArray.indexOf(enemy);
        if(index >= 0){
            this.enemyArray.remove(index);
        }
    },

    setOurPlane : function(plane){
        this.ourPlane = plane;
    },

    clearAll : function(){
        this.enemyArray.length = 0;
        this.ourPlane = null;
    }
});

var flyerManager = flyerManager || new FlyerManager();