import { _ as __nuxt_component_0 } from './ImgBlurHash-B0lbD9JD.mjs';
import { defineComponent, withAsyncContext, unref, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { FlowLayout } from 'vue-flow-layout';
import { u as useFetch } from './fetch-Cerk0eGh.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';
import './server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './asyncData-CG0lKARr.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "images",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/images", '$MlkNjXevqm')), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImgBlurHash = __nuxt_component_0;
      _push(ssrRenderComponent(unref(FlowLayout), mergeProps({
        cols: 4,
        gap: 10,
        class: "w-80% mxa children-has-[img:hover]:blur-sm hover-children-has-[img:hover]:blur-none"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data), (src) => {
              _push2(`<div of-hidden class="group trans"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ImgBlurHash, {
                src: src.urls.raw,
                blurhash: src.blur_hash,
                "w-100": "",
                trans: "",
                style: { "margin": "-5px -10px -10px -5px" },
                "group-hover": "scale-110"
              }, null, _parent2, _scopeId));
              _push2(`<div pa inset-0 op-0 group-hover-op-100${_scopeId}><p${_scopeId}>${ssrInterpolate(src.user.last_name)} ${ssrInterpolate(src.user.first_name)}</p><p line-clamp-1${_scopeId}>${ssrInterpolate(src.description)}</p></div></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (src) => {
                return openBlock(), createBlock("div", {
                  key: src.id,
                  "of-hidden": "",
                  class: "group trans"
                }, [
                  createVNode(_component_ImgBlurHash, {
                    src: src.urls.raw,
                    blurhash: src.blur_hash,
                    "w-100": "",
                    trans: "",
                    style: { "margin": "-5px -10px -10px -5px" },
                    "group-hover": "scale-110"
                  }, null, 8, ["src", "blurhash"]),
                  createVNode("div", {
                    pa: "",
                    "inset-0": "",
                    "op-0": "",
                    "group-hover-op-100": ""
                  }, [
                    createVNode("p", null, toDisplayString(src.user.last_name) + " " + toDisplayString(src.user.first_name), 1),
                    createVNode("p", { "line-clamp-1": "" }, toDisplayString(src.description), 1)
                  ])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=images-Yi8xpm1D.mjs.map
