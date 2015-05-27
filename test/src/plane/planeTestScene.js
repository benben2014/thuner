/**
 * Created by chenguanglv on 2014/12/13.
 */

var PLANETESTLAYER_DEF = {
    TAG : {
        SLIDER_STAR : 1,
        SLIDER_POWER : 2,
        LABEL_STAR : 3,
        LABEL_POWER : 4
    }
};

var PlaneTestLayer = cc.Layer.extend({
    planes : null,
    gameLayer : null,
    currentPlaneIndex : 0,
    currentPlane : null,
    star : thunder.equipment.stars.S2,
    power : thunder.equipment.power.MIN,

    ctor : function(){
        this._super();

        this.initGameLayer();
        this.initPlanes();
        this.initMenu();
        this.initSlider();

        this.showMap();
        this.showPlane();
        this.showTestEnemy();

    },

    onEnter : function(){
        this._super();

        this.planeListener = cc.eventManager.addCustomListener(
            thunder.event.plane.EVENT_NAME,
            this.onPlaneEvent.bind(this)
        );
    },

    onExit : function(){
        if(this.planeListener){
            cc.eventManager.removeListener(this.planeListener);
        }

        this._super();
    },

    onPlaneEvent : function(event){
        var sliderStar = this.getChildByTag(PLANETESTLAYER_DEF.TAG.SLIDER_STAR);
        var eventData = event.getUserData();
        switch(eventData.getSubEvent()){
            case thunder.event.plane.SUBEVENT.BURST_BEGIN :
                if(sliderStar){
                    sliderStar.setEnabled(false);
                }
                break;
            case thunder.event.plane.SUBEVENT.BURST_END:
                if(sliderStar){
                    sliderStar.setEnabled(true);
                }
                break;
            default :
                break;
        }
    },

    initGameLayer : function(){
        gameLayerManager.resetGameLayer();

        this.gameLayer = gameLayerManager.getGameLayer();
        this.addChild(this.gameLayer);
    },

    initPlanes : function(){
        this.planes = new Array();

        for(var i in thunder.plane){
            if(thunder.plane[i].ID){
                this.planes.push(thunder.plane[i]);
            }
        }
    },

    initMenu : function(){
        var menuLayer = new TestMenuLayer();
        menuLayer.setDelegate(this);
        this.addChild(menuLayer,1);

        var btnBrust = new cc.MenuItemFont("暴走",this.onBurst,this);
        btnBrust.setPosition(cc.p(600,230));
        menuLayer.addButton(btnBrust);
    },

    initSlider : function(){
        var sliderStar = new ccui.Slider();
        sliderStar.setTouchEnabled(true);
        sliderStar.loadBarTexture(res_test.SLIDER_TRACK);
        sliderStar.loadSlidBallTextures(res_test.SLIDER_THUMB, res_test.SLIDER_THUMB, "");
        sliderStar.loadProgressBarTexture(res_test.SLIDER_PROGRESS);
        sliderStar.setPosition(cc.p(180,150));
        sliderStar.addEventListener(this.sliderStarEvent, this);
        this.addChild(sliderStar,1,PLANETESTLAYER_DEF.TAG.SLIDER_STAR);

        var lblStar = new cc.LabelTTF("star:" + this.star.COUNT,"",30);
        lblStar.setPosition(cc.p(180,180));
        this.addChild(lblStar,1,PLANETESTLAYER_DEF.TAG.LABEL_STAR);

        var sliderPower = new ccui.Slider();
        sliderPower.setTouchEnabled(true);
        sliderPower.loadBarTexture(res_test.SLIDER_TRACK);
        sliderPower.loadSlidBallTextures(res_test.SLIDER_THUMB, res_test.SLIDER_THUMB, "");
        sliderPower.loadProgressBarTexture(res_test.SLIDER_PROGRESS);
        sliderPower.setPosition(cc.p(500,150));
        sliderPower.addEventListener(this.sliderPowerEvent, this);
        this.addChild(sliderPower,1,PLANETESTLAYER_DEF.TAG.SLIDER_POWER);

        var lblRate = new cc.LabelTTF("power:" + this.power,"",30);
        lblRate.setPosition(cc.p(500,180));
        this.addChild(lblRate,1,PLANETESTLAYER_DEF.TAG.LABEL_POWER);
    },

    showMap : function(){
        var mapLayer = mapManager.getMapLayer(thunder.map.ids.BLACK);
        this.gameLayer.addToMapLayer(mapLayer);
    },

    showPlane : function(){
        if(this.currentPlane){
            this.gameLayer.removeFromOurPlaneLayer(this.currentPlane);
        }

        this.currentPlane = planeManager.getPlane(this.planes[this.currentPlaneIndex]);
        this.currentPlane.setStar(this.star);
        this.currentPlane.setPower(this.power);
        this.gameLayer.addToOurPlaneLayer(this.currentPlane);

        var weapon = weaponManager.getWeapon(
            thunder.weapon.secondary.CRUISE,
            this.currentPlane.getStar(),
            this.currentPlane.getStep(),
            this.currentPlane.getLevel()
        );
        this.currentPlane.equipWeapon(weapon);
    },

    showTestEnemy : function(){
        flyerManager.clearAll();
        var sprite = new cc.Sprite("res/enemy/a-01.png");
        sprite.setPosition(cc.p(0,900));

        var moveTo = new cc.MoveBy(4,cc.p(640,0));
        sprite.runAction(new cc.RepeatForever(new cc.Sequence(
            moveTo,
            moveTo.reverse()
        )));
        this.gameLayer.addToEnemyPlaneLayer(sprite);

        flyerManager.addEnemy(sprite);
    },

    sliderStarEvent: function (sender, type) {
        switch (type) {
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                var slider = sender;
                var percent = slider.getPercent();
                if(percent < 25){
                    this.star = thunder.equipment.stars.S2;
                }
                else if(percent >= 25 && percent < 50){
                    this.star = thunder.equipment.stars.S3;
                }
                else if(percent >= 50 && percent < 75){
                    this.star = thunder.equipment.stars.S4;
                }
                else if(percent >= 75 && percent < 100){
                    this.star = thunder.equipment.stars.S5;
                }

                this.setStar();
                break;
            default:
                break;
        }
    },

    sliderPowerEvent: function (sender, type) {
        switch (type) {
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                var slider = sender;
                var percent = slider.getPercent();
                if(percent < 25){
                    this.power = 0;
                }
                else if(percent >= 25 && percent < 50){
                    this.power = 1;
                }
                else if(percent >= 50 && percent < 75){
                    this.power = 2;
                }
                else if(percent >= 75 && percent < 100){
                    this.power = 3;
                }

                this.setPower();
                break;
            default:
                break;
        }
    },

    setStar : function(){
        this.currentPlane.setStar(this.star);

        var lblStar = this.getChildByTag(PLANETESTLAYER_DEF.TAG.LABEL_STAR);
        if(lblStar){
            lblStar.setString("star:" + this.star.COUNT);
        }
    },

    setPower : function(){
        this.currentPlane.setPower(this.power);

        var lblPower = this.getChildByTag(PLANETESTLAYER_DEF.TAG.LABEL_POWER);
        if(lblPower){
            lblPower.setString("power:" + this.power);
        }
    },

    onBurst : function(){
        this.currentPlane.powerMax();
    },

    onPrev : function(){
        this.currentPlaneIndex--;
        if(this.currentPlaneIndex < 0){
            this.currentPlaneIndex = this.planes.length - 1;
        }

        this.showPlane();
    },

    onNext : function(){
        this.currentPlaneIndex++;
        if(this.currentPlaneIndex > this.planes.length - 1){
            this.currentPlaneIndex = 0;
        }

        this.showPlane();
    }
});

var PlaneTestScene = cc.Scene.extend({
    ctor : function(){
        this._super();

        this.addChild(new PlaneTestLayer());
    }
});
