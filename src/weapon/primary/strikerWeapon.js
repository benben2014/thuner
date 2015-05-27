/**
 * Created by chenguanglv on 15/1/4.
 */

var StrikerWeapon = WeaponBasic.extend({
    ctor: function (star, step, level) {
        this._super(thunder.weapon.primary.STRIKER, star, step, level);
    },

    updateRender: function () {
        if (this._render) {
            this._render.setStar(this._star);
        }
        else {
            this._render = new StrikerWeaponRender(this._star);
            this.addChild(this._render);
        }
    }
});