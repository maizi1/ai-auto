const rawData = `id,name,auth,group,activity
1,吕易,系统,河道监控,登录
2,王艺,系统,高抛用户,修改
3,张毅,系统,河道监控,登录
4,吴天瑞,系统,安全及身份识别,登录
5,吕易,系统,河道监控,修改
6,吴天瑞,系统,安全及身份识别,修改
7,秦淮景,系统,高抛用户,登录
8,吴志仁,一般,高抛用户,登录
9,吕易,系统,河道监控,退出
10,张成,一般,设备检测,登录
11,李想,一般,河道监控,登录
12,张成,一般,设备检测,修改
13,秦淮景,系统,高抛用户,退出
14,张芸,一般,高抛用户,修改
15,吴志仁,一般,高抛用户,修改
16,张成,一般,设备检测,退出
17,张欣,系统,安全及身份识别,修改
18,王艺,系统,高抛用户,登录
19,张毅,系统,河道监控,退出
20,张欣,系统,安全及身份识别,退出
21,李想,一般,河道监控,退出
22,王艺,系统,高抛用户,退出
23,张芸,一般,高抛用户,退出
24,吴志仁,一般,高抛用户,退出
25,吴天瑞,系统,安全及身份识别,退出`

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