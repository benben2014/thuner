/**
 * Created by chenguanglv on 2014/12/13.
 */


var TEST_LIST_DEF = [
    {
        NAME : "场景测试",
        SCENE : MapTestScene,
        RESOURCE : [g_res_map_black,g_res_map_forest,g_res_map_purple,g_res_map_fire]
    },
    {
        NAME : "飞机测试",
        SCENE : PlaneTestScene,
        RESOURCE : [g_res_plane_striker,g_res_map_black,g_res_bullet_striker,g_res_effect,g_res_fire,g_res_bullet_cruise]
    },
    {
        NAME : "副武器测试",
        SCENE : WeaponTestScene,
        RESOURCE : []
    },
    {
        NAME : "僚机测试",
        SCENE : WingmanTestScene,
        RESOURCE : []
    },
    {
        NAME : "装甲测试",
        SCENE : ArmorTestScene,
        RESOURCE : []
    },
    {
        NAME : "敌机测试",
        SCENE : EnemyTestScene,
        RESOURCE : []
    },
    {
        NAME : "特效测试",
        SCENE : EffectTestScene,
        RESOURCE : []
    }
];