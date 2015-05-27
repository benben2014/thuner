/**
 * Created by chenguanglv on 15/1/4.
 */

var CruiseWeapon = WeaponBasic.extend({
    ctor: function (star, step, level) {
        this._super(thunder.weapon.secondary.CRUISE, star, step, level);
    },

    updateRender: function () {
        if (this._render) {
            this._render.setStar(this._star);
        }
        else {
            this._render = new CruiseWeaponRender(this._star);
            this.addChild(this._render);
        }
    }
});