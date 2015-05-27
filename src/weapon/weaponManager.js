/**
 * Created by chenguanglv on 14/12/20.
 */

var WeaponManager = cc.Class.extend({

    getWeapon : function(weapon,star, step, level){
        switch(weapon){
            case thunder.weapon.primary.STRIKER:
                return new StrikerWeapon(star, step, level);
            case thunder.weapon.secondary.CRUISE:
                return new CruiseWeapon(star,step,level);
            default :
                break;
        }

        return null;
    },

    getWeaponRes : function(weapon){
        return [];
    }
});

var weaponManager = new WeaponManager();