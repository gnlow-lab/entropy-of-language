/* japanese_orig.json -> japanese.tsv */

const file = await Deno.readTextFile("data/japanese_orig.json")
const data: [string, number][] = JSON.parse(file)

const total =
    data.map(([_, count]) => count)
        .reduce((a, b) => a + b, 0)

const result =
    data.map(([char, count]) => [char, count/total])
    .map(([char, freq]) => char + "\t" + freq)
    .join("\n")

await Deno.writeTextFile("data/japanese.tsv", result)