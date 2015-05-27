/**
 * Created by chenguanglv on 15/1/4.
 */

var thunder = thunder || {};

thunder.weapon = {};

thunder.weapon.type = {
    PRIMARY : 0,
    SECONDARY : 1
};

thunder.weapon.primary = {
    STRIKER : {
        ID : 1,
        TYPE : thunder.weapon.type.PRIMARY,
        ATTACK : [
            {MIN : 180, MAX : 1000},
            {MIN : 200, MAX : 1200},
            {MIN : 220, MAX : 1400},
            {MIN : 240, MAX : 1600},
            {MIN : 260, MAX : 1800},
            {MIN : 280, MAX : 2000},
            {MIN : 300, MAX : 2200},
            {MIN : 320, MAX : 2400},
            {MIN : 340, MAX : 2600},
            {MIN : 360, MAX : 2800}
        ]
    }
};

thunder.weapon.secondary = {
    CRUISE : {
        ID : 1,
        TYPE : thunder.weapon.type.SECONDARY,
        NAME : ['跟踪导弹','雷达导弹','弹道导弹','弹道导弹＋1','弹道导弹＋2',
            '弹道导弹＋3','巡航导弹','巡航导弹＋1','巡航导弹＋2','巡航导弹＋3'],
        DESCRIPTION : [
            '每次攻击发射两枚跟踪导弹，具有锁定并跟踪目标的功能。',
            '每次攻击最多发射四枚雷达导弹，具有锁定并跟踪目标的功能。',
            '每次攻击最多发射六枚弹道导弹，具有锁定并跟踪目标的功能。',
            '每次攻击最多发射八枚巡航导弹，具有锁定并跟踪目标的功能。'
        ],
        ATTACK : [
            {MIN : 180, MAX : 1000},
            {MIN : 200, MAX : 1200},
            {MIN : 220, MAX : 1400},
            {MIN : 240, MAX : 1600},
            {MIN : 260, MAX : 1800},
            {MIN : 280, MAX : 2000},
            {MIN : 300, MAX : 2200},
            {MIN : 320, MAX : 2400},
            {MIN : 340, MAX : 2600},
            {MIN : 360, MAX : 2800}
        ]
    }
};

thunder.weapon.getWeaponById = function(weaponId){
    for(var key in thunder.weapon.primary){
        if(thunder.weapon.primary[key].ID === weaponId){
            return thunder.weapon.primary[key];
        }
    }

    for(var key in thunder.weapon.secondary){
        if(thunder.weapon.secondary[key].ID === weaponId){
            return thunder.weapon.secondary[key];
        }
    }
};

thunder.weapon.getAttack = function(weapon,step,level){
    if(weapon){
        var attack = weapon.ATTACK[step];
        var maxLevel = thunder.equipment.steps[step].MAX;
        var perLevelAttack = (attack.MAX - attack.MIN) / maxLevel;

        return (attack.MIN + (level - 1) * perLevelAttack);
    }

    return 0;
};
