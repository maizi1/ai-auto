const rawData = `id,facility,state,name,time,img
1,1,未检测, ,2019/10/7,facility3-1.png
2,2,已检测正常,张成,2019/10/7,facility2.png
3,3,已检测异常,张成,2019/10/7,facility1.png
4,4,未检测, ,2019/10/12,facility3-2.png
5,5,已检测正常,张成,2019/10/7,facility2.png
6,6,已检测异常,张成,2019/10/7,facility1.png
7,7,未检测, ,2019/10/13,facility3-3.png
8,8,已检测正常,张成,2019/10/8,facility2.png
9,9,已检测异常,张成,2019/10/8,facility1.png
10,10,未检测, ,2019/10/25,facility3-4.png
11,11,已检测正常,李志,2019/10/9,facility2.png
12,12,已检测异常,李志,2019/10/9,facility1.png
13,13,未检测, ,2019/10/27,facility3-2.png
14,14,已检测正常,李志,2019/10/9,facility2.png
15,15,已检测异常,李志,2019/10/10,facility1.png
16,16,未检测, ,2019/10/29,facility3-3.png
17,17,已检测正常,李志,2019/10/10,facility2.png
18,18,已检测异常,李志,2019/10/10,facility1.png`

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