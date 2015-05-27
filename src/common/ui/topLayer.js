/**
 * Created by lcg on 14/12/12.
 */

var TopLayer = cc.Layer.extend({
    onEnter : function(){
        this._super();
        this.setLocalZOrder(topLayerManager.getZOrder());
    },

    onExit : function(){
        topLayerManager.removeZOrder(this.getLocalZOrder());
        this._super();
    }
});

var TOP_LAYER_ZORDER_START = 1000;

var TopLayerManager = cc.Class.extend({
    lsZOrder : [],

    ctor : function(){
        this.lsZOrder.length = 0;
        this.lsZOrder.push(TOP_LAYER_ZORDER_START);
    },

    getZOrder : function(){
        var maxZOrder = this.lsZOrder[this.lsZOrder.length - 1] + 1;

        this.lsZOrder.push(maxZOrder);

        return maxZOrder;
    },

    removeZOrder : function(zorder){
        var index = this.lsZOrder.indexOf(zorder);
        if(index >= 0){
            this.lsZOrder.splice(index,0);
        }
    }
});

var topLayerManager = topLayerManager || new TopLayerManager();