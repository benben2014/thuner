/**
 * Created by chenguanglv on 2014/12/11.
 */

var thunder = thunder || {};

thunder.utils = thunder.utils || {};

thunder.utils.perAngle = Math.PI / 180;

thunder.utils.getRandomArray = function(targetArray)
{
    var arrayLength = targetArray.length;

    var tempArray1 = new Array();

    for (var i = 0; i < arrayLength; i ++)
    {
        tempArray1 [i] = i;
    }

    var tempArray2 = new Array();

    for (var i = 0; i < arrayLength; i ++)
    {
        tempArray2 [i] = tempArray1.splice (Math.floor (Math.random () * tempArray1.length) , 1);
    }

    var tempArray3 = new Array();

    for (var i = 0; i < arrayLength; i ++)
    {
        tempArray3 [i] = targetArray [tempArray2 [i]];
    }

    return tempArray3;
};

thunder.utils.ObjectClone = function(obj) {
    if (typeof (obj) != 'object')
        return obj;

    var re = {};
    if (obj.constructor==Array)
        re = [];

    for ( var i in obj) {
        re[i] = thunder.utils.ObjectClone(obj[i]);
    }

    return re;
};