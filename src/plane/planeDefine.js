/**
 * Created by chenguanglv on 14/12/20.
 */

var thunder = thunder || {};

thunder.plane = thunder.plane || {};
thunder.plane = {
    STRIKER : {
        ID : 1,
        NAME : ['突击零式', '脉冲突击','迅雷突击','迅雷突击＋1','迅雷突击＋2',
            '迅雷突击＋3','雷霆突击','雷霆突击＋1','雷霆突击＋2','雷霆突击＋3'],
        DESCRIPTION : [
            '地球联邦开发的新世代初型战机，由于是第一次尝试，虽然能力有限，但是有很大改进空间。',
            '地球联邦开发的新世代量产战机，技术已经趋于成熟，开始量产并大批投入使用。',
            '地球联邦开发的新世代队长战机，搭载最新操作系统，由于使用难度的提高，并不是所有人都能驾驭。',
            '地球两磅开发的新世代英雄战机，传说中的战机，只有少数几个人才见过的超级战机。'
        ]
    }
};

thunder.plane.moveStep = {
    step1 : {
        DISTANCE : 5,
        INDEX : 0
    },
    step2 : {
        DISTANCE : 10,
        INDEX : 1
    },
    step3 : {
        DISTANCE : 15,
        INDEX : 2
    }
};

thunder.plane.visibleSize = cc.size(80,80);
thunder.plane.validSize = cc.size(14,14);

thunder.plane.getPlaneById = function(planeId){
    for(var key in thunder.plane){
        if(thunder.plane[key].ID === planeId){
            return thunder.plane[key];
        }
    }
};