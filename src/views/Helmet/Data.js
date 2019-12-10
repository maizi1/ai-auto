const rawData = `id,time,name,state,img
1,2019/10/18 15:25,高晟,是,5f6c5d52c7e99030260a3cbd94fd07b.png
2,2019/10/19 15:25,未识别人员,否,8ad2d968548d4cf01036e1833fe99ed.png
3,2019/10/20 15:25,李然,是,4e5de42a47d7996cd1ee44360ed78eb.png
4,2019/10/21 15:25,未识别人员,否,8ad2d968548d4cf01036e1833fe99ed.png
5,2019/10/22 15:25,窦廉,否,8ad2d968548d4cf01036e1833fe99ed.png
6,2019/10/23 15:25,迟范,否,8ad2d968548d4cf01036e1833fe99ed.png
7,2019/10/24 15:25,顾理,否,8ad2d968548d4cf01036e1833fe99ed.png
8,2019/10/25 15:25,方楼,否,8ad2d968548d4cf01036e1833fe99ed.png`

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