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
        fs.readdir(this.src, (err, files) => {
            files.forEach(file => {
                    console.log(file);
                }
            );
        });
    }
}

new Converter().convert();