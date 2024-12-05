import { _ as __nuxt_component_0 } from './PageHeader-ERDzTqLr.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CjjdVNUu.mjs';
import { u as useDateFormat, a as useTimeAgo } from './index-D8IsnGH9.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-CG0lKARr.mjs';
import { q as queryCollection } from './app-Bnqy-o-U.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => {
      return queryCollection("posts").select("title", "description", "path", "id", "date", "tags", "lang", "rawbody").order("date", "DESC").all();
    }, '$yC5ufzHbmX')), __temp = await __temp, __restore(), __temp);
    function calculateReadingTime(text) {
      const wordsPerMinute = 200;
      const words = text.split(/\s/g).length;
      return Math.ceil(words / wordsPerMinute);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        mxa: "",
        "w-65ch": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Posts",
        description: "In the flow of time, seeking resonance with the soul."
      }, null, _parent));
      _push(`<ul my-8 space-y-7><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `${post.path}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<strong${_scopeId}>${ssrInterpolate(post.title)}</strong>`);
              if (post.rawbody) {
                _push2(`<sub bottom-0 left-1.5${_scopeId}><span text-2.75 op-72${_scopeId}>${ssrInterpolate(calculateReadingTime(post.rawbody))} min</span></sub>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("strong", null, toDisplayString(post.title), 1),
                post.rawbody ? (openBlock(), createBlock("sub", {
                  key: 0,
                  "bottom-0": "",
                  "left-1.5": ""
                }, [
                  createVNode("span", {
                    "text-2.75": "",
                    "op-72": ""
                  }, toDisplayString(calculateReadingTime(post.rawbody)) + " min", 1)
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<p italic font-dank my-2 line-clamp-2 text-sm op-72>${ssrInterpolate(post.description)}</p><div fbc op-36><div flex="~ wrap gap-2"><!--[-->`);
        ssrRenderList(post.tags, (tag) => {
          _push(`<span inline-block text-xs rd-full px-1.5 py-1px b="~ gray dashed">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><div><span text-2.75 mr-2>${ssrInterpolate(("useDateFormat" in _ctx ? _ctx.useDateFormat : unref(useDateFormat))(post.date, "MMM DD", { locales: "en-US" }))}</span><span text-2.75>${ssrInterpolate(("useTimeAgo" in _ctx ? _ctx.useTimeAgo : unref(useTimeAgo))(post.date))}</span></div></div></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dv-mGjN3.mjs.map
