/**
 * Created by chenguanglv on 14/12/20.
 */

var STRIKER_RENDER_DEF = {
    TAG: {
        PLANE: 1,
        FIRE_LEFT: 2,
        FIRE_RIGHT: 3,
        BURST_PART_1 : 4,
        BURST_PART_LEFT_2 : 5,
        BURST_PART_LEFT_3 : 6,
        BURST_PART_LEFT_4 : 7,
        BURST_PART_RIGHT_2 : 9,
        BURST_PART_RIGHT_3 : 10,
        BURST_PART_RIGHT_4 : 11,
        BURST_FIRE : 12
    },

    S2 : {
        NORMAL_FRAME : "striker-s2-plane-0.png",
        MOVE_FRAMES : ["striker-s2-plane-1.png", "striker-s2-plane-2.png", "striker-s2-plane-3.png"],
        BURST_FRAMES : {
            PART_1: "striker-s2-part-1.png",
            PART_2: "striker-s2-part-2.png",
            PART_3: "striker-s2-part-3.png",
            PART_4: "striker-s2-part-4.png",
            FIRE_HOLE : "striker-s2-firehole.png",
            FIRE : "striker-s2-fire.png"
        },
        FIRE_FRAMES : ["fire-1.png","fire-2.png"],
        POS : {
            FIRE_LEFT: cc.p(-10, -70),
            FIRE_RIGHT: cc.p(10, -70),
            BURST : {
                PART_1 : cc.p(0,-9),
                PART_2 : cc.p(-4,-10),
                PART_3 : cc.p(-18,-10),
                PART_4 : cc.p(-9,-10),
                PART_MOVE : cc.p(-15,0),
                FIRE : cc.p(-20,-20)
            }
        }
    },

    S3 : {
        NORMAL_FRAME : "striker-s3-plane-0.png",
        MOVE_FRAMES : ["striker-s3-plane-1.png", "striker-s3-plane-2.png", "striker-s3-plane-3.png"],
        BURST_FRAMES : {
            PART_1: "striker-s3-part-1.png",
            PART_2: "striker-s3-part-2.png",
            PART_3: "striker-s3-part-3.png",
            PART_4: "striker-s3-part-4.png",
            FIRE_HOLE : "striker-s3-firehole.png",
            FIRE : "striker-s3-fire.png"
        },
        FIRE_FRAMES : ["fire-1.png","fire-2.png"],
        POS : {
            FIRE_LEFT: cc.p(-10, -70),
            FIRE_RIGHT: cc.p(10, -70),
            BURST : {
                PART_1 : cc.p(-0.5,-7.5),
                PART_2 : cc.p(-4,-10),
                PART_3 : cc.p(-18,-10),
                PART_4 : cc.p(-9,-10),
                PART_MOVE : cc.p(-15,0),
                FIRE : cc.p(-20,-20)
            }
        }
    },

    S4 : {
        NORMAL_FRAME : "striker-s4-plane-0.png",
        MOVE_FRAMES : ["striker-s4-plane-1.png", "striker-s4-plane-2.png", "striker-s4-plane-3.png"],
        BURST_FRAMES : {
            PART_1: "striker-s4-part-1.png",
            PART_2: "striker-s4-part-2.png",
            PART_3: "striker-s4-part-3.png",
            FIRE_HOLE : "striker-s4-firehole.png",
            FIRE : "striker-s4-fire.png"
        },
        FIRE_FRAMES : ["fire-1.png","fire-2.png"],
        POS : {
            FIRE_LEFT: cc.p(-10, -70),
            FIRE_RIGHT: cc.p(10, -70),
            BURST : {
                PART_1 : cc.p(-0.5,-1.5),
                PART_2 : cc.p(-4,-10),
                PART_3 : cc.p(-18,-10),
                PART_4 : cc.p(-9,-10),
                PART_MOVE : cc.p(-15,0),
                FIRE : cc.p(-20,-20)
            }
        }
    },

    S5 : {
        NORMAL_FRAME : "striker-s5-plane-0.png",
        MOVE_FRAMES : ["striker-s5-plane-1.png", "striker-s5-plane-2.png", "striker-s5-plane-3.png"],
        BURST_FRAMES : {
            PART_1: "striker-s5-part-1.png",
            PART_2: "striker-s5-part-2.png",
            PART_3: "striker-s5-part-3.png",
            FIRE_HOLE : "striker-s5-firehole.png",
            FIRE : "striker-s5-fire.png"
        },
        FIRE_FRAMES : ["fire-3.png","fire-4.png"],
        POS : {
            FIRE_LEFT: cc.p(-10, -70),
            FIRE_RIGHT: cc.p(10, -70),
            BURST : {
                PART_1 : cc.p(0.5,7),
                PART_2 : cc.p(-4,-10),
                PART_3 : cc.p(-18,-10),
                PART_4 : cc.p(-9,-10),
                PART_MOVE : cc.p(-15,0),
                FIRE : cc.p(-20,-20)
            }
        }
    }
};

