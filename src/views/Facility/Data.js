const rawData = `id,facility,state,name,time,img
1,1,未检测, ,2019/10/7,6daef54c39143fc97d796f61ab7ec0d.png
2,2,已检测正常,张成,2019/10/7,6daef54c39143fc97d796f61ab7ec0d.png
3,3,已检测异常,张成,2019/10/7,6daef54c39143fc97d796f61ab7ec0d.png
4,4,未检测, ,2019/10/12,6daef54c39143fc97d796f61ab7ec0d.png
5,5,已检测正常,张成,2019/10/7,6daef54c39143fc97d796f61ab7ec0d.png
6,6,已检测异常,张成,2019/10/7,6daef54c39143fc97d796f61ab7ec0d.png
7,7,未检测, ,2019/10/13,6daef54c39143fc97d796f61ab7ec0d.png
8,8,已检测正常,张成,2019/10/8,6daef54c39143fc97d796f61ab7ec0d.png
9,9,已检测异常,张成,2019/10/8,6daef54c39143fc97d796f61ab7ec0d.png
10,10,未检测, ,2019/10/25,6daef54c39143fc97d796f61ab7ec0d.png
11,11,已检测正常,李志,2019/10/9,6daef54c39143fc97d796f61ab7ec0d.png
12,12,已检测异常,李志,2019/10/9,6daef54c39143fc97d796f61ab7ec0d.png
13,13,未检测, ,2019/10/27,6daef54c39143fc97d796f61ab7ec0d.png
14,14,已检测正常,李志,2019/10/9,6daef54c39143fc97d796f61ab7ec0d.png
15,15,已检测异常,李志,2019/10/10,6daef54c39143fc97d796f61ab7ec0d.png
16,16,未检测, ,2019/10/29,6daef54c39143fc97d796f61ab7ec0d.png
17,17,已检测正常,李志,2019/10/10,6daef54c39143fc97d796f61ab7ec0d.png
18,18,已检测异常,李志,2019/10/10,6daef54c39143fc97d796f61ab7ec0d.png`

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