import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const ReactDropzoneUploader = () => {
  
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: '/api/upload' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <>
      <div className='flex justify-center mx-auto w-[600px] p-8'>
        
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
        />

      </div>

      <div className='flex justify-center mx-auto w-[600px] p-8'>

        <div className="flex p-6 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Danger</span>
          <div>
            <span className="font-medium">NOT working correct:</span>
              <ul className="mt-1.5 ml-4 text-red-700 list-disc list-inside">
                <li>The area does not update correctly when upload is progressed!</li>
                <li>Drag something in the second time and you see the changes.</li>
            </ul>
          </div>
        </div>

      </div>


      
    </>
  )
}

export default ReactDropzoneUploader