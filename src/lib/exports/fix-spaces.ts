export async function fixspace(input: string | number, target: number) {
    input = input.toString()
    if (input.length > target) return input
    const spaces = target - input.length
    for (let i = 0; i < spaces; i++) {
        input = input += ' '
    }
    return input
}