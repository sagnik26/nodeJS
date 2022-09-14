const fs = require('fs')
const http = require('http')
const url = require('url')

////////////////////////////////////////////////////////////////////////////

//**  blocking code execution (synchronous way) ** //

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}, \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file written')


//**  Non-blocking asynchronous way ** //

// fs.readFile('./txt/start.txt', 'utf-8' ,(err, data1) => {
//     if(err) return console.log('ERROR !!!')

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8' ,(err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8' ,(err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}` ,'utf-8', (err) => {
//                 console.log('Your file is being written');
//             })
//         })
//     })
// })
// console.log('..reading')

///////////////////////////////////////////////////////////////////////////

// create the SERVER //

const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the overview');
    }
    else if(pathName === '/product'){
        res.end('This is the product');
    }
    else if(pathName === '/api'){
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(data);
    }
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-header': 'hello-world' 
        });
        res.end('<h1> 404, page not found<h1/>');
    }
    
});


// listen to the server //
server.listen(8000, '127.0.0.1', () => {
    console.log('listening to request on port:8000');
});

