/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EMPTY, from, of, throwError } from 'rxjs';
import { catchError, concatMap, first, map, mapTo, mergeMap, takeLast, tap } from 'rxjs/operators';
import { inheritedParamsDataResolve } from '../router_state';
import { RouteTitleKey } from '../shared';
import { wrapIntoObservable } from '../utils/collection';
import { getClosestRouteInjector } from '../utils/config';
import { getTokenOrFunctionIdentity } from '../utils/preactivation';
import { isEmptyError } from '../utils/type_guards';
export function resolveData(paramsInheritanceStrategy, injector) {
    return mergeMap(t => {
        const { targetSnapshot, guards: { canActivateChecks } } = t;
        if (!canActivateChecks.length) {
            return of(t);
        }
        let canActivateChecksResolved = 0;
        return from(canActivateChecks)
            .pipe(concatMap(check => runResolve(check.route, targetSnapshot, paramsInheritanceStrategy, injector)), tap(() => canActivateChecksResolved++), takeLast(1), mergeMap(_ => canActivateChecksResolved === canActivateChecks.length ? of(t) : EMPTY));
    });
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, injector) {
    const config = futureARS.routeConfig;
    const resolve = futureARS._resolve;
    if (config?.title !== undefined && !hasStaticTitle(config)) {
        resolve[RouteTitleKey] = config.title;
    }
    return resolveNode(resolve, futureARS, futureRSS, injector).pipe(map((resolvedData) => {
        futureARS._resolvedData = resolvedData;
        futureARS.data = inheritedParamsDataResolve(futureARS, paramsInheritanceStrategy).resolve;
        if (config && hasStaticTitle(config)) {
            futureARS.data[RouteTitleKey] = config.title;
        }
        return null;
    }));
}
function resolveNode(resolve, futureARS, futureRSS, injector) {
    const keys = getDataKeys(resolve);
    if (keys.length === 0) {
        return of({});
    }
    const data = {};
    return from(keys).pipe(mergeMap(key => getResolver(resolve[key], futureARS, futureRSS, injector)
        .pipe(first(), tap((value) => {
        data[key] = value;
    }))), takeLast(1), mapTo(data), catchError((e) => isEmptyError(e) ? EMPTY : throwError(e)));
}
function getDataKeys(obj) {
    return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function getResolver(injectionToken, futureARS, futureRSS, injector) {
    const closestInjector = getClosestRouteInjector(futureARS) ?? injector;
    const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
    const resolverValue = resolver.resolve ?
        resolver.resolve(futureARS, futureRSS) :
        closestInjector.runInContext(() => resolver(futureARS, futureRSS));
    return wrapIntoObservable(resolverValue);
}
function hasStaticTitle(config) {
    return typeof config.title === 'string' || config.title === null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZV9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9vcGVyYXRvcnMvcmVzb2x2ZV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUF3QyxFQUFFLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJakcsT0FBTyxFQUF5QiwwQkFBMEIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxNQUFNLFVBQVUsV0FBVyxDQUN2Qix5QkFBK0MsRUFDL0MsUUFBNkI7SUFDL0IsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEIsTUFBTSxFQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBQyxpQkFBaUIsRUFBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZDtRQUNELElBQUkseUJBQXlCLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8s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QU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FDaEIsY0FBMkMsRUFBRSxTQUFpQyxFQUM5RSxTQUE4QixFQUFFLFFBQTZCO0lBQy9ELE1BQU0sZUFBZSxHQUFHLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUN2RSxNQUFNLFFBQVEsR0FBRywwQkFBMEIsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0UsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsT0FBTyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBYTtJQUNuQyxPQUFPLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Vudmlyb25tZW50SW5qZWN0b3IsIFByb3ZpZGVyVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFTVBUWSwgZnJvbSwgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGNvbmNhdE1hcCwgZmlyc3QsIG1hcCwgbWFwVG8sIG1lcmdlTWFwLCB0YWtlTGFzdCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UmVzb2x2ZURhdGEsIFJvdXRlfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uVHJhbnNpdGlvbn0gZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgaW5oZXJpdGVkUGFyYW1zRGF0YVJlc29sdmUsIFJvdXRlclN0YXRlU25hcHNob3R9IGZyb20gJy4uL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge1JvdXRlVGl0bGVLZXl9IGZyb20gJy4uL3NoYXJlZCc7XG5pbXBvcnQge3dyYXBJbnRvT2JzZXJ2YWJsZX0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge2dldENsb3Nlc3RSb3V0ZUluamVjdG9yfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtnZXRUb2tlbk9yRnVuY3Rpb25JZGVudGl0eX0gZnJvbSAnLi4vdXRpbHMvcHJlYWN0aXZhdGlvbic7XG5pbXBvcnQge2lzRW1wdHlFcnJvcn0gZnJvbSAnLi4vdXRpbHMvdHlwZV9ndWFyZHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZURhdGEoXG4gICAgcGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneTogJ2VtcHR5T25seSd8J2Fsd2F5cycsXG4gICAgaW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248TmF2aWdhdGlvblRyYW5zaXRpb24+IHtcbiAgcmV0dXJuIG1lcmdlTWFwKHQgPT4ge1xuICAgIGNvbnN0IHt0YXJnZXRTbmFwc2hvdCwgZ3VhcmRzOiB7Y2FuQWN0aXZhdGVDaGVja3N9fSA9IHQ7XG5cbiAgICBpZiAoIWNhbkFjdGl2YXRlQ2hlY2tzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG9mKHQpO1xuICAgIH1cbiAgICBsZXQgY2FuQWN0aXZhdGVDaGVja3NSZXNvbHZlZCA9IDA7XG4gICAgcmV0dXJuIGZyb20oY2FuQWN0aXZhdGVDaGVja3MpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY29uY2F0TWFwKFxuICAgICAgICAgICAgICAgIGNoZWNrID0+XG4gICAgICAgICAgICAgICAgICAgIHJ1blJlc29sdmUoY2hlY2sucm91dGUsIHRhcmdldFNuYXBzaG90ISwgcGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSwgaW5qZWN0b3IpKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiBjYW5BY3RpdmF0ZUNoZWNrc1Jlc29sdmVkKyspLFxuICAgICAgICAgICAgdGFrZUxhc3QoMSksXG4gICAgICAgICAgICBtZXJnZU1hcChfID0+IGNhbkFjdGl2YXRlQ2hlY2tzUmVzb2x2ZWQgPT09IGNhbkFjdGl2YXRlQ2hlY2tzLmxlbmd0aCA/IG9mKHQpIDogRU1QVFkpLFxuICAgICAgICApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuUmVzb2x2ZShcbiAgICBmdXR1cmVBUlM6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGZ1dHVyZVJTUzogUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgICBwYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5OiAnZW1wdHlPbmx5J3wnYWx3YXlzJywgaW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IpIHtcbiAgY29uc3QgY29uZmlnID0gZnV0dXJlQVJTLnJvdXRlQ29uZmlnO1xuICBjb25zdCByZXNvbHZlID0gZnV0dXJlQVJTLl9yZXNvbHZlO1xuICBpZiAoY29uZmlnPy50aXRsZSAhPT0gdW5kZWZpbmVkICYmICFoYXNTdGF0aWNUaXRsZShjb25maWcpKSB7XG4gICAgcmVzb2x2ZVtSb3V0ZVRpdGxlS2V5XSA9IGNvbmZpZy50aXRsZTtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZU5vZGUocmVzb2x2ZSwgZnV0dXJlQVJTLCBmdXR1cmVSU1MsIGluamVjdG9yKS5waXBlKG1hcCgocmVzb2x2ZWREYXRhOiBhbnkpID0+IHtcbiAgICBmdXR1cmVBUlMuX3Jlc29sdmVkRGF0YSA9IHJlc29sdmVkRGF0YTtcbiAgICBmdXR1cmVBUlMuZGF0YSA9IGluaGVyaXRlZFBhcmFtc0RhdGFSZXNvbHZlKGZ1dHVyZUFSUywgcGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSkucmVzb2x2ZTtcbiAgICBpZiAoY29uZmlnICYmIGhhc1N0YXRpY1RpdGxlKGNvbmZpZykpIHtcbiAgICAgIGZ1dHVyZUFSUy5kYXRhW1JvdXRlVGl0bGVLZXldID0gY29uZmlnLnRpdGxlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSkpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTm9kZShcbiAgICByZXNvbHZlOiBSZXNvbHZlRGF0YSwgZnV0dXJlQVJTOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBmdXR1cmVSU1M6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgaW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IpOiBPYnNlcnZhYmxlPGFueT4ge1xuICBjb25zdCBrZXlzID0gZ2V0RGF0YUtleXMocmVzb2x2ZSk7XG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvZih7fSk7XG4gIH1cbiAgY29uc3QgZGF0YToge1trOiBzdHJpbmd8c3ltYm9sXTogYW55fSA9IHt9O1xuICByZXR1cm4gZnJvbShrZXlzKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAga2V5ID0+IGdldFJlc29sdmVyKHJlc29sdmVba2V5XSwgZnV0dXJlQVJTLCBmdXR1cmVSU1MsIGluamVjdG9yKVxuICAgICAgICAgICAgICAgICAgICAgLnBpcGUoZmlyc3QoKSwgdGFwKCh2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKSxcbiAgICAgIHRha2VMYXN0KDEpLFxuICAgICAgbWFwVG8oZGF0YSksXG4gICAgICBjYXRjaEVycm9yKChlOiB1bmtub3duKSA9PiBpc0VtcHR5RXJyb3IoZSBhcyBFcnJvcikgPyBFTVBUWSA6IHRocm93RXJyb3IoZSkpLFxuICApO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhS2V5cyhvYmo6IE9iamVjdCk6IEFycmF5PHN0cmluZ3xzeW1ib2w+IHtcbiAgcmV0dXJuIFsuLi5PYmplY3Qua2V5cyhvYmopLCAuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaildO1xufVxuXG5mdW5jdGlvbiBnZXRSZXNvbHZlcihcbiAgICBpbmplY3Rpb25Ub2tlbjogUHJvdmlkZXJUb2tlbjxhbnk+fEZ1bmN0aW9uLCBmdXR1cmVBUlM6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgZnV0dXJlUlNTOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBpbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3Rvcik6IE9ic2VydmFibGU8YW55PiB7XG4gIGNvbnN0IGNsb3Nlc3RJbmplY3RvciA9IGdldENsb3Nlc3RSb3V0ZUluamVjdG9yKGZ1dHVyZUFSUykgPz8gaW5qZWN0b3I7XG4gIGNvbnN0IHJlc29sdmVyID0gZ2V0VG9rZW5PckZ1bmN0aW9uSWRlbnRpdHkoaW5qZWN0aW9uVG9rZW4sIGNsb3Nlc3RJbmplY3Rvcik7XG4gIGNvbnN0IHJlc29sdmVyVmFsdWUgPSByZXNvbHZlci5yZXNvbHZlID9cbiAgICAgIHJlc29sdmVyLnJlc29sdmUoZnV0dXJlQVJTLCBmdXR1cmVSU1MpIDpcbiAgICAgIGNsb3Nlc3RJbmplY3Rvci5ydW5JbkNvbnRleHQoKCkgPT4gcmVzb2x2ZXIoZnV0dXJlQVJTLCBmdXR1cmVSU1MpKTtcbiAgcmV0dXJuIHdyYXBJbnRvT2JzZXJ2YWJsZShyZXNvbHZlclZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaGFzU3RhdGljVGl0bGUoY29uZmlnOiBSb3V0ZSkge1xuICByZXR1cm4gdHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ3N0cmluZycgfHwgY29uZmlnLnRpdGxlID09PSBudWxsO1xufVxuIl19