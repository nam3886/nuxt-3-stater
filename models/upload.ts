type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';

export interface FileUploadModel {
  status: UploadStatus;
  file?: File;
  name?: string;
  percentage?: number;
  url?: string;
}
