"use client";
"use strict";
exports.__esModule = true;
var vendor_service_1 = require("@/src/services/vendor.service");
var react_query_1 = require("@tanstack/react-query");
var VendorsTable = function () {
    var vendorDataResponse = react_query_1.useQuery({
        queryKey: ["vendors"],
        queryFn: vendor_service_1.getVendors
    }).data;
    var vendors = (vendorDataResponse || []).data;
    console.log(vendors);
    return (React.createElement("div", null, "Vendors Table"));
};
exports["default"] = VendorsTable;
