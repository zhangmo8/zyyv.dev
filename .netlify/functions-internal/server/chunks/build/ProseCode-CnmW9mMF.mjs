import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<code${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</code>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../node_modules/.pnpm/@nuxtjs+mdc@0.9.5_magicast@0.3.5_rollup@4.27.3/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const ProseCode = /*#__PURE__*/Object.assign(_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]), { __name: "ProseCode" });

export { ProseCode as default };
//# sourceMappingURL=ProseCode-CnmW9mMF.mjs.map
