import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}
  /**
   * Scroll to a specific position in the dom
   *
   * @param position
   */
  scrollTo(position: number) {
    const scrollToPostion = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > position) {
        window.scrollTo(0, pos - 40); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToPostion);
      }
    }, 16);
  }
  /**
   * File upload
   *
   * @types:
   *  // 'application/msword'
      // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      // 'image/jpg'
      // 'image/jpeg'
      // 'application/pdf'
      // 'image/png'
      // 'application/vnd.ms-excel'
      // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
   */

  fileUpload(fileInput: any, objSeting) {
    let imageError = null;
    const objStatus = {
      status: '',
      message: '',
      data: null
    };
    let objUpload = {};
    if (!!fileInput) {
      // Size Filter Bytes
      const maxSize = objSeting.maxSize;
      const allowedTypes = objSeting.allowedTypes;

      const maxHeight = objSeting.maxHeight;
      const maxWidth = objSeting.maxHeight;

      if (fileInput.size > maxSize) {
        imageError = 'Maximum size allowed is ' + maxSize / 1000 + 'Mb.';
        objStatus.status = 'Error';
        objStatus.message = imageError;
        objStatus.data = null;
        return new Promise(resolve => {
          resolve(objStatus);
        });
      }

      if (!_.includes(allowedTypes, fileInput.type)) {
        imageError =
          'The file type (' + fileInput.type + ') you selected is not allowed.';
        objStatus.status = 'Error';
        objStatus.message = imageError;
        objStatus.data = null;
        return new Promise(resolve => {
          resolve(objStatus);
        });
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput);
        reader.onload = (e: any) => {
          const itemBase64Path = e.target.result;

          objUpload = {
            id: null,
            fileName: fileInput.name,
            contentType: fileInput.type,
            data: itemBase64Path
          };
          objStatus.status = 'Success';
          objStatus.message = 'Successfully uploaded.';
          objStatus.data = objUpload;
          resolve(objStatus);
        };
        // reader.readAsBinaryString(fileInput);
        // reader.readAsText(fileInput);
      });
      //TODO: need to resolve when image width and height checking
      // return new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.onload = (e: any) => {
      //     const image = new Image();
      //     image.src = e.target.result;
      //     image.onload = rs => {
      //       const imgHeight = rs.currentTarget['height'];
      //       const imgWidth = rs.currentTarget['width'];
      //       if (imgHeight > maxHeight && imgWidth > maxWidth) {
      //         imageError =
      //           'Maximum dimentions allowed ' +
      //           maxHeight +
      //           '*' +
      //           maxWidth +
      //           'px.';
      //         objStatus.status = 'Error';
      //         objStatus.message = imageError;
      //         objStatus.data = null;
      //         console.log('objStatus2', objStatus);
      //         return objStatus;
      //       } else {
      //         imageError = null;
      //         const itemBase64Path = e.target.result;
      //         objUpload = {
      //           name: fileInput.name,
      //           type: fileInput.type,
      //           data: itemBase64Path
      //         };
      //         objStatus.status = 'Success';
      //         objStatus.message = 'Successfully uploaded.';
      //         objStatus.data = objUpload;
      //         console.log('22222');
      //         resolve(objStatus);
      //       }
      //     };
      //   };
      //   reader.readAsText(fileInput);
      // });
    } else {
      objStatus.status = 'Error';
      objStatus.message = 'No file to upload';
      objStatus.data = null;
      return new Promise(resolve => {
        resolve(objStatus);
      });
    }
  }
  /**
   * get multipple file upload data as promises
   *
   * @param selectedFiles
   * @param objSetting
   * @returns
   */
  uploadMultippleFiles(selectedFiles, objSetting) {
    const promises = [];
    [...selectedFiles].forEach(row => {
      promises.push(this.fileUpload(row, objSetting));
    });
    return promises;
  }
  /**
   * Remove duplicates frm array
   */
  removeDuplicateFromArray(duplicates) {
    const tmp = [];
    const uniques = _.uniq(duplicates, e => e);
    return uniques;
  }
}
