/* zasokese_corpus.txt -> zasokese.tsv */

const text = await Deno.readTextFile("data/zasokese_corpus.txt")

const counts = new Map<string, number>()

const unGrave =
    (char: string) =>
    char.normalize("NFD")
        .replace(/\u0300/g, "")
        .normalize()

;[...text].forEach(char => {
    char = char.toLowerCase()
    char = unGrave(char)
    if (!/[' ,\-"«»’?\r\n().]/.test(char))
        counts.set(char, (counts.get(char) || 0) + 1)
})

const total = [...counts.values()].reduce((a, b) => a + b, 0)

const result =
    [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([char, count]) => char + "\t" + count/total)
        .join("\n")

await Deno.writeTextFile("data/zasokese.tsv", result)