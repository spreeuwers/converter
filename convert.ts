/**
 * Created by eddyspreeuwers on 5/25/17.
 */

import * as fs from 'fs';

export class Converter{

    private src = __dirname + '/src';

    constructor (){
        console.log('workking dir:  ' + __dirname);

    }

    convert() {
        console.log('converting' + this.src);
        walk(this.src );

    }
}

function walk(file: string, prefix?: string){
    //console.log(prefix);
    let upPath = (prefix === undefined) ? '' : prefix + '../';
    let isFolder = fs.lstatSync(file).isDirectory();
    if(isFolder){
        console.log('d:  ' + file);
        fs.readdir(file, (err, files) => {
            files.forEach(f => {
                   walk(file + '/' + f, upPath);
                }
            );
        });
    } else {
        upPath = upPath.replace('../','');
        if (/\.ts$/.test(file) && !/converted\.ts$/.test(file)){
            console.log('f:  ' + file + ' ' + upPath);
            var contents = fs.readFileSync(file).toString().trim();
            let lines = contents.split(/\n/);
            let imports = lines.filter(f=> /^import/.test(f) );
            //import Entity = app.common.domein.model.Entity;
            let refs = lines.filter(f=> /^\/\/\/<reference/.test(f) );
            lines = lines.filter(f=> !/^\/\/\/<reference/.test(f) );
            lines = lines.filter(f=>!/^module\s/.test(f));

            lines = lines.map(
                (line) => {
                  //let leftRight = line.split('=')
                  line = line.replace('    ','');
                  //let t = 'import Entity = app.common.domein.model.Entity;';
                  let imports = line.match(/import\s+(.*)\s+=\s+(.*);/);
                  if (imports && imports.length === 3){
                      imports.shift();
                      let imp = imports.shift();
                      let mod = imports.shift();
                      mod = upPath + mod.split('.').join('/');
                      line= `import {${imp}} from '${mod}';`;
                      //console.log(line + ' imports:' + imports);
                  }
                  return line;

              }
            );

            let converted =lines.join('\n').replace(/\}$/,'');
            //console.log(converted);
            fs.writeFileSync(file.replace(/\.ts$/,'_converted.ts'),converted);
        }

    }

}

new Converter().convert();