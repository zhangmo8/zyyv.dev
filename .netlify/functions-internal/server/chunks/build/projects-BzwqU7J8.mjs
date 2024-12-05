import { _ as __nuxt_component_0 } from './PageHeader-ERDzTqLr.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead } from './server.mjs';
import { b as useTitle } from './index-D8IsnGH9.mjs';
import { u as useFetch } from './fetch-Cerk0eGh.mjs';
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
import './asyncData-CG0lKARr.mjs';

const _sfc_main$2 = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "rounded-lg p-4 animate-pulse",
    "dark:o-gray-300": "",
    "o-gray-500": "",
    b: "~ context:20",
    flex: "~ col",
    "gap-3": ""
  }, _attrs))}><div fsc gap-2 w-full><div class="h-5 w-1/3 bg-context:40 rounded"></div><div class="bg-context:40 rounded-full h-4 w-1/10"></div></div><div class="h-3 w-4/5 bg-context:40 rounded"></div><div class="flex items-center space-x-4"><div class="h-4 w-16 bg-context:40 rounded"></div><div class="h-4 w-16 bg-context:40 rounded"></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/repo/Skeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const __nuxt_component_1 = /*#__PURE__*/Object.assign(_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender]]), { __name: "RepoSkeleton" });

const language2Color = {
  "vue": "#41b883",
  "typescript": "#3178c6",
  "javascript": "#f1e05a",
  "html": "#e34c26",
  "css": "#563d7c",
  "scss": "#c6538c",
  "python": "#3572a5",
  "shell": "#89e051",
  "c++": "#f34b7d",
  "c": "#555555",
  "c#": "#178600",
  "java": "#b07219",
  "php": "#4F5D95",
  "ruby": "#701516",
  "go": "#00ADD8",
  "rust": "#dea584",
  "dart": "#00B4AB",
  "swift": "#ffac45",
  "kotlin": "#F18E33",
  "objective-c": "#438eff",
  "jupyter notebook": "#DA5B0B",
  "dockerfile": "#384d54",
  "makefile": "#427819"
};
function getLanguageColor(language) {
  return language2Color[language.toLowerCase()] || "#ddd";
}

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RepoCard",
  __ssrInlineRender: true,
  props: {
    repo: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        b: "~ black op-10",
        "dark-b": "white op-10",
        "rounded-lg": "",
        "p-4": "",
        "text-xs": "",
        "shadow-sm": "",
        trans: "",
        hover: "bg-orange bg-op-3",
        "dark-hover": "bg-white bg-op-3"
      }, _attrs))}><a${ssrRenderAttr("href", _ctx.repo.homepage || _ctx.repo.html_url)} target="_blank" decoration-none flex="~ col gap-3" h-full><h5 fsc gap-1 text-sm><i i-ri:git-repository-line></i><span>${ssrInterpolate(_ctx.repo.name)}</span><span inline-block rounded-full text-xs p="x1 y0.25" class="${ssrRenderClass(
        _ctx.repo.is_template ? "dark:bg-yellow/20 dark:text-yellow/80 bg-blue/20 text-blue/80" : "dark:bg-purple/20 dark:text-purple/80 bg-red/20 text-red/80"
      )}">${ssrInterpolate(_ctx.repo.private ? "Private" : "Public")} ${ssrInterpolate(_ctx.repo.is_template ? "Template" : "")}</span></h5><p flex-1>${ssrInterpolate(_ctx.repo.description)}</p><p fsc gap-4>`);
      if (_ctx.repo.language) {
        _push(`<span fsc gap-1><i w-3 h-3 rounded-full style="${ssrRenderStyle({ backgroundColor: _ctx.repo.language ? ("getLanguageColor" in _ctx ? _ctx.getLanguageColor : unref(getLanguageColor))(_ctx.repo.language) : "" })}"></i> ${ssrInterpolate(_ctx.repo.language)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.repo.stargazers_count) {
        _push(`<a target="_blank" decoration-none${ssrRenderAttr("href", `https://github.com/${_ctx.repo.full_name}/stargazers`)}>`);
        if (_ctx.repo.stargazers_count) {
          _push(`<span fsc gap-1><i i-ri:star-line></i> ${ssrInterpolate(_ctx.repo.stargazers_count)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</a>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.repo.forks_count) {
        _push(`<a target="_blank" decoration-none${ssrRenderAttr("href", `https://github.com/${_ctx.repo.full_name}/network/members`)} fsc gap-1><i i-carbon:direction-fork></i> ${ssrInterpolate(_ctx.repo.forks_count)}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></a></article>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/repo/RepoCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "RepoCard" });

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "projects",
  __ssrInlineRender: true,
  setup(__props) {
    useTitle("Projects | Chris");
    useHead({
      title: "Projects | Chris",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "List of projects that I am proud of."
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "projects, github, open source, vue, nuxt, node, javascript, typescript"
        }
      ]
    });
    const { data, status, refresh } = useFetch("/api/repos", '$F9yFKQbNpA');
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = __nuxt_component_0;
      const _component_RepoSkeleton = __nuxt_component_1;
      const _component_RepoCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        mxa: "",
        "w-65ch": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Projects",
        description: "List of projects that I am proud of."
      }, null, _parent));
      _push(`<button> asd </button><div my-8 space-y-8>`);
      if (unref(status) === "pending") {
        _push(`<!--[-->`);
        ssrRenderList(2, (section) => {
          _push(`<div><h4 mb-3 class="h-6 w-32 bg-gray-300:72 dark:bg-gray:32 rounded animate-pulse"></h4><div grid="~ cols-1 md:cols-2 gap-4"><!--[-->`);
          ssrRenderList(4, (n) => {
            _push(ssrRenderComponent(_component_RepoSkeleton, { key: n }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]-->`);
      } else if (unref(status) === "success") {
        _push(`<!--[-->`);
        ssrRenderList(unref(data)?.list, (repos, key) => {
          _push(`<div><h4 mb-2>${ssrInterpolate(key)}</h4><div grid="~ cols-1 md:cols-2 gap-4"><!--[-->`);
          ssrRenderList(repos, (repo) => {
            _push(ssrRenderComponent(_component_RepoCard, {
              key: repo.id,
              repo
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=projects-BzwqU7J8.mjs.map
