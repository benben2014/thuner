/**
 * Created by chenguanglv on 14/12/20.
 */

var thunder = thunder || {};

thunder.equipment = thunder.equipment || {};

thunder.equipment.stars = {
    S2 : {
        INDEX : 0,
        COUNT : 2
    },
    S3 : {
        INDEX : 1,
        COUNT : 3
    },
    S4 : {
        INDEX : 2,
        COUNT : 4
    },
    S5 : {
        INDEX : 3,
        COUNT : 5
    },

    getMinStar : function(){
        return this.S2;
    },

    getMaxStar : function(){
        return this.S5;
    },

    getNextStar : function(star){
        if(star === this.S2){
            return this.S3;
        }
        else if(star === this.S3){
            return this.S4;
        }
        else if(star === this.S4){
            return this.S5;
        }
        else {
            return null;
        }
    }
};

thunder.equipment.steps = [
    {
        MAX : 25,
        STAR : thunder.equipment.stars.S2
    },
    {
        MAX : 35,
        STAR : thunder.equipment.stars.S3
    },
    {
        MAX : 60,
        STAR : thunder.equipment.stars.S4
    },
    {
        MAX : 65,
        STAR : thunder.equipment.stars.S4
    },
    {
        MAX : 70,
        STAR : thunder.equipment.stars.S4
    },
    {
        MAX : 75,
        STAR : thunder.equipment.stars.S4
    },
    {
        MAX : 75,
        STAR : thunder.equipment.stars.S5
    },
    {
        MAX : 80,
        STAR : thunder.equipment.stars.S5
    },
    {
        MAX : 85,
        STAR : thunder.equipment.stars.S5
    },
    {
        MAX : 90,
        STAR : thunder.equipment.stars.S5
    }
];

thunder.equipment.power = {
    MIN : 0,
    MAX : 3,
    BURST : 4
};

thunder.equipment.burstTimeout = 5;

thunder.equipment.equipZOrder = {
    BULLET : 0,
    WEAPON : 1,
    WINGMAN : 2,
    PLANE : 3,
    ARMOR : 4
}