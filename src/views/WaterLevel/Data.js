const rawData = `id,point,river,area,time,value,img
1,1,a,A,2019/1/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/1/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/1/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/1/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/1/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/1/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/1/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/1/25 15:25,155
9,2,b,A,2019/1/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/1/27 15:25,164
11,3,c,A,2019/1/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/1/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/1/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/1/31 15:25,175
1,1,a,A,2019/2/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/2/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/2/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/2/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/2/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/2/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/2/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/2/25 15:25,155
9,2,b,A,2019/2/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/2/27 15:25,164
11,3,c,A,2019/2/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/2/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/2/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/2/31 15:25,175
1,1,a,A,2019/3/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/3/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/3/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/3/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/3/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/3/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/3/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/3/25 15:25,155
9,2,b,A,2019/3/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/3/27 15:25,164
11,3,c,A,2019/3/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/3/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/3/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/3/31 15:25,175
1,1,a,A,2019/4/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/4/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/4/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/4/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/4/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/4/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/4/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/4/25 15:25,155
9,2,b,A,2019/4/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/4/27 15:25,164
11,3,c,A,2019/4/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/4/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/4/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/4/31 15:25,175
1,1,a,A,2019/5/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/5/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/5/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/5/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/5/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/5/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/5/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/5/25 15:25,155
9,2,b,A,2019/5/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/5/27 15:25,164
11,3,c,A,2019/5/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/5/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/5/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/5/31 15:25,175
1,1,a,A,2019/6/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/6/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/6/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/6/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/6/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/6/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/6/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/6/25 15:25,155
9,2,b,A,2019/6/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/6/27 15:25,164
11,3,c,A,2019/6/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/6/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/6/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/6/31 15:25,175
1,1,a,A,2019/7/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/7/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/7/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/7/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/7/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/7/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/7/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/7/25 15:25,155
9,2,b,A,2019/7/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/7/27 15:25,164
11,3,c,A,2019/7/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/7/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/7/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/7/31 15:25,175
1,1,a,A,2019/8/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/8/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/8/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/8/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/8/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/8/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/8/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/8/25 15:25,155
9,2,b,A,2019/8/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/8/27 15:25,164
11,3,c,A,2019/8/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/8/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/8/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/8/31 15:25,175
1,1,a,A,2019/9/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/9/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/9/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/9/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/9/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/9/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/9/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/9/25 15:25,155
9,2,b,A,2019/9/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/9/27 15:25,164
11,3,c,A,2019/9/28 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/9/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/9/30 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/9/31 15:25,175
1,1,a,A,2019/10/18 15:25,150,1544c0954d938e8ba2db673755c762d.jpg
2,1,a,A,2019/10/19 15:25,169,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
3,1,a,A,2019/10/20 15:25,178,1544c0954d938e8ba2db673755c762d.jpg
4,1,a,A,2019/10/21 15:25,134,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
5,1,a,A,2019/10/22 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
6,2,b,A,2019/10/23 15:25,136,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
7,2,b,A,2019/10/24 15:25,155,1544c0954d938e8ba2db673755c762d.jpg
8,2,b,A,2019/10/25 15:25,155
9,2,b,A,2019/10/26 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
10,2,b,A,2019/10/27 15:25,164
11,3,c,A,2019/10/27 15:25,167,1544c0954d938e8ba2db673755c762d.jpg
11,3,c,A,2019/10/28 15:25,159,1544c0954d938e8ba2db673755c762d.jpg
12,3,c,A,2019/10/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,3,c,A,2019/10/30 15:25,183,1544c0954d938e8ba2db673755c762d.jpg
14,3,c,A,2019/10/31 15:25,175
15,3,c,A,2019/11/1 15:25,165,1544c0954d938e8ba2db673755c762d.jpg
16,3,c,A,2019/11/2 15:25,202,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
17,3,c,A,2019/11/3 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
18,3,c,A,2019/11/4 15:25,155
19,3,c,A,2019/11/5 15:25,164,1544c0954d938e8ba2db673755c762d.jpg
11,11,c,A,2019/10/22 15:25,167,1544c0954d938e8ba2db673755c762d.jpg
11,11,c,A,2019/10/23 15:25,147,1544c0954d938e8ba2db673755c762d.jpg
12,11,c,A,2019/10/24 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,11,c,A,2019/10/25 15:25,183,1544c0954d938e8ba2db673755c762d.jpg
14,11,c,A,2019/10/26 15:25,175
11,11,c,A,2019/10/27 15:25,167,1544c0954d938e8ba2db673755c762d.jpg
11,11,c,A,2019/10/28 15:25,147,1544c0954d938e8ba2db673755c762d.jpg
12,11,c,A,2019/10/29 15:25,154,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
13,11,c,A,2019/10/30 15:25,183,1544c0954d938e8ba2db673755c762d.jpg
14,11,c,A,2019/10/31 15:25,175
15,11,c,A,2019/11/1 15:25,165,1544c0954d938e8ba2db673755c762d.jpg
16,11,c,A,2019/11/2 15:25,202,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
17,11,c,A,2019/11/3 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
18,11,c,A,2019/11/4 15:25,155
19,11,c,A,2019/11/5 15:25,164,1544c0954d938e8ba2db673755c762d.jpg
20,4,d,B,2019/11/6 15:25,137,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
21,4,d,B,2019/11/7 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
22,4,d,B,2019/11/8 15:25,123,bfd00f4d3a6fe4e8b2fc4564895e4cb.png
23,4,d,B,2019/11/9 15:25,213,1544c0954d938e8ba2db673755c762d.jpg
24,4,d,B,2019/11/10 15:25,154
25,4,d,B,2019/11/11 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
26,4,d,B,2019/11/12 15:25,156
27,4,d,B,2019/11/13 15:25,123,1544c0954d938e8ba2db673755c762d.jpg
28,4,d,B,2019/11/14 15:25,143
29,4,d,B,2019/11/15 15:25,175,1544c0954d938e8ba2db673755c762d.jpg
30,4,d,B,2019/11/16 15:25,135
31,5,e,B,2019/11/17 15:25,223
32,5,e,B,2019/11/18 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
33,5,e,B,2019/11/19 15:25,145
34,5,e,B,2019/11/20 15:25,164
35,5,e,B,2019/11/21 15:25,137,1544c0954d938e8ba2db673755c762d.jpg
36,5,e,B,2019/11/22 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
37,5,e,B,2019/11/23 15:25,175
38,5,e,B,2019/11/24 15:25,135,1544c0954d938e8ba2db673755c762d.jpg
39,5,e,B,2019/11/25 15:25,205
40,6,f,C,2019/11/26 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
41,6,f,C,2019/11/27 15:25,145
42,6,f,C,2019/11/28 15:25,164
43,6,f,C,2019/11/29 15:25,137
44,6,f,C,2019/11/30 15:25,154,1544c0954d938e8ba2db673755c762d.jpg
45,6,f,C,2019/12/1 15:25,175
46,6,f,C,2019/12/2 15:25,135
47,6,f,C,2019/12/3 15:25,204,1544c0954d938e8ba2db673755c762d.jpg
48,6,f,C,2019/12/4 15:25,154
49,6,f,C,2019/12/5 15:25,145
50,7,g,C,2019/12/6 15:25,164,1544c0954d938e8ba2db673755c762d.jpg
51,7,g,C,2019/12/7 15:25,175
52,7,g,C,2019/12/8 15:25,135
53,7,g,C,2019/12/9 15:25,214,1544c0954d938e8ba2db673755c762d.jpg
54,7,g,C,2019/12/10 15:25,154
55,7,g,C,2019/12/11 15:25,145,1544c0954d938e8ba2db673755c762d.jpg
56,7,g,C,2019/12/12 15:25,164
57,7,g,C,2019/12/13 15:25,137,1544c0954d938e8ba2db673755c762d.jpg`

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
    
    return arr
})()

export default data