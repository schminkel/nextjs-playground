import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='m-4'>
          <p className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>Pages List:</p>
          <ul className='space-y-1 max-w-md list-disc list-inside font-medium' >

              <li className='text-blue-600 dark:text-blue-500 hover:underline'>
                  <Link href="/html-form-uploader">HTML Form Uploader</Link>
              </li>
              
              <li className='text-blue-600 dark:text-blue-500 hover:underline'>
                <Link href="/react-dropzone-uploader">React Dropzone Uploader (Component)</Link>
              </li>

          </ul>
      </div>
    </>
  )
}