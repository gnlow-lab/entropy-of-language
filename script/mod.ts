const parseTsv =
    (tsv: string) =>
    tsv.split("\n")
    .map(line => line.split("\t"))
    .map(([word, count]) => [word, Number(count)] as [string, number])

const getEntropy =
    (ns: number[]) =>
    ns
    .map(n => n * Math.log2(1/n))
    .reduce((a, b) => a + b, 0)

const file = await Deno.readTextFile("data/korean.tsv")
const words = parseTsv(file)
const counts = words.map(([_, count]) => count)
const total = counts.reduce((a, b) => a + b, 0)
const entropy = getEntropy(counts)
console.log(total)
console.log(entropy)

    