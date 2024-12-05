import { useSSRContext, defineComponent, reactive, watch, unref, ref, nextTick, toRef } from 'vue';
import { ssrRenderStyle, ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { d as useStorage, e as useRafFn } from './index-D8IsnGH9.mjs';
import { _ as _export_sfc, b as useRoute } from './server.mjs';
import { a as __nuxt_component_1 } from './Bg-mYrc459p.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'zod';
import 'better-sqlite3';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

function useCustomMouse() {
  const pos = useStorage("dotPos", { x: 0, y: 0 });
  const x = ref(pos.value.x);
  const y = ref(pos.value.y);
  return { x, y };
}
function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}
function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  const maxSqueeze = 0.15;
  const accelerator = 750;
  return Math.min(distance / accelerator, maxSqueeze);
}
function useCursor(style) {
  const mouse = useCustomMouse();
  const pos = { x: 0, y: 0 };
  const speed = 0.1;
  const updateCursor = () => {
    const diffX = Math.round(unref(mouse.x) - pos.x);
    const diffY = Math.round(unref(mouse.y) - pos.y);
    pos.x += diffX * speed;
    pos.y += diffY * speed;
    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);
    const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
    const rotate = `rotate(${angle}deg)`;
    const translate = `translate3d(${pos.x}px ,${pos.y}px, 0)`;
    style.cursor = { ...style.cursor, transform: translate };
    style.circle = { ...style.circle, transform: rotate + scale };
  };
  useRafFn(updateCursor);
}
function useDot(style) {
  const dotState = reactive({
    visible: true,
    enlarged: false,
    dotRef: ref()
  });
  const toggleDotSize = (newStatus) => {
    const scale = newStatus ? "1.5" : "1";
    const opacity = newStatus ? "0.5" : "1";
    style.dot = {
      ...style.dot,
      "--un-bg-opacity": opacity,
      "transform": `translate(-50%, -50%) scale(${scale})`,
      "opacity": newStatus ? "0.5" : "1"
    };
    style.circle = {
      ...style.circle,
      opacity: newStatus ? "0" : "1"
    };
  };
  const toggleDotVisibility = (newStatus) => {
    const opacity = newStatus ? "1" : "0";
    style.dot = {
      ...style.dot,
      opacity
    };
  };
  const domListener = () => {
  };
  watch(() => dotState.enlarged, toggleDotSize, { flush: "post" });
  watch(() => dotState.visible, toggleDotVisibility, { immediate: true, flush: "post" });
  nextTick(domListener);
  return { dotRef: toRef(dotState, "dotRef"), domListener };
}

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Cursor",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pos = useStorage("dotPos", { x: 0, y: 0 });
    const style = reactive({
      dot: {
        top: `${pos.value.y}px`,
        left: `${pos.value.x}px`
      },
      cursor: {},
      circle: {}
    });
    useCursor(style);
    const { dotRef, domListener } = useDot(style);
    watch(() => route.fullPath, () => {
      setTimeout(domListener, 500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div id="dot" style="${ssrRenderStyle(unref(style).dot)}" bg-white fixed z-99999 opacity-0 w5 h5 pointer-events-none rounded-full trans data-v-5cb8118b></div><div id="cursor" style="${ssrRenderStyle(unref(style).cursor)}" z-99999 fixed top-0 left-0 pointer-events-none data-v-5cb8118b><div id="circle" class="mt--1/2 ml--1/2 border-gray4" border rounded-full w-16 h-16 trans duration-500 style="${ssrRenderStyle(unref(style).circle)}" data-v-5cb8118b></div></div><!--]-->`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cursor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5cb8118b"]]), { __name: "Cursor" });

const _sfc_main = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Cursor = __nuxt_component_0;
  const _component_Bg = __nuxt_component_1;

  _push(`<div${ssrRenderAttrs(_attrs)}><main px-7 py-10>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_Cursor, null, null, _parent));
  _push(ssrRenderComponent(_component_Bg, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const error = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { error as default };
//# sourceMappingURL=error-D62__Pod.mjs.map
