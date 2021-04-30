import JSZip  from "jszip";
import { saveAs } from 'file-saver';

function process (zipFile: File, log: Function): Promise<Boolean> {
        return new Promise(async (resolve,rejects) => {
                await log('Process started');
                if(zipFile.size === 0){
                        rejects(false);
                        return;
                }
                try {
                        function isPHP(name:String): Boolean {
                                return name.match(/\.php$/) ? true : false;
                        }
                        await JSZip.loadAsync(zipFile).then(async (zip) => {
                                const newZip = new JSZip();
                                
                                log('File \''+zipFile.name+'\' is opened');    
                                for(const key in zip.files){
                                        const zipEntry = zip.files[key];
                                        const name = zipEntry.name;
                                        if(zipEntry.dir){
                                                newZip.folder(name);
                                        }
                                        const text = await zipEntry.async("string");
                                        if(isPHP(name)){
                                                const newText = text.replace(/<\?(?!php|=)/g,'<?php ');
                                                newZip.file(name,newText || text);
                                                log('File processed: '+name);
                                        }else{
                                                log('File skiped: '+name);
                                                newZip.file(name,text);
                                        }
                                }
                                newZip.generateAsync({type:"blob"})
                                .then(function (blob) {
                                    saveAs(blob, "out.zip");
                                });
                                log('Process is end');
                        });
                }catch(error){
                        await log(error.toString());
                        rejects(false);
                        return;
                }
                resolve(true);
                return;
        });
}

export let processZip = process;