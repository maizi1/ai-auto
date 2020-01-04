const rawData = `id,facility,state,name,time,img
1,1,未检测, ,2020/01/8,facility3-1.png
2,2,已检测正常,张成,2020/01/7,facility2.png
3,3,已检测异常,张成,2020/01/7,facility1.png
4,4,未检测, ,2020/01/6,facility3-2.png
5,5,未检测, ,2020/01/5,facility3-3.png
6,6,未检测, ,2020/01/4,facility3-4.png
7,7,未检测, ,2020/01/3,facility3-5.png
8,8,未检测, ,2020/01/2,facility3-6.png
9,9,未检测, ,2020/01/2,facility3-7.png
10,10,未检测, ,2020/01/2,facility3.png`

const data = (() => {
    const arr = []
    const strArr = rawData.split('\n')
    let keys
    strArr.forEach((val, index) => {
        if (index === 0) {
            keys = val.split(',')
            return
        }
        const obj = {}
        const tempArr = val.split(',')
        tempArr.forEach((val, index) => {
            obj[keys[index]] = val
        })
        arr.push(obj)
    })
    
    return arr
})()

export default data