var StrikerPlaneRender = PlaneRender.extend({
    _resource : null,

    doInitResource: function () {
        cc.spriteFrameCache.addSpriteFrames(res_fire.PLIST_FIRE);

        switch (this._star) {
            case thunder.equipment.stars.S2:
                cc.spriteFrameCache.addSpriteFrames(res_plane_striker.PLIST_S2);
                this._resource = STRIKER_RENDER_DEF.S2;
                break;
            case thunder.equipment.stars.S3:
                cc.spriteFrameCache.addSpriteFrames(res_plane_striker.PLIST_S3);
                this._resource = STRIKER_RENDER_DEF.S3;
                break;
            case thunder.equipment.stars.S4:
                cc.spriteFrameCache.addSpriteFrames(res_plane_striker.PLIST_S4);
                this._resource = STRIKER_RENDER_DEF.S4;
                break;
            case thunder.equipment.stars.S5:
                cc.spriteFrameCache.addSpriteFrames(res_plane_striker.PLIST_S5);
                this._resource = STRIKER_RENDER_DEF.S5;
                break;
            default :
                break;
        }


    },

    doRender: function () {
        this.renderPlane();
        this.renderFire();
    },

    renderPlane: function () {
        var plane = this.getChildByTag(STRIKER_RENDER_DEF.TAG.PLANE);
        if (!plane) {
            plane = new cc.Sprite("#" + this._resource.NORMAL_FRAME);
            this.addChild(plane, PLANERENDER_DEF.ORDER.PLANE, STRIKER_RENDER_DEF.TAG.PLANE);
        }
        else {
            plane.setSpriteFrame(this._resource.NORMAL_FRAME);
        }
    },

    renderFire: function () {
        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.FIRE_LEFT)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.FIRE_LEFT);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.FIRE_RIGHT)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.FIRE_RIGHT);
        }

        var frames = new Array();
        frames.push(cc.spriteFrameCache.getSpriteFrame(this._resource.FIRE_FRAMES[0]));
        frames.push(cc.spriteFrameCache.getSpriteFrame(this._resource.FIRE_FRAMES[1]));

        var animation = new cc.Animation(frames, 0.05);
        var animate = new cc.Animate(animation);

        var spriteLeft = new cc.Sprite('#' + this._resource.FIRE_FRAMES[0]);
        spriteLeft.setPosition(this._resource.POS.FIRE_LEFT);
        this.addChild(spriteLeft, PLANERENDER_DEF.ORDER.FIRE, STRIKER_RENDER_DEF.TAG.FIRE_LEFT);

        var spriteRight = new cc.Sprite('#' + this._resource.FIRE_FRAMES[0]);
        spriteRight.setPosition(this._resource.POS.FIRE_RIGHT);
        this.addChild(spriteRight, PLANERENDER_DEF.ORDER.FIRE, STRIKER_RENDER_DEF.TAG.FIRE_RIGHT);

        spriteLeft.runAction(new cc.RepeatForever(animate));
        spriteRight.runAction(new cc.RepeatForever(animate.clone()));
    },

    doRenderMoveLeft: function (index) {
        var plane = this.getChildByTag(STRIKER_RENDER_DEF.TAG.PLANE);
        plane.setSpriteFrame(this._resource.MOVE_FRAMES[index]);
        plane.setFlippedX(true);
    },

    doRenderMoveRight: function (index) {
        var plane = this.getChildByTag(STRIKER_RENDER_DEF.TAG.PLANE);
        plane.setSpriteFrame(this._resource.MOVE_FRAMES[index]);
        plane.setFlippedX(false);
    },

    doRenderMoveRecovery: function () {
        var frames = new Array();
        for (var i = this.getMoveIndex() - 1; i >= 0; i--) {
            frames.push(cc.spriteFrameCache.getSpriteFrame(this._resource.MOVE_FRAMES[i]));
        }

        frames.push(cc.spriteFrameCache.getSpriteFrame(this._resource.NORMAL_FRAME));

        if (frames.length === 0) {
            return;
        }

        var animation = new cc.Animation(frames, 0.1);
        var animate = new cc.Animate(animation);
        var plane = this.getChildByTag(STRIKER_RENDER_DEF.TAG.PLANE);
        plane.runAction(animate);
    },

    doRenderBurst: function () {
        var frame = this._resource.BURST_FRAMES;
        var pos = this._resource.POS.BURST;

        if(frame.PART_4){
            var part4 = new cc.Sprite('#' + frame.PART_4);
            part4.setPosition(pos.PART_4);
            this.addChild(part4,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_4);

            var part4Copy = new cc.Sprite('#' + frame.PART_4);
            part4Copy.setFlippedX(true);
            part4.setPosition(cc.p(-pos.PART_4.x,pos.PART_4.y));
            this.addChild(part4Copy,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_4);
        }

        var part3 = new cc.Sprite('#' + frame.PART_3);
        part3.setPosition(pos.PART_3);
        this.addChild(part3,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_3);

        var part2 = new cc.Sprite('#' + frame.PART_2);
        part2.setPosition(pos.PART_2);
        this.addChild(part2,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_2);

        var part3Copy = new cc.Sprite('#' + frame.PART_3);
        part3Copy.setFlippedX(true);
        part3Copy.setPosition(cc.p(-pos.PART_3.x,pos.PART_3.y));
        this.addChild(part3Copy,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_3);

        var part2Copy = new cc.Sprite('#' + frame.PART_2);
        part2Copy.setFlippedX(true);
        part2Copy.setPosition(cc.p(-pos.PART_2.x,pos.PART_2.y));
        this.addChild(part2Copy,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_2);

        var part1 = new cc.Sprite('#' + frame.PART_1);
        part1.setPosition(pos.PART_1);
        this.addChild(part1,PLANERENDER_DEF.ORDER.BURST_PART,STRIKER_RENDER_DEF.TAG.BURST_PART_1);

        var actMove = new cc.MoveBy(0.3,pos.PART_MOVE);
        part3.runAction(actMove);
        part2.runAction(actMove.clone());

        var actMoveRight = new cc.moveBy(0.3,cc.p(-pos.PART_MOVE.x,pos.PART_MOVE.y));
        part3Copy.runAction(actMoveRight);
        part2Copy.runAction(actMoveRight.clone());

        this.runAction(new cc.Sequence(
            new cc.DelayTime(0.3),
            new cc.CallFunc(this.showBurstEjector,this,frame)
        ));
    },

    showBurstEjector : function(selector,frame){
        var ejector = new PlaneBurstEjector(frame.FIRE,frame.FIRE_HOLE,this._resource.POS.BURST.FIRE);
        ejector.setDelegate(this);

        this.addChild(
            ejector,
            PLANERENDER_DEF.ORDER.BURST_PART,
            STRIKER_RENDER_DEF.TAG.BURST_FIRE);
    },

    onEjectorStop : function(){
        var part1 = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_1);
        var part2Left = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_2);
        var part2Right = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_2);
        var part3Left = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_3);
        var part3Right = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_3);
        var part4Left = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_4);
        var part4Right = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_4);

        var actMove = new cc.MoveBy(0.3,cc.p(-this._resource.POS.BURST.PART_MOVE.x,this._resource.POS.BURST.PART_MOVE.y));

        part2Left.runAction(actMove);
        part3Left.runAction(actMove.clone());

        var actMoveLeft = new cc.MoveBy(0.3,this._resource.POS.BURST.PART_MOVE);
        part2Right.runAction(actMoveLeft);
        part3Right.runAction(actMoveLeft.clone());

        this.runAction(new cc.Sequence(
            new cc.DelayTime(0.3),
            new cc.CallFunc(this.clearBurstPart,this)
        ));
    },

    doRenderBurstRecovery: function () {
        var ejector = this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_FIRE);
        ejector.showFireStop();
    },

    clearBurstPart : function(){
        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_1)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_1);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_2)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_2);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_2)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_2);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_3)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_3);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_3)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_3);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_4)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_LEFT_4);
        }

        if(this.getChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_4)){
            this.removeChildByTag(STRIKER_RENDER_DEF.TAG.BURST_PART_RIGHT_4);
        }

    },

    doAirCrash: function () {
    }
});