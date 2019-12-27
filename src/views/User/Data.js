const rawData = `id,name,jurisdiction,area,group
1,秦淮景,系统,上海海上苑,高抛用户
2,吴志仁,一般,上海海上苑,高抛用户
3,王艺,系统,上海梅林阁,高抛用户
4,张芸,一般,上海梅林阁,高抛用户
5,吕易,系统,上海乐和,河道监控
6,李想,一般,上海乐和,河道监控
7,张XX,系统,六盘水,河道监控
8,吴天瑞,系统,浙江国电,安全及身份识别
9,张欣,系统,苏州工地,安全及身份识别
10,张成,一般,上海,设备检测`

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