/**
 * Created by chenguanglv on 2014/12/11.
 */


var LOGIN_LAYER_DEF = {
    POS : {
        BK_LOGO : cc.p(320,950),
        ICO_LOGO : cc.p(320,940),
        STAR_LARGE : cc.p(320,885),
        STAR_SMALL :[
            cc.p(110,970),
            cc.p(105,950),
            cc.p(100,930),
            cc.p(95,910),
            cc.p(530,970),
            cc.p(535,950),
            cc.p(540,930),
            cc.p(545,910)
        ],
        BTN_LOGIN : cc.p(480,150),
        BTN_TEST : cc.p(160,150),
        STENCIL : cc.p(-50,940),
        LBL_VERSION : cc.p(100,1100)

    },

    TAG : {
        SMALL_STAR : 1,
        LARGE_STAR : 2
    },

    TEXT : {

    }
};

var LoginLayer = cc.Layer.extend({
    testArray : null,

    onEnter: function () {
        this._super();

        this.initBk();
        this.initLogo();
        this.initLargeStar();
        this.initSmallStars();
        this.initButtons();
        this.initVersion();
        this.addChild(new TouchEffectLayer());

        cc.audioEngine.playMusic(res_music.BG_MENU,true);
    },

    initBk: function () {
        var spriteBk = new cc.Sprite(res_login.BK_LOGIN);
        spriteBk.setAnchorPoint(cc.p(0,0));
        spriteBk.setPosition(cc.p(0,0));
        this.addChild(spriteBk);
    },

    initLogo: function () {
        var spriteBkLogo = new cc.Sprite(res_login.BK_LOGO);
        spriteBkLogo.setPosition(LOGIN_LAYER_DEF.POS.BK_LOGO);
        this.addChild(spriteBkLogo);

        var spriteLogo = new cc.Sprite(res_login.ICO_LOGO);
        spriteLogo.setPosition(LOGIN_LAYER_DEF.POS.ICO_LOGO);
        this.addChild(spriteLogo);

        var content = new cc.Sprite(res_login.LOGO_CLIPPER);
        content.setPosition(LOGIN_LAYER_DEF.POS.ICO_LOGO);
        var stencil = new cc.Sprite(res_login.LOGO_STENCIL);
        stencil.setPosition(LOGIN_LAYER_DEF.POS.STENCIL);
        var clipperNode = new cc.ClippingNode();
        clipperNode.setAlphaThreshold(0.5)
        clipperNode.setStencil(stencil);
        clipperNode.addChild(content);
        this.addChild(clipperNode);

        stencil.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.MoveBy(2,cc.p(640,0)),
            new cc.CallFunc(this.resetStencil,this,stencil),
            new cc.DelayTime(6)
        )));
    },

    resetStencil : function(sender,stencil){
        stencil.setPosition(LOGIN_LAYER_DEF.POS.STENCIL);
    },

    initLargeStar : function(){
        var spriteStar = new cc.Sprite(res_login.ICO_STAR_LARGE);
        spriteStar.setOpacity(0);
        spriteStar.setPosition(LOGIN_LAYER_DEF.POS.STAR_LARGE);
        this.addChild(spriteStar);

        spriteStar.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.DelayTime(5),
            new cc.CallFunc(this.showStar,this,spriteStar)
        )));
    },

    initSmallStars : function(){
        var spriteStar = new cc.Sprite(res_login.ICO_STAR_SMALL);
        spriteStar.setOpacity(0);
        this.addChild(spriteStar);

        spriteStar.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.DelayTime(3),
            new cc.CallFunc(this.randomStarPos,this,spriteStar),
            new cc.CallFunc(this.showStar,this,spriteStar)
        )));
    },

    randomStarPos : function(sender,star){
        var index = parseInt(Math.random() * LOGIN_LAYER_DEF.POS.STAR_SMALL.length);
        star.setPosition(LOGIN_LAYER_DEF.POS.STAR_SMALL[index]);
    },

    showStar : function(sender,star){
        var actFadeIn = new cc.FadeIn(0.4);
        var actFadeOut = new cc.FadeOut(0.5);
        star.runAction(new cc.Sequence(
            actFadeIn,
            actFadeOut
        ));
    },

    initButtons : function(){
        var menu = new cc.Menu();

        var menuItemLogin = new cc.MenuItemImage(
            res_login.BTN_LOGIN_NORMAL,
            res_login.BTN_LOGIN_PRESSED,
            this.onLogin,
            this
        );
        menuItemLogin.setPosition(menu.convertToNodeSpace(LOGIN_LAYER_DEF.POS.BTN_LOGIN));
        menu.addChild(menuItemLogin);

        var menuItemTest = new cc.MenuItemImage(
            res_login.BTN_TEST_NORMAL,
            res_login.BTN_TEST_PRESSED,
            this.onTest,
            this
        );
        menuItemTest.setPosition(menu.convertToNodeSpace(LOGIN_LAYER_DEF.POS.BTN_TEST));
        menu.addChild(menuItemTest);

        this.addChild(menu);
    },

    initVersion : function(){
        var txtVersion = thunder.version.description + ' : ' +
            thunder.version.major + '.' +
            thunder.version.build;

        var lblVersion = new cc.LabelTTF(
            txtVersion,
            "",
            20
        );
        lblVersion.setFontFillColor(cc.color(230,230,230));
        lblVersion.setPosition(LOGIN_LAYER_DEF.POS.LBL_VERSION);
        this.addChild(lblVersion);
    },

    onLogin : function(sender){
        cc.audioEngine.playEffect(res_sound.TOUCH);
        cc.log("login.");
    },

    onTest : function(sender){
        cc.audioEngine.playEffect(res_sound.TOUCH);

        //进入测试场景，测试代码与资源存储到 ./test/ 目录下，不予正式代码混杂。
        cc.loader.loadJs("test/src",["testSrcList.js","testListScene.js"],function(){
            TestListScene.runTest();
        });
    }
});

var LoginScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        var loginLayer = new LoginLayer();
        this.addChild(loginLayer);
    }
});