import { useMutation } from '@tanstack/vue-query';

import type { FileUploadModel } from '~/models';

type Response = AppResponse<FileUploadModel>;
type Options = MutationOptions<Response, { file: File; type: string }>;

function endpoint() {
  return `https://upload.gnha.vn/file/upload`;
}

export function useUploadFile(options?: Options) {
  const { API, handleCallAPI } = useCallAPI(options);

  function handler(form: { file: File; type: string }) {
    const body = new FormData();
    body.append('file', form.file);
    body.append('type', form.type);

    return handleCallAPI(() => API<FileUploadModel>(endpoint(), { body, method: 'POST' }));
  }

  return useMutation(handler, options);
}
