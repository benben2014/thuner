/**
 * Created by chenguanglv on 15/1/3.
 */

var StrikerBulletRenderS2 = StrikerBulletRender.extend({
    frames : STRIKERBULLETRENDER_DEF.BULLET_FRAMES.S2,

    initPower0 : function(){
        var frameItem = this.frames[0];
        var bulletType = StrikerBulletRenderS2.bulletIndex % 2;

        if(bulletType === 0) {
            this.initSingleBullet(frameItem);
        }
        else{
            this.initDoubleBullet(frameItem);
        }

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER0[bulletType];

        StrikerBulletRenderS2.bulletIndex++;
    },

    initPower1 : function(){
        var frameItem = this.frames[1];
        var bulletType = StrikerBulletRenderS2.bulletIndex % 2;

        if(bulletType === 0) {
            this.initSingleBullet(frameItem);
        }
        else{
            this.initDoubleBullet(frameItem);
        }

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER1[bulletType];

        StrikerBulletRenderS2.bulletIndex++;
    },

    initPower2 : function(){
        this.addBullet(this.frames[0],cc.p(-30,0));
        this.addBullet(this.frames[1],cc.p(0,30));
        this.addBullet(this.frames[0],cc.p(30,0));

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER2;
    },

    initPower3 : function(){
        this.addBullet(this.frames[2],cc.p(-45,0),0.6);
        this.addBullet(this.frames[2],cc.p(-18,30),0.8);
        this.addBullet(this.frames[2],cc.p(18,30),0.8);
        this.addBullet(this.frames[2],cc.p(45,0),0.6);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER3;
    },

    initPowerBurst : function(){
        this.addBullet(this.frames[3],cc.p(-45,0));
        this.addBullet(this.frames[3],cc.p(-15,30));
        this.addBullet(this.frames[3],cc.p(15,30));
        this.addBullet(this.frames[3],cc.p(45,0));

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.BURST;
    },

    initSingleBullet : function(frameItem){
        this.addBullet(frameItem,cc.p(0,0));
    },

    initDoubleBullet : function(frameItem){
        this.addBullet(frameItem,cc.p(-18,0));
        this.addBullet(frameItem,cc.p(18,0));
    }
});

StrikerBulletRenderS2.bulletIndex = 0;