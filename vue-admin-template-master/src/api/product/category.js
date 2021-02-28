import request from '@/utils/request';
export default {
    // 获取一级分类列表
    // GET /admin/product/getCategory1
    getCategory1(){
        return request.get('/admin/product/getCategory1')
    },

    // 获取二级分类列表
    // GET /admin/product/getCategory2/{category1Id}
    getCategory2(category1Id){
        return request.get(`/admin/product/getCategory2/${category1Id}`)
    },

    // 获取三级分类列表
    // GET /admin/product/getCategory3/{category2Id}
    getCategory3(category2Id){
        return request.get(`/admin/product/getCategory3/${category2Id}`)
    }
}