import { useSSRContext, defineComponent } from 'vue';
import { ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2 text-2xl fw-bold md-text-3xl mb4 mt-12>${ssrInterpolate(_ctx.title)}</h2><p font-dank text-xs md-text-sm italic>${ssrInterpolate(_ctx.description)}</p><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "PageHeader" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PageHeader-ERDzTqLr.mjs.map
