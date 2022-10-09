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
        
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span className="font-medium">Error!</span> The area does not update correctly when upload is progressed!
        </div>

      </div>


      
    </>
  )
}

export default ReactDropzoneUploader