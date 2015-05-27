/**
 * Created by chenguanglv on 14/12/21.
 */

//var STRIKER_PLANE_DEF = {
//    S2 :
//};

var StrikerPlane = PlaneBasic.extend({

    ctor: function (star, step, level) {
        this._super(thunder.plane.STRIKER.ID, star, step, level);
    },

    initPrimaryWeapons: function () {
        this._primaryWeapons = new Array();

        var weapon = weaponManager.getWeapon(
            thunder.weapon.primary.STRIKER,
            this._star,
            this._step,
            this._level
        );

        this._primaryWeapons.push(weapon);

        this._render.combine(weapon);
    },

    updateRender: function (star) {
        if(this._render){
            this._render.render(star);
        }
        else {
            this._render = new StrikerPlaneRender(this._star);
            this._render.setDelegate(this);
            this._render.setPosition(cc.p(320,320));
            this.addChild(this._render);
        }
    }
});