export default {
    //sku排序算法
    cartesianProductOf() {
        return Array.prototype.reduce.call(arguments, function (a, b) {
            var ret = []; 
            a.forEach(itemA=> {
                b.forEach(itemB=> {
                    ret.push([].concat([itemA],[itemB]))
                })
               
            })
            return ret
        })
    },
    swapArray(arr,index1,index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
        return arr
    },
    //升序
    moveUp(arr,index) {
        this.swapArray(arr,index,index-1)
    },
    //降序
    moveDown(arr, index) {
        this.swapArray(arr, index, index +1)
    }
}