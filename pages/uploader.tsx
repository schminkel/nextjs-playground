import type { NextPage } from 'next'
import React from "react";

const Uploader: NextPage = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

    const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {

        /* Prevent form from submitting by default */
        e.preventDefault();

        /* If file is not selected, then show alert message */
        if (!inputFileRef.current?.files?.length) {
            alert('Please, select file you want to upload');
            return;
        }

        setIsLoading(true);

        /* Add files to FormData */
        const formData = new FormData();
        Object.values(inputFileRef.current.files).forEach(file => {
            formData.append('file', file);
        })

        /* Send request to our api route */
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const body = await response.json() as { status: 'ok' | 'fail', message: string };

        alert(body.message);

        if (body.status === 'ok') {
            inputFileRef.current.value = '';
            // Do some stuff on successfully upload
        } else {
            // Do some stuff on error
        }

        setIsLoading(false);


        let fileLabel = document.getElementById('file-label');
        fileLabel.innerHTML = "";
    };

    const fileUploadPressed = () => {
        
        var dropzoneFile = document.getElementById('dropzone-file');
        let fileLabel = document.getElementById('file-label');

        if ((dropzoneFile as any).value == "")
        {
            fileLabel.innerHTML = "";
        }
        else
        {
            var theSplit = (dropzoneFile as any).value.split('\\');
            fileLabel.innerHTML = theSplit[theSplit.length-1];
        }
    }

    return (

        <>

        <form>
            <div>
                <input type="file" name="myfile" ref={inputFileRef} multiple />
            </div>
            <div>
                <input type="submit" value="Upload" disabled={isLoading} onClick={handleOnClick} />
                {isLoading && ` Wait, please...`}
            </div>
        </form>


        <div className="flex justify-center items-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                
                <input id="dropzone-file" type="file" className="hidden" name="myfile" ref={inputFileRef} onChange={fileUploadPressed} multiple />
                <label id="file-label" className="p-2"></label>
                
                <input className="border-neutral-600 bg-slate-400 p-3 rounded-2xl" type="submit" value="Upload" disabled={isLoading} onClick={handleOnClick} />
                {isLoading && ` Wait, please...`}
            </label>
        </div>

        </>
    )
}

export default Uploader