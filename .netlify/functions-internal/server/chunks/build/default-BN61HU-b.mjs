import { _ as __nuxt_component_0$2 } from './nuxt-link-CjjdVNUu.mjs';
import { _ as __nuxt_component_1$1 } from './Avatar-pxW7Myko.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, reactive, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, b as useRoute, l as useState } from './server.mjs';
import { _ as __nuxt_component_0$3, a as __nuxt_component_1$2 } from './Bg-mYrc459p.mjs';
import { a as useTimeAgo, c as useIntervalFn } from './index-D8IsnGH9.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';
import './ImgBlurHash-B0lbD9JD.mjs';
import './fetch-Cerk0eGh.mjs';
import './asyncData-CG0lKARr.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const useColorMode = () => {
  return useState("color-mode").value;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DrakToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const color = useColorMode();
    useHead({
      meta: [{
        id: "theme-color",
        name: "theme-color",
        content: () => color.value === "dark" ? "#222222" : "#3c3c43"
      }]
    });
    computed(() => color.value);
    const icon = computed(() => {
      switch (color.preference) {
        case "dark":
          return "i-akar-icons:moon-fill";
        case "light":
          return "i-carbon:light-filled";
        case "system":
          return "i-carbon:cloud-service-management";
        default:
          return "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "!outline-none" }, _attrs))}><i class="${ssrRenderClass(unref(icon))}"></i></button>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DrakToggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$4, { __name: "DrakToggle" });

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NavHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const routes = reactive([
      { path: "/posts", icon: "i-custom-post" },
      { path: "/projects", icon: "i-custom-package" },
      { path: "/talks", icon: "i-custom-ppt" },
      { path: "/images", icon: "i-ri-image-line" }
    ]);
    const route = useRoute();
    const inHome = computed(() => route.path === "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_UserAvatar = __nuxt_component_1$1;
      const _component_DrakToggle = __nuxt_component_2;
      _push(`<header${ssrRenderAttrs(mergeProps({
        sticky: "",
        "z-999": "",
        "top-0": "",
        trans: "",
        "backdrop-blur": "",
        fcc: "",
        "px-6": ""
      }, _attrs))}><nav w-full class="${ssrRenderClass(unref(inHome) ? "fcc" : "fbc")}"><div style="${ssrRenderStyle(!unref(inHome) ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        title: "Home"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UserAvatar, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UserAvatar)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div view-transition-nav-menu grid="~ gap-5" auto-flow-col items-center h-16 md:h-18><!--[-->`);
      ssrRenderList(unref(routes), (_route) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: _route.path,
          to: _route.path,
          title: _route.path.slice(1, 2).toUpperCase() + _route.path.slice(2).toLowerCase()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (_route.text) {
                _push2(`<span icon-text${_scopeId}>${ssrInterpolate(_route.text)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_route.icon) {
                _push2(`<i icon-btn class="${ssrRenderClass(_route.icon)}"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                _route.text ? (openBlock(), createBlock("span", {
                  key: 0,
                  "icon-text": ""
                }, toDisplayString(_route.text), 1)) : createCommentVNode("", true),
                _route.icon ? (openBlock(), createBlock("i", {
                  key: 1,
                  "icon-btn": "",
                  class: _route.icon
                }, null, 2)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><a title="Twitter" href="https://twitter.com/chris_zyyv" target="_blank" icon-link i-ri:twitter-line></a><a title="Github" href="https://github.com/zyyv" target="_blank" icon-link i-ri-github-line></a>`);
      _push(ssrRenderComponent(_component_DrakToggle, {
        "op-64": "",
        "hover:op-100": ""
      }, null, _parent));
      _push(`</div></nav></header>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$3, { __name: "NavHeader" });

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Timer",
  __ssrInlineRender: true,
  setup(__props) {
    const time = ref(/* @__PURE__ */ new Date());
    const buildTime = "2024-12-05T07:12:48.175Z";
    useTimeAgo(buildTime);
    useIntervalFn(() => {
      time.value = /* @__PURE__ */ new Date();
    }, 1e3);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        
              }, _parent));
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Timer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "Timer" });

const _sfc_main$1 = {};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Timer = __nuxt_component_0;

  _push(`<footer${ssrRenderAttrs(mergeProps({
    "mt-8": "",
    "backdrop-blur": "",
    "py-2": "",
    fbc: "",
    "w-fit": "",
    mxa: "",
    "gap-6": ""
  }, _attrs))}><div font-dank text="xs gray4" fsc flex-wrap gap-3><span>2023-PRESENT © Chris</span></div><div fcc gap-3>`);
  _push(ssrRenderComponent(_component_Timer, null, null, _parent));
  _push(`<i i-fluent-emoji:ghost></i></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/nav/NavFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const __nuxt_component_1 = /*#__PURE__*/Object.assign(_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]), { __name: "NavFooter" });

const _sfc_main = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NavHeader = __nuxt_component_0$1;
  const _component_NavFooter = __nuxt_component_1;
  const _component_Bg = __nuxt_component_1$2;

  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_NavHeader, null, null, _parent));
  _push(`<main flex="~ col 1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_NavFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_Bg, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const _default = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-BN61HU-b.mjs.map
