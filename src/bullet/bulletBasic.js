/**
 * Created by chenguanglv on 14/12/25.
 */

var BulletBasic = cc.Node.extend({
    _star : null,
    _power : thunder.equipment.power.MIN,
    _angleY : 0,
    _speed: 0,
    _speedComponents : cc.p(0,0),
    _attack : 0,
    _render : null,

    ctor: function (star, power, speed , angleY) {
        this._super();

        this._star = star;
        this._power = power;
        this._angleY = angleY;
        this._speed = speed;

        this.initRender();

        this._render.setRotation(-angleY);

        this.initSpeedComponents();
        this.scheduleUpdate();
    },

    initSpeedComponents: function () {
        this._speedComponents = cc.p(
            this._speed * Math.cos((this._angleY + 90) * Math.PI / 180),
            this._speed * Math.cos(this._angleY * Math.PI / 180)
        );
    },

    getSpeedComponents : function(){
        return this._speedComponents;
    },

    update : function(dt){
        if(this.checkOutOfScreen()){
            this.getParent().removeChild(this);
            return ;
        }
        this.doUpdatePosition(dt);

        var collisionTarget = this.doCheckCollision();
        if(collisionTarget){
            this.doHitTarget();
            if(collisionTarget.beHurt){
                collisionTarget.beHurt(this._attack);
            }
        }
    },

    initRender : function(){
        this.doInitRender();
    },

    checkOutOfScreen : function(){
        //TODO : need reImplement

        var pos = this._render.getPosition();

        if(!cc.rectContainsPoint(cc.rect(0,0,640,1136),this.convertToWorldSpace(pos))){
            return true;
        }
    },

    doInitRender : function(){
        cc.assert(false,'derived class must implement "doInitRender" method.');
    },

    doUpdatePosition : function(dt){
        var pos = this._render.getPosition();
        this._render.setPosition(cc.p(
            pos.x + dt * this._speedComponents.x,
            pos.y + dt * this._speedComponents.y
        ));
    },

    doCheckCollision : function(){
        var validRect = this._render.getValidRect();

        var enemys = flyerManager.getEnemys();

        for(var i = 0; i < enemys.length; i++){
            var rectEnemy = enemys[i].getBoundingBox();
            if(cc.rectIntersectsRect(validRect,rectEnemy)){
                return enemys[i];
            }
        }
    },

    doHitTarget : function(){
        cc.assert(false,'derived class must implement "doCheckCollision" method.');
    },

    //BulletRenderDelegate
    onHitEnded : function(){
        this.removeFromParent(true);
    }

});