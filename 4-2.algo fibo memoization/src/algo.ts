export const cache = new Map<number, number>();
export function fibo(n: number): number {
    if (cache.has(n)) return cache.get(n)!!;
    if (n === 1) return 0;
    if (n === 2) return 1;
    if (n === 3) return 1;

    let ans = fibo(n - 1) + fibo(n - 2);
    cache.set(n, ans);
    return ans;
}
