/**
 * make sure avoid can't find {teleport element}
 * It returns a ref that is set to true when the component is mounted
 * @returns An object with a single property, isMounted, which is a ref.
 */
export function useAncestorIsMounted() {
  const isMounted = ref(false);

  onMounted(() => {
    nextTick(() => (isMounted.value = true));
  });

  return { isMounted };
}
