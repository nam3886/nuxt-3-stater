import Toast from 'vue-toastification';

import type { ToastPluginOptions } from '~/composables/useToast';

export default defineNuxtPlugin((nuxtApp) => {
  const options: ToastPluginOptions = {
    // NOTE: Discarding preventDuplicates
    filterBeforeCreate: (toast, toasts) => {
      if (toasts.filter((t) => t.type === toast.type).length !== 0) {
        // Returning false discards the toast
        return false;
      }

      // You can modify the toast if you want
      return toast;
    },
  };

  nuxtApp.vueApp.use(Toast, options);
});
