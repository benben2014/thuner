/**
 * Created by chenguanglv on 2014/12/13.
 */

var TestMenuDelegate = {
    onBack : function(){},
    onNext : function(){},
    onPrev : function(){}
};
var TestMenuLayer = cc.Layer.extend({
    menu : null,
    delegate : null,

    ctor : function(){
        this._super();
        this.initMenu();
    },

    initMenu : function(){
        this.menu = new cc.Menu();

        var btnBack = new cc.MenuItemImage(
            res_test.BTN_BACK_NORMAL,
            res_test.BTN_BACK_PRESSED,
            this.onBack,
            this
        );
        btnBack.setPosition(this.menu.convertToNodeSpace(cc.p(580,1070)));
        this.menu.addChild(btnBack);

        var btnPrev = new cc.MenuItemFont("上一个",this.onPrev,this);
        btnPrev.setPosition(this.menu.convertToNodeSpace(cc.p(240,100)));
        this.menu.addChild(btnPrev);

        var btnNext = new cc.MenuItemFont("下一个",this.onNext,this);
        btnNext.setPosition(this.menu.convertToNodeSpace(cc.p(400,100)));
        this.menu.addChild(btnNext);

        this.addChild(this.menu);
    },

    setDelegate : function(delegate){
        this.delegate = delegate;
    },

    onBack : function(){
        cc.audioEngine.playEffect(res_sound.TOUCH);
        if(this.delegate && this.delegate.onBack){
            this.delegate.onBack();
        }
        cc.director.runScene(new TestListScene());
    },

    onPrev : function(){
        cc.audioEngine.playEffect(res_sound.TOUCH);
        if(this.delegate && this.delegate.onPrev){
            this.delegate.onPrev();
        }
    },

    onNext : function(){
        cc.audioEngine.playEffect(res_sound.TOUCH);
        if(this.delegate && this.delegate.onNext){
            this.delegate.onNext();
        }
    },

    addButton : function(button){
        button.setPosition(this.menu.convertToNodeSpace(button.getPosition()));
        this.menu.addChild(button);
    }
});