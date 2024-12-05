import { t as tryUseNuxtApp } from './server.mjs';

const checksums = {
  "posts": "7B1dNL0DS9"
};
const tables = {
  "posts": "_content_posts",
  "info": "_content_info"
};

const collectionQureyBuilder = (collection, fetch) => {
  const params = {
    conditions: [],
    selectedFields: [],
    offset: 0,
    limit: 0,
    orderBy: [],
    // Count query
    count: {
      field: "",
      distinct: false
    }
  };
  const query = {
    path(path) {
      return query.where("path", "=", path);
    },
    skip(skip) {
      params.offset = skip;
      return query;
    },
    where(field, operator, value) {
      let condition;
      switch (operator.toUpperCase()) {
        case "IN":
        case "NOT IN":
          if (Array.isArray(value)) {
            const values = value.map((val) => `'${val}'`).join(", ");
            condition = `"${String(field)}" ${operator.toUpperCase()} (${values})`;
          } else {
            throw new TypeError(`Value for ${operator} must be an array`);
          }
          break;
        case "BETWEEN":
        case "NOT BETWEEN":
          if (Array.isArray(value) && value.length === 2) {
            condition = `"${String(field)}" ${operator.toUpperCase()} '${value[0]}' AND '${value[1]}'`;
          } else {
            throw new Error(`Value for ${operator} must be an array with two elements`);
          }
          break;
        case "IS NULL":
        case "IS NOT NULL":
          condition = `"${String(field)}" ${operator.toUpperCase()}`;
          break;
        case "LIKE":
        case "NOT LIKE":
          condition = `"${String(field)}" ${operator.toUpperCase()} '${value}'`;
          break;
        default:
          condition = `"${String(field)}" ${operator} '${value}'`;
      }
      params.conditions.push(`(${condition})`);
      return query;
    },
    limit(limit) {
      params.limit = limit;
      return query;
    },
    select(...fields) {
      if (fields.length) {
        params.selectedFields.push(...fields);
      }
      return query;
    },
    order(field, direction) {
      params.orderBy.push(`"${String(field)}" ${direction}`);
      return query;
    },
    async all() {
      return fetch(collection, buildQuery()).then((res) => res || []);
    },
    async first() {
      return fetch(collection, buildQuery({ limit: 1 })).then((res) => res[0] || null);
    },
    async count(field = "*", distinct = false) {
      return fetch(collection, buildQuery({
        count: { field: String(field), distinct }
      })).then((m) => m[0].count);
    }
  };
  function buildQuery(opts = {}) {
    let query2 = "SELECT ";
    if (opts?.count) {
      query2 += `COUNT(${opts.count.distinct ? "DISTINCT" : ""} ${opts.count.field}) as count`;
    } else {
      query2 += params.selectedFields.length > 0 ? params.selectedFields.map((f) => `"${String(f)}"`).join(", ") : "*";
    }
    query2 += ` FROM ${tables[String(collection)]}`;
    if (params.conditions.length > 0) {
      query2 += ` WHERE ${params.conditions.join(" AND ")}`;
    }
    if (params.orderBy.length > 0) {
      query2 += ` ORDER BY ${params.orderBy.join(", ")}`;
    } else {
      query2 += ` ORDER BY stem ASC`;
    }
    const limit = opts?.limit || params.limit;
    if (limit > 0) {
      if (params.offset > 0) {
        query2 += ` LIMIT ${limit} OFFSET ${params.offset}`;
      }
      query2 += ` LIMIT ${limit}`;
    }
    return query2;
  }
  return query;
};

async function fetchQuery(event, collection, sql) {
  return await $fetch(`/api/content/${collection}/query`, {
    context: event ? { cloudflare: event.context.cloudflare } : {},
    headers: { "content-type": "application/json" },
    query: { v: checksums[String(collection)], t: void 0 },
    method: "POST",
    body: {
      sql
    }
  });
}

const queryCollection = (collection) => {
  return collectionQureyBuilder(collection, (collection2, sql) => executeContentQuery(collection2, sql));
};
async function executeContentQuery(collection, sql) {
  {
    return fetchQuery(tryUseNuxtApp()?.ssrContext?.event, String(collection), sql);
  }
}

export { queryCollection as q };
//# sourceMappingURL=app-Bnqy-o-U.mjs.map
