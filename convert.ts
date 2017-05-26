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
    //console.log(file, fs.lstatSync(file).isDirectory());
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
        console.log('f:  ' + file);
    }

}

new Converter().convert();