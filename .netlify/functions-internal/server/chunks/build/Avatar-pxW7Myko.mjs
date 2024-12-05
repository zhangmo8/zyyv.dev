import { _ as __nuxt_component_0 } from './ImgBlurHash-B0lbD9JD.mjs';
import { useSSRContext, defineComponent, computed, withAsyncContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { b as useRoute } from './server.mjs';
import { u as useFetch } from './fetch-Cerk0eGh.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Avatar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const inHome = computed(() => route.path === "/");
    const { data: user } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user", '$bo3P9hz4Xd')), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImgBlurHash = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ "view-transition-logo": "" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ImgBlurHash, {
        mode: "bg",
        src: unref(user).avatar_url,
        blurhash: "L4A1l2Mx0FN402eiyEx|00-;%MIV",
        alt: "Avatar",
        class: unref(inHome) ? "w-30" : "w-10",
        "aspect-square": "",
        rd: "[62%_47%_82%_35%/45%_45%_80%_66%]",
        "will-change": "border-radius,transform,opacity",
        "animate-shape": ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/Avatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "UserAvatar" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Avatar-pxW7Myko.mjs.map
