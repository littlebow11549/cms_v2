const Ro = () => Promise.resolve().then(() => Co), Vt = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: P, jsx: e, jsxs: o } = Vt;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function qt(t) {
  const a = t?.props?._fgT, r = typeof a == "function" || typeof a == "string" || typeof a == "object" && a !== null && "$$typeof" in a;
  return globalThis.__GLOBALS__.React.isValidElement(t) && r;
}
function ne(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function Yt(t) {
  const { _fgT: a, _fgS: r, _fgB: n, _fgD: l, ...i } = t.props;
  return globalThis.__GLOBALS__.React.createElement(a, {
    ...i,
    key: t.key
  }, i.children);
}
function xe(t) {
  return qt(t) ? Yt(t) : ne(t) ? t.props.children : t;
}
const ae = globalThis.__GLOBALS__.React.Children, Zt = {
  map(t, a, r) {
    return ae.map(t, (n, l) => {
      const i = xe(n);
      return ne(n) ? null : a.call(r, i, l);
    });
  },
  forEach(t, a, r) {
    ae.forEach(t, (n, l) => {
      if (ne(n))
        return;
      const i = xe(n);
      a.call(r, i, l);
    });
  },
  count(t) {
    let a = 0;
    return ae.forEach(t, (r) => {
      ne(r) || a++;
    }), a;
  },
  toArray(t) {
    const a = [];
    return ae.forEach(t, (r) => {
      ne(r) || a.push(xe(r));
    }), a;
  },
  only(t) {
    const a = ae.only(t);
    return xe(a);
  }
};
globalThis.__GLOBALS__.React.cloneElement;
({
  ...globalThis.__GLOBALS__.React
});
const { Component: Kt, createContext: T, createElement: E, createFactory: So, createRef: Do, forwardRef: ce, Fragment: J, isValidElement: Jt, lazy: Po, memo: Xt, Profiler: Lo, PureComponent: Bo, startTransition: We, StrictMode: Mo, Suspense: _o, use: Ao, useCallback: de, useContext: C, useDebugValue: Io, useDeferredValue: $o, useEffect: le, useId: To, useImperativeHandle: Go, useInsertionEffect: Oo, useLayoutEffect: ft, useMemo: z, useReducer: Ho, useRef: Z, useState: w, useSyncExternalStore: jo, useTransition: Fo, version: Wo, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Uo } = globalThis.__GLOBALS__.React;
/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var at = "popstate";
function rt(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function Qt(t = {}) {
  function a(n, l) {
    let i = l.state?.masked, { pathname: s, search: c, hash: d } = i || n.location;
    return $e(
      "",
      { pathname: s, search: c, hash: d },
      // state defaults to `null` because `window.history.state` does
      l.state && l.state.usr || null,
      l.state && l.state.key || "default",
      i ? {
        pathname: n.location.pathname,
        search: n.location.search,
        hash: n.location.hash
      } : void 0
    );
  }
  function r(n, l) {
    return typeof l == "string" ? l : ie(l);
  }
  return ta(
    a,
    r,
    null,
    t
  );
}
function S(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function U(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function ea() {
  return Math.random().toString(36).substring(2, 10);
}
function nt(t, a) {
  return {
    usr: t.state,
    key: t.key,
    idx: a,
    masked: t.mask ? {
      pathname: t.pathname,
      search: t.search,
      hash: t.hash
    } : void 0
  };
}
function $e(t, a, r = null, n, l) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Q(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || n || ea(),
    mask: l
  };
}
function ie({
  pathname: t = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function Q(t) {
  let a = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (a.hash = t.substring(r), t = t.substring(0, r));
    let n = t.indexOf("?");
    n >= 0 && (a.search = t.substring(n), t = t.substring(0, n)), t && (a.pathname = t);
  }
  return a;
}
function ta(t, a, r, n = {}) {
  let { window: l = document.defaultView, v5Compat: i = !1 } = n, s = l.history, c = "POP", d = null, m = u();
  m == null && (m = 0, s.replaceState({ ...s.state, idx: m }, ""));
  function u() {
    return (s.state || { idx: null }).idx;
  }
  function h() {
    c = "POP";
    let p = u(), N = p == null ? null : p - m;
    m = p, d && d({ action: c, location: f.location, delta: N });
  }
  function g(p, N) {
    c = "PUSH";
    let v = rt(p) ? p : $e(f.location, p, N);
    m = u() + 1;
    let k = nt(v, m), R = f.createHref(v.mask || v);
    try {
      s.pushState(k, "", R);
    } catch (L) {
      if (L instanceof DOMException && L.name === "DataCloneError")
        throw L;
      l.location.assign(R);
    }
    i && d && d({ action: c, location: f.location, delta: 1 });
  }
  function x(p, N) {
    c = "REPLACE";
    let v = rt(p) ? p : $e(f.location, p, N);
    m = u();
    let k = nt(v, m), R = f.createHref(v.mask || v);
    s.replaceState(k, "", R), i && d && d({ action: c, location: f.location, delta: 0 });
  }
  function y(p) {
    return aa(l, p);
  }
  let f = {
    get action() {
      return c;
    },
    get location() {
      return t(l, s);
    },
    listen(p) {
      if (d)
        throw new Error("A history only accepts one active listener");
      return l.addEventListener(at, h), d = p, () => {
        l.removeEventListener(at, h), d = null;
      };
    },
    createHref(p) {
      return a(l, p);
    },
    createURL: y,
    encodeLocation(p) {
      let N = y(p);
      return {
        pathname: N.pathname,
        search: N.search,
        hash: N.hash
      };
    },
    push: g,
    replace: x,
    go(p) {
      return s.go(p);
    }
  };
  return f;
}
function aa(t, a, r = !1) {
  let n = "http://localhost";
  t && (n = t.location.origin !== "null" ? t.location.origin : t.location.href), S(n, "No window.location.(origin|href) available to create URL");
  let l = typeof a == "string" ? a : ie(a);
  return l = l.replace(/ $/, "%20"), !r && l.startsWith("//") && (l = n + l), new URL(l, n);
}
function xt(t, a, r = "/") {
  return ra(t, a, r, !1);
}
function ra(t, a, r, n, l) {
  let i = typeof a == "string" ? Q(a) : a, s = V(i.pathname || "/", r);
  if (s == null)
    return null;
  let c = na(t), d = null, m = fa(s);
  for (let u = 0; d == null && u < c.length; ++u)
    d = pa(
      c[u],
      m,
      n
    );
  return d;
}
function na(t) {
  let a = yt(t);
  return oa(a), a;
}
function yt(t, a = [], r = [], n = "", l = !1) {
  let i = (s, c, d = l, m) => {
    let u = {
      relativePath: m === void 0 ? s.path || "" : m,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: c,
      route: s
    };
    if (u.relativePath.startsWith("/")) {
      if (!u.relativePath.startsWith(n) && d)
        return;
      S(
        u.relativePath.startsWith(n),
        `Absolute route path "${u.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), u.relativePath = u.relativePath.slice(n.length);
    }
    let h = H([n, u.relativePath]), g = r.concat(u);
    s.children && s.children.length > 0 && (S(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      s.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
    ), yt(
      s.children,
      a,
      g,
      h,
      d
    )), !(s.path == null && !s.index) && a.push({
      path: h,
      score: ha(h, s.index),
      routesMeta: g
    });
  };
  return t.forEach((s, c) => {
    if (s.path === "" || !s.path?.includes("?"))
      i(s, c);
    else
      for (let d of bt(s.path))
        i(s, c, !0, d);
  }), a;
}
function bt(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [r, ...n] = a, l = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return l ? [i, ""] : [i];
  let s = bt(n.join("/")), c = [];
  return c.push(
    ...s.map(
      (d) => d === "" ? i : [i, d].join("/")
    )
  ), l && c.push(...s), c.map(
    (d) => t.startsWith("/") && d === "" ? "/" : d
  );
}
function oa(t) {
  t.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : ua(
      a.routesMeta.map((n) => n.childrenIndex),
      r.routesMeta.map((n) => n.childrenIndex)
    )
  );
}
var la = /^:[\w-]+$/, ia = 3, sa = 2, ca = 1, da = 10, ma = -2, ot = (t) => t === "*";
function ha(t, a) {
  let r = t.split("/"), n = r.length;
  return r.some(ot) && (n += ma), a && (n += sa), r.filter((l) => !ot(l)).reduce(
    (l, i) => l + (la.test(i) ? ia : i === "" ? ca : da),
    n
  );
}
function ua(t, a) {
  return t.length === a.length && t.slice(0, -1).every((n, l) => n === a[l]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    t[t.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function pa(t, a, r = !1) {
  let { routesMeta: n } = t, l = {}, i = "/", s = [];
  for (let c = 0; c < n.length; ++c) {
    let d = n[c], m = c === n.length - 1, u = i === "/" ? a : a.slice(i.length) || "/", h = Ne(
      { path: d.relativePath, caseSensitive: d.caseSensitive, end: m },
      u
    ), g = d.route;
    if (!h && m && r && !n[n.length - 1].route.index && (h = Ne(
      {
        path: d.relativePath,
        caseSensitive: d.caseSensitive,
        end: !1
      },
      u
    )), !h)
      return null;
    Object.assign(l, h.params), s.push({
      // TODO: Can this as be avoided?
      params: l,
      pathname: H([i, h.pathname]),
      pathnameBase: va(
        H([i, h.pathnameBase])
      ),
      route: g
    }), h.pathnameBase !== "/" && (i = H([i, h.pathnameBase]));
  }
  return s;
}
function Ne(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [r, n] = ga(
    t.path,
    t.caseSensitive,
    t.end
  ), l = a.match(r);
  if (!l) return null;
  let i = l[0], s = i.replace(/(.)\/+$/, "$1"), c = l.slice(1);
  return {
    params: n.reduce(
      (m, { paramName: u, isOptional: h }, g) => {
        if (u === "*") {
          let y = c[g] || "";
          s = i.slice(0, i.length - y.length).replace(/(.)\/+$/, "$1");
        }
        const x = c[g];
        return h && !x ? m[u] = void 0 : m[u] = (x || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: i,
    pathnameBase: s,
    pattern: t
  };
}
function ga(t, a = !1, r = !0) {
  U(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let n = [], l = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (s, c, d, m, u) => {
      if (n.push({ paramName: c, isOptional: d != null }), d) {
        let h = u.charAt(m + s.length);
        return h && h !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (n.push({ paramName: "*" }), l += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? l += "\\/*$" : t !== "" && t !== "/" && (l += "(?:(?=\\/|$))"), [new RegExp(l, a ? void 0 : "i"), n];
}
function fa(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return U(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function V(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, n = t.charAt(r);
  return n && n !== "/" ? null : t.slice(r) || "/";
}
var xa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function ya(t, a = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: l = ""
  } = typeof t == "string" ? Q(t) : t, i;
  return r ? (r = Nt(r), r.startsWith("/") ? i = lt(r.substring(1), "/") : i = lt(r, a)) : i = a, {
    pathname: i,
    search: Na(n),
    hash: wa(l)
  };
}
function lt(t, a) {
  let r = we(a).split("/");
  return t.split("/").forEach((l) => {
    l === ".." ? r.length > 1 && r.pop() : l !== "." && r.push(l);
  }), r.length > 1 ? r.join("/") : "/";
}
function Be(t, a, r, n) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    n
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function ba(t) {
  return t.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function vt(t) {
  let a = ba(t);
  return a.map(
    (r, n) => n === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Ue(t, a, r, n = !1) {
  let l;
  typeof t == "string" ? l = Q(t) : (l = { ...t }, S(
    !l.pathname || !l.pathname.includes("?"),
    Be("?", "pathname", "search", l)
  ), S(
    !l.pathname || !l.pathname.includes("#"),
    Be("#", "pathname", "hash", l)
  ), S(
    !l.search || !l.search.includes("#"),
    Be("#", "search", "hash", l)
  ));
  let i = t === "" || l.pathname === "", s = i ? "/" : l.pathname, c;
  if (s == null)
    c = r;
  else {
    let h = a.length - 1;
    if (!n && s.startsWith("..")) {
      let g = s.split("/");
      for (; g[0] === ".."; )
        g.shift(), h -= 1;
      l.pathname = g.join("/");
    }
    c = h >= 0 ? a[h] : "/";
  }
  let d = ya(l, c), m = s && s !== "/" && s.endsWith("/"), u = (i || s === ".") && r.endsWith("/");
  return !d.pathname.endsWith("/") && (m || u) && (d.pathname += "/"), d;
}
var Nt = (t) => t.replace(/\/\/+/g, "/"), H = (t) => Nt(t.join("/")), we = (t) => t.replace(/\/+$/, ""), va = (t) => we(t).replace(/^\/*/, "/"), Na = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, wa = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, Ea = class {
  constructor(t, a, r, n = !1) {
    this.status = t, this.statusText = a || "", this.internal = n, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function ka(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function Ca(t) {
  let a = t.map((r) => r.route.path).filter(Boolean);
  return H(a) || "/";
}
var wt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Et(t, a) {
  let r = t;
  if (typeof r != "string" || !xa.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let n = r, l = !1;
  if (wt)
    try {
      let i = new URL(window.location.href), s = r.startsWith("//") ? new URL(i.protocol + r) : new URL(r), c = V(s.pathname, a);
      s.origin === i.origin && c != null ? r = c + s.search + s.hash : l = !0;
    } catch {
      U(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: n,
    isExternal: l,
    to: r
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var kt = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  kt
);
var Ra = [
  "GET",
  ...kt
];
new Set(Ra);
var ee = T(null);
ee.displayName = "DataRouter";
var Se = T(null);
Se.displayName = "DataRouterState";
var Ct = T(!1);
function Sa() {
  return C(Ct);
}
var Rt = T({
  isTransitioning: !1
});
Rt.displayName = "ViewTransition";
var Da = T(
  /* @__PURE__ */ new Map()
);
Da.displayName = "Fetchers";
var Pa = T(null);
Pa.displayName = "Await";
var G = T(
  null
);
G.displayName = "Navigation";
var me = T(
  null
);
me.displayName = "Location";
var q = T({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
q.displayName = "Route";
var ze = T(null);
ze.displayName = "RouteError";
var St = "REACT_ROUTER_ERROR", La = "REDIRECT", Ba = "ROUTE_ERROR_RESPONSE";
function Ma(t) {
  if (t.startsWith(`${St}:${La}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function _a(t) {
  if (t.startsWith(
    `${St}:${Ba}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ea(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Aa(t, { relative: a } = {}) {
  S(
    he(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: n } = C(G), { hash: l, pathname: i, search: s } = ue(t, { relative: a }), c = i;
  return r !== "/" && (c = i === "/" ? r : H([r, i])), n.createHref({ pathname: c, search: s, hash: l });
}
function he() {
  return C(me) != null;
}
function A() {
  return S(
    he(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C(me).location;
}
var Dt = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Pt(t) {
  C(G).static || ft(t);
}
function Ia() {
  let { isDataRoute: t } = C(q);
  return t ? Ya() : $a();
}
function $a() {
  S(
    he(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = C(ee), { basename: a, navigator: r } = C(G), { matches: n } = C(q), { pathname: l } = A(), i = JSON.stringify(vt(n)), s = Z(!1);
  return Pt(() => {
    s.current = !0;
  }), de(
    (d, m = {}) => {
      if (U(s.current, Dt), !s.current) return;
      if (typeof d == "number") {
        r.go(d);
        return;
      }
      let u = Ue(
        d,
        JSON.parse(i),
        l,
        m.relative === "path"
      );
      t == null && a !== "/" && (u.pathname = u.pathname === "/" ? a : H([a, u.pathname])), (m.replace ? r.replace : r.push)(
        u,
        m.state,
        m
      );
    },
    [
      a,
      r,
      i,
      l,
      t
    ]
  );
}
T(null);
function ue(t, { relative: a } = {}) {
  let { matches: r } = C(q), { pathname: n } = A(), l = JSON.stringify(vt(r));
  return z(
    () => Ue(
      t,
      JSON.parse(l),
      n,
      a === "path"
    ),
    [t, l, n, a]
  );
}
function Ta(t, a) {
  return Lt(t, a);
}
function Lt(t, a, r) {
  S(
    he(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: n } = C(G), { matches: l } = C(q), i = l[l.length - 1], s = i ? i.params : {}, c = i ? i.pathname : "/", d = i ? i.pathnameBase : "/", m = i && i.route;
  {
    let p = m && m.path || "";
    Mt(
      c,
      !m || p.endsWith("*") || p.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p === "/" ? "*" : `${p}/*`}">.`
    );
  }
  let u = A(), h;
  if (a) {
    let p = typeof a == "string" ? Q(a) : a;
    S(
      d === "/" || p.pathname?.startsWith(d),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${p.pathname}" was given in the \`location\` prop.`
    ), h = p;
  } else
    h = u;
  let g = h.pathname || "/", x = g;
  if (d !== "/") {
    let p = d.replace(/^\//, "").split("/");
    x = "/" + g.replace(/^\//, "").split("/").slice(p.length).join("/");
  }
  let y = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (p) => Object.assign(p, {
        route: r.manifest[p.route.id] || p.route
      })
    )
  ) : xt(t, { pathname: x });
  U(
    m || y != null,
    `No routes matched location "${h.pathname}${h.search}${h.hash}" `
  ), U(
    y == null || y[y.length - 1].route.element !== void 0 || y[y.length - 1].route.Component !== void 0 || y[y.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${h.pathname}${h.search}${h.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let f = Fa(
    y && y.map(
      (p) => Object.assign({}, p, {
        params: Object.assign({}, s, p.params),
        pathname: H([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          n.encodeLocation ? n.encodeLocation(
            p.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : p.pathname
        ]),
        pathnameBase: p.pathnameBase === "/" ? d : H([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          n.encodeLocation ? n.encodeLocation(
            p.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : p.pathnameBase
        ])
      })
    ),
    l,
    r
  );
  return a && f ? /* @__PURE__ */ E(
    me.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          mask: void 0,
          ...h
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    f
  ) : f;
}
function Ga() {
  let t = qa(), a = ka(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), r = t instanceof Error ? t.stack : null, n = "rgba(200,200,200, 0.5)", l = { padding: "0.5rem", backgroundColor: n }, i = { padding: "2px 4px", backgroundColor: n }, s = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), s = /* @__PURE__ */ E(J, null, /* @__PURE__ */ E("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ E("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ E("code", { style: i }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ E("code", { style: i }, "errorElement"), " prop on your route.")), /* @__PURE__ */ E(J, null, /* @__PURE__ */ E("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ E("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ E("pre", { style: l }, r) : null, s);
}
var Oa = /* @__PURE__ */ E(Ga, null), Bt = class extends Kt {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, a) {
    return a.location !== t.location || a.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : a.error,
      location: a.location,
      revalidation: t.revalidation || a.revalidation
    };
  }
  componentDidCatch(t, a) {
    this.props.onError ? this.props.onError(t, a) : console.error(
      "React Router caught the following error during render",
      t
    );
  }
  render() {
    let t = this.state.error;
    if (this.context && typeof t == "object" && t && "digest" in t && typeof t.digest == "string") {
      const r = _a(t.digest);
      r && (t = r);
    }
    let a = t !== void 0 ? /* @__PURE__ */ E(q.Provider, { value: this.props.routeContext }, /* @__PURE__ */ E(
      ze.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ E(Ha, { error: t }, a) : a;
  }
};
Bt.contextType = Ct;
var Me = /* @__PURE__ */ new WeakMap();
function Ha({
  children: t,
  error: a
}) {
  let { basename: r } = C(G);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let n = Ma(a.digest);
    if (n) {
      let l = Me.get(a);
      if (l) throw l;
      let i = Et(n.location, r);
      if (wt && !Me.get(a))
        if (i.isExternal || n.reloadDocument)
          window.location.href = i.absoluteURL || i.to;
        else {
          const s = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(i.to, {
              replace: n.replace
            })
          );
          throw Me.set(a, s), s;
        }
      return /* @__PURE__ */ E(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${i.absoluteURL || i.to}`
        }
      );
    }
  }
  return t;
}
function ja({ routeContext: t, match: a, children: r }) {
  let n = C(ee);
  return n && n.static && n.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (n.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ E(q.Provider, { value: t }, r);
}
function Fa(t, a = [], r) {
  let n = r?.state;
  if (t == null) {
    if (!n)
      return null;
    if (n.errors)
      t = n.matches;
    else if (a.length === 0 && !n.initialized && n.matches.length > 0)
      t = n.matches;
    else
      return null;
  }
  let l = t, i = n?.errors;
  if (i != null) {
    let u = l.findIndex(
      (h) => h.route.id && i?.[h.route.id] !== void 0
    );
    S(
      u >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        i
      ).join(",")}`
    ), l = l.slice(
      0,
      Math.min(l.length, u + 1)
    );
  }
  let s = !1, c = -1;
  if (r && n) {
    s = n.renderFallback;
    for (let u = 0; u < l.length; u++) {
      let h = l[u];
      if ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (c = u), h.route.id) {
        let { loaderData: g, errors: x } = n, y = h.route.loader && !g.hasOwnProperty(h.route.id) && (!x || x[h.route.id] === void 0);
        if (h.route.lazy || y) {
          r.isStatic && (s = !0), c >= 0 ? l = l.slice(0, c + 1) : l = [l[0]];
          break;
        }
      }
    }
  }
  let d = r?.onError, m = n && d ? (u, h) => {
    d(u, {
      location: n.location,
      params: n.matches?.[0]?.params ?? {},
      pattern: Ca(n.matches),
      errorInfo: h
    });
  } : void 0;
  return l.reduceRight(
    (u, h, g) => {
      let x, y = !1, f = null, p = null;
      n && (x = i && h.route.id ? i[h.route.id] : void 0, f = h.route.errorElement || Oa, s && (c < 0 && g === 0 ? (Mt(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), y = !0, p = null) : c === g && (y = !0, p = h.route.hydrateFallbackElement || null)));
      let N = a.concat(l.slice(0, g + 1)), v = () => {
        let k;
        return x ? k = f : y ? k = p : h.route.Component ? k = /* @__PURE__ */ E(h.route.Component, null) : h.route.element ? k = h.route.element : k = u, /* @__PURE__ */ E(
          ja,
          {
            match: h,
            routeContext: {
              outlet: u,
              matches: N,
              isDataRoute: n != null
            },
            children: k
          }
        );
      };
      return n && (h.route.ErrorBoundary || h.route.errorElement || g === 0) ? /* @__PURE__ */ E(
        Bt,
        {
          location: n.location,
          revalidation: n.revalidation,
          component: f,
          error: x,
          children: v(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: m
        }
      ) : v();
    },
    null
  );
}
function Ve(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wa(t) {
  let a = C(ee);
  return S(a, Ve(t)), a;
}
function Ua(t) {
  let a = C(Se);
  return S(a, Ve(t)), a;
}
function za(t) {
  let a = C(q);
  return S(a, Ve(t)), a;
}
function qe(t) {
  let a = za(t), r = a.matches[a.matches.length - 1];
  return S(
    r.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Va() {
  return qe(
    "useRouteId"
    /* UseRouteId */
  );
}
function qa() {
  let t = C(ze), a = Ua(
    "useRouteError"
    /* UseRouteError */
  ), r = qe(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[r];
}
function Ya() {
  let { router: t } = Wa(
    "useNavigate"
    /* UseNavigateStable */
  ), a = qe(
    "useNavigate"
    /* UseNavigateStable */
  ), r = Z(!1);
  return Pt(() => {
    r.current = !0;
  }), de(
    async (l, i = {}) => {
      U(r.current, Dt), r.current && (typeof l == "number" ? await t.navigate(l) : await t.navigate(l, { fromRouteId: a, ...i }));
    },
    [t, a]
  );
}
var it = {};
function Mt(t, a, r) {
  !a && !it[t] && (it[t] = !0, U(!1, r));
}
Xt(Za);
function Za({
  routes: t,
  manifest: a,
  future: r,
  state: n,
  isStatic: l,
  onError: i
}) {
  return Lt(t, void 0, {
    manifest: a,
    state: n,
    isStatic: l,
    onError: i
  });
}
function B(t) {
  S(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Ka({
  basename: t = "/cms_v2",
  children: a = null,
  location: r,
  navigationType: n = "POP",
  navigator: l,
  static: i = !1,
  useTransitions: s
}) {
  S(
    !he(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let c = t.replace(/^\/*/, "/"), d = z(
    () => ({
      basename: c,
      navigator: l,
      static: i,
      useTransitions: s,
      future: {}
    }),
    [c, l, i, s]
  );
  typeof r == "string" && (r = Q(r));
  let {
    pathname: m = "/",
    search: u = "",
    hash: h = "",
    state: g = null,
    key: x = "default",
    mask: y
  } = r, f = z(() => {
    let p = V(m, c);
    return p == null ? null : {
      location: {
        pathname: p,
        search: u,
        hash: h,
        state: g,
        key: x,
        mask: y
      },
      navigationType: n
    };
  }, [c, m, u, h, g, x, n, y]);
  return U(
    f != null,
    `<Router basename="${c}"> is not able to match the URL "${m}${u}${h}" because it does not start with the basename, so the <Router> won't render anything.`
  ), f == null ? null : /* @__PURE__ */ E(G.Provider, { value: d }, /* @__PURE__ */ E(me.Provider, { children: a, value: f }));
}
function Ja({
  children: t,
  location: a
}) {
  return Ta(Te(t), a);
}
function Te(t, a = []) {
  let r = [];
  return Zt.forEach(t, (n, l) => {
    if (!Jt(n))
      return;
    let i = [...a, l];
    if (n.type === J) {
      r.push.apply(
        r,
        Te(n.props.children, i)
      );
      return;
    }
    S(
      n.type === B,
      `[${typeof n.type == "string" ? n.type : n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    ), S(
      !n.props.index || !n.props.children,
      "An index route cannot have child routes."
    );
    let s = {
      id: n.props.id || i.join("-"),
      caseSensitive: n.props.caseSensitive,
      element: n.props.element,
      Component: n.props.Component,
      index: n.props.index,
      path: n.props.path,
      middleware: n.props.middleware,
      loader: n.props.loader,
      action: n.props.action,
      hydrateFallbackElement: n.props.hydrateFallbackElement,
      HydrateFallback: n.props.HydrateFallback,
      errorElement: n.props.errorElement,
      ErrorBoundary: n.props.ErrorBoundary,
      hasErrorBoundary: n.props.hasErrorBoundary === !0 || n.props.ErrorBoundary != null || n.props.errorElement != null,
      shouldRevalidate: n.props.shouldRevalidate,
      handle: n.props.handle,
      lazy: n.props.lazy
    };
    n.props.children && (s.children = Te(
      n.props.children,
      i
    )), r.push(s);
  }), r;
}
var be = "get", ve = "application/x-www-form-urlencoded";
function De(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function Xa(t) {
  return De(t) && t.tagName.toLowerCase() === "button";
}
function Qa(t) {
  return De(t) && t.tagName.toLowerCase() === "form";
}
function er(t) {
  return De(t) && t.tagName.toLowerCase() === "input";
}
function tr(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function ar(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !tr(t);
}
var ye = null;
function rr() {
  if (ye === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ye = !1;
    } catch {
      ye = !0;
    }
  return ye;
}
var nr = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function _e(t) {
  return t != null && !nr.has(t) ? (U(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ve}"`
  ), null) : t;
}
function or(t, a) {
  let r, n, l, i, s;
  if (Qa(t)) {
    let c = t.getAttribute("action");
    n = c ? V(c, a) : null, r = t.getAttribute("method") || be, l = _e(t.getAttribute("enctype")) || ve, i = new FormData(t);
  } else if (Xa(t) || er(t) && (t.type === "submit" || t.type === "image")) {
    let c = t.form;
    if (c == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let d = t.getAttribute("formaction") || c.getAttribute("action");
    if (n = d ? V(d, a) : null, r = t.getAttribute("formmethod") || c.getAttribute("method") || be, l = _e(t.getAttribute("formenctype")) || _e(c.getAttribute("enctype")) || ve, i = new FormData(c, t), !rr()) {
      let { name: m, type: u, value: h } = t;
      if (u === "image") {
        let g = m ? `${m}.` : "";
        i.append(`${g}x`, "0"), i.append(`${g}y`, "0");
      } else m && i.append(m, h);
    }
  } else {
    if (De(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = be, n = null, l = ve, s = t;
  }
  return i && l === "text/plain" && (s = i, i = void 0), { action: n, method: r.toLowerCase(), encType: l, formData: i, body: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ye(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function _t(t, a, r, n) {
  let l = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return r ? l.pathname.endsWith("/") ? l.pathname = `${l.pathname}_.${n}` : l.pathname = `${l.pathname}.${n}` : l.pathname === "/" ? l.pathname = `_root.${n}` : a && V(l.pathname, a) === "/" ? l.pathname = `${we(a)}/_root.${n}` : l.pathname = `${we(l.pathname)}.${n}`, l;
}
async function lr(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function ir(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function sr(t, a, r) {
  let n = await Promise.all(
    t.map(async (l) => {
      let i = a.routes[l.route.id];
      if (i) {
        let s = await lr(i, r);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return hr(
    n.flat(1).filter(ir).filter((l) => l.rel === "stylesheet" || l.rel === "preload").map(
      (l) => l.rel === "stylesheet" ? { ...l, rel: "prefetch", as: "style" } : { ...l, rel: "prefetch" }
    )
  );
}
function st(t, a, r, n, l, i) {
  let s = (d, m) => r[m] ? d.route.id !== r[m].route.id : !0, c = (d, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== d.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== d.params["*"]
  );
  return i === "assets" ? a.filter(
    (d, m) => s(d, m) || c(d, m)
  ) : i === "data" ? a.filter((d, m) => {
    let u = n.routes[d.route.id];
    if (!u || !u.hasLoader)
      return !1;
    if (s(d, m) || c(d, m))
      return !0;
    if (d.route.shouldRevalidate) {
      let h = d.route.shouldRevalidate({
        currentUrl: new URL(
          l.pathname + l.search + l.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: d.params,
        defaultShouldRevalidate: !0
      });
      if (typeof h == "boolean")
        return h;
    }
    return !0;
  }) : [];
}
function cr(t, a, { includeHydrateFallback: r } = {}) {
  return dr(
    t.map((n) => {
      let l = a.routes[n.route.id];
      if (!l) return [];
      let i = [l.module];
      return l.clientActionModule && (i = i.concat(l.clientActionModule)), l.clientLoaderModule && (i = i.concat(l.clientLoaderModule)), r && l.hydrateFallbackModule && (i = i.concat(l.hydrateFallbackModule)), l.imports && (i = i.concat(l.imports)), i;
    }).flat(1)
  );
}
function dr(t) {
  return [...new Set(t)];
}
function mr(t) {
  let a = {}, r = Object.keys(t).sort();
  for (let n of r)
    a[n] = t[n];
  return a;
}
function hr(t, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((n, l) => {
    let i = JSON.stringify(mr(l));
    return r.has(i) || (r.add(i), n.push({ key: i, link: l })), n;
  }, []);
}
function Ze() {
  let t = C(ee);
  return Ye(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function ur() {
  let t = C(Se);
  return Ye(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Ke = T(void 0);
Ke.displayName = "FrameworkContext";
function Je() {
  let t = C(Ke);
  return Ye(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function pr(t, a) {
  let r = C(Ke), [n, l] = w(!1), [i, s] = w(!1), { onFocus: c, onBlur: d, onMouseEnter: m, onMouseLeave: u, onTouchStart: h } = a, g = Z(null);
  le(() => {
    if (t === "render" && s(!0), t === "viewport") {
      let f = (N) => {
        N.forEach((v) => {
          s(v.isIntersecting);
        });
      }, p = new IntersectionObserver(f, { threshold: 0.5 });
      return g.current && p.observe(g.current), () => {
        p.disconnect();
      };
    }
  }, [t]), le(() => {
    if (n) {
      let f = setTimeout(() => {
        s(!0);
      }, 100);
      return () => {
        clearTimeout(f);
      };
    }
  }, [n]);
  let x = () => {
    l(!0);
  }, y = () => {
    l(!1), s(!1);
  };
  return r ? t !== "intent" ? [i, g, {}] : [
    i,
    g,
    {
      onFocus: re(c, x),
      onBlur: re(d, y),
      onMouseEnter: re(m, x),
      onMouseLeave: re(u, y),
      onTouchStart: re(h, x)
    }
  ] : [!1, g, {}];
}
function re(t, a) {
  return (r) => {
    t && t(r), r.defaultPrevented || a(r);
  };
}
function gr({ page: t, ...a }) {
  let r = Sa(), { router: n } = Ze(), l = z(
    () => xt(n.routes, t, n.basename),
    [n.routes, t, n.basename]
  );
  return l ? r ? /* @__PURE__ */ E(xr, { page: t, matches: l, ...a }) : /* @__PURE__ */ E(yr, { page: t, matches: l, ...a }) : null;
}
function fr(t) {
  let { manifest: a, routeModules: r } = Je(), [n, l] = w([]);
  return le(() => {
    let i = !1;
    return sr(t, a, r).then(
      (s) => {
        i || l(s);
      }
    ), () => {
      i = !0;
    };
  }, [t, a, r]), n;
}
function xr({
  page: t,
  matches: a,
  ...r
}) {
  let n = A(), { future: l } = Je(), { basename: i } = Ze(), s = z(() => {
    if (t === n.pathname + n.search + n.hash)
      return [];
    let c = _t(
      t,
      i,
      l.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), d = !1, m = [];
    for (let u of a)
      typeof u.route.shouldRevalidate == "function" ? d = !0 : m.push(u.route.id);
    return d && m.length > 0 && c.searchParams.set("_routes", m.join(",")), [c.pathname + c.search];
  }, [
    i,
    l.v8_trailingSlashAwareDataRequests,
    t,
    n,
    a
  ]);
  return /* @__PURE__ */ E(J, null, s.map((c) => /* @__PURE__ */ E("link", { key: c, rel: "prefetch", as: "fetch", href: c, ...r })));
}
function yr({
  page: t,
  matches: a,
  ...r
}) {
  let n = A(), { future: l, manifest: i, routeModules: s } = Je(), { basename: c } = Ze(), { loaderData: d, matches: m } = ur(), u = z(
    () => st(
      t,
      a,
      m,
      i,
      n,
      "data"
    ),
    [t, a, m, i, n]
  ), h = z(
    () => st(
      t,
      a,
      m,
      i,
      n,
      "assets"
    ),
    [t, a, m, i, n]
  ), g = z(() => {
    if (t === n.pathname + n.search + n.hash)
      return [];
    let f = /* @__PURE__ */ new Set(), p = !1;
    if (a.forEach((v) => {
      let k = i.routes[v.route.id];
      !k || !k.hasLoader || (!u.some((R) => R.route.id === v.route.id) && v.route.id in d && s[v.route.id]?.shouldRevalidate || k.hasClientLoader ? p = !0 : f.add(v.route.id));
    }), f.size === 0)
      return [];
    let N = _t(
      t,
      c,
      l.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return p && f.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((v) => f.has(v.route.id)).map((v) => v.route.id).join(",")
    ), [N.pathname + N.search];
  }, [
    c,
    l.v8_trailingSlashAwareDataRequests,
    d,
    n,
    i,
    u,
    a,
    t,
    s
  ]), x = z(
    () => cr(h, i),
    [h, i]
  ), y = fr(h);
  return /* @__PURE__ */ E(J, null, g.map((f) => /* @__PURE__ */ E("link", { key: f, rel: "prefetch", as: "fetch", href: f, ...r })), x.map((f) => /* @__PURE__ */ E("link", { key: f, rel: "modulepreload", href: f, ...r })), y.map(({ key: f, link: p }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ E(
      "link",
      {
        key: f,
        nonce: r.nonce,
        ...p,
        crossOrigin: p.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function br(...t) {
  return (a) => {
    t.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var vr = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  vr && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
function Nr({
  basename: t,
  children: a,
  useTransitions: r,
  window: n
}) {
  let l = Z();
  l.current == null && (l.current = Qt({ window: n, v5Compat: !0 }));
  let i = l.current, [s, c] = w({
    action: i.action,
    location: i.location
  }), d = de(
    (m) => {
      r === !1 ? c(m) : We(() => c(m));
    },
    [r]
  );
  return ft(() => i.listen(d), [i, d]), /* @__PURE__ */ E(
    Ka,
    {
      basename: t,
      children: a,
      location: s.location,
      navigationType: s.action,
      navigator: i,
      useTransitions: r
    }
  );
}
var At = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, D = ce(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: n = "none",
    relative: l,
    reloadDocument: i,
    replace: s,
    mask: c,
    state: d,
    target: m,
    to: u,
    preventScrollReset: h,
    viewTransition: g,
    defaultShouldRevalidate: x,
    ...y
  }, f) {
    let { basename: p, navigator: N, useTransitions: v } = C(G), k = typeof u == "string" && At.test(u), R = Et(u, p);
    u = R.to;
    let L = Aa(u, { relative: l }), I = A(), W = null;
    if (c) {
      let Y = Ue(
        c,
        [],
        I.mask ? I.mask.pathname : "/",
        !0
      );
      p !== "/" && (Y.pathname = Y.pathname === "/" ? p : H([p, Y.pathname])), W = N.createHref(Y);
    }
    let [_, O, $] = pr(
      n,
      y
    ), Le = Cr(u, {
      replace: s,
      mask: c,
      state: d,
      target: m,
      preventScrollReset: h,
      relative: l,
      viewTransition: g,
      defaultShouldRevalidate: x,
      useTransitions: v
    });
    function zt(Y) {
      a && a(Y), Y.defaultPrevented || Le(Y);
    }
    let et = !(R.isExternal || i), tt = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ E(
        "a",
        {
          ...y,
          ...$,
          href: (et ? W : void 0) || R.absoluteURL || L,
          onClick: et ? zt : a,
          ref: br(f, O),
          target: m,
          "data-discover": !k && r === "render" ? "true" : void 0
        }
      )
    );
    return _ && !k ? /* @__PURE__ */ E(J, null, tt, /* @__PURE__ */ E(gr, { page: L })) : tt;
  }
);
D.displayName = "Link";
var wr = ce(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: l = !1,
    style: i,
    to: s,
    viewTransition: c,
    children: d,
    ...m
  }, u) {
    let h = ue(s, { relative: m.relative }), g = A(), x = C(Se), { navigator: y, basename: f } = C(G), p = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Lr(h) && c === !0, N = y.encodeLocation ? y.encodeLocation(h).pathname : h.pathname, v = g.pathname, k = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (v = v.toLowerCase(), k = k ? k.toLowerCase() : null, N = N.toLowerCase()), k && f && (k = V(k, f) || k);
    const R = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let L = v === N || !l && v.startsWith(N) && v.charAt(R) === "/", I = k != null && (k === N || !l && k.startsWith(N) && k.charAt(N.length) === "/"), W = {
      isActive: L,
      isPending: I,
      isTransitioning: p
    }, _ = L ? a : void 0, O;
    typeof n == "function" ? O = n(W) : O = [
      n,
      L ? "active" : null,
      I ? "pending" : null,
      p ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let $ = typeof i == "function" ? i(W) : i;
    return /* @__PURE__ */ E(
      D,
      {
        ...m,
        "aria-current": _,
        className: O,
        ref: u,
        style: $,
        to: s,
        viewTransition: c
      },
      typeof d == "function" ? d(W) : d
    );
  }
);
wr.displayName = "NavLink";
var Er = ce(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: n,
    replace: l,
    state: i,
    method: s = be,
    action: c,
    onSubmit: d,
    relative: m,
    preventScrollReset: u,
    viewTransition: h,
    defaultShouldRevalidate: g,
    ...x
  }, y) => {
    let { useTransitions: f } = C(G), p = Dr(), N = Pr(c, { relative: m }), v = s.toLowerCase() === "get" ? "get" : "post", k = typeof c == "string" && At.test(c);
    return /* @__PURE__ */ E(
      "form",
      {
        ref: y,
        method: v,
        action: N,
        onSubmit: n ? d : (L) => {
          if (d && d(L), L.defaultPrevented) return;
          L.preventDefault();
          let I = L.nativeEvent.submitter, W = I?.getAttribute("formmethod") || s, _ = () => p(I || L.currentTarget, {
            fetcherKey: a,
            method: W,
            navigate: r,
            replace: l,
            state: i,
            relative: m,
            preventScrollReset: u,
            viewTransition: h,
            defaultShouldRevalidate: g
          });
          f && r !== !1 ? We(() => _()) : _();
        },
        ...x,
        "data-discover": !k && t === "render" ? "true" : void 0
      }
    );
  }
);
Er.displayName = "Form";
function kr(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function It(t) {
  let a = C(ee);
  return S(a, kr(t)), a;
}
function Cr(t, {
  target: a,
  replace: r,
  mask: n,
  state: l,
  preventScrollReset: i,
  relative: s,
  viewTransition: c,
  defaultShouldRevalidate: d,
  useTransitions: m
} = {}) {
  let u = Ia(), h = A(), g = ue(t, { relative: s });
  return de(
    (x) => {
      if (ar(x, a)) {
        x.preventDefault();
        let y = r !== void 0 ? r : ie(h) === ie(g), f = () => u(t, {
          replace: y,
          mask: n,
          state: l,
          preventScrollReset: i,
          relative: s,
          viewTransition: c,
          defaultShouldRevalidate: d
        });
        m ? We(() => f()) : f();
      }
    },
    [
      h,
      u,
      g,
      r,
      n,
      l,
      a,
      t,
      i,
      s,
      c,
      d,
      m
    ]
  );
}
var Rr = 0, Sr = () => `__${String(++Rr)}__`;
function Dr() {
  let { router: t } = It(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = C(G), r = Va(), n = t.fetch, l = t.navigate;
  return de(
    async (i, s = {}) => {
      let { action: c, method: d, encType: m, formData: u, body: h } = or(
        i,
        a
      );
      if (s.navigate === !1) {
        let g = s.fetcherKey || Sr();
        await n(g, r, s.action || c, {
          defaultShouldRevalidate: s.defaultShouldRevalidate,
          preventScrollReset: s.preventScrollReset,
          formData: u,
          body: h,
          formMethod: s.method || d,
          formEncType: s.encType || m,
          flushSync: s.flushSync
        });
      } else
        await l(s.action || c, {
          defaultShouldRevalidate: s.defaultShouldRevalidate,
          preventScrollReset: s.preventScrollReset,
          formData: u,
          body: h,
          formMethod: s.method || d,
          formEncType: s.encType || m,
          replace: s.replace,
          state: s.state,
          fromRouteId: r,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition
        });
    },
    [n, l, a, r]
  );
}
function Pr(t, { relative: a } = {}) {
  let { basename: r } = C(G), n = C(q);
  S(n, "useFormAction must be used inside a RouteContext");
  let [l] = n.matches.slice(-1), i = { ...ue(t || ".", { relative: a }) }, s = A();
  if (t == null) {
    i.search = s.search;
    let c = new URLSearchParams(i.search), d = c.getAll("index");
    if (d.some((u) => u === "")) {
      c.delete("index"), d.filter((h) => h).forEach((h) => c.append("index", h));
      let u = c.toString();
      i.search = u ? `?${u}` : "";
    }
  }
  return (!t || t === ".") && l.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (i.pathname = i.pathname === "/" ? r : H([r, i.pathname])), ie(i);
}
function Lr(t, { relative: a } = {}) {
  let r = C(Rt);
  S(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: n } = It(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), l = ue(t, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let i = V(r.currentLocation.pathname, n) || r.currentLocation.pathname, s = V(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Ne(l.pathname, s) != null || Ne(l.pathname, i) != null;
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Br = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Mr = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (a, r, n) => n ? n.toUpperCase() : r.toLowerCase()
), ct = (t) => {
  const a = Mr(t);
  return a.charAt(0).toUpperCase() + a.slice(1);
}, $t = (...t) => t.filter((a, r, n) => !!a && a.trim() !== "" && n.indexOf(a) === r).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var _r = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = ce(
  ({
    color: t = "currentColor",
    size: a = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: l = "",
    children: i,
    iconNode: s,
    ...c
  }, d) => E(
    "svg",
    {
      ref: d,
      ..._r,
      width: a,
      height: a,
      stroke: t,
      strokeWidth: n ? Number(r) * 24 / Number(a) : r,
      className: $t("lucide", l),
      ...c
    },
    [
      ...s.map(([m, u]) => E(m, u)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b = (t, a) => {
  const r = ce(
    ({ className: n, ...l }, i) => E(Ar, {
      ref: i,
      iconNode: a,
      className: $t(
        `lucide-${Br(ct(t))}`,
        `lucide-${t}`,
        n
      ),
      ...l
    })
  );
  return r.displayName = ct(t), r;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ir = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], Xe = b("arrow-down-to-line", Ir);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $r = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], Tr = b("arrow-left", $r);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gr = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], Tt = b("arrow-right", Gr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Or = [
  ["path", { d: "m18 9-6-6-6 6", key: "kcunyi" }],
  ["path", { d: "M12 3v14", key: "7cf3v8" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
], Gt = b("arrow-up-from-line", Or);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hr = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
], jr = b("building", Hr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fr = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], Wr = b("calendar", Fr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ur = [
  ["path", { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", key: "cvxqlc" }],
  ["path", { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", key: "1ostrc" }],
  ["path", { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12", key: "hqx58h" }],
  ["path", { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z", key: "eykp1o" }]
], Ge = b("cherry", Ur);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], dt = b("chevron-down", zr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vr = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], pe = b("chevron-left", Vr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qr = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], ge = b("chevron-right", qr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yr = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Zr = b("circle-check-big", Yr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kr = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
], Jr = b("clock", Kr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xr = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], Ot = b("credit-card", Xr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], Ee = b("eye-off", Qr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const en = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], ke = b("eye", en);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tn = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], K = b("file-text", tn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const an = [
  [
    "path",
    {
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
      key: "15baut"
    }
  ],
  ["path", { d: "M18 12v.5", key: "18hhni" }],
  ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
      key: "l9di03"
    }
  ],
  [
    "path",
    { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4", key: "1kjonw" }
  ],
  [
    "path",
    { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98", key: "1zlm23" }
  ]
], mt = b("fish", an);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rn = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
], Oe = b("flame", rn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nn = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], fe = b("funnel", nn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const on = [
  ["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }],
  ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }],
  ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }],
  ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }],
  [
    "path",
    {
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
      key: "mfqc10"
    }
  ]
], He = b("gamepad-2", on);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ln = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
], Ce = b("gift", ln);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], cn = b("globe", sn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dn = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], mn = b("history", dn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hn = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
], je = b("house", hn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const un = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Ht = b("layout-dashboard", un);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pn = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
], gn = b("mail", pn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fn = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], xn = b("map-pin", fn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yn = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], jt = b("menu", yn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bn = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], Ft = b("message-circle", bn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vn = [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
], Nn = b("phone", vn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wn = [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
], ht = b("radio", wn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const En = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], kn = b("refresh-cw", En);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cn = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], te = b("search", Cn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rn = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], Wt = b("shield", Rn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sn = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], Dn = b("star", Sn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pn = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
], Ln = b("ticket", Pn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bn = [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
], Ut = b("trending-up", Bn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mn = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
], Re = b("trophy", Mn);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _n = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], X = b("user", _n);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const An = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], Fe = b("video", An);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const In = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], se = b("x", In);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $n = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Tn = b("zap", $n), oe = "/cms_v2/_components/v2/2bdc36041840bbf3945bf96422a0419a698638a8/logo.1176bffd.png";
function Qe({ isOpen: t, onClose: a, children: r, title: n }) {
  return t ? /* @__PURE__ */ o("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm", onClick: a }),
    /* @__PURE__ */ o("div", { className: "relative bg-[#1a2128] rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ o("div", { className: "sticky top-0 bg-[#1a2128] border-b border-gray-700 px-6 py-4 flex items-center justify-between", children: [
        n && /* @__PURE__ */ e("h2", { className: "text-white text-xl", children: n }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: a,
            className: "ml-auto text-gray-400 hover:text-white transition-colors",
            children: /* @__PURE__ */ e(se, { className: "w-6 h-6" })
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "p-6", children: r })
    ] })
  ] }) : null;
}
function Gn({ isOpen: t, onClose: a, onSwitchToRegister: r, onSwitchToForgotPassword: n, onLogin: l }) {
  const [i, s] = w(!1), [c, d] = w(""), [m, u] = w("");
  return /* @__PURE__ */ e(Qe, { isOpen: t, onClose: a, title: "Login", children: /* @__PURE__ */ o("form", { onSubmit: (g) => {
    g.preventDefault(), l();
  }, className: "space-y-4", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Username" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: c,
          onChange: (g) => d(g.target.value),
          placeholder: "Enter your username",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Password" }),
      /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: i ? "text" : "password",
            value: m,
            onChange: (g) => u(g.target.value),
            placeholder: "Enter your password",
            className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => s(!i),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300",
            children: i ? /* @__PURE__ */ e(Ee, { className: "w-5 h-5" }) : /* @__PURE__ */ e(ke, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ o("label", { className: "flex items-center text-gray-300 cursor-pointer", children: [
        /* @__PURE__ */ e("input", { type: "checkbox", className: "mr-2 w-4 h-4 rounded border-gray-700 bg-[#0f1419] text-[#98E7D2] focus:ring-[#98E7D2]" }),
        "Remember me"
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "text-[#98E7D2] hover:text-[#98E7D2] transition-colors",
          children: "Forgot Password?"
        }
      )
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "submit",
        className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold",
        children: "Login"
      }
    ),
    /* @__PURE__ */ o("div", { className: "text-center text-sm text-gray-400", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "text-[#98E7D2] hover:text-[#98E7D2] transition-colors",
          children: "Register Now"
        }
      )
    ] })
  ] }) });
}
function On({ isOpen: t, onClose: a, onSwitchToLogin: r, onRegister: n }) {
  const [l, i] = w(1), [s, c] = w(!1), [d, m] = w(!1), [u, h] = w({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    realName: "",
    mobileNumber: "",
    birthday: "",
    invitationCode: "",
    captcha: "",
    agreeTerms: !1
  }), g = (p, N) => {
    h((v) => ({ ...v, [p]: N }));
  }, x = (p) => {
    p.preventDefault(), i(2);
  }, y = (p) => {
    p.preventDefault(), n();
  }, f = () => {
    i(1);
  };
  return /* @__PURE__ */ e(Qe, { isOpen: t, onClose: a, title: "Register", children: l === 1 ? /* @__PURE__ */ o("form", { onSubmit: x, className: "space-y-4", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Username" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: u.username,
          onChange: (p) => g("username", p.target.value),
          placeholder: "Enter your username",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Password" }),
      /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: s ? "text" : "password",
            value: u.password,
            onChange: (p) => g("password", p.target.value),
            placeholder: "Enter your password",
            className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
            required: !0
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => c(!s),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300",
            children: s ? /* @__PURE__ */ e(Ee, { className: "w-5 h-5" }) : /* @__PURE__ */ e(ke, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Confirm Password" }),
      /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: d ? "text" : "password",
            value: u.confirmPassword,
            onChange: (p) => g("confirmPassword", p.target.value),
            placeholder: "Confirm your password",
            className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
            required: !0
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => m(!d),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300",
            children: d ? /* @__PURE__ */ e(Ee, { className: "w-5 h-5" }) : /* @__PURE__ */ e(ke, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Email" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "email",
          value: u.email,
          onChange: (p) => g("email", p.target.value),
          placeholder: "Enter your email",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Real Name" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: u.realName,
          onChange: (p) => g("realName", p.target.value),
          placeholder: "Enter your real name",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Mobile Number" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "tel",
          value: u.mobileNumber,
          onChange: (p) => g("mobileNumber", p.target.value),
          placeholder: "Enter your mobile number",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "submit",
        className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold",
        children: "Next Step"
      }
    ),
    /* @__PURE__ */ o("div", { className: "text-center text-sm text-gray-400", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "text-[#98E7D2] hover:text-[#98E7D2] transition-colors",
          children: "Login"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ o("form", { onSubmit: y, className: "space-y-4", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Birthday" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "date",
          value: u.birthday,
          onChange: (p) => g("birthday", p.target.value),
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Invitation Code (Optional)" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: u.invitationCode,
          onChange: (p) => g("invitationCode", p.target.value),
          placeholder: "Enter invitation code",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Captcha" }),
      /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: u.captcha,
            onChange: (p) => g("captcha", p.target.value),
            placeholder: "Enter captcha",
            className: "flex-1 bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
            required: !0
          }
        ),
        /* @__PURE__ */ e("div", { className: "w-28 h-12 bg-[#0f1419] border border-gray-700 rounded-lg flex items-center justify-center text-white text-lg font-mono", children: "AB12" })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ o("label", { className: "flex items-start text-gray-300 text-sm cursor-pointer", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: u.agreeTerms,
          onChange: (p) => g("agreeTerms", p.target.checked),
          className: "mr-2 mt-0.5 w-4 h-4 rounded border-gray-700 bg-[#0f1419] text-[#98E7D2] focus:ring-[#98E7D2]",
          required: !0
        }
      ),
      /* @__PURE__ */ o("span", { children: [
        "I agree to the",
        " ",
        /* @__PURE__ */ e("a", { href: "#", className: "text-[#98E7D2] hover:text-[#98E7D2]", children: "Terms of Service" }),
        " ",
        "and",
        " ",
        /* @__PURE__ */ e("a", { href: "#", className: "text-[#98E7D2] hover:text-[#98E7D2]", children: "Privacy Policy" })
      ] })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: f,
          className: "flex-1 bg-[#0f1419] border border-gray-700 text-gray-300 py-3 rounded-lg hover:bg-gray-800 transition-colors",
          children: "Back"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "submit",
          className: "flex-1 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold",
          children: "Register"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "text-center text-sm text-gray-400", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "text-[#98E7D2] hover:text-[#98E7D2] transition-colors",
          children: "Login"
        }
      )
    ] })
  ] }) });
}
function Hn({ isOpen: t, onClose: a, onSwitchToLogin: r }) {
  const [n, l] = w(1), [i, s] = w(""), [c, d] = w("");
  return /* @__PURE__ */ e(Qe, { isOpen: t, onClose: a, title: "Forgot Password", children: n === 1 ? /* @__PURE__ */ o("form", { onSubmit: (h) => {
    h.preventDefault(), l(2);
  }, className: "space-y-4", children: [
    /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm mb-4", children: "Enter your username and email address to receive password reset instructions." }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Username" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: i,
          onChange: (h) => s(h.target.value),
          placeholder: "Enter your username",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-gray-300 text-sm mb-2", children: "Email" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "email",
          value: c,
          onChange: (h) => d(h.target.value),
          placeholder: "Enter your email",
          className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "submit",
        className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold",
        children: "Send Reset Link"
      }
    ),
    /* @__PURE__ */ o("div", { className: "text-center text-sm text-gray-400", children: [
      "Remember your password?",
      " ",
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "text-[#98E7D2] hover:text-[#98E7D2] transition-colors",
          children: "Back to Login"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "text-center space-y-6", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center", children: /* @__PURE__ */ e(Zr, { className: "w-20 h-20 text-[#98E7D2]" }) }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("h3", { className: "text-white text-xl mb-2", children: "Check Your Email" }),
      /* @__PURE__ */ o("p", { className: "text-gray-400 text-sm", children: [
        "We've sent password reset instructions to ",
        /* @__PURE__ */ e("span", { className: "text-[#98E7D2]", children: c })
      ] })
    ] }),
    /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm", children: "Please check your inbox and follow the link to reset your password." }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => {
          l(1), s(""), d(""), r();
        },
        className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold",
        children: "Back to Login"
      }
    )
  ] }) });
}
function jn() {
  const [t, a] = w(!1), [r, n] = w(!1), [l, i] = w(!1), [s, c] = w(!1), [d, m] = w(!1), [u, h] = w(!1), [g, x] = w(!1), [y, f] = w("EN"), [p, N] = w(!1), [v, k] = w({
    id: "meqomcao",
    vipLevel: 1,
    balance: 1e9
  }), R = A(), L = () => {
    h(!1), x(!1), m(!0);
  }, I = () => {
    m(!1), x(!1), h(!0);
  }, W = () => {
    m(!1), h(!1), x(!0);
  };
  return /* @__PURE__ */ o("header", { className: "bg-[#1a2128] border-b border-gray-800 sticky top-0 z-50", children: [
    /* @__PURE__ */ o("div", { className: "hidden md:flex items-stretch px-[50px]", children: [
      /* @__PURE__ */ e(D, { to: "/", className: "flex items-center pr-6 flex-shrink-0", children: /* @__PURE__ */ e("img", { src: oe, alt: "Casino Logo", className: "h-10 mix-blend-lighten" }) }),
      /* @__PURE__ */ o("div", { className: "flex flex-col flex-1", children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-end gap-3 py-2 text-sm", children: p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { className: "text-gray-300 text-xs", children: "ID:" }),
            /* @__PURE__ */ e("span", { className: "text-white text-xs", children: v.id }),
            /* @__PURE__ */ o("span", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-2 py-0.5 rounded-full text-xs font-semibold", children: [
              "VIP",
              v.vipLevel
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex items-center gap-1 border-l border-gray-700 pl-3", children: [
            /* @__PURE__ */ e("span", { className: "text-gray-300 text-xs", children: "Balance:" }),
            /* @__PURE__ */ o("span", { className: "text-white text-xs font-semibold", children: [
              "₩",
              v.balance.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ e(D, { to: "/account", className: "text-gray-300 hover:text-white", children: /* @__PURE__ */ e(X, { className: "w-5 h-5" }) })
        ] }) : /* @__PURE__ */ o(P, { children: [
          /* @__PURE__ */ e("button", { className: "text-gray-300 hover:text-white", children: /* @__PURE__ */ e(te, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ o("div", { className: "relative", onMouseEnter: () => c(!0), onMouseLeave: () => c(!1), children: [
            /* @__PURE__ */ o("button", { className: "text-gray-300 hover:text-white flex items-center gap-1", children: [
              /* @__PURE__ */ e(cn, { className: "w-4 h-4" }),
              /* @__PURE__ */ e("span", { children: y })
            ] }),
            s && /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1 bg-[#1a2128] border border-gray-700 rounded-lg shadow-lg py-2 min-w-[100px] z-50", children: [
              /* @__PURE__ */ e("button", { onClick: () => f("EN"), className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "English" }),
              /* @__PURE__ */ e("button", { onClick: () => f("KR"), className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "한국어" })
            ] })
          ] }),
          /* @__PURE__ */ e("button", { onClick: L, className: "bg-[#2a3138] text-white px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity", children: "Login" }),
          /* @__PURE__ */ e("button", { onClick: I, className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-semibold", children: "Register" })
        ] }) }),
        /* @__PURE__ */ o("nav", { className: "flex items-center justify-end gap-1 py-1.5 border-t border-gray-800 text-sm relative", children: [
          [
            { to: "/", icon: /* @__PURE__ */ e(je, { className: "w-3.5 h-3.5" }), label: "Home" },
            { to: "/hot-games", icon: /* @__PURE__ */ e(Oe, { className: "w-3.5 h-3.5" }), label: "Hot Games" },
            { to: "/mini-games", icon: /* @__PURE__ */ e(He, { className: "w-3.5 h-3.5" }), label: "Mini Games" }
          ].map(({ to: _, icon: O, label: $ }) => /* @__PURE__ */ o(D, { to: _, className: `px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${R.pathname === _ ? "text-gray-900 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] shadow-md font-semibold" : "text-gray-300 hover:text-gray-900 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2]"}`, children: [
            O,
            /* @__PURE__ */ e("span", { children: $ })
          ] }, _)),
          /* @__PURE__ */ o("div", { className: "relative", onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
            /* @__PURE__ */ o(D, { to: "/sport", className: `px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${R.pathname === "/sport" ? "text-gray-900 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] shadow-md font-semibold" : "text-gray-300 hover:text-gray-900 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2]"}`, children: [
              /* @__PURE__ */ e(Re, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ e("span", { children: "Sports" }),
              /* @__PURE__ */ e(dt, { className: "w-3 h-3" })
            ] }),
            r && /* @__PURE__ */ o("div", { className: "absolute top-full left-0 mt-1 bg-[#1a2128] border border-gray-700 rounded-lg shadow-lg py-2 min-w-[120px] z-50", children: [
              /* @__PURE__ */ e("button", { className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "BTI" }),
              /* @__PURE__ */ e("button", { className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "SABA" })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "relative", onMouseEnter: () => i(!0), onMouseLeave: () => i(!1), children: [
            /* @__PURE__ */ o(D, { to: "/sport", className: `px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${R.pathname === "/live" ? "text-gray-900 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] shadow-md font-semibold" : "text-gray-300 hover:text-gray-900 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2]"}`, children: [
              /* @__PURE__ */ e(Fe, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ e("span", { children: "Live" }),
              /* @__PURE__ */ e(dt, { className: "w-3 h-3" })
            ] }),
            l && /* @__PURE__ */ o("div", { className: "absolute top-full left-0 mt-1 bg-[#1a2128] border border-gray-700 rounded-lg shadow-lg py-2 min-w-[150px] z-50", children: [
              /* @__PURE__ */ e("button", { className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "Sexy" }),
              /* @__PURE__ */ e("button", { className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "Pragmatic Play" }),
              /* @__PURE__ */ e("button", { className: "w-full text-left px-4 py-2 text-gray-300 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2] hover:text-gray-900 transition-all", children: "Yeebet" })
            ] })
          ] }),
          [
            { to: "/fish", icon: /* @__PURE__ */ e(mt, { className: "w-3.5 h-3.5" }), label: "Fish" },
            { to: "/hot-games", icon: /* @__PURE__ */ e(Tn, { className: "w-3.5 h-3.5" }), label: "ESport" },
            { to: "/slot", icon: /* @__PURE__ */ e(Ge, { className: "w-3.5 h-3.5" }), label: "Slots" },
            { to: "/promotion", icon: /* @__PURE__ */ e(Ln, { className: "w-3.5 h-3.5" }), label: "Lottery" },
            { to: "/promotion", icon: /* @__PURE__ */ e(Ce, { className: "w-3.5 h-3.5" }), label: "Promotion" }
          ].map(({ to: _, icon: O, label: $ }) => /* @__PURE__ */ o(D, { to: _, className: `px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${R.pathname === _ && $ !== "Lottery" ? "text-gray-900 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] shadow-md font-semibold" : "text-gray-300 hover:text-gray-900 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2]"}`, children: [
            O,
            /* @__PURE__ */ e("span", { children: $ })
          ] }, $))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex md:hidden items-center justify-between h-14 px-4", children: [
      /* @__PURE__ */ e(D, { to: "/", className: "whitespace-nowrap flex-shrink-0", children: /* @__PURE__ */ e("img", { src: oe, alt: "Casino Logo", className: "h-10 mix-blend-lighten" }) }),
      /* @__PURE__ */ e("button", { className: "text-gray-300 hover:text-white", onClick: () => a(!t), children: t ? /* @__PURE__ */ e(se, { className: "w-5 h-5" }) : /* @__PURE__ */ e(jt, { className: "w-5 h-5" }) })
    ] }),
    t && /* @__PURE__ */ o("div", { className: "md:hidden fixed inset-x-0 top-0 bottom-16 z-40", children: [
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/60", onClick: () => a(!1) }),
      /* @__PURE__ */ o("nav", { className: "absolute inset-0 bg-[#1a2128] shadow-2xl flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ o("div", { className: "flex-shrink-0 flex items-center justify-between h-14 px-4 border-b border-gray-800", children: [
          /* @__PURE__ */ e("img", { src: oe, alt: "Casino Logo", className: "h-10 mix-blend-lighten" }),
          /* @__PURE__ */ e("button", { className: "text-gray-300 hover:text-white", onClick: () => a(!1), children: /* @__PURE__ */ e(se, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col justify-between px-3 py-2 overflow-hidden", children: [
          /* @__PURE__ */ e("div", { className: "flex flex-col flex-1 justify-around", children: [
            { to: "/", icon: /* @__PURE__ */ e(je, { className: "w-5 h-5" }), label: "Home", active: R.pathname === "/" },
            { to: "/hot-games", icon: /* @__PURE__ */ e(Oe, { className: "w-5 h-5" }), label: "Hot Games", active: R.pathname === "/hot-games" },
            { to: "/mini-games", icon: /* @__PURE__ */ e(He, { className: "w-5 h-5" }), label: "Mini Games", active: R.pathname === "/mini-games" },
            { to: "/slot", icon: /* @__PURE__ */ e(Ge, { className: "w-5 h-5" }), label: "Slots", active: R.pathname === "/slot" },
            { to: "/sport", icon: /* @__PURE__ */ e(Re, { className: "w-5 h-5" }), label: "Sports", active: R.pathname === "/sport" },
            { to: "/sport", icon: /* @__PURE__ */ e(Fe, { className: "w-5 h-5" }), label: "Live", active: R.pathname === "/live" },
            { to: "/fish", icon: /* @__PURE__ */ e(mt, { className: "w-5 h-5" }), label: "Fish", active: R.pathname === "/fish" },
            { to: "/promotion", icon: /* @__PURE__ */ e(Ce, { className: "w-5 h-5" }), label: "Promotion", active: R.pathname === "/promotion" }
          ].map(({ to: _, icon: O, label: $, active: Le }) => /* @__PURE__ */ o(
            D,
            {
              to: _,
              onClick: () => a(!1),
              className: `px-4 py-2 rounded-xl flex items-center gap-3 transition-colors ${Le ? "text-gray-900 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] font-semibold" : "text-gray-300 hover:text-white hover:bg-[#0f1419]"}`,
              children: [
                O,
                /* @__PURE__ */ e("span", { children: $ })
              ]
            },
            $
          )) }),
          /* @__PURE__ */ e("div", { className: "flex-shrink-0 border-t border-gray-700 flex flex-col gap-2 pt-2", children: p ? /* @__PURE__ */ o("div", { className: "px-4 py-3", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ e("div", { className: "w-12 h-12 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] flex items-center justify-center", children: /* @__PURE__ */ e(X, { className: "w-6 h-6 text-gray-900" }) }),
              /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ e("span", { className: "text-white font-semibold", children: v.id }),
                  /* @__PURE__ */ o("span", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-2 py-0.5 rounded-full text-xs font-semibold", children: [
                    "VIP",
                    v.vipLevel
                  ] })
                ] }),
                /* @__PURE__ */ o("div", { className: "text-gray-400 text-sm mt-1", children: [
                  "Balance: ",
                  /* @__PURE__ */ o("span", { className: "text-[#98E7D2] font-semibold", children: [
                    "₩",
                    v.balance.toLocaleString()
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e(
              D,
              {
                to: "/account",
                onClick: () => a(!1),
                className: "block w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity text-center font-semibold",
                children: "View Account"
              }
            )
          ] }) : /* @__PURE__ */ o(P, { children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  a(!1), L();
                },
                className: "px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-[#0f1419] transition-colors text-left",
                children: "Login"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  a(!1), I();
                },
                className: "px-4 py-3 rounded-lg bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 hover:opacity-90 transition-opacity text-center font-semibold",
                children: "Register"
              }
            )
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(
      Gn,
      {
        isOpen: d,
        onClose: () => m(!1),
        onSwitchToRegister: I,
        onSwitchToForgotPassword: W,
        onLogin: () => {
          N(!0), m(!1);
        }
      }
    ),
    /* @__PURE__ */ e(
      On,
      {
        isOpen: u,
        onClose: () => h(!1),
        onSwitchToLogin: L,
        onRegister: () => {
          N(!0), h(!1);
        }
      }
    ),
    /* @__PURE__ */ e(
      Hn,
      {
        isOpen: g,
        onClose: () => x(!1),
        onSwitchToLogin: L
      }
    )
  ] });
}
const Fn = [
  { icon: Ht, label: "Account Overview", to: "/account" },
  { icon: Xe, label: "Deposit", to: "/deposit" },
  { icon: Gt, label: "Withdrawal", to: "/withdrawal" },
  { icon: Jr, label: "Betting Record", to: "/betting-record" },
  { icon: K, label: "Deposit Record", to: "/deposit-record" },
  { icon: Ut, label: "Profit And Loss", to: "/profit-loss" },
  { icon: K, label: "Withdrawal Record", to: "/withdrawal-record" },
  { icon: K, label: "Account Record", to: "/account-record" },
  { icon: X, label: "Personal Info", to: "/personal-info" },
  { icon: Wt, label: "Security Center", to: "/security" },
  { icon: Ft, label: "Customer Service", to: "/support" }
];
function Wn() {
  const t = A(), a = t.pathname === "/" ? "home" : t.pathname.substring(1), [r, n] = w(!1), l = (i) => `flex flex-col items-center justify-center gap-1 transition-all ${a === i ? "text-[#98E7D2]" : "text-gray-400"}`;
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e1a] border-t border-gray-800 z-50", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-5 h-16", children: [
      /* @__PURE__ */ o(
        "button",
        {
          onClick: () => n(!0),
          className: "flex flex-col items-center justify-center gap-1 text-gray-400 transition-all",
          children: [
            /* @__PURE__ */ e(jt, { className: "w-6 h-6" }),
            /* @__PURE__ */ e("span", { className: "text-xs", children: "Browse" })
          ]
        }
      ),
      /* @__PURE__ */ o(D, { to: "/", className: l("home"), children: [
        /* @__PURE__ */ e(je, { className: "w-6 h-6" }),
        /* @__PURE__ */ e("span", { className: "text-xs", children: "Home" })
      ] }),
      /* @__PURE__ */ o(D, { to: "/deposit", className: l("deposit"), children: [
        /* @__PURE__ */ e(Xe, { className: "w-6 h-6" }),
        /* @__PURE__ */ e("span", { className: "text-xs", children: "Deposit" })
      ] }),
      /* @__PURE__ */ o(D, { to: "/promotion", className: l("promotion"), children: [
        /* @__PURE__ */ e(Ce, { className: "w-6 h-6" }),
        /* @__PURE__ */ e("span", { className: "text-xs", children: "Promotion" })
      ] }),
      /* @__PURE__ */ o(D, { to: "/account", className: l("account"), children: [
        /* @__PURE__ */ e(X, { className: "w-6 h-6" }),
        /* @__PURE__ */ e("span", { className: "text-xs", children: "Member" })
      ] })
    ] }) }),
    r && /* @__PURE__ */ o("div", { className: "md:hidden fixed inset-0 z-[200]", children: [
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/60", onClick: () => n(!1) }),
      /* @__PURE__ */ o("div", { className: "absolute top-0 left-0 bottom-0 w-72 bg-[#131b21] flex flex-col shadow-2xl", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between px-5 py-4 border-b border-gray-800", children: [
          /* @__PURE__ */ e("span", { className: "text-white text-lg font-semibold", children: "Menu" }),
          /* @__PURE__ */ e("button", { onClick: () => n(!1), className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ e(se, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex-1 flex flex-col justify-around overflow-hidden px-3 py-2", children: Fn.map(({ icon: i, label: s, to: c }) => /* @__PURE__ */ o(
          D,
          {
            to: c,
            onClick: () => n(!1),
            className: `flex items-center gap-4 px-4 py-2 rounded-xl transition-colors ${t.pathname === c ? "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold" : "text-gray-300 hover:bg-[#1a2128]"}`,
            children: [
              /* @__PURE__ */ e(i, { className: "w-5 h-5 flex-shrink-0" }),
              /* @__PURE__ */ e("span", { className: "text-sm", children: s })
            ]
          },
          c + s
        )) })
      ] })
    ] })
  ] });
}
const Ae = [
  {
    id: 1,
    badge: "WEEKLY RELOAD",
    title: "Bonus",
    highlight: "50%",
    sub: "EVERY MONDAY & FRIDAY",
    cta: "Claim Now",
    accent: "#98E7D2",
    bg: "from-[#0a1f18] via-[#0f2a1e] to-[#0f1419]",
    decorColor: "#98E7D2"
  },
  {
    id: 2,
    badge: "FIRST DEPOSIT",
    title: "Fever",
    highlight: "100%",
    sub: "BONUS UP TO RM 500",
    cta: "Deposit Now",
    accent: "#B9DE5A",
    bg: "from-[#0a1f14] via-[#0f2a1a] to-[#0f1419]",
    decorColor: "#B9DE5A"
  }
];
function Un() {
  const [t, a] = w(0);
  le(() => {
    const n = setInterval(() => a((l) => (l + 1) % Ae.length), 5e3);
    return () => clearInterval(n);
  }, []);
  const r = Ae[t];
  return /* @__PURE__ */ e("section", { className: "relative w-full overflow-hidden", style: { minHeight: "280px" }, children: /* @__PURE__ */ o(
    "div",
    {
      className: `bg-gradient-to-r ${r.bg} transition-all duration-700 relative`,
      style: { minHeight: "280px" },
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0 opacity-10",
            style: {
              backgroundImage: "linear-gradient(rgba(155,231,210,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(155,231,210,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute left-0 top-0 w-64 h-full opacity-20",
            style: { background: `radial-gradient(ellipse at left center, ${r.decorColor} 0%, transparent 70%)` }
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative container mx-auto px-4 flex items-center", style: { minHeight: "280px" }, children: /* @__PURE__ */ o("div", { className: "w-full max-w-lg py-8 md:py-10 z-10", children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: "inline-block px-3 py-1 rounded mb-3",
              style: { background: `${r.decorColor}22`, border: `1px solid ${r.decorColor}44` },
              children: /* @__PURE__ */ e("span", { className: "text-xs tracking-widest", style: { color: r.decorColor }, children: r.badge })
            }
          ),
          /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ e("span", { className: "text-white text-3xl md:text-5xl block leading-tight", children: r.title }),
            /* @__PURE__ */ e(
              "span",
              {
                className: "text-5xl md:text-8xl block leading-none",
                style: {
                  color: r.accent,
                  textShadow: `0 0 40px ${r.accent}88`,
                  fontWeight: 900
                },
                children: r.highlight
              }
            )
          ] }),
          /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm md:text-base mb-6 tracking-widest", children: r.sub }),
          /* @__PURE__ */ e(
            "button",
            {
              className: "px-8 py-3 rounded-lg text-gray-900 text-sm md:text-base transition-opacity hover:opacity-90",
              style: { background: `linear-gradient(135deg, ${r.decorColor}, ${r.accent})` },
              children: r.cta
            }
          )
        ] }) }),
        /* @__PURE__ */ e("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20", children: Ae.map((n, l) => /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a(l),
            className: "rounded-full transition-all",
            style: {
              width: l === t ? 20 : 6,
              height: 6,
              background: l === t ? r.decorColor : "rgba(255,255,255,0.3)"
            }
          },
          l
        )) })
      ]
    }
  ) });
}
const ut = [
  { user: "Player***123", amount: "RM 8,888", game: "Gates of Olympus" },
  { user: "Lucky***456", amount: "RM 15,000", game: "Sweet Bonanza" },
  { user: "Win***789", amount: "RM 3,200", game: "Crazy Time" },
  { user: "Pro***321", amount: "RM 22,500", game: "Lightning Roulette" },
  { user: "Star***654", amount: "RM 5,600", game: "Mega Moolah" },
  { user: "Ace***987", amount: "RM 11,100", game: "Book of Dead" },
  { user: "King***147", amount: "RM 7,777", game: "Starburst" },
  { user: "Rich***258", amount: "RM 19,900", game: "Wolf Gold" }
];
function zn() {
  const t = [...ut, ...ut];
  return /* @__PURE__ */ e("div", { className: "bg-[#131b21] border-y border-gray-800 py-2 overflow-hidden", children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "flex gap-0 animate-ticker whitespace-nowrap", children: t.map((a, r) => /* @__PURE__ */ o("span", { className: "text-xs text-gray-400 px-4 flex-shrink-0", children: [
    "Congratulations ",
    /* @__PURE__ */ e("span", { className: "text-[#98E7D2]", children: a.user }),
    " winning ",
    /* @__PURE__ */ e("span", { className: "text-white", children: a.amount }),
    " in ",
    a.game,
    /* @__PURE__ */ e("span", { className: "mx-3 text-gray-700", children: "·" })
  ] }, r)) }) }) });
}
const Vn = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function Pe(t) {
  const [a, r] = w(!1), n = () => {
    r(!0);
  }, { src: l, alt: i, style: s, className: c, ...d } = t;
  return a ? /* @__PURE__ */ e(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${c ?? ""}`,
      style: s,
      children: /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ e("img", { src: Vn, alt: "Error loading image", ...d, "data-original-url": l }) })
    }
  ) : /* @__PURE__ */ e("img", { src: l, alt: i, className: c, style: s, ...d, onError: n });
}
const qn = [
  { title: "Mega Fortune", provider: "Pocket Play", badge: "BONUS 1.2", image: "/cms_v2/_external/images.unsplash.com/photo-1606167668584-78701c57f13d__w-300_h-400_fit-crop" },
  { title: "Starburst", provider: "NetEnt", badge: "BONUS 1.5", image: "/cms_v2/_external/images.unsplash.com/photo-1596838132731-3301c3fd4317__w-300_h-400_fit-crop" },
  { title: "Book of Dead", provider: "Play'n GO", badge: "BONUS 2.0", image: "/cms_v2/_external/images.unsplash.com/photo-1511512578047-dfb367046420__w-300_h-400_fit-crop" },
  { title: "Gonzo Quest", provider: "NetEnt", badge: "BONUS 1.8", image: "/cms_v2/_external/images.unsplash.com/photo-1553481187-be93c21490a9__w-300_h-400_fit-crop" },
  { title: "Gates of Olympus", provider: "Pragmatic", badge: "BONUS 1.3", image: "/cms_v2/_external/images.unsplash.com/photo-1478720568477-152d9b164e26__w-300_h-400_fit-crop" },
  { title: "Dead or Alive", provider: "NetEnt", badge: "BONUS 1.6", image: "/cms_v2/_external/images.unsplash.com/photo-1518895312237-a9e23508077d__w-300_h-400_fit-crop" },
  { title: "Limbo", provider: "Pocket Play", badge: "BONUS 1.4", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-300_h-400_fit-crop" },
  { title: "Aladdin", provider: "Pocket Play", badge: "BONUS 1.9", image: "/cms_v2/_external/images.unsplash.com/photo-1524985069026-dd778a71c7b4__w-300_h-400_fit-crop" },
  { title: "Wolf Gold", provider: "Pragmatic", badge: "BONUS 1.5", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-300_h-400_fit-crop" },
  { title: "Crazy Time", provider: "Evolution", badge: "BONUS 1.7", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-300_h-400_fit-crop" }
];
function Yn() {
  const t = Z(null), a = (r) => {
    t.current?.scrollBy({ left: r === "left" ? -300 : 300, behavior: "smooth" });
  };
  return /* @__PURE__ */ e("section", { className: "py-6 bg-[#0f1419]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ o("h2", { className: "text-white flex items-center gap-2", children: [
        /* @__PURE__ */ e(Oe, { className: "w-5 h-5 text-orange-400" }),
        /* @__PURE__ */ e("span", { className: "text-base md:text-lg", children: "Hot Games" })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("button", { className: "text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors", children: "Show all" }),
        /* @__PURE__ */ e("button", { onClick: () => a("left"), className: "text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors", children: /* @__PURE__ */ e(pe, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ e("button", { onClick: () => a("right"), className: "text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors", children: /* @__PURE__ */ e(ge, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { ref: t, className: "flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2", children: qn.map((r, n) => /* @__PURE__ */ o("div", { className: "flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group", children: [
      /* @__PURE__ */ o("div", { className: "relative rounded-xl overflow-hidden bg-[#1a2128]", style: { height: "170px" }, children: [
        /* @__PURE__ */ e(
          Pe,
          {
            src: r.image,
            alt: r.title,
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ),
        /* @__PURE__ */ e("div", { className: "absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded", children: r.badge }),
        /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ e("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg", children: "Play Now" }) })
      ] }),
      /* @__PURE__ */ o("div", { className: "mt-1.5", children: [
        /* @__PURE__ */ e("p", { className: "text-white text-xs truncate", children: r.title }),
        /* @__PURE__ */ e("p", { className: "text-gray-500 text-[10px] truncate", children: r.provider })
      ] })
    ] }, n)) })
  ] }) });
}
const Zn = [
  { title: "Mega Fortune", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "mini" },
  { title: "Starburst", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "mini" },
  { title: "Limbo", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "mini" },
  { title: "Mines", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "mini" },
  { title: "Plinko", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200", category: "mini" },
  { title: "Dice", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200", category: "mini" },
  { title: "Tower", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "mini" },
  { title: "Keno", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "mini" },
  { title: "Hilo", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "mini" },
  { title: "Wheel", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "mini" },
  { title: "Crash", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200", category: "mini" },
  { title: "Coin Flip", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200", category: "mini" },
  { title: "Rocket", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "mini" },
  { title: "Caves", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "mini" },
  { title: "Video Poker", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "mini" },
  { title: "Scratch Card", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "mini" },
  { title: "Book of Dead", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "slot" },
  { title: "Gonzo Quest", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "slot" },
  { title: "Wolf Gold", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200", category: "slot" },
  { title: "Sweet Bonanza", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200", category: "slot" },
  { title: "Gates of Olympus", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "slot" },
  { title: "Big Bass Bonanza", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "slot" },
  { title: "Fruit Party", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "slot" },
  { title: "Wild West Gold", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "slot" },
  { title: "Sugar Rush", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200", category: "slot" },
  { title: "Buffalo King", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200", category: "slot" },
  { title: "Reactoonz", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "slot" },
  { title: "Money Train", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "slot" },
  { title: "Live Roulette", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "live" },
  { title: "Live Blackjack", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "live" },
  { title: "Live Baccarat", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "live" },
  { title: "Lightning Roulette", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "live" },
  { title: "Mega Ball", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200", category: "live" },
  { title: "Dream Catcher", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200", category: "live" },
  { title: "Crazy Time", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200", category: "live" },
  { title: "Dragon Tiger Live", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200", category: "live" },
  { title: "Andar Bahar", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200", category: "live" },
  { title: "Teen Patti", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200", category: "live" },
  { title: "Fan Tan", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200", category: "live" },
  { title: "Casino Holdem", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200", category: "live" }
], Ie = ["mini", "slot", "live"];
function Kn() {
  const [t, a] = w("mini"), [r, n] = w(0), l = Z(null), i = (c) => {
    l.current && l.current.scrollBy({
      left: c === "left" ? -400 : 400,
      behavior: "smooth"
    });
  };
  le(() => {
    n(0);
    const c = setInterval(() => {
      n((m) => m >= 100 ? 100 : m + 1);
    }, 100), d = setInterval(() => {
      a((m) => {
        const h = (Ie.indexOf(m) + 1) % Ie.length;
        return Ie[h];
      });
    }, 1e4);
    return () => {
      clearInterval(c), clearInterval(d);
    };
  }, [t]);
  const s = Zn.filter((c) => c.category === t);
  return /* @__PURE__ */ e("section", { className: "py-12 bg-[#1a2128]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ e("div", { className: "mb-8", children: /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 md:flex md:items-center md:gap-8", children: [
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => a("mini"),
            className: `pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 ${t === "mini" ? "text-white" : "text-gray-500 hover:text-gray-300"}`,
            children: [
              /* @__PURE__ */ e(He, { className: "w-5 h-5 md:w-4 md:h-4" }),
              /* @__PURE__ */ e("span", { className: "text-xs md:text-base", children: "Mini Game" }),
              t === "mini" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700", children: /* @__PURE__ */ e(
                "div",
                {
                  className: "h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] transition-all duration-100",
                  style: { width: `${r}%` }
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => a("slot"),
            className: `pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 ${t === "slot" ? "text-white" : "text-gray-500 hover:text-gray-300"}`,
            children: [
              /* @__PURE__ */ e(Ge, { className: "w-5 h-5 md:w-4 md:h-4" }),
              /* @__PURE__ */ e("span", { className: "text-xs md:text-base", children: "Slot Game" }),
              t === "slot" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700", children: /* @__PURE__ */ e(
                "div",
                {
                  className: "h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] transition-all duration-100",
                  style: { width: `${r}%` }
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => a("live"),
            className: `pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 ${t === "live" ? "text-white" : "text-gray-500 hover:text-gray-300"}`,
            children: [
              /* @__PURE__ */ e(Fe, { className: "w-5 h-5 md:w-4 md:h-4" }),
              /* @__PURE__ */ e("span", { className: "text-xs md:text-base", children: "Live Game" }),
              t === "live" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700", children: /* @__PURE__ */ e(
                "div",
                {
                  className: "h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] transition-all duration-100",
                  style: { width: `${r}%` }
                }
              ) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ e("button", { className: "text-gray-400 hover:text-white text-sm px-4 py-2 border border-gray-700 rounded-lg transition-colors", children: "Show all" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => i("left"),
            className: "text-gray-400 hover:text-white p-2 border border-gray-700 rounded-lg transition-colors",
            children: /* @__PURE__ */ e(pe, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => i("right"),
            className: "text-gray-400 hover:text-white p-2 border border-gray-700 rounded-lg transition-colors",
            children: /* @__PURE__ */ e(ge, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e(
      "div",
      {
        ref: l,
        className: "flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-4 animate-slideIn",
        children: s.map((c, d) => /* @__PURE__ */ o(
          "div",
          {
            className: "flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group",
            children: [
              /* @__PURE__ */ e("div", { className: "w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors", children: /* @__PURE__ */ e(
                Pe,
                {
                  src: c.image,
                  alt: c.title,
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                }
              ) }),
              /* @__PURE__ */ e("h3", { className: "text-white text-xs md:text-sm text-center mt-2 truncate", children: c.title })
            ]
          },
          d
        ))
      },
      t
    ) })
  ] }) });
}
const Jn = [
  { team1: "Manchester United", team2: "Liverpool", score1: "2", score2: "1", time: "Live 67'", league: "Premier League", icon1: "MU", icon2: "LIV" },
  { team1: "Lakers", team2: "Warriors", score1: "98", score2: "105", time: "Live Q3", league: "NBA", icon1: "LAL", icon2: "GSW" },
  { team1: "Real Madrid", team2: "Barcelona", score1: "1", score2: "1", time: "Live 82'", league: "La Liga", icon1: "RMA", icon2: "FCB" },
  { team1: "Yankees", team2: "Red Sox", score1: "4", score2: "3", time: "Live 7th", league: "MLB", icon1: "NYY", icon2: "BOS" },
  { team1: "PSG", team2: "Bayern Munich", score1: "3", score2: "2", time: "Live 55'", league: "Champions League", icon1: "PSG", icon2: "FCB" },
  { team1: "Celtics", team2: "Heat", score1: "102", score2: "99", time: "Live Q4", league: "NBA", icon1: "BOS", icon2: "MIA" },
  { team1: "Arsenal", team2: "Chelsea", score1: "1", score2: "0", time: "Live 78'", league: "Premier League", icon1: "ARS", icon2: "CHE" },
  { team1: "Juventus", team2: "Inter Milan", score1: "0", score2: "0", time: "Live 23'", league: "Serie A", icon1: "JUV", icon2: "INT" }
];
function Xn() {
  const t = Z(null), a = (r) => {
    t.current?.scrollBy({ left: r === "left" ? -280 : 280, behavior: "smooth" });
  };
  return /* @__PURE__ */ e("section", { className: "py-6 bg-[#0f1419]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ o("h2", { className: "text-white flex items-center gap-2", children: [
        /* @__PURE__ */ e(Re, { className: "w-5 h-5 text-[#98E7D2]" }),
        /* @__PURE__ */ e("span", { className: "text-base md:text-lg", children: "Live Sport" })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ o("button", { className: "text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors flex items-center gap-1.5", children: [
          /* @__PURE__ */ e(ht, { className: "w-3 h-3 text-[#98E7D2]" }),
          "View All Live"
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => a("left"), className: "text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors", children: /* @__PURE__ */ e(pe, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ e("button", { onClick: () => a("right"), className: "text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors", children: /* @__PURE__ */ e(ge, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "relative rounded-xl overflow-hidden mb-4",
        style: {
          background: "linear-gradient(135deg, #0a2010 0%, #143520 30%, #1a4a28 60%, #0f2a18 100%)",
          minHeight: "160px"
        },
        children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: "absolute inset-0 opacity-10",
              style: {
                backgroundImage: "radial-gradient(circle, rgba(185,222,90,0.4) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }
            }
          ),
          /* @__PURE__ */ o("div", { className: "absolute top-4 left-4 flex items-center gap-2", children: [
            /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] flex items-center justify-center", children: /* @__PURE__ */ e(Re, { className: "w-4 h-4 text-gray-900" }) }),
            /* @__PURE__ */ o("div", { children: [
              /* @__PURE__ */ e("p", { className: "text-[#98E7D2] text-xs font-semibold", children: "UEFA" }),
              /* @__PURE__ */ e("p", { className: "text-gray-400 text-[10px]", children: "World Cup" })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "relative flex flex-col md:flex-row items-center justify-center md:justify-between px-6 py-10 gap-4", children: [
            /* @__PURE__ */ o("div", { className: "text-center md:text-left", children: [
              /* @__PURE__ */ e("p", { className: "text-gray-400 text-xs tracking-widest uppercase mb-1", children: "The World's Biggest Event" }),
              /* @__PURE__ */ e("h3", { className: "text-white text-2xl md:text-4xl mb-1", style: { fontWeight: 900 }, children: "FIFA WORLD CUP" }),
              /* @__PURE__ */ e("p", { className: "text-[#98E7D2] text-xl md:text-2xl mb-3", style: { fontWeight: 700 }, children: "2026" }),
              /* @__PURE__ */ o("div", { className: "inline-block bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-1.5 rounded", children: [
                /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: "Prize Pool: " }),
                /* @__PURE__ */ e("span", { className: "text-sm font-bold", children: "RM 4,700,000" })
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "hidden md:block opacity-40", children: /* @__PURE__ */ o("svg", { width: "100", height: "120", viewBox: "0 0 120 140", fill: "none", children: [
              /* @__PURE__ */ e("path", { d: "M30 10 h60 v50 a30 30 0 0 1 -60 0 Z", fill: "none", stroke: "#B9DE5A", strokeWidth: "3" }),
              /* @__PURE__ */ e("rect", { x: "45", y: "90", width: "30", height: "25", fill: "#B9DE5A", opacity: "0.6" }),
              /* @__PURE__ */ e("rect", { x: "30", y: "115", width: "60", height: "8", rx: "4", fill: "#B9DE5A", opacity: "0.8" }),
              /* @__PURE__ */ e("path", { d: "M10 10 h20 v30 a20 20 0 0 1 -20 0 Z", fill: "none", stroke: "#B9DE5A", strokeWidth: "2" }),
              /* @__PURE__ */ e("path", { d: "M90 10 h20 v30 a20 20 0 0 1 -20 0 Z", fill: "none", stroke: "#B9DE5A", strokeWidth: "2" })
            ] }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { ref: t, className: "flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2", children: Jn.map((r, n) => /* @__PURE__ */ e(
      "div",
      {
        className: "flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors",
        style: { minWidth: "220px" },
        children: /* @__PURE__ */ o("div", { className: "p-4", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500 text-[10px] truncate max-w-[120px]", children: r.league }),
            /* @__PURE__ */ o("span", { className: "flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded", children: [
              /* @__PURE__ */ e(ht, { className: "w-2.5 h-2.5 animate-pulse" }),
              "LIVE"
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex items-center justify-between gap-2 mb-4", children: [
            /* @__PURE__ */ o("div", { className: "flex flex-col items-center gap-1.5 flex-1", children: [
              /* @__PURE__ */ e("div", { className: "w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "text-[9px] text-gray-300 font-semibold", children: r.icon1 }) }),
              /* @__PURE__ */ e("span", { className: "text-white text-[10px] text-center leading-tight", children: r.team1 })
            ] }),
            /* @__PURE__ */ o("div", { className: "text-center flex-shrink-0", children: [
              /* @__PURE__ */ o("div", { className: "text-[#98E7D2] text-xl font-bold leading-none", children: [
                r.score1,
                " - ",
                r.score2
              ] }),
              /* @__PURE__ */ e("div", { className: "text-gray-500 text-[10px] mt-0.5", children: r.time })
            ] }),
            /* @__PURE__ */ o("div", { className: "flex flex-col items-center gap-1.5 flex-1", children: [
              /* @__PURE__ */ e("div", { className: "w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "text-[9px] text-gray-300 font-semibold", children: r.icon2 }) }),
              /* @__PURE__ */ e("span", { className: "text-white text-[10px] text-center leading-tight", children: r.team2 })
            ] })
          ] }),
          /* @__PURE__ */ e("button", { className: "w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]", children: "Place Bet" })
        ] })
      },
      n
    )) })
  ] }) });
}
const Qn = [
  {
    id: 1,
    name: "RioBet Casino",
    icon: "🎰",
    safetyIndex: "VERY HIGH",
    safetyStars: 5,
    tab: "event",
    accent: "#98E7D2"
  },
  {
    id: 2,
    name: "BitStarz Casino",
    icon: "⭐",
    safetyIndex: "VERY HIGH",
    safetyStars: 5,
    tab: "event",
    accent: "#98E7D2"
  },
  {
    id: 3,
    name: "IceCasino",
    icon: "❄️",
    safetyIndex: "VERY HIGH",
    safetyStars: 5,
    tab: "event",
    accent: "#98E7D2"
  },
  {
    id: 4,
    name: "Gamdom Casino",
    icon: "🎯",
    safetyIndex: "HIGH",
    safetyStars: 4,
    tab: "event",
    accent: "#98E7D2"
  },
  {
    id: 5,
    name: "Lucky Casino",
    icon: "🍀",
    safetyIndex: "HIGH",
    safetyStars: 4,
    tab: "cash",
    accent: "#98E7D2"
  },
  {
    id: 6,
    name: "Mega Casino",
    icon: "💎",
    safetyIndex: "VERY HIGH",
    safetyStars: 5,
    tab: "cash",
    accent: "#98E7D2"
  },
  {
    id: 7,
    name: "Star Casino",
    icon: "🌟",
    safetyIndex: "HIGH",
    safetyStars: 4,
    tab: "cash",
    accent: "#98E7D2"
  },
  {
    id: 8,
    name: "Royal Casino",
    icon: "👑",
    safetyIndex: "VERY HIGH",
    safetyStars: 5,
    tab: "cash",
    accent: "#98E7D2"
  }
];
function eo() {
  const [t, a] = w("event"), r = Z(null), n = (i) => {
    r.current?.scrollBy({ left: i === "left" ? -300 : 300, behavior: "smooth" });
  }, l = Qn.filter((i) => i.tab === t);
  return /* @__PURE__ */ e("section", { className: "py-6 bg-[#1a2128]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 md:gap-4", children: [
        /* @__PURE__ */ o("h2", { className: "text-white flex items-center gap-1.5", children: [
          /* @__PURE__ */ e(Ce, { className: "w-4 h-4 md:w-5 md:h-5 text-[#98E7D2]" }),
          /* @__PURE__ */ e("span", { className: "text-sm md:text-lg", children: "Promotion" })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-0.5 border border-gray-700 rounded overflow-hidden", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => a("event"),
              className: `px-2 py-0.5 md:px-3 md:py-1 text-xs transition-colors ${t === "event" ? "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900" : "text-gray-400 hover:text-white"}`,
              children: "Event"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => a("cash"),
              className: `px-2 py-0.5 md:px-3 md:py-1 text-xs transition-colors ${t === "cash" ? "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900" : "text-gray-400 hover:text-white"}`,
              children: "Cash"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-1 md:gap-2", children: [
        /* @__PURE__ */ e("button", { className: "text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors hidden md:block", children: "Show all" }),
        /* @__PURE__ */ e("button", { onClick: () => n("left"), className: "text-gray-400 hover:text-white p-1 md:p-1.5 border border-gray-700 rounded transition-colors", children: /* @__PURE__ */ e(pe, { className: "w-3 h-3 md:w-4 md:h-4" }) }),
        /* @__PURE__ */ e("button", { onClick: () => n("right"), className: "text-gray-400 hover:text-white p-1 md:p-1.5 border border-gray-700 rounded transition-colors", children: /* @__PURE__ */ e(ge, { className: "w-3 h-3 md:w-4 md:h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "hidden md:grid md:grid-cols-4 gap-3", children: l.map((i) => /* @__PURE__ */ e(pt, { promo: i }, i.id)) }),
    /* @__PURE__ */ e("div", { ref: r, className: "flex md:hidden overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2", children: l.map((i) => /* @__PURE__ */ e("div", { className: "flex-shrink-0 snap-start", style: { width: "220px" }, children: /* @__PURE__ */ e(pt, { promo: i }) }, i.id)) })
  ] }) });
}
function pt({ promo: t }) {
  return /* @__PURE__ */ o("div", { className: "bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group", children: [
    /* @__PURE__ */ e("div", { className: "bg-[#131b21] h-28 flex items-center justify-center text-5xl border-b border-gray-800", children: t.icon }),
    /* @__PURE__ */ o("div", { className: "p-4", children: [
      /* @__PURE__ */ e("h3", { className: "text-white text-sm mb-3 text-center", children: t.name }),
      /* @__PURE__ */ o("div", { className: "mb-4", children: [
        /* @__PURE__ */ e("p", { className: "text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider", children: "Safety Index:" }),
        /* @__PURE__ */ e("div", { className: "flex items-center justify-center gap-1 mb-1", children: Array.from({ length: 5 }).map((a, r) => /* @__PURE__ */ e(
          Dn,
          {
            className: "w-3 h-3",
            style: { color: r < t.safetyStars ? t.accent : "#374151" },
            fill: r < t.safetyStars ? t.accent : "transparent"
          },
          r
        )) }),
        /* @__PURE__ */ e("p", { className: "text-center text-xs", style: { color: t.accent }, children: t.safetyIndex })
      ] }),
      /* @__PURE__ */ o("div", { className: "space-y-2", children: [
        /* @__PURE__ */ o("button", { className: "w-full border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "🎓" }),
          "Expert review"
        ] }),
        /* @__PURE__ */ o("button", { className: "w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]", children: [
          /* @__PURE__ */ e(Tt, { className: "w-3 h-3" }),
          "Visit Casino"
        ] })
      ] })
    ] })
  ] });
}
function M() {
  return /* @__PURE__ */ e("footer", { className: "bg-[#1a2128] py-16 pb-24 md:pb-16", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ o("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ e("div", { className: "mb-8", children: /* @__PURE__ */ e("div", { className: "text-center", children: /* @__PURE__ */ e("img", { src: oe, alt: "WIN100% Logo", className: "h-16 md:h-20 mix-blend-lighten" }) }) }),
    /* @__PURE__ */ o("div", { className: "max-w-4xl mx-auto text-center mb-8", children: [
      /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm leading-relaxed mb-2", children: "Gambling can be addictive, please play responsibly. For information on support measures, please visit our Responsible Gambling Help page." }),
      /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm leading-relaxed", children: "By accessing, continuing to use or navigating throughout this site you accept that we will use certain browser cookies to improve your customer experience with us." })
    ] }),
    /* @__PURE__ */ e("div", { className: "text-gray-500 text-sm", children: "win10069 © All rights reserved and protected by law" })
  ] }) }) });
}
function to() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(Un, {}),
    /* @__PURE__ */ e(zn, {}),
    /* @__PURE__ */ e(Yn, {}),
    /* @__PURE__ */ e(Kn, {}),
    /* @__PURE__ */ e(Xn, {}),
    /* @__PURE__ */ e(eo, {}),
    /* @__PURE__ */ e(M, {})
  ] });
}
const ao = [
  { id: 1, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-300" },
  { id: 2, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-300" },
  { id: 3, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-300" },
  { id: 4, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-300" },
  { id: 5, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-300" },
  { id: 6, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-300" },
  { id: 7, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-300" },
  { id: 8, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-300" },
  { id: 9, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-300" },
  { id: 10, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-300" },
  { id: 11, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-300" },
  { id: 12, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-300" }
];
function ro() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-orange-600 via-pink-500 to-purple-600 py-16 md:py-20", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ e("h1", { className: "text-4xl md:text-7xl text-white mb-4", children: "HOT GAMES" }) }) }),
    /* @__PURE__ */ e("section", { className: "py-8 bg-[#0f1419] min-h-screen", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ e("h2", { className: "text-white text-2xl", children: "HOT GAMES" }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "relative flex-1 md:w-64", children: [
            /* @__PURE__ */ e(te, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search Game",
                className: "w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]"
              }
            )
          ] }),
          /* @__PURE__ */ o("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2", children: [
            /* @__PURE__ */ e(fe, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Filter" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: ao.map((t) => /* @__PURE__ */ o(
        "div",
        {
          className: "bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group",
          children: [
            /* @__PURE__ */ e("div", { className: "aspect-[4/3] relative overflow-hidden", children: /* @__PURE__ */ e(
              Pe,
              {
                src: t.image,
                alt: t.name,
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              }
            ) }),
            /* @__PURE__ */ o("div", { className: "p-4", children: [
              /* @__PURE__ */ e("h3", { className: "text-white mb-1 truncate", children: t.name }),
              /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm mb-3 truncate", children: t.provider }),
              /* @__PURE__ */ e("button", { className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm", children: "Play Now" })
            ] })
          ]
        },
        t.id
      )) }),
      /* @__PURE__ */ e("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ e("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity", children: "Load more" }) })
    ] }) }),
    /* @__PURE__ */ e(M, {})
  ] });
}
const gt = [
  { id: 1, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-400", category: "all" },
  { id: 2, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-400", category: "favorites" },
  { id: 3, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-400", category: "all" },
  { id: 4, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-400", category: "favorites" },
  { id: 5, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-400", category: "all" },
  { id: 6, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-400", category: "all" },
  { id: 7, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-400", category: "favorites" },
  { id: 8, name: "Game Name", provider: "Game Provider", image: "/cms_v2/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-400", category: "all" }
];
function no() {
  const [t, a] = w("all"), r = t === "all" ? gt : gt.filter((n) => n.category === "favorites");
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 py-16 md:py-20", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ o("h1", { className: "text-4xl md:text-7xl text-white mb-4", children: [
      "100% ",
      /* @__PURE__ */ e("span", { className: "block md:inline", children: "MINI GAMES" })
    ] }) }) }),
    /* @__PURE__ */ e("section", { className: "py-8 bg-[#0f1419] min-h-screen", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-6 border-b border-gray-800", children: [
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => a("all"),
            className: `pb-4 px-2 transition-colors relative ${t === "all" ? "text-[#98E7D2]" : "text-gray-400 hover:text-gray-300"}`,
            children: [
              "All Games",
              t === "all" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]" })
            ]
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => a("favorites"),
            className: `pb-4 px-2 transition-colors relative ${t === "favorites" ? "text-[#98E7D2]" : "text-gray-400 hover:text-gray-300"}`,
            children: [
              "Favorites",
              t === "favorites" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ e("h2", { className: "text-white text-xl", children: "Search Result" }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "relative flex-1 md:w-64", children: [
            /* @__PURE__ */ e(te, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search Game",
                className: "w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]"
              }
            )
          ] }),
          /* @__PURE__ */ o("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2", children: [
            /* @__PURE__ */ e(fe, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Filter" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: r.map((n) => /* @__PURE__ */ o(
        "div",
        {
          className: "bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group",
          children: [
            /* @__PURE__ */ e("div", { className: "aspect-[4/3] relative overflow-hidden", children: /* @__PURE__ */ e(
              Pe,
              {
                src: n.image,
                alt: n.name,
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              }
            ) }),
            /* @__PURE__ */ o("div", { className: "p-4", children: [
              /* @__PURE__ */ e("h3", { className: "text-white mb-1 truncate", children: n.name }),
              /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm mb-3 truncate", children: n.provider }),
              /* @__PURE__ */ e("button", { className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm", children: "Play Now" })
            ] })
          ]
        },
        n.id
      )) }),
      /* @__PURE__ */ e("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ e("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity", children: "Load more" }) })
    ] }) }) }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function oo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 py-20", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ e("h1", { className: "text-5xl md:text-7xl text-white mb-4", children: "SPORTS BETTING" }) }) }),
    /* @__PURE__ */ e("section", { className: "py-8 bg-[#0f1419] min-h-[400px]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ e("h2", { className: "text-white text-2xl md:text-3xl", children: "Live Matches" }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "relative flex-1 md:w-64", children: [
            /* @__PURE__ */ e(te, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search",
                className: "w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]"
              }
            )
          ] }),
          /* @__PURE__ */ o("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2", children: [
            /* @__PURE__ */ e(fe, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Filter" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-center py-20", children: /* @__PURE__ */ e("p", { className: "text-gray-400 text-lg", children: "Coming Soon" }) })
    ] }) }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function lo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 py-20", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ e("h1", { className: "text-5xl md:text-7xl text-white mb-4", children: "FISHING GAMES" }) }) }),
    /* @__PURE__ */ e("section", { className: "py-8 bg-[#0f1419] min-h-[400px]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ e("h2", { className: "text-white text-2xl md:text-3xl", children: "Fish Games" }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "relative flex-1 md:w-64", children: [
            /* @__PURE__ */ e(te, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search Game",
                className: "w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]"
              }
            )
          ] }),
          /* @__PURE__ */ o("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2", children: [
            /* @__PURE__ */ e(fe, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Filter" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-center py-20", children: /* @__PURE__ */ e("p", { className: "text-gray-400 text-lg", children: "Coming Soon" }) })
    ] }) }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function io() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-red-600 via-pink-500 to-purple-500 py-20", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ e("h1", { className: "text-5xl md:text-7xl text-white mb-4", children: "SLOT MACHINES" }) }) }),
    /* @__PURE__ */ e("section", { className: "py-8 bg-[#0f1419] min-h-[400px]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ e("h2", { className: "text-white text-2xl md:text-3xl", children: "Slot Games" }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "relative flex-1 md:w-64", children: [
            /* @__PURE__ */ e(te, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search Game",
                className: "w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]"
              }
            )
          ] }),
          /* @__PURE__ */ o("button", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2", children: [
            /* @__PURE__ */ e(fe, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Filter" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-center py-20", children: /* @__PURE__ */ e("p", { className: "text-gray-400 text-lg", children: "Coming Soon" }) })
    ] }) }),
    /* @__PURE__ */ e(M, {})
  ] });
}
const so = [
  {
    name: "RioBet Casino",
    logo: "🎰",
    safetyIndex: "VERY HIGH"
  },
  {
    name: "BitStarz Casino",
    logo: "⭐",
    safetyIndex: "VERY HIGH"
  },
  {
    name: "IceCasino",
    logo: "❄️",
    safetyIndex: "VERY HIGH"
  },
  {
    name: "Gamdom Casino",
    logo: "🎯",
    safetyIndex: "VERY HIGH"
  }
], co = [
  {
    name: "22bet Casino",
    logo: "🎲",
    safetyIndex: "VERY HIGH"
  },
  {
    name: "BetFury Casino",
    logo: "🔥",
    safetyIndex: "VERY HIGH"
  },
  {
    name: "Lucky Casino",
    logo: "🍀",
    safetyIndex: "HIGH"
  },
  {
    name: "Mega Casino",
    logo: "💎",
    safetyIndex: "VERY HIGH"
  }
];
function mo() {
  const [t, a] = w("event");
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 py-16 md:py-20", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ e("h1", { className: "text-4xl md:text-7xl text-white mb-4", children: "PROMOTIONS" }) }) }),
    /* @__PURE__ */ e("section", { className: "py-8 bg-[#0f1419] min-h-[600px]", children: /* @__PURE__ */ o("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => a("event"),
              className: `pb-4 px-2 transition-colors relative ${t === "event" ? "text-[#98E7D2]" : "text-gray-400 hover:text-gray-300"}`,
              children: [
                "Event",
                t === "event" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]" })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => a("news"),
              className: `pb-4 px-2 transition-colors relative ${t === "news" ? "text-[#98E7D2]" : "text-gray-400 hover:text-gray-300"}`,
              children: [
                "News",
                t === "news" && /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("button", { className: "text-gray-400 hover:text-white px-4 py-2 border border-gray-700 rounded-lg transition-colors text-sm", children: "Show all" }),
          /* @__PURE__ */ e("button", { className: "text-gray-400 hover:text-white p-2 border border-gray-700 rounded-lg transition-colors", children: /* @__PURE__ */ e(pe, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ e("button", { className: "text-gray-400 hover:text-white p-2 border border-gray-700 rounded-lg transition-colors", children: /* @__PURE__ */ e(ge, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: (t === "event" ? so : co).map((n, l) => /* @__PURE__ */ o(
        "div",
        {
          className: "bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors",
          children: [
            /* @__PURE__ */ e("div", { className: "bg-black h-32 flex items-center justify-center text-5xl", children: n.logo }),
            /* @__PURE__ */ o("div", { className: "p-6", children: [
              /* @__PURE__ */ e("h3", { className: "text-white text-xl mb-4 text-center", children: n.name }),
              /* @__PURE__ */ o("div", { className: "mb-6", children: [
                /* @__PURE__ */ e("div", { className: "text-gray-400 text-sm text-center mb-1", children: "SAFETY INDEX:" }),
                /* @__PURE__ */ e("div", { className: "text-[#A0E187] text-center font-semibold", children: n.safetyIndex })
              ] }),
              /* @__PURE__ */ o("div", { className: "space-y-3", children: [
                /* @__PURE__ */ o("button", { className: "w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ e("span", { className: "text-lg", children: "🎓" }),
                  "Expert review"
                ] }),
                /* @__PURE__ */ o("button", { className: "w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold", children: [
                  /* @__PURE__ */ e(Tt, { className: "w-4 h-4" }),
                  "Visit Casino"
                ] })
              ] })
            ] })
          ]
        },
        l
      )) })
    ] }) }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function j() {
  const t = A(), [a, r] = w(!1), n = [
    { path: "/account", icon: Ht, label: "Account Overview" },
    { path: "/deposit", icon: Xe, label: "Deposit" },
    { path: "/withdrawal", icon: Gt, label: "Withdrawal" },
    { path: "/betting-record", icon: mn, label: "Betting Record" },
    { path: "/deposit-record", icon: K, label: "Deposit Record" },
    { path: "/profit-loss", icon: Ut, label: "Profit And Loss" },
    { path: "/withdrawal-record", icon: K, label: "Withdrawal Record" },
    { path: "/account-record", icon: K, label: "Account Record" },
    { path: "/personal-info", icon: X, label: "Personal Info" },
    { path: "/security", icon: Wt, label: "Security Center" },
    { path: "/support", icon: Ft, label: "Customer Service" }
  ];
  return /* @__PURE__ */ o(P, { children: [
    a && /* @__PURE__ */ o("div", { className: "md:hidden fixed inset-0 z-50", children: [
      /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm", onClick: () => r(!1) }),
      /* @__PURE__ */ o("aside", { className: "absolute left-0 top-0 bottom-0 w-64 bg-[#1a2128] shadow-xl", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between p-4 border-b border-gray-800", children: [
          /* @__PURE__ */ e("h2", { className: "text-white font-semibold", children: "Menu" }),
          /* @__PURE__ */ e("button", { onClick: () => r(!1), className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ e(se, { className: "w-6 h-6" }) })
        ] }),
        /* @__PURE__ */ e("nav", { className: "p-4 space-y-2 overflow-y-auto", style: { maxHeight: "calc(100vh - 64px)" }, children: n.map((l) => {
          const i = l.icon, s = t.pathname === l.path;
          return /* @__PURE__ */ o(
            D,
            {
              to: l.path,
              onClick: () => r(!1),
              className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${s ? "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold" : "text-gray-300 hover:bg-[#0f1419] hover:text-white"}`,
              children: [
                /* @__PURE__ */ e(i, { className: "w-5 h-5" }),
                /* @__PURE__ */ e("span", { className: "text-sm", children: l.label })
              ]
            },
            l.path
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ e("aside", { className: "hidden md:block w-64 bg-[#1a2128] border-r border-gray-800 min-h-screen", children: /* @__PURE__ */ e("nav", { className: "p-4 space-y-2", children: n.map((l) => {
      const i = l.icon, s = t.pathname === l.path;
      return /* @__PURE__ */ o(
        D,
        {
          to: l.path,
          className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${s ? "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold" : "text-gray-300 hover:bg-[#0f1419] hover:text-white"}`,
          children: [
            /* @__PURE__ */ e(i, { className: "w-5 h-5" }),
            /* @__PURE__ */ e("span", { className: "text-sm", children: l.label })
          ]
        },
        l.path
      );
    }) }) })
  ] });
}
function F() {
  return /* @__PURE__ */ e("header", { className: "bg-[#1a2128] border-b border-gray-800 sticky top-0 z-50", children: /* @__PURE__ */ e("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ o("div", { className: "flex items-center justify-between h-16", children: [
    /* @__PURE__ */ o(D, { to: "/", className: "flex items-center gap-3 text-gray-300 hover:text-white transition-colors", children: [
      /* @__PURE__ */ e(Tr, { className: "w-5 h-5" }),
      /* @__PURE__ */ e("img", { src: oe, alt: "Casino Logo", className: "h-10 mix-blend-lighten" })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex items-center gap-4 text-sm", children: /* @__PURE__ */ e(D, { to: "/", className: "text-gray-300 hover:text-white transition-colors", children: "Back to Home" }) })
  ] }) }) });
}
function ho() {
  const t = {
    id: "meqomcao",
    vipLevel: 1,
    balance: 1e9,
    email: "user@example.com",
    phone: "+1 234 567 8900",
    birthday: "1990-01-01",
    address: "Seoul, South Korea"
  }, a = [
    { id: 1, type: "SABA Bet Started", amount: "+₩ 1,000", date: "2025-08-12", time: "15:48", status: "Completed" },
    { id: 2, type: "SABA Bet Started", amount: "-₩ 500", date: "2025-08-12", time: "14:30", status: "Completed" },
    { id: 3, type: "SABA Bet Started", amount: "+₩ 2,500", date: "2025-08-11", time: "18:20", status: "Completed" },
    { id: 4, type: "SABA Bet Started", amount: "-₩ 1,000", date: "2025-08-11", time: "12:15", status: "Completed" },
    { id: 5, type: "SABA Bet Started", amount: "+₩ 750", date: "2025-08-10", time: "16:45", status: "Completed" }
  ];
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-2xl md:text-3xl mb-6 md:mb-8", children: "Account Overview" }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8", children: [
          /* @__PURE__ */ e("div", { className: "lg:col-span-2 bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6", children: /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6", children: [
            /* @__PURE__ */ e("div", { className: "w-20 h-20 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ e(X, { className: "w-10 h-10 text-gray-900" }) }),
            /* @__PURE__ */ o("div", { className: "flex-1 text-center md:text-left w-full", children: [
              /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mb-2", children: [
                /* @__PURE__ */ e("h2", { className: "text-white text-xl md:text-2xl font-semibold", children: t.id }),
                /* @__PURE__ */ o("span", { className: "bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-3 py-1 rounded-full text-xs font-semibold", children: [
                  "VIP",
                  t.vipLevel
                ] })
              ] }),
              /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 mt-4", children: [
                /* @__PURE__ */ o("div", { children: [
                  /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm mb-1", children: "Current Balance" }),
                  /* @__PURE__ */ o("p", { className: "text-[#98E7D2] text-xl md:text-2xl font-bold", children: [
                    "₩",
                    t.balance.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ o("div", { children: [
                  /* @__PURE__ */ e("p", { className: "text-gray-400 text-sm mb-1", children: "Member Since" }),
                  /* @__PURE__ */ e("p", { className: "text-white text-base md:text-lg", children: "August 2025" })
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ o("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6", children: [
            /* @__PURE__ */ e("h3", { className: "text-white text-lg font-semibold mb-4", children: "Quick Actions" }),
            /* @__PURE__ */ o("div", { className: "space-y-3", children: [
              /* @__PURE__ */ e(D, { to: "/deposit", className: "block w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold text-center text-sm md:text-base", children: "Deposit Now" }),
              /* @__PURE__ */ e(D, { to: "/withdrawal", className: "block w-full bg-[#2a3138] text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-center text-sm md:text-base", children: "Withdraw" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
          /* @__PURE__ */ o("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6", children: [
            /* @__PURE__ */ e("h3", { className: "text-white text-lg font-semibold mb-4", children: "Personal Info" }),
            /* @__PURE__ */ o("div", { className: "space-y-3", children: [
              /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-gray-300 text-sm md:text-base", children: [
                /* @__PURE__ */ e(gn, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }),
                /* @__PURE__ */ e("span", { className: "break-all", children: t.email })
              ] }),
              /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-gray-300 text-sm md:text-base", children: [
                /* @__PURE__ */ e(Nn, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }),
                /* @__PURE__ */ e("span", { children: t.phone })
              ] }),
              /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-gray-300 text-sm md:text-base", children: [
                /* @__PURE__ */ e(Wr, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }),
                /* @__PURE__ */ e("span", { children: t.birthday })
              ] }),
              /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-gray-300 text-sm md:text-base", children: [
                /* @__PURE__ */ e(xn, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }),
                /* @__PURE__ */ e("span", { children: t.address })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6", children: [
            /* @__PURE__ */ e("h3", { className: "text-white text-lg font-semibold mb-4", children: "Banking Details" }),
            /* @__PURE__ */ o("div", { className: "space-y-3", children: [
              /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-gray-300 text-sm md:text-base", children: [
                /* @__PURE__ */ e(Ot, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }),
                /* @__PURE__ */ e("span", { children: "**** **** **** 1234" })
              ] }),
              /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-gray-300 text-sm md:text-base", children: [
                /* @__PURE__ */ e(jr, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }),
                /* @__PURE__ */ e("span", { children: "KB Bank" })
              ] }),
              /* @__PURE__ */ e("button", { className: "text-[#98E7D2] hover:text-[#CBE8E4] text-sm transition-colors", children: "+ Add New Bank Account" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6", children: [
          /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ e("h3", { className: "text-white text-lg font-semibold", children: "Recent Transactions" }),
            /* @__PURE__ */ e("button", { className: "text-[#98E7D2] hover:text-[#CBE8E4] text-sm transition-colors text-left md:text-right", children: "View More Records →" })
          ] }),
          /* @__PURE__ */ e("div", { className: "md:hidden space-y-4", children: a.map((r) => /* @__PURE__ */ o("div", { className: "bg-[#0f1419] border border-gray-800 rounded-lg p-4", children: [
            /* @__PURE__ */ o("div", { className: "flex justify-between items-start mb-2", children: [
              /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ e("p", { className: "text-white font-semibold", children: r.type }),
                /* @__PURE__ */ o("p", { className: "text-gray-400 text-sm", children: [
                  r.date,
                  " ",
                  r.time
                ] })
              ] }),
              /* @__PURE__ */ e("span", { className: "bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold", children: r.status })
            ] }),
            /* @__PURE__ */ e("p", { className: `text-lg font-semibold ${r.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`, children: r.amount })
          ] }, r.id)) }),
          /* @__PURE__ */ e("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ o("table", { className: "w-full", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-gray-800", children: [
              /* @__PURE__ */ e("th", { className: "text-left text-gray-400 text-sm py-3 px-4", children: "Type" }),
              /* @__PURE__ */ e("th", { className: "text-left text-gray-400 text-sm py-3 px-4", children: "Amount" }),
              /* @__PURE__ */ e("th", { className: "text-left text-gray-400 text-sm py-3 px-4", children: "Date" }),
              /* @__PURE__ */ e("th", { className: "text-left text-gray-400 text-sm py-3 px-4", children: "Time" }),
              /* @__PURE__ */ e("th", { className: "text-left text-gray-400 text-sm py-3 px-4", children: "Status" })
            ] }) }),
            /* @__PURE__ */ e("tbody", { children: a.map((r) => /* @__PURE__ */ o("tr", { className: "border-b border-gray-800 hover:bg-[#0f1419] transition-colors", children: [
              /* @__PURE__ */ e("td", { className: "text-white py-4 px-4", children: r.type }),
              /* @__PURE__ */ e("td", { className: `py-4 px-4 font-semibold ${r.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`, children: r.amount }),
              /* @__PURE__ */ e("td", { className: "text-gray-300 py-4 px-4", children: r.date }),
              /* @__PURE__ */ e("td", { className: "text-gray-300 py-4 px-4", children: r.time }),
              /* @__PURE__ */ e("td", { className: "py-4 px-4", children: /* @__PURE__ */ e("span", { className: "bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold", children: r.status }) })
            ] }, r.id)) })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function uo() {
  const [t, a] = w("10000"), [r, n] = w(""), [l, i] = w(""), s = ["10000", "50000", "100000", "500000", "1000000"], c = [
    {
      id: "new-signup",
      title: "New Sign-up First Deposit 50%",
      notes: [
        "Note: This event is not applicable to Evolution Gaming and Pragmatic Play casino games.",
        "Rollover Requirement: The rollover for all funds is calculated as 300% of (Deposit Amount + Bonus).",
        "Bets with odds less than 1.7 will not count towards the rollover requirement."
      ]
    },
    {
      id: "exclusive",
      title: "Exclusive to Evolution Gaming, Pragmatic Play Casinos Unlimited Deposit...",
      notes: [
        "The rollover for all funds is (Deposit Amount + Bonus) multiplied by",
        "Maximum Bonus Amount: ₩200,000.",
        "Withdrawal Rollover Condition: 10 times (1,000%).",
        "Example: Deposit ₩1,000,000, receive a ₩200,000 bonus.",
        "(1,000,000 + 200,000) X 10 = 12,000,000"
      ]
    }
  ], d = (m) => {
    a(m), n("");
  };
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-2xl md:text-3xl mb-6 md:mb-8", children: "Deposit" }),
        /* @__PURE__ */ o("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-8 max-w-4xl", children: [
          /* @__PURE__ */ o("div", { className: "mb-6 md:mb-8", children: [
            /* @__PURE__ */ e("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ e("button", { className: "bg-[#0f1419] border border-gray-700 text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold", children: "Deposit Amount" }) }),
            /* @__PURE__ */ e("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6", children: s.map((m) => /* @__PURE__ */ e(
              "button",
              {
                onClick: () => d(m),
                className: `py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all ${t === m && !r ? "bg-gradient-to-r from-[#f4e185] to-[#f4d85a] text-gray-900" : "bg-[#0f1419] border border-gray-700 text-white hover:border-gray-600"}`,
                children: parseInt(m).toLocaleString()
              },
              m
            )) }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                value: r || (t ? `₩ ${parseInt(t).toLocaleString()}` : ""),
                onChange: (m) => {
                  const u = m.target.value.replace(/[^\d]/g, "");
                  n(u), a("");
                },
                placeholder: "₩ 10,000",
                className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors"
              }
            ),
            /* @__PURE__ */ e("p", { className: "text-red-400 text-sm mt-2", children: "* Minimum Amount: ₩ 10,000;  Maximum Amount: ₩ 9,000,000 *" })
          ] }),
          /* @__PURE__ */ o("div", { className: "mb-6 md:mb-8", children: [
            /* @__PURE__ */ e("button", { className: "w-full md:w-auto bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 md:px-8 py-3 rounded-lg hover:opacity-90 transition-opacity mb-6 text-sm md:text-base font-semibold", children: "Choose promotion" }),
            /* @__PURE__ */ e("div", { className: "space-y-4", children: c.map((m) => /* @__PURE__ */ e(
              "div",
              {
                className: `border rounded-lg p-4 md:p-6 cursor-pointer transition-all ${l === m.id ? "bg-[#f4e185] bg-opacity-20 border-[#f4e185]" : "bg-[#0f1419] border-gray-700 hover:border-gray-600"}`,
                onClick: () => i(m.id),
                children: /* @__PURE__ */ o("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ e("div", { className: `w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${l === m.id ? "border-[#f4e185] bg-[#f4e185]" : "border-gray-600"}`, children: l === m.id && /* @__PURE__ */ e("div", { className: "w-2 h-2 rounded-full bg-gray-900" }) }),
                  /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ e("h3", { className: `font-semibold mb-3 text-sm md:text-base ${l === m.id ? "text-gray-900" : "text-white"}`, children: m.title }),
                    /* @__PURE__ */ e("ul", { className: "space-y-1", children: m.notes.map((u, h) => /* @__PURE__ */ o("li", { className: `text-xs md:text-sm break-words ${l === m.id ? "text-gray-800" : "text-gray-300"}`, children: [
                      "• ",
                      u
                    ] }, h)) })
                  ] })
                ] })
              },
              m.id
            )) })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 md:gap-4", children: [
            /* @__PURE__ */ e("button", { className: "w-full bg-gray-600 text-white py-3 md:py-4 rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm md:text-base", children: "Next" }),
            /* @__PURE__ */ e("button", { className: "w-full bg-[#0f1419] border border-gray-700 text-white py-3 md:py-4 rounded-lg hover:border-gray-600 transition-colors font-semibold text-sm md:text-base", children: "Back" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function po() {
  const [t, a] = w(""), [r, n] = w(""), [l, i] = w(!1), s = 0, c = 0, d = 0;
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-2xl md:text-3xl mb-6 md:mb-8", children: "Withdrawl" }),
        /* @__PURE__ */ o("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-8 max-w-4xl", children: [
          /* @__PURE__ */ o("div", { className: "mb-6 md:mb-8", children: [
            /* @__PURE__ */ e("h2", { className: "text-white text-lg md:text-xl font-semibold mb-4", children: "My Bank Accounts" }),
            /* @__PURE__ */ o("div", { className: "bg-[#0f1419] border border-gray-800 rounded-lg p-6 md:p-12 text-center", children: [
              /* @__PURE__ */ e("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ e("div", { className: "w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1a2128] border-2 border-dashed border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ e(Ot, { className: "w-10 h-10 md:w-12 md:h-12 text-gray-600" }) }) }),
              /* @__PURE__ */ e("h3", { className: "text-white text-base md:text-lg font-semibold mb-4", children: "Empty Bank Account" }),
              /* @__PURE__ */ e("button", { className: "bg-gradient-to-r from-[#f4e185] to-[#f4d85a] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm md:text-base", children: "Add Account" })
            ] }),
            /* @__PURE__ */ o("button", { className: "flex items-center gap-2 text-gray-400 hover:text-white mt-4 transition-colors", children: [
              /* @__PURE__ */ e(kn, { className: "w-4 h-4" }),
              /* @__PURE__ */ e("span", { className: "text-sm", children: "Refresh" })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "mb-6 md:mb-8", children: [
            /* @__PURE__ */ e("h2", { className: "text-white text-lg md:text-xl font-semibold mb-4 text-center", children: "Main Wallet" }),
            /* @__PURE__ */ e("div", { className: "text-center mb-4", children: /* @__PURE__ */ o("p", { className: "text-white text-2xl md:text-4xl font-bold", children: [
              "₩ ",
              s.toFixed(2)
            ] }) }),
            /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-6", children: [
              /* @__PURE__ */ o("div", { className: "text-center", children: [
                /* @__PURE__ */ e("p", { className: "text-red-400 text-sm", children: "*Rollover Achieved" }),
                /* @__PURE__ */ o("p", { className: "text-red-400 font-semibold text-sm md:text-base", children: [
                  "amount: ₩",
                  c.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ o("div", { className: "text-center", children: [
                /* @__PURE__ */ e("p", { className: "text-red-400 text-sm", children: "Target amount:" }),
                /* @__PURE__ */ o("p", { className: "text-red-400 font-semibold text-sm md:text-base", children: [
                  "₩",
                  d.toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e("button", { className: "w-full md:w-auto mx-auto block bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 md:px-8 py-3 rounded-lg hover:opacity-90 transition-opacity mb-6 text-sm md:text-base font-semibold", children: "Withdrawal Amount & Password" }),
            /* @__PURE__ */ e("div", { className: "mb-4", children: /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                value: t,
                onChange: (m) => a(m.target.value),
                placeholder: "₩ 10,000 ~ ₩ 9,000,000",
                className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors"
              }
            ) }),
            /* @__PURE__ */ o("div", { className: "mb-4 relative", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: l ? "text" : "password",
                  value: r,
                  onChange: (m) => n(m.target.value),
                  placeholder: "* * * * * *",
                  className: "w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#98E7D2] transition-colors"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: () => i(!l),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300",
                  children: l ? /* @__PURE__ */ e(Ee, { className: "w-5 h-5" }) : /* @__PURE__ */ e(ke, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "flex justify-center gap-8 mb-6", children: [
              /* @__PURE__ */ o("div", { className: "text-center", children: [
                /* @__PURE__ */ e("p", { className: "text-red-400 text-sm", children: "*Rollover Achieved" }),
                /* @__PURE__ */ o("p", { className: "text-red-400 font-semibold", children: [
                  "amount: ₩",
                  c.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ o("div", { className: "text-center", children: [
                /* @__PURE__ */ e("p", { className: "text-red-400 text-sm", children: "Target amount:" }),
                /* @__PURE__ */ o("p", { className: "text-red-400 font-semibold", children: [
                  "₩",
                  d.toFixed(2)
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 md:gap-4", children: [
            /* @__PURE__ */ e("button", { className: "w-full bg-gray-600 text-white py-3 md:py-4 rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm md:text-base", children: "Submit" }),
            /* @__PURE__ */ e("button", { className: "w-full bg-[#0f1419] border border-gray-700 text-white py-3 md:py-4 rounded-lg hover:border-gray-600 transition-colors font-semibold text-sm md:text-base", children: "Back" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function go() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Betting Record" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function fo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Deposit Record" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function xo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Profit And Loss" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function yo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Withdrawal Record" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function bo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Account Record" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function vo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Personal Info" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function No() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Security Center" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function wo() {
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ e(F, {}),
    /* @__PURE__ */ o("div", { className: "flex bg-[#0f1419] min-h-screen", children: [
      /* @__PURE__ */ e(j, {}),
      /* @__PURE__ */ o("main", { className: "flex-1 p-4 md:p-8", children: [
        /* @__PURE__ */ e("h1", { className: "text-white text-3xl mb-8", children: "Customer Service" }),
        /* @__PURE__ */ e("div", { className: "bg-[#1a2128] border border-gray-800 rounded-lg p-8 text-center", children: /* @__PURE__ */ e("p", { className: "text-gray-400", children: "Coming Soon" }) })
      ] })
    ] }),
    /* @__PURE__ */ e(M, {})
  ] });
}
function Eo() {
  const t = A(), a = ["/account", "/deposit", "/withdrawal", "/betting-record", "/deposit-record", "/profit-loss", "/withdrawal-record", "/account-record", "/personal-info", "/security", "/support"].includes(t.pathname);
  return /* @__PURE__ */ o("div", { className: "min-h-screen bg-[#0f1419]", children: [
    !a && /* @__PURE__ */ e(jn, {}),
    /* @__PURE__ */ o(Ja, { children: [
      /* @__PURE__ */ e(B, { path: "/", element: /* @__PURE__ */ e(to, {}) }),
      /* @__PURE__ */ e(B, { path: "/hot-games", element: /* @__PURE__ */ e(ro, {}) }),
      /* @__PURE__ */ e(B, { path: "/mini-games", element: /* @__PURE__ */ e(no, {}) }),
      /* @__PURE__ */ e(B, { path: "/sport", element: /* @__PURE__ */ e(oo, {}) }),
      /* @__PURE__ */ e(B, { path: "/fish", element: /* @__PURE__ */ e(lo, {}) }),
      /* @__PURE__ */ e(B, { path: "/slot", element: /* @__PURE__ */ e(io, {}) }),
      /* @__PURE__ */ e(B, { path: "/promotion", element: /* @__PURE__ */ e(mo, {}) }),
      /* @__PURE__ */ e(B, { path: "/account", element: /* @__PURE__ */ e(ho, {}) }),
      /* @__PURE__ */ e(B, { path: "/deposit", element: /* @__PURE__ */ e(uo, {}) }),
      /* @__PURE__ */ e(B, { path: "/withdrawal", element: /* @__PURE__ */ e(po, {}) }),
      /* @__PURE__ */ e(B, { path: "/betting-record", element: /* @__PURE__ */ e(go, {}) }),
      /* @__PURE__ */ e(B, { path: "/deposit-record", element: /* @__PURE__ */ e(fo, {}) }),
      /* @__PURE__ */ e(B, { path: "/profit-loss", element: /* @__PURE__ */ e(xo, {}) }),
      /* @__PURE__ */ e(B, { path: "/withdrawal-record", element: /* @__PURE__ */ e(yo, {}) }),
      /* @__PURE__ */ e(B, { path: "/account-record", element: /* @__PURE__ */ e(bo, {}) }),
      /* @__PURE__ */ e(B, { path: "/personal-info", element: /* @__PURE__ */ e(vo, {}) }),
      /* @__PURE__ */ e(B, { path: "/security", element: /* @__PURE__ */ e(No, {}) }),
      /* @__PURE__ */ e(B, { path: "/support", element: /* @__PURE__ */ e(wo, {}) })
    ] }),
    /* @__PURE__ */ e(Wn, {})
  ] });
}
function ko() {
  return /* @__PURE__ */ e(Nr, { children: /* @__PURE__ */ e(Eo, {}) });
}
const Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ko
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ro as Code0_8
};
