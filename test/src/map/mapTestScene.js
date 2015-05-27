/**
 * Created by chenguanglv on 2014/12/13.
 */
var MAPTESTLAYER_DEF = {
    TAG : {
        MAP_LAYER : 1,
        LBL_RATE : 2,
        SLIDER : 3
    }
};

var MapTestLayer = cc.Layer.extend({
    mapLayers : null,
    mapLayersIndex : 0,
    rate : thunder.map.speed_rate.X1,

    ctor : function(){
        this._super();

        this.initMapLayers();
        this.showMapLayer();

        this.initSlider();
        var menuLayer = new TestMenuLayer();
        menuLayer.setDelegate(this);
        this.addChild(menuLayer,1);
    },

    initSlider : function(){
        var slider = new ccui.Slider();
        slider.setTouchEnabled(true);
        slider.loadBarTexture(res_test.SLIDER_TRACK);
        slider.loadSlidBallTextures(res_test.SLIDER_THUMB, res_test.SLIDER_THUMB, "");
        slider.loadProgressBarTexture(res_test.SLIDER_PROGRESS);
        slider.setPosition(cc.p(320,150));
        slider.addEventListener(this.sliderEvent, this);
        this.addChild(slider,1,MAPTESTLAYER_DEF.TAG.SLIDER);

        var lblRate = new cc.LabelTTF("倍率:X" + this.rate,"",30);
        lblRate.setPosition(cc.p(320,180));
        this.addChild(lblRate,1,MAPTESTLAYER_DEF.TAG.LBL_RATE);
    },

    sliderEvent: function (sender, type) {
        switch (type) {
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                var slider = sender;
                var percent = slider.getPercent();
                if(percent < 20){
                    this.rate = thunder.map.speed_rate.X1;
                }
                else if(percent >= 20 && percent < 40){
                    this.rate = thunder.map.speed_rate.X2;
                }
                else if(percent >= 40 && percent < 60){
                    this.rate = thunder.map.speed_rate.X3;
                }
                else if(percent >= 60 && percent < 80){
                    this.rate = thunder.map.speed_rate.X4;
                }
                else if(percent >= 80){
                    this.rate = thunder.map.speed_rate.X5;
                }

                this.setRate();
                break;
            default:
                break;
        }
    },

    setRate : function(){
        var event = new cc.EventCustom(thunder.event.map.EVENT_NAME);
        event.setUserData(new thunder.event.EventData(
            thunder.event.map.SUBEVENT.SET_SPEED_RATE,
            this.rate
        ));
        cc.eventManager.dispatchEvent(event);

        var lblRate = this.getChildByTag(MAPTESTLAYER_DEF.TAG.LBL_RATE);
        if(lblRate){
            lblRate.setString("倍率:X" + this.rate);
        }
    },

    initMapLayers : function(){
        this.mapLayers = new Array();

        for(var i in thunder.map.ids){
            this.mapLayers.push(thunder.map.ids[i]);
        }
    },

    showMapLayer : function(){
        var mapLayer = this.getChildByTag(MAPTESTLAYER_DEF.TAG.MAP_LAYER);
        if(mapLayer){
            this.removeChild(mapLayer);
        }

        mapLayer = mapManager.getMapLayer(this.mapLayers[this.mapLayersIndex]);
        this.addChild(mapLayer,0,MAPTESTLAYER_DEF.TAG.MAP_LAYER);

        var slider = this.getChildByTag(MAPTESTLAYER_DEF.TAG.SLIDER);
        if(slider){
            slider.setPercent(0);
        }
        this.rate = thunder.map.speed_rate.X1;
        this.setRate();
    },

    onPrev : function(){
        this.mapLayersIndex--;
        if(this.mapLayersIndex < 0){
            this.mapLayersIndex = this.mapLayers.length - 1;
        }

        this.showMapLayer();
    },

    onNext : function(){
        this.mapLayersIndex++;
        if(this.mapLayersIndex > this.mapLayers.length - 1){
            this.mapLayersIndex = 0;
        }

        this.showMapLayer();
    }
});

var MapTestScene = cc.Scene.extend({
    ctor : function(){
        this._super();

        this.addChild(new MapTestLayer());
    }
});