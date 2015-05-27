/**
 * Created by chenguanglv on 15/1/4.
 */

var WeaponBasic = cc.Node.extend({
    _weapon: null,
    _star: null,
    _step: 0,
    _level: 0,
    _attack: 0,
    _power: thunder.equipment.power.MIN,

    _render: null,

    ctor: function (weapon, star, step, level) {
        this._super();

        this._weapon = weapon;
        this._star = star;
        this._step = step;
        this._level = level;

        this._attack = thunder.weapon.getAttack(weapon, step, level);

        this.updateRender();
    },

    setLevel: function (level) {
        if (this._level !== level) {
            this._level = level;
            this._attack = thunder.weapon.getAttack(this._weapon, this._step, this._level);
        }
    },

    getLevel: function () {
        return this._level;
    },

    setStar: function (star) {
        if(this._star !== star){
            this._star = star;
            this.updateRender();
        }
    },

    getStar: function () {
        return this._star;
    },

    setStep: function (step) {
        if (this._step !== step) {
            this._step = step;
            this._attack = thunder.weapon.getAttack(this._weapon, this._step, this._level);
        }
    },

    getStep: function () {
        return this._step;
    },

    getAttack: function () {
        return this._attack;
    },

    getName : function(){
        if(this._weapon.NAME){
            return this._weapon.NAME[this._step];
        }

        return '';
    },

    getDescription : function(){
        if(this._weapon.DESCRIPTION){
            return this._weapon.DESCRIPTION[this._star.INDEX];
        }

        return '';
    },

    isPrimary : function(){
        return this._weapon.TYPE === thunder.weapon.type.PRIMARY;
    },

    fireEnable: function (enable) {
        this._render.fireEnable(enable);
    },

    setPower: function (power) {
        this._power = power;
        this._render.setPower(power);
    },

    powerBurst: function () {
        this._render.renderBurst();
    },

    burstEnd: function () {
        this._render.renderBurstRecovery();
    },

    updateRender: function () {
        cc.assert(false, "you must implement 'updateRender' on child class.");
    }
});