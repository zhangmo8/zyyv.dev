import { defineComponent, createElementBlock, ref, provide, useSSRContext, computed, unref, mergeProps } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      if (mounted.value) {
        return slots.default?.();
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Bg",
  __ssrInlineRender: true,
  setup(__props) {
    ref(200);
    function generateRandomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const a = (Math.random() * 0.5 + 0.25).toFixed(2);
      return `rgba(${r},${g},${b},${a})`;
    }
    function generateRandomCoordinates() {
      let x = 0;
      let y = 0;
      return { x, y };
    }
    function generateStyle(count = 40, duration = 100) {
      const style = [];
      for (let i = 0; i < count; i++) {
        const { x, y } = generateRandomCoordinates();
        const color = generateRandomColor();
        style.push(`${x}px ${y}px ${color} `);
      }
      return {
        boxShadow: style.join(","),
        animation: `animStar ${duration}s linear infinite`
      };
    }
    ref([
      generateStyle(40),
      generateStyle(50),
      generateStyle(60)
    ]);
    const afterStyles = ref([
      generateStyle(40),
      generateStyle(50),
      generateStyle(60)
    ]);
    const afterStyle_1_boxShadow = computed(() => afterStyles.value[0].boxShadow);
    const afterStyle_1_animate = computed(() => afterStyles.value[0].animation);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _cssVars = { style: {
        "--6b0a1ea3": unref(afterStyle_1_boxShadow),
        "--624b6e8e": unref(afterStyle_1_animate)
      } };
      _push(ssrRenderComponent(_component_ClientOnly, mergeProps(_attrs, _cssVars), {
        
              }, _parent));
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Bg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-50e65c77"]]), { __name: "Bg" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=Bg-mYrc459p.mjs.map
