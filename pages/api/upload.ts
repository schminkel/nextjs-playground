// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import fs2 from "fs";
import path from "path";
import formidable, { File } from 'formidable';

/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,  
    }
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };


    //console.log('### req (upload.ts)', req)
    //console.log('### res (upload.ts)', res)

    /* Get files using formidable */
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        
        let maxFileSize = 5000 * 1024 * 1024; // 300 = 300 MB / 5000 = 5GB
        const form = new formidable.IncomingForm({ uploadDir: './uploads/', keepExtensions: true, maxFileSize: maxFileSize, allowEmptyFiles: false });
        console.log('### form (upload.ts)', form)

        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            //
        });
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });

    console.log('### files (upload.ts)', files)

    if ((files as any)?.length) {

        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of (files as any)) {
            const tempPath = file[1].filepath;
            
            if (fs2.existsSync(targetPath + file[1].originalFilename)) {
                // file alreay exists --> add milliseconds to the filename
                let fullFileName = file[1].originalFilename;
                let fileExtension = fullFileName.split('.').pop();
                var fileName = fullFileName.substr(0, fullFileName.lastIndexOf("."));
                let millis = new Date().getMilliseconds();

                if (fileExtension !== undefined) {
                    await fs.rename(tempPath, targetPath + fileName + "-" + millis + "." + fileExtension);
                } else {
                    await fs.rename(tempPath, targetPath + fileName + "-" + millis);
                }

            } else {
                await fs.rename(tempPath, targetPath + file[1].originalFilename);
            }
        }
    }

    res.status(status).json(resultBody);
}

export default handler;