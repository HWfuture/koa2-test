const fs = require('fs')
const path = require('path')


// function readFileName(fileName, callback) {
//     const getFullName =  path.resolve('files', fileName)
//     fs.readFile(getFullName, (err, data) => {
//         if(err)
//             throw err
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// readFileName('a.json', aData => {
//     console.log('a data:', aData);
//     readFileName('b.json', bData => {
//         console.log('b data:', bData);
//         readFileName('c.json', cData => {
//             console.log('c data:', cData);
//         })
//     })
// })

// Promise 方法

function readFileName(fileName) {
    return new Promise( (resolve, reject) => {
            const getFullName =  path.resolve('files', fileName)
            fs.readFile(getFullName, (err, data) => {
                if(err)
                    return reject(err)
                resolve(
                    JSON.parse(data.toString())       //执行状态为成功 抛出结果给.then()的参数
                )
            })
    })
}

readFileName('a.json').then(aData =>{
    console.log('a Data:', aData)
    return readFileName(aData.next)
}).then(bData => {
    console.log('b Data:', bData)
    return readFileName(bData.next)
}).then(cData => {
    console.log('c Data:', cData)
})
