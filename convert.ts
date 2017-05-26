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
        walk(this.src);

    }
}

function walk(file: string){

    let isFolder = fs.lstatSync(file).isDirectory();
    if(isFolder){
        console.log('d:  ' + file);
        fs.readdir(file, (err, files) => {
            files.forEach(f => {
                   walk(file + '/' + f);
                }
            );
        });
    } else {

        if (/\.ts$/.test(file)){
            console.log('f:  ' + file);
            var contents = fs.readFileSync(file).toString();
            console.log(contents);
        }

    }

}

new Converter().convert();