const parseTsv =
    (tsv: string) =>
    tsv.split("\n")
    .map(line => line.split("\t"))
    .map(([char, count]) => [char, Number(count)] as [string, number])

const getEntropy =
    (ns: number[]) =>
    ns
    .map(n => n * Math.log2(1/n))
    .reduce((a, b) => a + b, 0)

const f = async (name: string) => {
    const file = await Deno.readTextFile(`data/${name}.tsv`)
    const chars = parseTsv(file)
    const counts = chars.map(([_, count]) => count)
    const total = counts.reduce((a, b) => a + b, 0)
    const entropy = getEntropy(counts)
    console.log(name + " " + entropy.toFixed(2))
}

await f("english")
await f("german")
await f("korean")
await f("japanese")
await f("chinese")
await f("zasokese")
await f("italian")