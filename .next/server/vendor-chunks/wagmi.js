"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/wagmi";
exports.ids = ["vendor-chunks/wagmi"];
exports.modules = {

/***/ "(ssr)/./node_modules/wagmi/dist/esm/context.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/context.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WagmiContext: () => (/* binding */ WagmiContext),\n/* harmony export */   WagmiProvider: () => (/* binding */ WagmiProvider)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _hydrate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hydrate.js */ \"(ssr)/./node_modules/wagmi/dist/esm/hydrate.js\");\n/* __next_internal_client_entry_do_not_use__ WagmiContext,WagmiProvider auto */ \n\nconst WagmiContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);\nfunction WagmiProvider(parameters) {\n    const { children, config } = parameters;\n    const props = {\n        value: config\n    };\n    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_hydrate_js__WEBPACK_IMPORTED_MODULE_1__.Hydrate, parameters, /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WagmiContext.Provider, props, children));\n} //# sourceMappingURL=context.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vY29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O2dGQUdvRDtBQUNkO0FBRS9CLE1BQU0sWUFBWSxpQkFBRyxvREFBYSxDQUV2QyxTQUFTLENBQUM7QUFRTixTQUFVLGFBQWEsQ0FDM0IsVUFBdUQ7SUFFdkQsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVO0lBRXZDLE1BQU0sS0FBSyxHQUFHO1FBQUUsS0FBSyxFQUFFLE1BQU07SUFBQSxDQUFFO0lBQy9CLHFCQUFPLG9EQUFhLENBQ2xCLGdEQUFPLEVBQ1AsVUFBVSxnQkFDVixvREFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUN0RDtBQUNILENBQUMiLCJzb3VyY2VzIjpbIkM6XFxzcmNcXGNvbnRleHQudHMiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/context.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/errors/base.js":
/*!****************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/errors/base.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseError: () => (/* binding */ BaseError)\n/* harmony export */ });\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wagmi/core */ \"(ssr)/./node_modules/@wagmi/core/dist/esm/errors/base.js\");\n/* harmony import */ var _utils_getVersion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getVersion.js */ \"(ssr)/./node_modules/wagmi/dist/esm/utils/getVersion.js\");\n\n\nclass BaseError extends _wagmi_core__WEBPACK_IMPORTED_MODULE_0__.BaseError {\n    constructor() {\n        super(...arguments);\n        Object.defineProperty(this, \"name\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: 'WagmiError'\n        });\n    }\n    get docsBaseUrl() {\n        return 'https://wagmi.sh/react';\n    }\n    get version() {\n        return (0,_utils_getVersion_js__WEBPACK_IMPORTED_MODULE_1__.getVersion)();\n    }\n}\n//# sourceMappingURL=base.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vZXJyb3JzL2Jhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBQ0Q7QUFDN0Msd0JBQXdCLGtEQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFVO0FBQ3pCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXGdpb01JTlQ3XFxub2RlX21vZHVsZXNcXHdhZ21pXFxkaXN0XFxlc21cXGVycm9yc1xcYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgYXMgQ29yZUVycm9yIH0gZnJvbSAnQHdhZ21pL2NvcmUnO1xuaW1wb3J0IHsgZ2V0VmVyc2lvbiB9IGZyb20gJy4uL3V0aWxzL2dldFZlcnNpb24uanMnO1xuZXhwb3J0IGNsYXNzIEJhc2VFcnJvciBleHRlbmRzIENvcmVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm5hbWVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6ICdXYWdtaUVycm9yJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IGRvY3NCYXNlVXJsKCkge1xuICAgICAgICByZXR1cm4gJ2h0dHBzOi8vd2FnbWkuc2gvcmVhY3QnO1xuICAgIH1cbiAgICBnZXQgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldFZlcnNpb24oKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/errors/base.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/errors/context.js":
/*!*******************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/errors/context.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WagmiProviderNotFoundError: () => (/* binding */ WagmiProviderNotFoundError)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"(ssr)/./node_modules/wagmi/dist/esm/errors/base.js\");\n\nclass WagmiProviderNotFoundError extends _base_js__WEBPACK_IMPORTED_MODULE_0__.BaseError {\n    constructor() {\n        super('`useConfig` must be used within `WagmiProvider`.', {\n            docsPath: '/api/WagmiProvider',\n        });\n        Object.defineProperty(this, \"name\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: 'WagmiProviderNotFoundError'\n        });\n    }\n}\n//# sourceMappingURL=context.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vZXJyb3JzL2NvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBc0M7QUFDL0IseUNBQXlDLCtDQUFTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXGdpb01JTlQ3XFxub2RlX21vZHVsZXNcXHdhZ21pXFxkaXN0XFxlc21cXGVycm9yc1xcY29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tICcuL2Jhc2UuanMnO1xuZXhwb3J0IGNsYXNzIFdhZ21pUHJvdmlkZXJOb3RGb3VuZEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2B1c2VDb25maWdgIG11c3QgYmUgdXNlZCB3aXRoaW4gYFdhZ21pUHJvdmlkZXJgLicsIHtcbiAgICAgICAgICAgIGRvY3NQYXRoOiAnL2FwaS9XYWdtaVByb3ZpZGVyJyxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm5hbWVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6ICdXYWdtaVByb3ZpZGVyTm90Rm91bmRFcnJvcidcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGV4dC5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/errors/context.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/hooks/useConfig.js":
/*!********************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/hooks/useConfig.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useConfig: () => (/* binding */ useConfig)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context.js */ \"(ssr)/./node_modules/wagmi/dist/esm/context.js\");\n/* harmony import */ var _errors_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/context.js */ \"(ssr)/./node_modules/wagmi/dist/esm/errors/context.js\");\n/* __next_internal_client_entry_do_not_use__ useConfig auto */ \n\n\n/** https://wagmi.sh/react/api/hooks/useConfig */ function useConfig(parameters = {}) {\n    const config = parameters.config ?? (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_1__.WagmiContext);\n    if (!config) throw new _errors_context_js__WEBPACK_IMPORTED_MODULE_2__.WagmiProviderNotFoundError();\n    return config;\n} //# sourceMappingURL=useConfig.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vaG9va3MvdXNlQ29uZmlnLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7K0RBR2tDO0FBRVU7QUFDcUI7QUFRakUsaURBQWlELENBQzNDLFNBQVUsU0FBUyxDQUN2QixhQUEwQyxFQUFFO0lBRTVDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksaURBQVUsQ0FBQyxxREFBWSxDQUFDO0lBQzVELElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLDBFQUEwQixFQUFFO0lBQ25ELE9BQU8sTUFBcUM7QUFDOUMsQ0FBQyIsInNvdXJjZXMiOlsiQzpcXHNyY1xcaG9va3NcXHVzZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/hooks/useConfig.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/hydrate.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/hydrate.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hydrate: () => (/* binding */ Hydrate)\n/* harmony export */ });\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wagmi/core */ \"(ssr)/./node_modules/@wagmi/core/dist/esm/hydrate.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* __next_internal_client_entry_do_not_use__ Hydrate auto */ \n\nfunction Hydrate(parameters) {\n    const { children, config, initialState, reconnectOnMount = true } = parameters;\n    const { onMount } = (0,_wagmi_core__WEBPACK_IMPORTED_MODULE_1__.hydrate)(config, {\n        initialState,\n        reconnectOnMount\n    });\n    // Hydrate for non-SSR\n    if (!config._internal.ssr) onMount();\n    // Hydrate for SSR\n    const active = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);\n    // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"Hydrate.useEffect\": ()=>{\n            if (!active.current) return;\n            if (!config._internal.ssr) return;\n            onMount();\n            return ({\n                \"Hydrate.useEffect\": ()=>{\n                    active.current = false;\n                }\n            })[\"Hydrate.useEffect\"];\n        }\n    }[\"Hydrate.useEffect\"], []);\n    return children;\n} //# sourceMappingURL=hydrate.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vaHlkcmF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7NkRBRXdFO0FBQ1o7QUFRdEQsU0FBVSxPQUFPLENBQUMsVUFBaUQ7SUFDdkUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxHQUFHLFVBQVU7SUFFOUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLG9EQUFPLENBQUMsTUFBTSxFQUFFO1FBQ2xDLFlBQVk7UUFDWixnQkFBZ0I7S0FDakIsQ0FBQztJQUVGLHNCQUFzQjtJQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBRXBDLGtCQUFrQjtJQUNsQixNQUFNLE1BQU0sR0FBRyw2Q0FBTSxDQUFDLElBQUksQ0FBQztJQUMzQixtRkFBbUY7SUFDbkYsZ0RBQVM7NkJBQUMsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTTtZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTTtZQUNqQyxPQUFPLEVBQUU7WUFDVDtxQ0FBTyxHQUFHLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLO2dCQUN4QixDQUFDOztRQUNILENBQUM7NEJBQUUsRUFBRSxDQUFDO0lBRU4sT0FBTyxRQUF3QjtBQUNqQyxDQUFDIiwic291cmNlcyI6WyJDOlxcc3JjXFxoeWRyYXRlLnRzIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/hydrate.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/utils/getVersion.js":
/*!*********************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/utils/getVersion.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getVersion: () => (/* binding */ getVersion)\n/* harmony export */ });\n/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../version.js */ \"(ssr)/./node_modules/wagmi/dist/esm/version.js\");\n\nconst getVersion = () => `wagmi@${_version_js__WEBPACK_IMPORTED_MODULE_0__.version}`;\n//# sourceMappingURL=getVersion.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vdXRpbHMvZ2V0VmVyc2lvbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUF3QztBQUNqQyxrQ0FBa0MsZ0RBQU8sQ0FBQztBQUNqRCIsInNvdXJjZXMiOlsiQzpcXGdpb01JTlQ3XFxub2RlX21vZHVsZXNcXHdhZ21pXFxkaXN0XFxlc21cXHV0aWxzXFxnZXRWZXJzaW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi92ZXJzaW9uLmpzJztcbmV4cG9ydCBjb25zdCBnZXRWZXJzaW9uID0gKCkgPT4gYHdhZ21pQCR7dmVyc2lvbn1gO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2V0VmVyc2lvbi5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/utils/getVersion.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/version.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/version.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   version: () => (/* binding */ version)\n/* harmony export */ });\nconst version = '2.14.12';\n//# sourceMappingURL=version.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vdmVyc2lvbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUCIsInNvdXJjZXMiOlsiQzpcXGdpb01JTlQ3XFxub2RlX21vZHVsZXNcXHdhZ21pXFxkaXN0XFxlc21cXHZlcnNpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi4xNC4xMic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/version.js\n");

/***/ })

};
;