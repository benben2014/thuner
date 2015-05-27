/**
 * Created by chenguanglv on 15/1/3.
 */

var StrikerBulletRenderS5 = StrikerBulletRender.extend({
    frames : STRIKERBULLETRENDER_DEF.BULLET_FRAMES.S5,

    initPower0 : function(){
        this.addBullet(this.frames[0],cc.p(-45,0));
        this.addBullet(this.frames[0],cc.p(-15,30));
        this.addBullet(this.frames[0],cc.p(15,30));
        this.addBullet(this.frames[0],cc.p(45,0));

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER0[1];
    },

    initPower1 : function(){
        this.addBullet(this.frames[1],cc.p(-45,0),0.6,1.4);
        this.addBullet(this.frames[0],cc.p(-20,0));
        this.addBullet(this.frames[1],cc.p(0,60),0.6,1.4);
        this.addBullet(this.frames[0],cc.p(20,0));
        this.addBullet(this.frames[1],cc.p(45,0),0.6,1.4);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER1[1];
    },

    initPower2 : function(){
        this.addBullet(this.frames[2],cc.p(-60,0),0.5,1.4);
        this.addBullet(this.frames[0],cc.p(-35,60));
        this.addBullet(this.frames[2],cc.p(-15,100),0.5,1.4);
        this.addBullet(this.frames[2],cc.p(15,100),0.5,1.4);
        this.addBullet(this.frames[0],cc.p(35,60));
        this.addBullet(this.frames[2],cc.p(60,0),0.5,1.4);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER2;
    },

    initPower3 : function(){
        this.addBullet(this.frames[2],cc.p(-60,60),0.6);
        this.addBullet(this.frames[0],cc.p(-40,60));
        this.addBullet(this.frames[0],cc.p(-20,100));
        this.addBullet(this.frames[2],cc.p(-0,100),0.8,1.4);
        this.addBullet(this.frames[0],cc.p(20,100));
        this.addBullet(this.frames[0],cc.p(40,60));
        this.addBullet(this.frames[2],cc.p(60,60),0.6);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.POWER3;
    },

    initPowerBurst : function(){
        this.addBullet(this.frames[3],cc.p(-60,60),0.5);
        this.addBullet(this.frames[3],cc.p(-40,60),0.3);
        this.addBullet(this.frames[3],cc.p(-25,100),0.3);
        this.addBullet(this.frames[3],cc.p(-0,100),0.7,1.2);
        this.addBullet(this.frames[3],cc.p(25,100),0.3);
        this.addBullet(this.frames[3],cc.p(40,60),0.3);
        this.addBullet(this.frames[3],cc.p(60,60),0.5);

        this._validSize = STRIKERBULLETRENDER_DEF.VALID_SIZE.BURST;
    }
});