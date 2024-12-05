import { useSSRContext, defineComponent, ref, useAttrs, computed, mergeProps, unref } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImgBlurHash",
  __ssrInlineRender: true,
  props: {
    mode: { default: "img" },
    blurhash: {},
    src: {},
    srcset: {}
  },
  setup(__props) {
    const props = __props;
    const placeholderSrc = ref();
    const isLoaded = ref(false);
    const isImgMode = props.mode === "img";
    const attrs = useAttrs();
    const url = computed(() => isLoaded.value || !placeholderSrc.value ? props.src : placeholderSrc.value);
    return (_ctx, _push, _parent, _attrs) => {
      if (isImgMode) {
        _push(`<img${ssrRenderAttrs(mergeProps(unref(attrs), {
          src: unref(url),
          srcset: _ctx.srcset
        }, _attrs))}>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps(unref(attrs), {
          style: { backgroundImage: `url(${unref(url)})`, backgroundSize: "cover" }
        }, _attrs))}></div>`);
      }
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImgBlurHash.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "ImgBlurHash" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ImgBlurHash-B0lbD9JD.mjs.map
