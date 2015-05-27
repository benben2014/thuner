/**
 * Created by lcg on 14/12/12.
 */

var ModalLayer = TopLayer.extend({
    _listener : null,

    onEnter : function(){
        this._super();

        this._listener = cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function(touch,event){
                return true;
            }
        },this);
    },

    onExit : function(){
        if(this._listener){
            cc.eventManager.removeListener(this._listener);
        }

        this._super();
    }
});