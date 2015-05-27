/**
 * Created by chenguanglv on 2014/12/14.
 */

var MapManager = cc.Class.extend({
    ctor: function () {
        //TODO :
        //必要时通过配置加载，暂时不加。
    },

    getMapLayer: function (map) {
        switch (map) {
            case  thunder.map.ids.BLACK:
                return this.createBlackMap();
            case  thunder.map.ids.FOREST:
                return this.createForestMap();
            case thunder.map.ids.PURPLE:
                return this.createPurpleMap();
            case thunder.map.ids.FIRE:
                return this.createFireMap();
            default :
                break;
        }

        return null;
    },

    getMapResource : function(map){
        switch(map){
            case thunder.map.ids.BLACK:
                return g_res_map_black;
            case thunder.map.ids.FOREST:
                return g_res_map_forest;
            case thunder.map.ids.PURPLE:
                return g_res_map_purple;
            case thunder.map.ids.FIRE:
                return g_res_map_fire;
            default :
                return null;
        }
    },

    createBlackMap : function(){
        var layer = new cc.Layer();
        layer.addChild(new BottomMapLayer(res_map_black.SEQUENCE));
        layer.addChild(new LRMapLayer(
            [[res_map_black.COMBIN_1,res_map_black.COMBIN_2,res_map_black.COMBIN_3]],
            thunder.map.topmap.LORR,
            thunder.map.speed.GEAR_2
        ));
        layer.addChild(new LRMapLayer(
            [ [res_map_black.SINGLE_1],[res_map_black.SINGLE_2]],
            thunder.map.topmap.LORR,
            thunder.map.speed.GEAR_3
        ));
        return layer;
    },

    createForestMap : function(){
        var layer = new cc.Layer();
        layer.addChild(new BottomMapLayer([res_map_forest.SEQUENCE_1,res_map_forest.SEQUENCE_2]));
        layer.addChild(new LRMapLayer(
            [[res_map_forest.SINGLE]],
            thunder.map.topmap.LORR,
            thunder.map.speed.GEAR_2
        ));
        return layer;
    },

    createPurpleMap : function(){
        var layer = new cc.Layer();
        layer.addChild(new BottomMapLayer(
            thunder.utils.getRandomArray([res_map_purple.SEQUENCE_1,res_map_purple.SEQUENCE_2])[0]
        ));
        layer.addChild(new BottomMapLayer(
            res_map_purple.SEQUENCE_3,thunder.map.speed.GEAR_2
        ));
        layer.addChild(new LRMapLayer(
            [[res_map_purple.COMBIN_3,res_map_purple.COMBIN_2,res_map_purple.COMBIN_1]],
            thunder.map.topmap.LANDR,
            thunder.map.speed.GEAR_3
        ));
        return layer;
    },

    createFireMap : function(){
        var layer = new cc.Layer();
        layer.addChild(new BottomMapLayer(res_map_fire.SEQUENCE_1));
        layer.addChild(new LRMapLayer(
            [[res_map_fire.SINGLE_1],[res_map_fire.SINGLE_2],[res_map_fire.SINGLE_3]],
            thunder.map.topmap.LORR,
            thunder.map.speed.GEAR_2
        ));
        return layer;
    }
});

var mapManager = mapManager || new MapManager();