import { type PluginOptions, useToast as useToastification } from 'vue-toastification';

export function useToast(eventBus?: Parameters<typeof useToastification>[0]) {
  return useToastification(eventBus);
}
export type ToastPluginOptions = PluginOptions;

export { POSITION as ToastPosition, TYPE as ToastType } from 'vue-toastification';
