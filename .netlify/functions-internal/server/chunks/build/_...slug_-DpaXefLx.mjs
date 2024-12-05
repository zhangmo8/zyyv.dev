import { defineComponent, getCurrentInstance, toRaw, computed, reactive, watch, h, resolveComponent, defineAsyncComponent, Text, useSSRContext, withAsyncContext, ref, unref, Comment, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { v as pascalCase, x as kebabCase, y as destr } from '../nitro/nitro.mjs';
import { find, html } from 'property-information';
import { b as useRoute, c as useSeoMeta, a as useRuntimeConfig, d as __nuxt_component_1 } from './server.mjs';
import { u as useAsyncData } from './asyncData-CG0lKARr.mjs';
import { q as queryCollection } from './app-Bnqy-o-U.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'zod';
import 'better-sqlite3';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const htmlTags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];

const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || isTag(vnode, Symbol.for("v-txt"));
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children?.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value || "";
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).filter(Boolean).join("");
  }
  return "";
}
function unwrap(vnode, tags = []) {
  if (Array.isArray(vnode)) {
    return vnode.flatMap((node) => unwrap(node, tags));
  }
  let result = vnode;
  if (tags.some((tag) => tag === "*" || isTag(vnode, tag))) {
    result = nodeChildren(vnode) || vnode;
    if (!Array.isArray(result) && TEXT_TAGS.some((tag) => isTag(vnode, tag))) {
      result = [result];
    }
  }
  return result;
}
function _flatUnwrap(vnodes, tags = []) {
  vnodes = Array.isArray(vnodes) ? vnodes : [vnodes];
  if (!tags.length) {
    return vnodes;
  }
  return vnodes.flatMap((vnode) => _flatUnwrap(unwrap(vnode, [tags[0]]), tags.slice(1))).filter((vnode) => !(isText(vnode) && nodeTextContent(vnode).trim() === ""));
}
function flatUnwrap(vnodes, tags = []) {
  if (typeof tags === "string") {
    tags = tags.split(/[,\s]/).map((tag) => tag.trim()).filter(Boolean);
  }
  if (!tags.length) {
    return vnodes;
  }
  return _flatUnwrap(vnodes, tags).reduce((acc, item) => {
    if (isText(item)) {
      if (typeof acc[acc.length - 1] === "string") {
        acc[acc.length - 1] += item.children;
      } else {
        acc.push(item.children);
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

const DEFAULT_SLOT = "default";
const rxOn = /^@|^v-on:/;
const rxBind = /^:|^v-bind:/;
const rxModel = /^v-model/;
const nativeInputs = ["select", "textarea", "input"];
const proseComponentMap = Object.fromEntries(["p", "a", "blockquote", "code", "pre", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "img", "ul", "ol", "li", "strong", "table", "thead", "tbody", "td", "th", "tr", "script"].map((t) => [t, `prose-${t}`]));
const _sfc_main$3 = defineComponent({
  name: "MDCRenderer",
  props: {
    /**
     * Content to render
     */
    body: {
      type: Object,
      required: true
    },
    /**
     * Document meta data
     */
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Class(es) to bind to the component
     */
    class: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: [String, Boolean],
      default: void 0
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: void 0
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  async setup(props) {
    const $nuxt = getCurrentInstance()?.appContext?.app?.$nuxt;
    const route = $nuxt?.$route || $nuxt?._route;
    const { mdc } = $nuxt?.$config?.public || {};
    const tags = {
      ...mdc?.components?.prose && props.prose !== false ? proseComponentMap : {},
      ...mdc?.components?.map || {},
      ...toRaw(props.data?.mdc?.components || {}),
      ...props.components
    };
    const contentKey = computed(() => {
      const components = (props.body?.children || []).map((n) => n.tag || n.type).filter((t) => !htmlTags.includes(t));
      return Array.from(new Set(components)).sort().join(".");
    });
    const runtimeData = reactive({
      ...props.data
    });
    watch(() => props.data, (newData) => {
      Object.assign(runtimeData, newData);
    });
    await resolveContentComponents(props.body, { tags });
    function updateRuntimeData(code, value) {
      const lastIndex = code.split(".").length - 1;
      return code.split(".").reduce((o, k, i) => {
        if (i == lastIndex && o) {
          o[k] = value;
          return o[k];
        }
        return typeof o === "object" ? o[k] : void 0;
      }, runtimeData);
    }
    return { tags, contentKey, route, runtimeData, updateRuntimeData };
  },
  render(ctx) {
    const { tags, tag, body, data, contentKey, route, unwrap, runtimeData, updateRuntimeData } = ctx;
    if (!body) {
      return null;
    }
    const meta = { ...data, tags, $route: route, runtimeData, updateRuntimeData };
    const component = tag !== false ? resolveVueComponent(tag || meta.component?.name || meta.component || "div") : void 0;
    return component ? h(component, { ...meta.component?.props, class: ctx.class, ...this.$attrs, key: contentKey }, { default: defaultSlotRenderer }) : defaultSlotRenderer?.();
    function defaultSlotRenderer() {
      if (unwrap) {
        return flatUnwrap(
          renderSlots(body, h, meta, meta).default(),
          typeof unwrap === "string" ? unwrap.split(" ") : ["*"]
        );
      }
      return renderSlots(body, h, meta, meta).default();
    }
  }
});
function renderNode(node, h2, documentMeta, parentScope = {}) {
  if (node.type === "text") {
    return h2(Text, node.value);
  }
  if (node.type === "comment") {
    return h2(Comment, null, node.value);
  }
  const originalTag = node.tag;
  const renderTag = findMappedTag(node, documentMeta.tags);
  if (node.tag === "binding") {
    return renderBinding(node, h2, documentMeta, parentScope);
  }
  const component = resolveVueComponent(renderTag);
  if (typeof component === "object") {
    component.tag = originalTag;
  }
  const props = propsToData(node, documentMeta);
  return h2(
    component,
    props,
    renderSlots(node, h2, documentMeta, { ...parentScope, ...props })
  );
}
function renderBinding(node, h2, documentMeta, parentScope = {}) {
  const data = {
    ...documentMeta.runtimeData,
    ...parentScope,
    $document: documentMeta,
    $doc: documentMeta
  };
  const splitter = /\.|\[(\d+)\]/;
  const keys = node.props?.value.trim().split(splitter).filter(Boolean);
  const value = keys.reduce((data2, key) => {
    if (data2 && key in data2) {
      if (typeof data2[key] === "function") {
        return data2[key]();
      } else {
        return data2[key];
      }
    }
    return void 0;
  }, data);
  const defaultValue = node.props?.defaultValue;
  return h2(Text, value ?? defaultValue ?? "");
}
function renderSlots(node, h2, documentMeta, parentProps) {
  const children = node.children || [];
  const slotNodes = children.reduce((data, node2) => {
    if (!isTemplate(node2)) {
      data[DEFAULT_SLOT].push(node2);
      return data;
    }
    const slotName = getSlotName(node2);
    data[slotName] = data[slotName] || [];
    if (node2.type === "element") {
      data[slotName].push(...node2.children || []);
    }
    return data;
  }, {
    [DEFAULT_SLOT]: []
  });
  const slots = Object.entries(slotNodes).reduce((slots2, [name, children2]) => {
    if (!children2.length) {
      return slots2;
    }
    slots2[name] = () => {
      const vNodes = children2.map((child) => renderNode(child, h2, documentMeta, parentProps));
      return mergeTextNodes(vNodes);
    };
    return slots2;
  }, {});
  return slots;
}
function propsToData(node, documentMeta) {
  const { tag = "", props = {} } = node;
  return Object.keys(props).reduce(function(data, key) {
    if (key === "__ignoreMap") {
      return data;
    }
    const value = props[key];
    if (rxModel.test(key)) {
      return propsToDataRxModel(key, value, data, documentMeta, { native: nativeInputs.includes(tag) });
    }
    if (key === "v-bind") {
      return propsToDataVBind(key, value, data, documentMeta);
    }
    if (rxOn.test(key)) {
      return propsToDataRxOn(key, value, data, documentMeta);
    }
    if (rxBind.test(key)) {
      return propsToDataRxBind(key, value, data, documentMeta);
    }
    const { attribute } = find(html, key);
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      data[attribute] = value.join(" ");
      return data;
    }
    data[attribute] = value;
    return data;
  }, {});
}
function propsToDataRxModel(key, value, data, documentMeta, { native }) {
  const propName = key.match(/^v-model:([^=]+)/)?.[1] || "modelValue";
  const field = native ? "value" : propName;
  const event = native ? "onInput" : `onUpdate:${propName}`;
  data[field] = evalInContext(value, documentMeta.runtimeData);
  data[event] = (e) => {
    documentMeta.updateRuntimeData(value, native ? e.target?.value : e);
  };
  return data;
}
function propsToDataVBind(_key, value, data, documentMeta) {
  const val = evalInContext(value, documentMeta);
  data = Object.assign(data, val);
  return data;
}
function propsToDataRxOn(key, value, data, documentMeta) {
  key = key.replace(rxOn, "");
  data.on = data.on || {};
  data.on[key] = () => evalInContext(value, documentMeta);
  return data;
}
function propsToDataRxBind(key, value, data, documentMeta) {
  key = key.replace(rxBind, "");
  data[key] = evalInContext(value, documentMeta);
  return data;
}
const resolveVueComponent = (component) => {
  if (typeof component === "string") {
    if (htmlTags.includes(component)) {
      return component;
    }
    const _component = resolveComponent(pascalCase(component), false);
    if (!component || _component?.name === "AsyncComponentWrapper") {
      return _component;
    }
    if (typeof _component === "string") {
      return _component;
    }
    if ("setup" in _component) {
      return defineAsyncComponent(() => new Promise((resolve) => resolve(_component)));
    }
    return _component;
  }
  return component;
};
function evalInContext(code, context) {
  const result = code.split(".").reduce((o, k) => typeof o === "object" ? o[k] : void 0, context);
  return typeof result === "undefined" ? destr(code) : result;
}
function getSlotName(node) {
  let name = "";
  for (const propName of Object.keys(node.props || {})) {
    if (!propName.startsWith("#") && !propName.startsWith("v-slot:")) {
      continue;
    }
    name = propName.split(/[:#]/, 2)[1];
    break;
  }
  return name || DEFAULT_SLOT;
}
function isTemplate(node) {
  return node.tag === "template";
}
function mergeTextNodes(nodes) {
  const mergedNodes = [];
  for (const node of nodes) {
    const previousNode = mergedNodes[mergedNodes.length - 1];
    if (node.type === Text && previousNode?.type === Text) {
      previousNode.children = previousNode.children + node.children;
    } else {
      mergedNodes.push(node);
    }
  }
  return mergedNodes;
}
async function resolveContentComponents(body, meta) {
  if (!body) {
    return;
  }
  const components = Array.from(new Set(loadComponents(body, meta)));
  await Promise.all(components.map(async (c) => {
    if (c?.render || c?.ssrRender || c?.__ssrInlineRender) {
      return;
    }
    const resolvedComponent = resolveVueComponent(c);
    if (resolvedComponent?.__asyncLoader && !resolvedComponent.__asyncResolved) {
      await resolvedComponent.__asyncLoader();
    }
  }));
  function loadComponents(node, documentMeta) {
    const tag = node.tag;
    if (node.type === "text" || tag === "binding" || node.type === "comment") {
      return [];
    }
    const renderTag = findMappedTag(node, documentMeta.tags);
    const components2 = [];
    if (node.type !== "root" && !htmlTags.includes(renderTag)) {
      components2.push(renderTag);
    }
    for (const child of node.children || []) {
      components2.push(...loadComponents(child, documentMeta));
    }
    return components2;
  }
}
function findMappedTag(node, tags) {
  const tag = node.tag;
  if (!tag || typeof node.props?.__ignoreMap !== "undefined") {
    return tag;
  }
  return tags[tag] || tags[pascalCase(tag)] || tags[kebabCase(node.tag)] || tag;
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxtjs+mdc@0.9.5_magicast@0.3.5_rollup@4.27.3/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MDCRenderer = Object.assign(_sfc_main$3, { __name: "MDCRenderer" });

function decompressTree(input) {
  return {
    type: "root",
    children: input.value.map(decompressNode)
  };
}
function decompressNode(input) {
  if (typeof input === "string") {
    return {
      type: "text",
      value: input
    };
  }
  const [tag, props, ...children] = input;
  return {
    type: "element",
    tag,
    props,
    children: children.map(decompressNode)
  };
}

const globalComponents = ["ProseA", "ProseBlockquote", "ProseCode", "ProseEm", "ProseH1", "ProseH2", "ProseH3", "ProseH4", "ProseH5", "ProseH6", "ProseHr", "ProseImg", "ProseLi", "ProseOl", "ProseP", "ProsePre", "ProseScript", "ProseStrong", "ProseTable", "ProseTbody", "ProseTd", "ProseTh", "ProseThead", "ProseTr", "ProseUl"];
const localComponents = [];

const components = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  globalComponents: globalComponents,
  localComponents: localComponents
}, Symbol.toStringTag, { value: 'Module' }));

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ContentRenderer",
  __ssrInlineRender: true,
  props: {
    /**
     * Content to render
     */
    value: {
      type: Object,
      required: true
    },
    /**
     * Render only the excerpt
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: String,
      default: "div"
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: void 0
    },
    /**
     * Root tag to use for rendering
     */
    class: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(__props) {
    const renderFunctions = ["render", "ssrRender", "__ssrInlineRender"];
    const props = __props;
    const debug = false;
    const body = computed(() => {
      let body2 = props.value.body || props.value;
      if (props.excerpt && props.value.excerpt) {
        body2 = props.value.excerpt;
      }
      if (body2.type === "minimal") {
        return decompressTree(body2);
      }
      return body2;
    });
    const data = computed(() => {
      const { body: body2, excerpt, ...data2 } = props.value;
      return {
        ...data2,
        ...props.data
      };
    });
    const proseComponentMap = Object.fromEntries(["p", "a", "blockquote", "code", "pre", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "img", "ul", "ol", "li", "strong", "table", "thead", "tbody", "td", "th", "tr", "script"].map((t) => [t, `prose-${t}`]));
    const { mdc } = useRuntimeConfig().public || {};
    const tags = {
      ...mdc?.components?.prose && props.prose !== false ? proseComponentMap : {},
      ...mdc?.components?.map || {},
      ...toRaw(props.data?.mdc?.components || {}),
      ...props.components
    };
    const key = computed(() => {
      {
        return void 0;
      }
    });
    const componentsMap = computed(() => {
      return body.value ? resolveContentComponents(body.value, { tags }) : {};
    });
    function resolveVueComponent(component) {
      let _component = component;
      if (typeof component === "string") {
        if (htmlTags.includes(component)) {
          return component;
        }
        if (globalComponents.includes(pascalCase(component))) {
          _component = resolveComponent(component, false);
        } else if (localComponents.includes(pascalCase(component))) {
          _component = defineAsyncComponent(() => {
            return Promise.resolve().then(function () { return components; }).then((m) => m[pascalCase(component)]());
          });
        }
        if (typeof _component === "string") {
          return _component;
        }
      }
      if (!_component) {
        return _component;
      }
      const componentObject = _component;
      if ("__asyncLoader" in componentObject) {
        return componentObject;
      }
      if ("setup" in componentObject) {
        return defineAsyncComponent(() => Promise.resolve(componentObject));
      }
      return componentObject;
    }
    function resolveContentComponents(body2, meta) {
      if (!body2) {
        return;
      }
      const components = Array.from(new Set(loadComponents(body2, meta)));
      const result = {};
      for (const [tag, component] of components) {
        if (typeof component === "object" && renderFunctions.some((fn) => Object.hasOwnProperty.call(component, fn))) {
          continue;
        }
        if (result[tag]) {
          continue;
        }
        result[tag] = resolveVueComponent(component);
      }
      return result;
    }
    function loadComponents(node, documentMeta) {
      const tag = node.tag;
      if (node.type === "text" || tag === "binding" || node.type === "comment") {
        return [];
      }
      const renderTag = findMappedTag(node, documentMeta.tags);
      const components2 = [];
      if (node.type !== "root" && !htmlTags.includes(renderTag)) {
        components2.push([tag, renderTag]);
      }
      for (const child of node.children || []) {
        components2.push(...loadComponents(child, documentMeta));
      }
      return components2;
    }
    function findMappedTag(node, tags2) {
      const tag = node.tag;
      if (!tag || typeof node.props?.__ignoreMap !== "undefined") {
        return tag;
      }
      return tags2[tag] || tags2[pascalCase(tag)] || tags2[kebabCase(node.tag)] || tag;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MDCRenderer, mergeProps({
        key: key.value,
        body: body.value,
        data: data.value,
        class: props.class,
        tag: props.tag,
        prose: props.prose,
        unwrap: props.unwrap,
        components: componentsMap.value,
        "data-content-id": unref(debug) ? __props.value.id : void 0
      }, _attrs), null, _parent));
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+content@3.0.0-alpha.7_@libsql+client@0.14.0_magicast@0.3.5_pg@8.13.1_rollup@4.27.3/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "ContentRenderer" });

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Toc",
  __ssrInlineRender: true,
  props: {
    links: {},
    highlights: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toc = __nuxt_component_2;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "space-y-1 text-3.25" }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.links, (link) => {
        _push(`<li class="${ssrRenderClass(`pl-${link.depth * 4}`)}"><a${ssrRenderAttr("href", `#${link.id}`)} class="${ssrRenderClass([_ctx.highlights.includes(link.id) ? "op-100!" : "", "text op-50 trans"])}" hover="underline op-100">${ssrInterpolate(link.text)}</a>`);
        if (link.children) {
          _push(ssrRenderComponent(_component_Toc, {
            links: link.children,
            highlights: _ctx.highlights,
            "pl-4": "",
            "my-1": ""
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toc.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "Toc" });

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => {
      return queryCollection("posts").path(route.path).first();
    }, '$niMSSsHLfq')), __temp = await __temp, __restore(), __temp);
    computed(() => getIds(post.value?.body.toc?.links ?? []));
    const activeToc = ref([]);
    useSeoMeta(post.value?.seo ?? {});
    function getIds(links) {
      return links.reduce((acc, link) => {
        acc.push(link.id);
        if (link.children) {
          acc.push(...getIds(link.children));
        }
        return acc;
      }, []);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      const _component_Back = __nuxt_component_1;
      const _component_Toc = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div prose mxa class="peer text-3.75">`);
      if (unref(post)) {
        _push(`<!--[--><h1>${ssrInterpolate(unref(post).title)}</h1>`);
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(post) }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Back, { "mt-8": "" }, null, _parent));
      _push(`</div>`);
      if (unref(post)) {
        _push(ssrRenderComponent(_component_Toc, {
          "peer-hover": "op-100",
          hover: "op-100!",
          class: "pf right-10 top-40 op-36 trans",
          links: unref(post).body.toc?.links ?? [],
          highlights: unref(activeToc)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-DpaXefLx.mjs.map
