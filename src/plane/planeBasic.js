/**
 * Created by chenguanglv on 14/12/20.
 */

var PlaneBasic = cc.Node.extend({
    //basic attribute
    _plane: null,
    _star: thunder.equipment.stars.S2,
    _level : 1,
    _step : 0,
    _godMode: false,
    _bursting: false,
    _name : '',

    //basic partment
    _primaryWeapons: null,
    _armor: null,
    _secondaryWeapon: null,
    _wingman: null,

    //render
    _render: null,


    ctor: function (plane, star, step, level) {
        this._super();

        this._plane = plane;
        this._level = level;
        this._star = star;
        this._step = step;

        this.updateRender();
        this.initPrimaryWeapons();
        this.addTouchHandler();
    },

    setLevel: function (level) {
        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].setLevel(level);
            }
        }

        this._level = level;
    },

    getLevel: function () {
        return this._level;
    },

    showCenter : function(visible){
        this._render.showCenter(visible);
    },

    setPower: function (power) {
        this._power = power;

        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].setPower(power);
            }
        }

        if (this._secondaryWeapon) {
            this._secondaryWeapon.setPower(power);
        }

        if (this._wingman) {
            this._wingman.setPower(power);
        }
    },

    setStar: function (star) {
        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].setStar(star);
            }
        }

        if (this._secondaryWeapon) {
            this._secondaryWeapon.setStar(star);
        }

        if (this._wingman) {
            this._wingman.setStar(star);
        }

        this.updateRender(star);
        this._star = star;
    },

    getStar: function () {
        return this._star;
    },

    setStep: function (step) {
        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].setStep(step);
            }
        }

        this._step = step;
    },

    getStep: function () {
        return this._step;
    },

    getName : function(){
        return this._plane.NAME[this._step];
    },

    getDescription : function(){
        return this._plane.DESCRIPTION[this._star.INDEX];
    },

    equipArmor: function (armor) {
        this._armor = armor;
        this._render.combine(armor);
    },

    equipWeapon: function (weapon) {
        this._secondaryWeapon = weapon;
        this._render.combine(weapon);
    },

    equipWingman: function (wingman) {
        this._wingman = wingman;
        this._render.combine(wingman);
    },

    fireEnable: function (enable) {
        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].fireEnable(enable);
            }
        }
    },

    godModeEnable: function (enable) {
        this._godMode = enable;
    },

    isGodMode: function () {
        return this._godMode;
    },

    beHurt: function (attack) {
        if (!this._armor) {
            return this.airCrash();
        }

        var lifeEnd = this._armor.beHurt(attack);
        if (lifeEnd) {
            this.airCrash();
        }
    },

    beHeal: function (life) {
        if (!this._armor) {
            return;
        }

        this._armor.beHeal(life);
    },

    airCrash: function () {
        var sprint = false;  //TODO : 是否冲刺
        if (sprint) {

        }
        else {
            this._render.renderAirCrash();
        }
    },

    onAirCrashEnded: function () {
        cc.eventManager.dispatchCustomEvent(
            thunder.event.plane.SUBEVENT.AIR_CRASH
        );

    },

    powerUp: function () {
        if (this._power === thunder.equipment.power.MAX) {
            if(!this._bursting){
                this.onBurstBegin();
            }

            this.unschedule(this.onBurstEnd);
            this.scheduleOnce(this.onBurstEnd, thunder.equipment.burstTimeout);
        }
        else {
            this._power++;

            if (this._primaryWeapons && this._primaryWeapons.length > 0) {
                for(var i = 0; i < this._primaryWeapons.length; i++){
                    this._primaryWeapons[i].setPower(this._power);
                }
            }

            if (this._secondaryWeapon) {
                this._secondaryWeapon.setPower(this._power);
            }

            if (this._wingman) {
                this._wingman.setPower(this._power);
            }

        }
    },

    powerDown: function () {
        if (this._power > thunder.equipment.power.MIN) {
            this._power--;
        }

        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].setPower(this._power);
            }
        }

        if (this._secondaryWeapon) {
            this._secondaryWeapon.setPower(this._power);
        }

        if (this._wingman) {
            this._wingman.setPower(this._power);
        }

    },

    powerMax: function () {
        this._power = thunder.equipment.power.MAX;

        if(!this._bursting){
            this.onBurstBegin();
        }

        this.unschedule(this.onBurstEnd);
        this.scheduleOnce(this.onBurstEnd, thunder.equipment.burstTimeout);
    },

    onBurstBegin : function(){
        this._render.renderBurst();

        if (this._primaryWeapons && this._primaryWeapons.length > 0) {
            for(var i = 0; i < this._primaryWeapons.length; i++){
                this._primaryWeapons[i].powerBurst();
            }
        }

        if (this._secondaryWeapon) {
            this._secondaryWeapon.powerBurst();
        }

        if (this._wingman) {
            this._wingman.powerBurst();
        }

        this._bursting = true;

        var eventData = new thunder.event.EventData(
            thunder.event.plane.SUBEVENT.BURST_BEGIN
        );
        cc.eventManager.dispatchCustomEvent(
            thunder.event.plane.EVENT_NAME,
            eventData
        );
    },

    onBurstEnd: function () {
        if(this._bursting){
            this._bursting = false;

            if (this._primaryWeapons && this._primaryWeapons.length > 0) {
                for(var i = 0; i < this._primaryWeapons.length; i++){
                    this._primaryWeapons[i].burstEnd();
                }
            }

            if (this._secondaryWeapon) {
                this._secondaryWeapon.burstEnd();
            }

            if (this._wingman) {
                this._wingman.burstEnd();
            }

            this._render.renderBurstRecovery();

            var eventData = new thunder.event.EventData(
                thunder.event.plane.SUBEVENT.BURST_END
            );
            cc.eventManager.dispatchCustomEvent(thunder.event.plane.EVENT_NAME,eventData);
        }
    },

    isBursting: function () {
        return this._bursting;
    },

    addTouchHandler: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCancelled: this.onTouchCancelled.bind(this)
        }, this);
    },

    onTouchBegan: function (touch, event) {
        return true;
    },
    onTouchMoved: function (touch, event) {
        if (!this._render) {
            return;
        }

        var delta = touch.getDelta();
        var absX = Math.abs(delta.x);
        var isMoveRight = (delta.x >= 0);

        this.adjustPlaneAngle(absX, isMoveRight);

        var pos = this._render.getPosition();
        var targetPos = cc.pAdd(pos, delta);
        targetPos = this.fixTargetPos(targetPos);
        this._render.setPosition(targetPos);

    },

    onTouchEnded: function (touch, event) {
        this._render.renderMoveRecovery();
    },

    onTouchCancelled: function (touch, event) {
        this._render.renderMoveRecovery();
    },

    adjustPlaneAngle: function (absX, isMoveRight) {
        if (absX < thunder.plane.moveStep.step1.DISTANCE) {
            this._render.renderMoveRecovery();
        }
        else if (absX >= thunder.plane.moveStep.step1.DISTANCE &&
            absX < thunder.plane.moveStep.step2.DISTANCE) {
            this._render.renderMove(thunder.plane.moveStep.step1.INDEX, isMoveRight);
        }
        else if (absX >= thunder.plane.moveStep.step2.DISTANCE &&
            absX < thunder.plane.moveStep.step3.DISTANCE) {
            this._render.renderMove(thunder.plane.moveStep.step2.INDEX, isMoveRight);
        }
        else {
            this._render.renderMove(thunder.plane.moveStep.step3.INDEX, isMoveRight);
        }

        //cc.log(new Date().getTime() + " absx:" + absX + " moveright:" + isMoveRight);
    },

    fixTargetPos: function (pos) {
        var winSize = cc.director.getWinSize();
        var dstPos = thunder.utils.ObjectClone(pos);

        if (dstPos.x < thunder.plane.visibleSize.width / 2) {
            dstPos.x = thunder.plane.visibleSize.width / 2;
        }
        else if (dstPos.x > winSize.width - thunder.plane.visibleSize.width / 2) {
            dstPos.x = winSize.width - thunder.plane.visibleSize.width / 2;
        }

        if (dstPos.y < thunder.plane.visibleSize.height / 2) {
            dstPos.y = thunder.plane.visibleSize.height / 2;
        }
        else if (dstPos.y > winSize.height - thunder.plane.visibleSize.height / 2) {
            dstPos.y = winSize.height - thunder.plane.visibleSize.height / 2;
        }

        //cc.log(
        //    "pos.xy=" + pos.x + " " + pos.y + "dstPos.xy=" + dstPos.x + " " + dstPos.y
        //);

        return dstPos;
    },

    initPrimaryWeapons: function () {
        cc.assert(false, "should not call plane PlaneBasic::initCannon method. ");
    },

    updateRender: function (star) {
        cc.assert(false, "should not call plane PlaneBasic::updateRender method. ");
    }
});