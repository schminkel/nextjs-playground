import React, { Component } from "react";
import Dropzone from "react-dropzone";

import UploadService from "../services/upload-files.service";

export default class UploadFiles extends Component {
  
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  upload(idx, file) {
    let _progressInfos = [...this.state.progressInfos];

    console.log("### file (custom-react.dropzone.js) ", file);
    UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      this.setState({
        _progressInfos,
      });
    })
      .then((response) => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            message: nextMessage,
          };
        });

        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  }

  uploadFiles() {
    const selectedFiles = this.state.selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    this.setState(
      {
        progressInfos: _progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
    this.reset()
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  }

  reset = () => {
    this.setState({ key: 0, selectedFiles: 0 });
  };

  render() {

    const { selectedFiles, progressInfos, message, fileInfos } = this.state;

    return (
      <>

        {/*  Dropzone Section  */} 
        <div className="flex justify-center mx-auto w-[600px] p-8">
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="">
                  <label for="dropzone-file" className="flex flex-col justify-center items-center w-full sm:w-[600px] h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        {selectedFiles && Array.isArray(selectedFiles) && selectedFiles.length ? (
                          /* File has been selected */
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            {selectedFiles.length > 3
                              ? `${selectedFiles.length} files`
                              : selectedFiles.map((file) => file.name).join(", ")}
                          </div>
                        ) : (
                          /* NO file has been selected */
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to select</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                          </div>
                        )}
                      </div>
                  </label>
                </div>
                <aside className="flex justify-center p-4">
                  <button
                    id="uploadButton"
                    type="button"
                    className={
                      !selectedFiles
                        ? "text-white bg-blue-400 dark:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-not-allowed"
                        : "text-white bg-blue-600 dark:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    }
                    disabled={!selectedFiles}
                    onClick={this.uploadFiles}
                  >
                    Upload
                  </button>
                  &nbsp;&nbsp;
                  <button
                    id="cancelButton"
                    key={this.state.key}
                    type="button"
                    className={
                      !selectedFiles
                        ? "text-white bg-gray-300 dark:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-not-allowed"
                        : "text-white bg-gray-400 dark:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    }
                    disabled={!selectedFiles}
                    onClick={this.reset}
                  >
                    Cancel
                  </button>
                </aside>
              </section>
              )
            }
          </Dropzone>
        </div>


        {/*  Progress Bar Section  */} 
        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="flex justify-center mx-auto w-full sm:w-[600px] p-8">
              <div className="w-full" key={index}>
                <span>{progressInfo.fileName}</span>
                <div className="bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: progressInfo.percentage + "%" }}
                  >
                    {" "}
                    {progressInfo.percentage}%
                  </div>
                </div>
              </div>
            </div>
          ))
        }


        {/*  Message Block  */} 
        {message.length > 0 && (
          <div className="flex justify-center mx-auto w-[600px] p-8">
            <div className="" role="alert">
              <ul>
                {message.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          )
        }
        

        {/*  Files List From Server  */} 
        {fileInfos.length > 0 && (
          <div className="flex justify-center mx-auto w-[600px] p-8">
            <div className="card">
              <div className="card-header">List of Files</div>
              <ul className="list-group list-group-flush">
                {fileInfos &&
                  fileInfos.map((file, index) => (
                    <li className="list-group-item" key={index}>
                      <a href={file.url}>{file.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          )
        }
        

      </>
    );
  }
}
