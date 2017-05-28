/**
 * Created by eddyspreeuwers on 5/25/17.
 */

import * as fs from 'fs';

var counter = 0;

export class Converter{
   // private counter = 0;
    private src = __dirname + '/../meos2a/www/meos';

    constructor (){
        console.log('working dir:  ' + __dirname);

    }

    convert() {
        console.log('converting' + this.src);
        walk(this.src );
        console.log('Nr off files converted:' + counter);
        //return this;
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
        //upPath = upPath.replace('../','');
        if (/\.ts$/.test(file) && !/converted\.ts$/.test(file)){
            console.log('f:  ' + file + ' ' + upPath);

            var contents = fs.readFileSync(file).toString().trim();
            fs.writeFileSync(file.replace(/\.ts$/,'.ts.bkp'),contents);
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
                      try{
                          fs.lstatSync(mod).isFile();
                      } catch (e){
                          let modName = mod.split('/').reverse()[0];
                          let modFile = modName.replace(/^I/,'');
                          mod = mod.replace('/'+ modName, '/'+ modFile);
                      }

                      line= `import {${imp}} from '${mod}';`;
                      //console.log(line + ' imports:' + imports);
                  }
                  return line;

              }
            );

            let converted =lines.join('\n').replace(/\}$/,'');
            //console.log(converted);
            fs.writeFileSync(file, converted);
            counter++;
        }

    }

}

new Converter().convert();
console.log('Nr off files converted:' + counter);

