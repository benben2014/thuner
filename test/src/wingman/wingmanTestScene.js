/**
 * Created by chenguanglv on 2014/12/13.
 */

var WingmanTestScene = cc.Scene.extend({
    ctor : function(){
        this._super();

        var intro = new cc.LabelTTF("僚机测试未完成","",40);
        intro.setFontFillColor(cc.color.WHITE);
        intro.setPosition(cc.p(320,568));
        this.addChild(intro);

        this.addChild(new TestMenuLayer());
    }
});