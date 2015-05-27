/**
 * Created by chenguanglv on 14/12/26.
 */

var BulletFollow = BulletBasic.extend({
    _target : null,

    doUpdatePosition : function(dt){
        if(!this._target){
            //TODO : get Target From enemy list.
            var enemys = flyerManager.getEnemys();
            if(enemys && enemys.length > 0){
                this._target = enemys[0];
            }
        }

        if(this._target){
            var pos = this.convertToWorldSpace(this._render.getPosition());
            var posTarget = this._target.getPosition();

            var distance = Math.sqrt(
                (pos.x - posTarget.x) * (pos.x - posTarget.x) + (pos.y - posTarget.y) * (pos.y - posTarget.y)
            );

            var newPos = cc.p(
                pos.x + this._speed * (posTarget.x - pos.x) / distance * dt,
                pos.y + this._speed * (posTarget.y - pos.y) / distance * dt
            );

            var angle = Math.asin((posTarget.x - pos.x)/distance) / thunder.utils.perAngle;
            if(pos.y > posTarget.y){
                angle = 180 - angle;
            }

            this.setPosition(newPos);
            this.setRotation(angle);
        }
        else {
            this._super();
        }
    }
});