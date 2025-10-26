<!--
 *
 *
 *
-->
<script lang="ts">
  import { cn } from '$lib/utils';

  /**
   *
   *
   *
   */
  let { children, class: className = '', ...props } = $props();
</script>


<!--
 *
 *
 *
-->
<button class={
  cn(
    "bg-white px-3 py-1 rounded shadow hover:bg-gray-100",
    className
  )}
  {...props}
>
  {@render children?.()}
</button>