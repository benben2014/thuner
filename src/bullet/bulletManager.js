/**
 * Created by chenguanglv on 14/12/25.
 */

var BulletManager = cc.Class.extend({

    getBulletLayer : function(){
        return new BulletLayer();
    },

    prepareBullet : function(bulletId,star){
        switch(bulletId){
            case thunder.bullet.ids.STRIKER:
                StrikerBulletRender.prepareResource(star);
                break;
            case thunder.bullet.ids.CRUISE:
                CruiseBulletRender.prepareResource(star);
            default :
                break;
        }
    },

    getBulletRes : function(bulletId){
        switch(bulletId){
            case thunder.bullet.ids.STRIKER:
                return g_res_bullet_striker;
            case thunder.bullet.ids.CRUISE:
                return g_res_bullet_cruise;
            default :
                break;
        }

        return null;
    },

    getBullet : function(bulletId, star, power, speed , angleY){
        switch(bulletId){
            case thunder.bullet.ids.STRIKER:
                return new StrikerBullet(star, power, speed , angleY);
            case thunder.bullet.ids.CRUISE:
                return new CruiseBullet(star,power,speed,angleY);
            default :
                break;
        }
    }
});

var bulletManager = bulletManager || new BulletManager();