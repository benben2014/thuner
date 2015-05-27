/**
 * Created by chenguanglv on 15/1/3.
 */

var StrikerBulletRenderS3 = StrikerBulletRender.extend({
    frames : STRIKERBULLETRENDER_DEF.BULLET_FRAMES.S3,

    initPower0 : function(){
        var frameItem = this.frames[0];
        var bulletType = StrikerBulletRenderS3.bulletIndex % 2;

        if(bulletType === 0) {
            this.initThreeBullet(frameItem);
        }
        else{
            this.initDoubleBullet(frameItem);
        }

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER0[bulletType];

        StrikerBulletRenderS3.bulletIndex++;
    },

    initPower1 : function(){
        this.addBullet(this.frames[1],cc.p(-30,0),0.8);
        this.addBullet(this.frames[1],cc.p(0,30));
        this.addBullet(this.frames[1],cc.p(30,0),0.8);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER1[1];
    },

    initPower2 : function(){
        this.addBullet(this.frames[2],cc.p(-45,0),0.7);
        this.addBullet(this.frames[2],cc.p(-15,45),0.9);
        this.addBullet(this.frames[2],cc.p(15,45),0.9);
        this.addBullet(this.frames[2],cc.p(45,0),0.7);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER2;
    },

    initPower3 : function(){
        this.addBullet(this.frames[2],cc.p(-60,0),0.6);
        this.addBullet(this.frames[2],cc.p(-30,45),0.7);
        this.addBullet(this.frames[1],cc.p(0,90),1.2,1.2);
        this.addBullet(this.frames[2],cc.p(30,45),0.7);
        this.addBullet(this.frames[2],cc.p(60,0),0.6);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER3;
    },

    initPowerBurst : function(){
        this.addBullet(this.frames[3],cc.p(-60,0),0.6);
        this.addBullet(this.frames[3],cc.p(-30,45),0.6);
        this.addBullet(this.frames[3],cc.p(0,90));
        this.addBullet(this.frames[3],cc.p(30,45),0.6);
        this.addBullet(this.frames[3],cc.p(60,0),0.6);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.BURST;
    },

    initThreeBullet : function(frameItem){
        this.addBullet(frameItem,cc.p(-30,0));
        this.addBullet(frameItem,cc.p(0,20));
        this.addBullet(frameItem,cc.p(30,0));
    },

    initDoubleBullet : function(frameItem){
        this.addBullet(frameItem,cc.p(-15,0));
        this.addBullet(frameItem,cc.p(15,0));
    }
});

StrikerBulletRenderS3.bulletIndex = 0;