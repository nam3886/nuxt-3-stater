import { api as viewerApi } from 'v-viewer';

export function useViewer() {
  function preview(images: string[], initialViewIndex: number) {
    viewerApi({ images, options: { initialViewIndex } });
  }

  return { preview };
}
