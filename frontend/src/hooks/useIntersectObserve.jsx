import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom React hook to observe when a target element intersects with a root viewport.
 *
 * @param {Object} options - Configuration options for the IntersectionObserver.
 * @param {Element|null} [options.root=null] - The element that is used as the viewport for checking visibility. Defaults to browser viewport.
 * @param {string} [options.rootMargin='0px'] - Margin around the root. Similar to CSS margin.
 * @param {number|number[]} [options.threshold=0.1] - A single number or an array of percentages (0 to 1) at which to trigger the callback.
 * @param {boolean} [options.once=true] - Whether to unobserve the element after the first intersection.
 * @param {Function} onIntersect - Callback function invoked when intersection criteria are met.
 * @returns {[React.RefObject, IntersectionObserverEntry|null]}
 *   Returns a ref to be attached to the target element, and the latest IntersectionObserverEntry.
 *
 * @example
 * const handleIntersect = (entry) => {
 *   console.log('Visible:', entry.isIntersecting);
 * };
 * const [ref, entry] = useIntersectionObserver(
 *   { root: null, rootMargin: '0px', threshold: 1, once: false },
 *   handleIntersect
 * );
 */

function useIntersectionObserver(
  { root = null, rootMargin = "0px", threshold = 0.1, once = true },
  onIntersect
) {
  //分別預設空的ref and 陣列形式的 state
  const obsRef = useRef(null);
  const [entry, setEntry] = useState(null);

  /**
   * 使用useCallback包裝的obsFn
   * 這裡的onIntersect是傳給hook的 cbfn
   */
  const observerCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entryItem) => {
        setEntry(entryItem);

        if (entryItem.isIntersecting) onIntersect(entryItem);

        if (once) observer.unbserve(entryItem.target);
      });
    },
    [onIntersect, once]
  );

  useEffect(() => {
    const obsNode = obsRef.current;

    if (!obsNode) return;

    const observer = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(obsNode);

    return () => {
      if (obsNode) observer.observe(obsNode);
    };
  }, [observerCallback, root, rootMargin, threshold]);

  return [obsRef, entry];
}

export { useIntersectionObserver };
