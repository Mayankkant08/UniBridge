"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalStatus = exports.OutpassStatus = exports.OutpassType = void 0;
// Outpass Types
var OutpassType;
(function (OutpassType) {
    OutpassType["DAY_OUTPASS"] = "DAY_OUTPASS";
    OutpassType["LEAVE_OUTPASS"] = "LEAVE_OUTPASS";
})(OutpassType || (exports.OutpassType = OutpassType = {}));
var OutpassStatus;
(function (OutpassStatus) {
    OutpassStatus["PENDING"] = "PENDING";
    OutpassStatus["PARENT_APPROVED"] = "PARENT_APPROVED";
    OutpassStatus["APPROVED"] = "APPROVED";
    OutpassStatus["REJECTED"] = "REJECTED";
    OutpassStatus["CANCELED"] = "CANCELED";
    OutpassStatus["ONGOING"] = "ONGOING";
    OutpassStatus["EXPIRED"] = "EXPIRED";
})(OutpassStatus || (exports.OutpassStatus = OutpassStatus = {}));
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "PENDING";
    ApprovalStatus["APPROVED"] = "APPROVED";
    ApprovalStatus["REJECTED"] = "REJECTED";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
//# sourceMappingURL=index.js.map