/**
 * Created by chenguanglv on 2014/12/13.
 */

var TESTLIST_LAYER_DEF = {
    TAG : {
        CELL_NAME : 1,
        CELL_BK : 2
    },

    SIZE : {
        CELL : cc.size(640,160)
    }
};

var TestListLayer = cc.Layer.extend({
    ctor : function(){
        this._super();

        this.initBk();
        this.prepareTestList();
        this.initMenu();

        this.addChild(new TouchEffectLayer());
    },

    initBk : function(){
        var spriteBk = new cc.Sprite(res_test.BK_TEST_LIST);
        spriteBk.setAnchorPoint(cc.p(0,0));
        this.addChild(spriteBk);
    },

    prepareTestList : function(){
        var tableView = new cc.TableView(this,cc.size(640,1000));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(cc.p(0,136));
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();
    },

    tableCellTouched:function (table, cell) {
        var index = cell.getIdx();
        var sceneClass = TEST_LIST_DEF[index].SCENE;
        var res = [];
        for(var i = 0; i < TEST_LIST_DEF[index].RESOURCE.length; i++){
            res = res.concat(TEST_LIST_DEF[index].RESOURCE[i]);
        }

        if(sceneClass){
            cc.LoaderScene.preload(res, function () {
                cc.director.pushScene(new sceneClass());
            }, this);

        }
    },

    tableCellHighlight:function(table, cell){
        var lblName = cell.getChildByTag(TESTLIST_LAYER_DEF.TAG.CELL_NAME);
        lblName.setFontFillColor(cc.color.WHITE);
        lblName.setFontSize(45);

        var spriteBk = cell.getChildByTag(TESTLIST_LAYER_DEF.TAG.CELL_BK);
        spriteBk.setScale(0.9);
    },

    tableCellUnhighlight:function(table, cell){
        var lblName = cell.getChildByTag(TESTLIST_LAYER_DEF.TAG.CELL_NAME);
        lblName.setFontFillColor(cc.color.GREEN);
        lblName.setFontSize(50);

        var spriteBk = cell.getChildByTag(TESTLIST_LAYER_DEF.TAG.CELL_BK);
        spriteBk.setScale(1);
    },

    tableCellWillRecycle:function(table, cell){

    },

    tableCellSizeForIndex:function(table, idx){
        return this.cellSizeForTable(table);
    },

    cellSizeForTable:function (table) {
        return TESTLIST_LAYER_DEF.SIZE.CELL;
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();
            var spriteBk = new cc.Sprite(res_test.BK_TEST_ITEM);
            spriteBk.setPosition(cc.p(
                TESTLIST_LAYER_DEF.SIZE.CELL.width / 2,
                TESTLIST_LAYER_DEF.SIZE.CELL.height / 2
            ));
            cell.addChild(spriteBk,0,TESTLIST_LAYER_DEF.TAG.CELL_BK);

            var lblName = new cc.LabelTTF(TEST_LIST_DEF[idx].NAME,"",50);
            lblName.setFontFillColor(cc.color.GREEN);
            lblName.setPosition(cc.p(
                TESTLIST_LAYER_DEF.SIZE.CELL.width / 2,
                TESTLIST_LAYER_DEF.SIZE.CELL.height / 2
            ));
            cell.addChild(lblName,0,TESTLIST_LAYER_DEF.TAG.CELL_NAME);

        } else {
            var lblName = cell.getChildByTag(TESTLIST_LAYER_DEF.TAG.CELL_NAME);
            lblName.setString(TEST_LIST_DEF[idx].NAME);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return TEST_LIST_DEF.length;
    },

    initMenu : function(){
        var menu = new cc.Menu();

        var btnExit = new cc.MenuItemImage(
            res_test.BTN_EXIT_NORMAL,
            res_test.BTN_EXIT_PRESSED,
            this.onExitTest,
            this
        );
        btnExit.setPosition(menu.convertToNodeSpace(cc.p(320,68)));
        btnExit.setScale(2);
        menu.addChild(btnExit);


        this.addChild(menu);
    },

    onExitTest : function(){
        cc.audioEngine.playEffect(res_sound.TOUCH);
        var transition = new cc.TransitionSlideInR(0.3,new LoginScene());
        cc.director.runScene(transition);
    }
});

var TestListScene = cc.Scene.extend({
    ctor : function(){
        this._super();
        this.addChild(new TestListLayer());
    }
});

TestListScene.runTest = function(){
    cc.loader.loadJs("test/src",testSrcList,function(){
        var transition = new cc.TransitionSlideInL(0.3,new TestListScene());

        cc.director.runScene(transition);
    });
};