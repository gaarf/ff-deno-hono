(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/components/LoremIpsum.tsx
  var LoremIpsum = () => {
    return /* @__PURE__ */ React.createElement("p", { class: "italic" }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ipsum quia consequatur odit quidem qui doloremque inventore unde quaerat. Cupiditate suscipit vel temporibus natus facilis debitis, aspernatur autem nulla. Obcaecati!");
  };

  // https://jsr.io/@hono/hono/4.5.1/src/utils/html.ts
  var HtmlEscapedCallbackPhase = {
    Stringify: 1,
    BeforeStream: 2,
    Stream: 3
  };
  var raw = (value, callbacks) => {
    const escapedString = new String(value);
    escapedString.isEscaped = true;
    escapedString.callbacks = callbacks;
    return escapedString;
  };
  var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
    const callbacks = str.callbacks;
    if (!callbacks?.length) {
      return Promise.resolve(str);
    }
    if (buffer) {
      buffer[0] += str;
    } else {
      buffer = [str];
    }
    const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
      (res) => Promise.all(
        res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
      ).then(() => buffer[0])
    );
    if (preserveCallbacks) {
      return raw(await resStr, callbacks);
    } else {
      return resStr;
    }
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/constants.ts
  var DOM_RENDERER = Symbol("RENDERER");
  var DOM_ERROR_HANDLER = Symbol("ERROR_HANDLER");
  var DOM_STASH = Symbol("STASH");
  var DOM_INTERNAL_TAG = Symbol("INTERNAL");
  var PERMALINK = Symbol("PERMALINK");

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/utils.ts
  var setInternalTagFlag = (fn) => {
    ;
    fn[DOM_INTERNAL_TAG] = true;
    return fn;
  };
  var JSXNodeCompatPrototype = {
    type: {
      get() {
        return this.tag;
      }
    },
    ref: {
      get() {
        return this.props?.ref;
      }
    }
  };
  var newJSXNode = (obj) => Object.defineProperties(obj, JSXNodeCompatPrototype);

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/context.ts
  var createContextProviderFunction = (values) => ({ value, children }) => {
    if (!children) {
      return void 0;
    }
    const props = {
      children: [
        {
          tag: setInternalTagFlag(() => {
            values.push(value);
          }),
          props: {}
        }
      ]
    };
    if (Array.isArray(children)) {
      props.children.push(...children.flat());
    } else {
      props.children.push(children);
    }
    props.children.push({
      tag: setInternalTagFlag(() => {
        values.pop();
      }),
      props: {}
    });
    const res = newJSXNode({ tag: "", props });
    res[DOM_ERROR_HANDLER] = (err) => {
      values.pop();
      throw err;
    };
    return res;
  };
  var createContext = (defaultValue) => {
    const values = [defaultValue];
    const context = createContextProviderFunction(values);
    context.values = values;
    context.Provider = context;
    globalContexts.push(context);
    return context;
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/context.ts
  var globalContexts = [];
  var useContext = (context) => {
    return context.values.at(-1);
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/utils.ts
  var normalizeElementKeyMap = /* @__PURE__ */ new Map([
    ["className", "class"],
    ["htmlFor", "for"],
    ["crossOrigin", "crossorigin"],
    ["httpEquiv", "http-equiv"],
    ["itemProp", "itemprop"],
    ["fetchPriority", "fetchpriority"],
    ["noModule", "nomodule"],
    ["formAction", "formaction"]
  ]);
  var normalizeIntrinsicElementKey = (key) => normalizeElementKeyMap.get(key) || key;
  var styleObjectForEach = (style2, fn) => {
    for (const [k, v] of Object.entries(style2)) {
      const key = k[0] === "-" || !/[A-Z]/.test(k) ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      fn(
        key,
        v == null ? null : typeof v === "number" ? !key.match(
          /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
        ) ? `${v}px` : `${v}` : v
      );
    }
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/intrinsic-element/common.ts
  var deDupeKeyMap = {
    title: [],
    script: ["src"],
    style: ["data-href"],
    link: ["href"],
    meta: ["name", "httpEquiv", "charset", "itemProp"]
  };
  var domRenderers = {};
  var dataPrecedenceAttr = "data-precedence";

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/children.ts
  var toArray = (children) => Array.isArray(children) ? children : [children];

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/intrinsic-element/components.ts
  var components_exports2 = {};
  __export(components_exports2, {
    button: () => button,
    clearCache: () => clearCache,
    composeRef: () => composeRef,
    form: () => form,
    input: () => input,
    link: () => link,
    meta: () => meta,
    script: () => script,
    style: () => style,
    title: () => title
  });

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/hooks/index.ts
  var STASH_SATE = 0;
  var STASH_EFFECT = 1;
  var STASH_CALLBACK = 2;
  var STASH_MEMO = 3;
  var resolvedPromiseValueMap = /* @__PURE__ */ new WeakMap();
  var isDepsChanged = (prevDeps, deps) => !prevDeps || !deps || prevDeps.length !== deps.length || deps.some((dep, i) => dep !== prevDeps[i]);
  var updateHook = void 0;
  var pendingStack = [];
  var useState = (initialState) => {
    const resolveInitialState = () => typeof initialState === "function" ? initialState() : initialState;
    const buildData = buildDataStack.at(-1);
    if (!buildData) {
      return [resolveInitialState(), () => {
      }];
    }
    const [, node] = buildData;
    const stateArray = node[DOM_STASH][1][STASH_SATE] ||= [];
    const hookIndex = node[DOM_STASH][0]++;
    return stateArray[hookIndex] ||= [
      resolveInitialState(),
      (newState) => {
        const localUpdateHook = updateHook;
        const stateData = stateArray[hookIndex];
        if (typeof newState === "function") {
          newState = newState(stateData[0]);
        }
        if (!Object.is(newState, stateData[0])) {
          stateData[0] = newState;
          if (pendingStack.length) {
            const [pendingType, pendingPromise] = pendingStack.at(-1);
            Promise.all([
              pendingType === 3 ? node : update([pendingType, false, localUpdateHook], node),
              pendingPromise
            ]).then(([node2]) => {
              if (!node2 || !(pendingType === 2 || pendingType === 3)) {
                return;
              }
              const lastVC = node2.vC;
              const addUpdateTask = () => {
                setTimeout(() => {
                  if (lastVC !== node2.vC) {
                    return;
                  }
                  update([pendingType === 3 ? 1 : 0, false, localUpdateHook], node2);
                });
              };
              requestAnimationFrame(addUpdateTask);
            });
          } else {
            update([0, false, localUpdateHook], node);
          }
        }
      }
    ];
  };
  var useCallback = (callback, deps) => {
    const buildData = buildDataStack.at(-1);
    if (!buildData) {
      return callback;
    }
    const [, node] = buildData;
    const callbackArray = node[DOM_STASH][1][STASH_CALLBACK] ||= [];
    const hookIndex = node[DOM_STASH][0]++;
    const prevDeps = callbackArray[hookIndex];
    if (isDepsChanged(prevDeps?.[1], deps)) {
      callbackArray[hookIndex] = [callback, deps];
    } else {
      callback = callbackArray[hookIndex][0];
    }
    return callback;
  };
  var use = (promise) => {
    const cachedRes = resolvedPromiseValueMap.get(promise);
    if (cachedRes) {
      if (cachedRes.length === 2) {
        throw cachedRes[1];
      }
      return cachedRes[0];
    }
    promise.then(
      (res) => resolvedPromiseValueMap.set(promise, [res]),
      (e) => resolvedPromiseValueMap.set(promise, [void 0, e])
    );
    throw promise;
  };
  var useMemo = (factory, deps) => {
    const buildData = buildDataStack.at(-1);
    if (!buildData) {
      return factory();
    }
    const [, node] = buildData;
    const memoArray = node[DOM_STASH][1][STASH_MEMO] ||= [];
    const hookIndex = node[DOM_STASH][0]++;
    const prevDeps = memoArray[hookIndex];
    if (isDepsChanged(prevDeps?.[1], deps)) {
      memoArray[hookIndex] = [factory(), deps];
    }
    return memoArray[hookIndex][0];
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/render.ts
  var HONO_PORTAL_ELEMENT = "_hp";
  var eventAliasMap = {
    Change: "Input",
    DoubleClick: "DblClick"
  };
  var nameSpaceMap = {
    svg: "2000/svg",
    math: "1998/Math/MathML"
  };
  var skipProps = /* @__PURE__ */ new Set(["children"]);
  var buildDataStack = [];
  var refCleanupMap = /* @__PURE__ */ new WeakMap();
  var nameSpaceContext = void 0;
  var getNameSpaceContext = () => nameSpaceContext;
  var isNodeString = (node) => "t" in node;
  var getEventSpec = (key) => {
    const match = key.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);
    if (match) {
      const [, eventName, capture] = match;
      return [(eventAliasMap[eventName] || eventName).toLowerCase(), !!capture];
    }
    return void 0;
  };
  var toAttributeName = (element, key) => element instanceof SVGElement && /[A-Z]/.test(key) && (key in element.style || // Presentation attributes are findable in style object. "clip-path", "font-size", "stroke-width", etc.
  key.match(/^(?:o|pai|str|u|ve)/)) ? key.replace(/([A-Z])/g, "-$1").toLowerCase() : key;
  var applyProps = (container, attributes, oldAttributes) => {
    attributes ||= {};
    for (let [key, value] of Object.entries(attributes)) {
      if (!skipProps.has(key) && (!oldAttributes || oldAttributes[key] !== value)) {
        key = normalizeIntrinsicElementKey(key);
        const eventSpec = getEventSpec(key);
        if (eventSpec) {
          if (oldAttributes) {
            container.removeEventListener(eventSpec[0], oldAttributes[key], eventSpec[1]);
          }
          if (value != null) {
            if (typeof value !== "function") {
              throw new Error(`Event handler for "${key}" is not a function`);
            }
            container.addEventListener(eventSpec[0], value, eventSpec[1]);
          }
        } else if (key === "dangerouslySetInnerHTML" && value) {
          container.innerHTML = value.__html;
        } else if (key === "ref") {
          let cleanup;
          if (typeof value === "function") {
            cleanup = value(container) || (() => value(null));
          } else if (value && "current" in value) {
            value.current = container;
            cleanup = () => value.current = null;
          }
          refCleanupMap.set(container, cleanup);
        } else if (key === "style") {
          const style2 = container.style;
          if (typeof value === "string") {
            style2.cssText = value;
          } else {
            style2.cssText = "";
            if (value != null) {
              styleObjectForEach(value, style2.setProperty.bind(style2));
            }
          }
        } else {
          const nodeName = container.nodeName;
          if (key === "value") {
            if (nodeName === "INPUT" || nodeName === "TEXTAREA" || nodeName === "SELECT") {
              ;
              container.value = value === null || value === void 0 || value === false ? null : value;
              if (nodeName === "TEXTAREA") {
                container.textContent = value;
                continue;
              } else if (nodeName === "SELECT") {
                if (container.selectedIndex === -1) {
                  ;
                  container.selectedIndex = 0;
                }
                continue;
              }
            }
          } else if (key === "checked" && nodeName === "INPUT" || key === "selected" && nodeName === "OPTION") {
            ;
            container[key] = value;
          }
          const k = toAttributeName(container, key);
          if (value === null || value === void 0 || value === false) {
            container.removeAttribute(k);
          } else if (value === true) {
            container.setAttribute(k, "");
          } else if (typeof value === "string" || typeof value === "number") {
            container.setAttribute(k, value);
          } else {
            container.setAttribute(k, value.toString());
          }
        }
      }
    }
    if (oldAttributes) {
      for (let [key, value] of Object.entries(oldAttributes)) {
        if (!skipProps.has(key) && !(key in attributes)) {
          key = normalizeIntrinsicElementKey(key);
          const eventSpec = getEventSpec(key);
          if (eventSpec) {
            container.removeEventListener(eventSpec[0], value, eventSpec[1]);
          } else if (key === "ref") {
            refCleanupMap.get(container)?.();
          } else {
            container.removeAttribute(toAttributeName(container, key));
          }
        }
      }
    }
  };
  var invokeTag = (context, node) => {
    if (node.s) {
      const res = node.s;
      node.s = void 0;
      return res;
    }
    node[DOM_STASH][0] = 0;
    buildDataStack.push([context, node]);
    const func = node.tag[DOM_RENDERER] || node.tag;
    try {
      return [
        func.call(null, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...func.defaultProps || {},
          ...node.props
        })
      ];
    } finally {
      buildDataStack.pop();
    }
  };
  var getNextChildren = (node, container, nextChildren, childrenToRemove, callbacks) => {
    childrenToRemove.push(...node.vR);
    if (typeof node.tag === "function") {
      node[DOM_STASH][1][STASH_EFFECT]?.forEach((data) => callbacks.push(data));
    }
    node.vC.forEach((child) => {
      if (isNodeString(child)) {
        nextChildren.push(child);
      } else {
        if (typeof child.tag === "function" || child.tag === "") {
          child.c = container;
          getNextChildren(child, container, nextChildren, childrenToRemove, callbacks);
        } else {
          nextChildren.push(child);
          childrenToRemove.push(...child.vR);
        }
      }
    });
  };
  var findInsertBefore = (node) => {
    if (!node) {
      return null;
    } else if (node.tag === HONO_PORTAL_ELEMENT) {
      return findInsertBefore(node.nN);
    } else if (node.e) {
      return node.e;
    }
    if (node.vC) {
      for (let i = 0, len = node.vC.length; i < len; i++) {
        const e = findInsertBefore(node.vC[i]);
        if (e) {
          return e;
        }
      }
    }
    return findInsertBefore(node.nN);
  };
  var removeNode = (node) => {
    if (!isNodeString(node)) {
      node[DOM_STASH]?.[1][STASH_EFFECT]?.forEach((data) => data[2]?.());
      refCleanupMap.get(node.e)?.();
      if (node.p === 2) {
        node.vC?.forEach((n) => n.p = 2);
      }
      node.vC?.forEach(removeNode);
    }
    if (!node.p) {
      node.e?.remove();
      delete node.e;
    }
    if (typeof node.tag === "function") {
      updateMap.delete(node);
      fallbackUpdateFnArrayMap.delete(node);
      delete node[DOM_STASH][3];
      node.a = true;
    }
  };
  var apply = (node, container) => {
    node.c = container;
    applyNodeObject(node, container);
  };
  var applyNode = (node, container) => {
    if (isNodeString(node)) {
      container.textContent = node.t;
    } else {
      applyNodeObject(node, container);
    }
  };
  var findChildNodeIndex = (childNodes, child) => {
    if (!child) {
      return;
    }
    for (let i = 0, len = childNodes.length; i < len; i++) {
      if (childNodes[i] === child) {
        return i;
      }
    }
    return;
  };
  var cancelBuild = Symbol();
  var applyNodeObject = (node, container) => {
    const next = [];
    const remove = [];
    const callbacks = [];
    getNextChildren(node, container, next, remove, callbacks);
    const childNodes = container.childNodes;
    let offset = findChildNodeIndex(childNodes, findInsertBefore(node.nN)) ?? findChildNodeIndex(childNodes, next.find((n) => n.tag !== HONO_PORTAL_ELEMENT && n.e)?.e) ?? childNodes.length;
    for (let i = 0, len = next.length; i < len; i++, offset++) {
      const child = next[i];
      let el;
      if (isNodeString(child)) {
        if (child.e && child.d) {
          child.e.textContent = child.t;
        }
        child.d = false;
        el = child.e ||= document.createTextNode(child.t);
      } else {
        el = child.e ||= child.n ? document.createElementNS(child.n, child.tag) : document.createElement(child.tag);
        applyProps(el, child.props, child.pP);
        applyNode(child, el);
      }
      if (child.tag === HONO_PORTAL_ELEMENT) {
        offset--;
      } else if (childNodes[offset] !== el && childNodes[offset - 1] !== child.e) {
        container.insertBefore(el, childNodes[offset] || null);
      }
    }
    remove.forEach(removeNode);
    callbacks.forEach(([, , , , cb]) => cb?.());
    callbacks.forEach(([, cb]) => cb?.());
    requestAnimationFrame(() => {
      callbacks.forEach(([, , , cb]) => cb?.());
    });
  };
  var fallbackUpdateFnArrayMap = /* @__PURE__ */ new WeakMap();
  var build = (context, node, children) => {
    const buildWithPreviousChildren = !children && node.pC;
    if (children) {
      node.pC ||= node.vC;
    }
    let foundErrorHandler;
    try {
      children ||= typeof node.tag == "function" ? invokeTag(context, node) : toArray(node.props.children);
      if (children[0]?.tag === "" && children[0][DOM_ERROR_HANDLER]) {
        foundErrorHandler = children[0][DOM_ERROR_HANDLER];
        context[5].push([context, foundErrorHandler, node]);
      }
      const oldVChildren = buildWithPreviousChildren ? [...node.pC] : node.vC ? [...node.vC] : [];
      const vChildren = [];
      node.vR = buildWithPreviousChildren ? [...node.vC] : [];
      let prevNode;
      children.flat().forEach((c) => {
        let child = buildNode(c);
        if (child) {
          if (typeof child.tag === "function" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
          !child.tag[DOM_INTERNAL_TAG]) {
            if (globalContexts.length > 0) {
              child[DOM_STASH][2] = globalContexts.map((c2) => [c2, c2.values.at(-1)]);
            }
            if (context[5]?.length) {
              child[DOM_STASH][3] = context[5].at(-1);
            }
          }
          let oldChild;
          const i = oldVChildren.findIndex(
            isNodeString(child) ? (c2) => isNodeString(c2) : child.key !== void 0 ? (c2) => c2.key === child.key : (c2) => c2.tag === child.tag
          );
          if (i !== -1) {
            oldChild = oldVChildren[i];
            oldVChildren.splice(i, 1);
          }
          let skipBuild = false;
          if (oldChild) {
            if (isNodeString(child)) {
              if (oldChild.t !== child.t) {
                ;
                oldChild.t = child.t;
                oldChild.d = true;
              }
              child = oldChild;
            } else if (oldChild.tag !== child.tag) {
              node.vR.push(oldChild);
            } else {
              const pP = oldChild.pP = oldChild.props;
              oldChild.props = child.props;
              oldChild.f ||= child.f || node.f;
              if (typeof child.tag === "function") {
                oldChild[DOM_STASH][2] = child[DOM_STASH][2] || [];
                oldChild[DOM_STASH][3] = child[DOM_STASH][3];
                if (!oldChild.f) {
                  const prevPropsKeys = Object.keys(pP);
                  const currentProps = oldChild.props;
                  skipBuild = prevPropsKeys.length === Object.keys(currentProps).length && prevPropsKeys.every((k) => k in currentProps && currentProps[k] === pP[k]);
                }
              }
              child = oldChild;
            }
          } else if (!isNodeString(child) && nameSpaceContext) {
            const ns = useContext(nameSpaceContext);
            if (ns) {
              child.n = ns;
            }
          }
          if (!isNodeString(child) && !skipBuild) {
            build(context, child);
            delete child.f;
          }
          vChildren.push(child);
          for (let p = prevNode; p && !isNodeString(p); p = p.vC?.at(-1)) {
            p.nN = child;
          }
          prevNode = child;
        }
      });
      node.vC = vChildren;
      node.vR.push(...oldVChildren);
      if (buildWithPreviousChildren) {
        delete node.pC;
      }
    } catch (e) {
      node.f = true;
      if (e === cancelBuild) {
        if (foundErrorHandler) {
          return;
        } else {
          throw e;
        }
      }
      const [errorHandlerContext, errorHandler, errorHandlerNode] = node[DOM_STASH]?.[3] || [];
      if (errorHandler) {
        const fallbackUpdateFn = () => update([0, false, context[2]], errorHandlerNode);
        const fallbackUpdateFnArray = fallbackUpdateFnArrayMap.get(errorHandlerNode) || [];
        fallbackUpdateFnArray.push(fallbackUpdateFn);
        fallbackUpdateFnArrayMap.set(errorHandlerNode, fallbackUpdateFnArray);
        const fallback = errorHandler(e, () => {
          const fnArray = fallbackUpdateFnArrayMap.get(errorHandlerNode);
          if (fnArray) {
            const i = fnArray.indexOf(fallbackUpdateFn);
            if (i !== -1) {
              fnArray.splice(i, 1);
              return fallbackUpdateFn();
            }
          }
        });
        if (fallback) {
          if (context[0] === 1) {
            context[1] = true;
          } else {
            build(context, errorHandlerNode, [fallback]);
            if ((errorHandler.length === 1 || context !== errorHandlerContext) && errorHandlerNode.c) {
              apply(errorHandlerNode, errorHandlerNode.c);
              return;
            }
          }
          throw cancelBuild;
        }
      }
      throw e;
    } finally {
      if (foundErrorHandler) {
        context[5].pop();
      }
    }
  };
  var buildNode = (node) => {
    if (node === void 0 || node === null || typeof node === "boolean") {
      return void 0;
    } else if (typeof node === "string" || typeof node === "number") {
      return { t: node.toString(), d: true };
    } else {
      if ("vR" in node) {
        node = newJSXNode({
          tag: node.tag,
          props: node.props,
          key: node.key,
          f: node.f
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        });
      }
      if (typeof node.tag === "function") {
        ;
        node[DOM_STASH] = [0, []];
      } else {
        const ns = nameSpaceMap[node.tag];
        if (ns) {
          nameSpaceContext ||= createContext("");
          node.props.children = [
            {
              tag: nameSpaceContext,
              props: {
                value: node.n = `http://www.w3.org/${ns}`,
                children: node.props.children
              }
            }
          ];
        }
      }
      return node;
    }
  };
  var replaceContainer = (node, from, to) => {
    if (node.c === from) {
      node.c = to;
      node.vC.forEach((child) => replaceContainer(child, from, to));
    }
  };
  var updateSync = (context, node) => {
    node[DOM_STASH][2]?.forEach(([c, v]) => {
      c.values.push(v);
    });
    try {
      build(context, node, void 0);
    } catch (e) {
      return;
    }
    if (node.a) {
      delete node.a;
      return;
    }
    node[DOM_STASH][2]?.forEach(([c]) => {
      c.values.pop();
    });
    if (context[0] !== 1 || !context[1]) {
      apply(node, node.c);
    }
  };
  var updateMap = /* @__PURE__ */ new WeakMap();
  var currentUpdateSets = [];
  var update = async (context, node) => {
    context[5] ||= [];
    const existing = updateMap.get(node);
    if (existing) {
      existing[0](void 0);
    }
    let resolve;
    const promise = new Promise((r) => resolve = r);
    updateMap.set(node, [
      resolve,
      () => {
        if (context[2]) {
          context[2](context, node, (context2) => {
            updateSync(context2, node);
          }).then(() => resolve(node));
        } else {
          updateSync(context, node);
          resolve(node);
        }
      }
    ]);
    if (currentUpdateSets.length) {
      ;
      currentUpdateSets.at(-1).add(node);
    } else {
      await Promise.resolve();
      const latest = updateMap.get(node);
      if (latest) {
        updateMap.delete(node);
        latest[1]();
      }
    }
    return promise;
  };
  var renderNode = (node, container) => {
    const context = [];
    context[5] = [];
    context[4] = true;
    build(context, node, void 0);
    context[4] = false;
    const fragment = document.createDocumentFragment();
    apply(node, fragment);
    replaceContainer(node, fragment, container);
    container.replaceChildren(fragment);
  };
  var render = (jsxNode, container) => {
    renderNode(buildNode({ tag: "", props: { children: jsxNode } }), container);
  };
  var createPortal = (children, container, key) => ({
    tag: HONO_PORTAL_ELEMENT,
    props: {
      children
    },
    key,
    e: container,
    p: 1
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  });

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/hooks/index.ts
  var FormContext = createContext({
    pending: false,
    data: null,
    method: null,
    action: null
  });
  var actions = /* @__PURE__ */ new Set();
  var registerAction = (action) => {
    actions.add(action);
    action.finally(() => actions.delete(action));
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/intrinsic-element/components.ts
  var clearCache = () => {
    blockingPromiseMap = /* @__PURE__ */ Object.create(null);
    createdElements = /* @__PURE__ */ Object.create(null);
  };
  var composeRef = (ref, cb) => {
    return useMemo(
      () => (e) => {
        let refCleanup;
        if (ref) {
          if (typeof ref === "function") {
            refCleanup = ref(e) || (() => {
              ref(null);
            });
          } else if (ref && "current" in ref) {
            ref.current = e;
            refCleanup = () => {
              ref.current = null;
            };
          }
        }
        const cbCleanup = cb(e);
        return () => {
          cbCleanup?.();
          refCleanup?.();
        };
      },
      [ref]
    );
  };
  var blockingPromiseMap = /* @__PURE__ */ Object.create(null);
  var createdElements = /* @__PURE__ */ Object.create(null);
  var documentMetadataTag = (tag, props, preserveNodeType, supportSort, supportBlocking) => {
    if (props?.itemProp) {
      return newJSXNode({
        tag,
        props
      });
    }
    const head = document.head;
    let { onLoad, onError, precedence, blocking, ...restProps } = props;
    let element = null;
    let created = false;
    const deDupeKeys = deDupeKeyMap[tag];
    let existingElements = void 0;
    if (deDupeKeys.length > 0) {
      const tags = head.querySelectorAll(tag);
      LOOP: for (const e of tags) {
        for (const key of deDupeKeyMap[tag]) {
          if (e.getAttribute(key) === props[key]) {
            element = e;
            break LOOP;
          }
        }
      }
      if (!element) {
        const cacheKey = deDupeKeys.reduce(
          (acc, key) => props[key] === void 0 ? acc : `${acc}-${key}-${props[key]}`,
          tag
        );
        created = !createdElements[cacheKey];
        element = createdElements[cacheKey] ||= (() => {
          const e = document.createElement(tag);
          for (const key of deDupeKeys) {
            if (props[key] !== void 0) {
              e.setAttribute(key, props[key]);
            }
            if (props.rel) {
              e.setAttribute("rel", props.rel);
            }
          }
          return e;
        })();
      }
    } else {
      existingElements = head.querySelectorAll(tag);
    }
    precedence = supportSort ? precedence ?? "" : void 0;
    if (supportSort) {
      restProps[dataPrecedenceAttr] = precedence;
    }
    const insert = useCallback(
      (e) => {
        if (deDupeKeys.length > 0) {
          let found = false;
          for (const existingElement of head.querySelectorAll(tag)) {
            if (found && existingElement.getAttribute(dataPrecedenceAttr) !== precedence) {
              head.insertBefore(e, existingElement);
              return;
            }
            if (existingElement.getAttribute(dataPrecedenceAttr) === precedence) {
              found = true;
            }
          }
          head.appendChild(e);
        } else if (existingElements) {
          let found = false;
          for (const existingElement of existingElements) {
            if (existingElement === e) {
              found = true;
              break;
            }
          }
          if (!found) {
            head.insertBefore(
              e,
              head.contains(existingElements[0]) ? existingElements[0] : head.querySelector(tag)
            );
          }
          existingElements = void 0;
        }
      },
      [precedence]
    );
    const ref = composeRef(props.ref, (e) => {
      const key = deDupeKeys[0];
      if (preserveNodeType === 2) {
        e.innerHTML = "";
      }
      if (created || existingElements) {
        insert(e);
      }
      if (!onError && !onLoad) {
        return;
      }
      let promise = blockingPromiseMap[e.getAttribute(key)] ||= new Promise(
        (resolve, reject) => {
          e.addEventListener("load", resolve);
          e.addEventListener("error", reject);
        }
      );
      if (onLoad) {
        promise = promise.then(onLoad);
      }
      if (onError) {
        promise = promise.catch(onError);
      }
      promise.catch(() => {
      });
    });
    if (supportBlocking && blocking === "render") {
      const key = deDupeKeyMap[tag][0];
      if (props[key]) {
        const value = props[key];
        const promise = blockingPromiseMap[value] ||= new Promise((resolve, reject) => {
          insert(element);
          element.addEventListener("load", resolve);
          element.addEventListener("error", reject);
        });
        use(promise);
      }
    }
    const jsxNode = newJSXNode({
      tag,
      props: {
        ...restProps,
        ref
      }
    });
    jsxNode.p = preserveNodeType;
    if (element) {
      jsxNode.e = element;
    }
    return createPortal(
      jsxNode,
      head
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    );
  };
  var title = (props) => {
    const nameSpaceContext2 = getNameSpaceContext();
    const ns = nameSpaceContext2 && useContext(nameSpaceContext2);
    if (ns?.endsWith("svg")) {
      return newJSXNode({
        tag: "title",
        props
      });
    }
    return documentMetadataTag("title", props, void 0, false, false);
  };
  var script = (props) => {
    if (!props || ["src", "async"].some((k) => !props[k])) {
      return newJSXNode({
        tag: "style",
        props
      });
    }
    return documentMetadataTag("script", props, 1, false, true);
  };
  var style = (props) => {
    if (!props || !["href", "precedence"].every((k) => k in props)) {
      return newJSXNode({
        tag: "style",
        props
      });
    }
    props["data-href"] = props.href;
    delete props.href;
    return documentMetadataTag("style", props, 2, true, true);
  };
  var link = (props) => {
    if (!props || ["onLoad", "onError"].some((k) => k in props) || props.rel === "stylesheet" && (!("precedence" in props) || "disabled" in props)) {
      return newJSXNode({
        tag: "link",
        props
      });
    }
    return documentMetadataTag("link", props, 1, "precedence" in props, true);
  };
  var meta = (props) => {
    return documentMetadataTag("meta", props, void 0, false, false);
  };
  var customEventFormAction = Symbol();
  var form = (props) => {
    const { action, ...restProps } = props;
    if (typeof action !== "function") {
      ;
      restProps.action = action;
    }
    const [state, setState] = useState([null, false]);
    const onSubmit = useCallback(
      async (ev) => {
        const currentAction = ev.isTrusted ? action : ev.detail[customEventFormAction];
        if (typeof currentAction !== "function") {
          return;
        }
        ev.preventDefault();
        const formData = new FormData(ev.target);
        setState([formData, true]);
        const actionRes = currentAction(formData);
        if (actionRes instanceof Promise) {
          registerAction(actionRes);
          await actionRes;
        }
        setState([null, true]);
      },
      []
    );
    const ref = composeRef(props.ref, (el) => {
      el.addEventListener("submit", onSubmit);
      return () => {
        el.removeEventListener("submit", onSubmit);
      };
    });
    const [data, isDirty] = state;
    state[1] = false;
    return newJSXNode({
      tag: FormContext,
      props: {
        value: {
          pending: data !== null,
          data,
          method: data ? "post" : null,
          action: data ? action : null
        },
        children: newJSXNode({
          tag: "form",
          props: {
            ...restProps,
            ref
          }
        })
      },
      f: isDirty
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
  };
  var formActionableElement = (tag, {
    formAction,
    ...props
  }) => {
    if (typeof formAction === "function") {
      const onClick = useCallback((ev) => {
        ev.preventDefault();
        ev.currentTarget.form.dispatchEvent(
          new CustomEvent("submit", { detail: { [customEventFormAction]: formAction } })
        );
      }, []);
      props.ref = composeRef(props.ref, (el) => {
        el.addEventListener("click", onClick);
        return () => {
          el.removeEventListener("click", onClick);
        };
      });
    }
    return newJSXNode({
      tag,
      props
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
  };
  var input = (props) => formActionableElement("input", props);
  var button = (props) => formActionableElement("button", props);
  Object.assign(domRenderers, {
    title,
    script,
    style,
    link,
    meta,
    form,
    input,
    button
  });

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/jsx-dev-runtime.ts
  var jsxDEV = (tag, props, key) => {
    return newJSXNode({
      tag: typeof tag === "string" && components_exports2[tag] || tag,
      props,
      key
    });
  };
  var Fragment = (props) => jsxDEV("", props, void 0);

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/dom/components.ts
  var ErrorBoundary = ({ children, fallback, fallbackRender, onError }) => {
    const res = Fragment({ children });
    res[DOM_ERROR_HANDLER] = (err) => {
      if (err instanceof Promise) {
        throw err;
      }
      onError?.(err);
      return fallbackRender?.(err) || fallback;
    };
    return res;
  };
  var Suspense = ({
    children,
    fallback
  }) => {
    const res = Fragment({ children });
    res[DOM_ERROR_HANDLER] = (err, retry) => {
      if (!(err instanceof Promise)) {
        throw err;
      }
      err.finally(retry);
      return fallback;
    };
    return res;
  };

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/components.ts
  var errorBoundaryCounter = 0;
  var childrenToString = async (children) => {
    try {
      return children.flat().map((c) => c == null || typeof c === "boolean" ? "" : c.toString());
    } catch (e) {
      if (e instanceof Promise) {
        await e;
        return childrenToString(children);
      } else {
        throw e;
      }
    }
  };
  var ErrorBoundary2 = async ({ children, fallback, fallbackRender, onError }) => {
    if (!children) {
      return raw("");
    }
    if (!Array.isArray(children)) {
      children = [children];
    }
    let fallbackStr;
    const fallbackRes = (error) => {
      onError?.(error);
      return (fallbackStr || fallbackRender?.(error) || "").toString();
    };
    let resArray = [];
    try {
      resArray = children.map(
        (c) => c == null || typeof c === "boolean" ? "" : c.toString()
      );
    } catch (e) {
      fallbackStr = await fallback?.toString();
      if (e instanceof Promise) {
        resArray = [
          e.then(() => childrenToString(children)).catch((e2) => fallbackRes(e2))
        ];
      } else {
        resArray = [fallbackRes(e)];
      }
    }
    if (resArray.some((res) => res instanceof Promise)) {
      fallbackStr ||= await fallback?.toString();
      const index = errorBoundaryCounter++;
      const replaceRe = RegExp(`(<template id="E:${index}"></template>.*?)(.*?)(<!--E:${index}-->)`);
      const caught = false;
      const catchCallback = ({ error, buffer }) => {
        if (caught) {
          return "";
        }
        const fallbackResString = fallbackRes(error);
        if (buffer) {
          buffer[0] = buffer[0].replace(replaceRe, fallbackResString);
        }
        return buffer ? "" : `<template data-hono-target="E:${index}">${fallbackResString}</template><script>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${index}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='E:${index}')
d.replaceWith(c.content)
})(document)
<\/script>`;
      };
      return raw(`<template id="E:${index}"></template><!--E:${index}-->`, [
        ({ phase, buffer, context }) => {
          if (phase === HtmlEscapedCallbackPhase.BeforeStream) {
            return;
          }
          return Promise.all(resArray).then(async (htmlArray) => {
            htmlArray = htmlArray.flat();
            const content = htmlArray.join("");
            let html = buffer ? "" : `<template data-hono-target="E:${index}">${content}</template><script>
((d,c) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${index}')
if(!d)return
d.parentElement.insertBefore(c.content,d.nextSibling)
})(document)
<\/script>`;
            if (htmlArray.every((html2) => !html2.callbacks?.length)) {
              if (buffer) {
                buffer[0] = buffer[0].replace(replaceRe, content);
              }
              return html;
            }
            if (buffer) {
              buffer[0] = buffer[0].replace(
                replaceRe,
                (_all, pre, _, post) => `${pre}${content}${post}`
              );
            }
            const callbacks = htmlArray.map((html2) => html2.callbacks || []).flat();
            if (phase === HtmlEscapedCallbackPhase.Stream) {
              html = await resolveCallback(
                html,
                HtmlEscapedCallbackPhase.BeforeStream,
                true,
                context
              );
            }
            let resolvedCount = 0;
            const promises = callbacks.map(
              (c) => (...args) => c(...args)?.then((content2) => {
                resolvedCount++;
                if (buffer) {
                  if (resolvedCount === callbacks.length) {
                    buffer[0] = buffer[0].replace(replaceRe, (_all, _pre, content3) => content3);
                  }
                  buffer[0] += content2;
                  return raw("", content2.callbacks);
                }
                return raw(
                  content2 + (resolvedCount !== callbacks.length ? "" : `<script>
((d,c,n) => {
d=d.getElementById('E:${index}')
if(!d)return
n=d.nextSibling
while(n.nodeType!=8||n.nodeValue!='E:${index}'){n=n.nextSibling}
n.remove()
d.remove()
})(document)
<\/script>`),
                  content2.callbacks
                );
              }).catch((error) => catchCallback({ error, buffer }))
            );
            return raw(html, promises);
          }).catch((error) => catchCallback({ error, buffer }));
        }
      ]);
    } else {
      return raw(resArray.join(""));
    }
  };
  ErrorBoundary2[DOM_RENDERER] = ErrorBoundary;

  // https://jsr.io/@hono/hono/4.5.1/src/jsx/streaming.ts
  var suspenseCounter = 0;
  var Suspense2 = async ({
    children,
    fallback
  }) => {
    if (!children) {
      return fallback.toString();
    }
    if (!Array.isArray(children)) {
      children = [children];
    }
    let resArray = [];
    const stackNode = { [DOM_STASH]: [0, []] };
    const popNodeStack = (value) => {
      buildDataStack.pop();
      return value;
    };
    try {
      stackNode[DOM_STASH][0] = 0;
      buildDataStack.push([[], stackNode]);
      resArray = children.map(
        (c) => c == null || typeof c === "boolean" ? "" : c.toString()
      );
    } catch (e) {
      if (e instanceof Promise) {
        resArray = [
          e.then(() => {
            stackNode[DOM_STASH][0] = 0;
            buildDataStack.push([[], stackNode]);
            return childrenToString(children).then(popNodeStack);
          })
        ];
      } else {
        throw e;
      }
    } finally {
      popNodeStack();
    }
    if (resArray.some((res) => res instanceof Promise)) {
      const index = suspenseCounter++;
      const fallbackStr = await fallback.toString();
      return raw(`<template id="H:${index}"></template>${fallbackStr}<!--/$-->`, [
        ...fallbackStr.callbacks || [],
        ({ phase, buffer, context }) => {
          if (phase === HtmlEscapedCallbackPhase.BeforeStream) {
            return;
          }
          return Promise.all(resArray).then(async (htmlArray) => {
            htmlArray = htmlArray.flat();
            const content = htmlArray.join("");
            if (buffer) {
              buffer[0] = buffer[0].replace(
                new RegExp(`<template id="H:${index}"></template>.*?<!--/\\$-->`),
                content
              );
            }
            let html = buffer ? "" : `<template data-hono-target="H:${index}">${content}</template><script>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('H:${index}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='/$')
d.replaceWith(c.content)
})(document)
<\/script>`;
            const callbacks = htmlArray.map((html2) => html2.callbacks || []).flat();
            if (!callbacks.length) {
              return html;
            }
            if (phase === HtmlEscapedCallbackPhase.Stream) {
              html = await resolveCallback(html, HtmlEscapedCallbackPhase.BeforeStream, true, context);
            }
            return raw(html, callbacks);
          });
        }
      ]);
    } else {
      return raw(resArray.join(""));
    }
  };
  Suspense2[DOM_RENDERER] = Suspense;
  var textEncoder = new TextEncoder();

  // src/client/index.tsx
  function Counter() {
    const [count, setCount] = useState(0);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Count: ", count), /* @__PURE__ */ React.createElement("button", { onClick: () => setCount(count + 1) }, "Increment"), /* @__PURE__ */ React.createElement(LoremIpsum, null));
  }
  render(/* @__PURE__ */ React.createElement(Counter, null), document.querySelector("main"));
})();
//# sourceMappingURL=client.js.map
