/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵRuntimeError as RuntimeError } from '@angular/core';
/**
 * Asserts that the application is in development mode. Throws an error if the application is in
 * production mode. This assert can be used to make sure that there is no dev-mode code invoked in
 * the prod mode accidentally.
 */
export function assertDevMode(checkName) {
    if (!ngDevMode) {
        throw new RuntimeError(2958 /* RuntimeErrorCode.UNEXPECTED_DEV_MODE_CHECK_IN_PROD_MODE */, `Unexpected invocation of the ${checkName} in the prod mode. ` +
            `Please make sure that the prod mode is enabled for production builds.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9uZ19vcHRpbWl6ZWRfaW1hZ2UvYXNzZXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUk1RDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxTQUFpQjtJQUM3QyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsTUFBTSxJQUFJLFlBQVkscUVBRWxCLGdDQUFnQyxTQUFTLHFCQUFxQjtZQUMxRCx1RUFBdUUsQ0FBQyxDQUFDO0tBQ2xGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vLi4vZXJyb3JzJztcblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIGFwcGxpY2F0aW9uIGlzIGluIGRldmVsb3BtZW50IG1vZGUuIFRocm93cyBhbiBlcnJvciBpZiB0aGUgYXBwbGljYXRpb24gaXMgaW5cbiAqIHByb2R1Y3Rpb24gbW9kZS4gVGhpcyBhc3NlcnQgY2FuIGJlIHVzZWQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgbm8gZGV2LW1vZGUgY29kZSBpbnZva2VkIGluXG4gKiB0aGUgcHJvZCBtb2RlIGFjY2lkZW50YWxseS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydERldk1vZGUoY2hlY2tOYW1lOiBzdHJpbmcpIHtcbiAgaWYgKCFuZ0Rldk1vZGUpIHtcbiAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlVORVhQRUNURURfREVWX01PREVfQ0hFQ0tfSU5fUFJPRF9NT0RFLFxuICAgICAgICBgVW5leHBlY3RlZCBpbnZvY2F0aW9uIG9mIHRoZSAke2NoZWNrTmFtZX0gaW4gdGhlIHByb2QgbW9kZS4gYCArXG4gICAgICAgICAgICBgUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBwcm9kIG1vZGUgaXMgZW5hYmxlZCBmb3IgcHJvZHVjdGlvbiBidWlsZHMuYCk7XG4gIH1cbn1cbiJdfQ==