/* chinese_orig.tsv -> chinese.tsv */

const file = await Deno.readTextFile("data/chinese_orig.tsv")

const parseTsv =
    (tsv: string) =>
    tsv.split("\n")
    .map(line => line.split("\t"))
    .map(([_i, char, _n, cumFreq]) => [char, Number(cumFreq)] as [string, number])
    .map(([char, cumFreq], i, l) => [char, cumFreq - (l[i-1]?.[1] || 0)])

const result = parseTsv(file)
    .map(([char, count]) => char + "\t" + count)
    .join("\n")

await Deno.writeTextFile("data/chinese.tsv", result)