// 读取./list中所有的.js文件为一个列表
// 然后将文件路径格式化为 `https://raw.githubusercontent.com/Dwjem/lx-music-source-map/master/dist/${file-name}`
// 在将文件路径写入到readme.md中，
/*写入格式为
`
 * ${filename}
```
https://raw.githubusercontent.com/Dwjem/lx-music-source-map/master/dist/${file-name}
```
`
*/
const fs = require('fs');
const path = require('path');
let list = [];
function readFile(dir) {
    var files = fs.readdirSync(dir);
    files.forEach((file) => {
        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            readFile(`${dir}/${file}`);
        } else {
            list.push({
                name: file,
                path: `https://raw.githubusercontent.com/Dwjem/lx-music-source-map/master/${dir}/${file}`
            });
        }
    });
}
readFile('dist');

let str = '';
for (let i = 0; i < list.length; i++) {
    str += `
 ${i+1}. [${list[i].name}](${list[i].path})

 \`\`\`
 ${list[i].path}
 \`\`\`

`;
}

// console.log(str);

// 读取readme.md文件，将start和end之间的内容替换为str
const readme = fs.readFileSync('README.md', 'utf8');
// console.log(readme);
const result = readme.replace(/<!-- start -->[\s\S]*?<!-- end -->/, `<!-- start -->
${str}
<!-- end -->`);

// 同步写入
fs.writeFileSync( 'README.md', result, 'utf8');

console.log('readme.md 更新完成!', '^_^', '共' + list.length, '个');


