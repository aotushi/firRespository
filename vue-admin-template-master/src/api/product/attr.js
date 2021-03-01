// attr属性相关api接口
import request from '@/utils/request';
export default {
    // 根据选中的123及分类id获取属性列表
    //  get  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
    // attrInfoList
    getList(category1Id, category2Id, category3Id,) {
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },


    // 根据属性id删除属性
    // DELETE /admin/product/deleteAttr/{attrId}
    // deleteAttr
    delete(attrId) {
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    },


    // 增加或者修改属性
    // POST /admin/product/saveAttrInfo
    // {
    //     "attrName": "string",
    //     "attrValueList": [
    //       {
    //         "attrId": 0,
    //         "id": 0,
    //         "valueName": "string"
    //       }
    //     ],
    //     "categoryId": 0,
    //     "categoryLevel": 0,
    //     "id": 0
    //   }
    addOrUpdate(attr) {
        return request.post('/admin/product/saveAttrInfo', attr)
    }
}