/**
 * Created by chenguanglv on 14/12/20.
 */

var PlaneManager = cc.Class.extend({

    getPlane : function(plane){
        switch(plane){
            case thunder.plane.STRIKER:
                return new StrikerPlane(thunder.equipment.stars.S2,0,1);
            default :
                break;
        }
        return null;
    },

    getPlaneRes : function(plane){
        switch(plane){
            case thunder.plane.STRIKER:
                return g_res_plane_striker;
            default :
                break;
        }

        return null;
    }
});

var planeManager = new PlaneManager();