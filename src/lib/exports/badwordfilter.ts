export async function fixword(input: string) {
    input = input
        .replace(/nig+ger/ig, "")
        .replace(/nig+ga/ig, "")
        .replace(/retard/ig, "")
        .replace(/gay/ig, "")
        .replace(/lesbian/ig, "")
        .replace(/cock/ig, "")
    return input
}