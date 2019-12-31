const rawData = `id,time,name,state,img
8,2020/1/8,访客,否,helmet9.png
1,2020/1/8,员工,是,helmet5.png
2,2020/1/7,未识别人员,否,helmet6.png
2,2020/1/6,未识别人员,否,helmet6.png
3,2020/1/6,员工,是,helmet5.png
4,2020/1/5,未识别人员,否,helmet7.png
5,2020/1/4,访客,否,helmet9.png
3,2020/1/4,员工,是,helmet5.png
6,2020/1/3,访客,否,helmet9.png
2,2020/1/2,未识别人员,否,helmet6.png
3,2020/1/2,员工,是,helmet5.png
8,2020/1/2,访客,否,helmet9.png
8,2020/1/1,未识别人员,否,helmet8.png`

const data = (() => {
    const arr = []
    const strArr = rawData.split('\n')
    let keys
    let id = 1
    strArr.forEach((val, index) => {
        if (index === 0) {
            keys = val.split(',')
            return
        }
        const obj = {}
        const tempArr = val.split(',')
        tempArr.forEach((val, index) => {
            if (keys[index] === 'id') {
                obj[keys[index]] = id++
                return
            }
            obj[keys[index]] = val
        })
        arr.push(obj)
    })
    
    return arr.sort((a, b) => new Date(b.time).getTime() -  new Date(a.time).getTime())
})()

export default data