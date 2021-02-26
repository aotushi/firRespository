// 商品品牌页面对应的接口请求函数
import request from '@/utils/request';

export default {
    // 每一个接口请求函数
    //delete /admin/product/baseTrademark/remove/{id}
    // post  /admin/product/baseTrademark/save
    // put  /admin/product/baseTrademark/update
    // get  /admin/product/baseTrademark/{page}/{limit}

    delete(id){
        return request.delete(`/admin/product/baseTrademark/remove/${id}`)
    },

    addOrUpdate(trademark){
        if(trademark.id){
            return request.put(`/admin/product/baseTrademark/update`, trademark);
        }else{
            // id不存在证明是添加
            return request.post(`/admin/product/baseTrademark/save`, trademark)
        }
    },

    getPageList(page, limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    }
}