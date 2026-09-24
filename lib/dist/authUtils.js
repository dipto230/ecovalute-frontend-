"use strict";
exports.__esModule = true;
exports.isValidRedirectForRole = exports.getDefaultDashboardRoute = exports.getRouteOwner = exports.isRouteMatches = exports.patientProtectedRoutes = exports.adminProtectedRoutes = exports.doctorProtectedRoutes = exports.commonProtectedRoutes = exports.isAuthRoute = exports.authRoutes = void 0;
exports.authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];
exports.isAuthRoute = function (pathname) {
    return exports.authRoutes.some(function (router) { return router === pathname; });
};
exports.commonProtectedRoutes = {
    exact: ["/my-profile", "/change-password"],
    pattern: []
};
exports.doctorProtectedRoutes = {
    pattern: [/^\/vendor\/dashboard/],
    exact: []
};
exports.adminProtectedRoutes = {
    pattern: [/^\/admin\/dashboard/],
    exact: []
};
// export const superAdminProtectedRoutes : RouteConfig = {
//     pattern: [/^\/admin\/dashboard/ ], // Matches any path that starts with /super-admin/dashboard
//     exact : []
// }
exports.patientProtectedRoutes = {
    pattern: [/^\/dashboard/],
    exact: ["/payment/success"]
};
exports.isRouteMatches = function (pathname, routes) {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some(function (pattern) { return pattern.test(pathname); });
};
exports.getRouteOwner = function (pathname) {
    if (exports.isRouteMatches(pathname, exports.doctorProtectedRoutes)) {
        return "VENDOR";
    }
    // if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
    //     return "SUPER_ADMIN";
    // }
    if (exports.isRouteMatches(pathname, exports.adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (exports.isRouteMatches(pathname, exports.patientProtectedRoutes)) {
        return "CUSTOMER";
    }
    if (exports.isRouteMatches(pathname, exports.commonProtectedRoutes)) {
        return "COMMON";
    }
    return null; // public route
};
exports.getDefaultDashboardRoute = function (role) {
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "VENDOR") {
        return "/vendor/dashboard";
    }
    if (role === "CUSTOMER") {
        return "/dashboard";
    }
    return "/";
};
exports.isValidRedirectForRole = function (redirectPath, role) {
    var unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;
    role = unifySuperAdminAndAdminRole;
    var routeOwner = exports.getRouteOwner(redirectPath);
    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }
    if (routeOwner === role) {
        return true;
    }
    return false;
};
