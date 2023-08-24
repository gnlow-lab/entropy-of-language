import Hangul from "npm:hangul-js"

const pre =
    async (name: string) => {
        const text = await Deno.readTextFile(`udhr/${name}_orig.txt`)

        let result = text
        if (name == "korean") {
            result = Hangul.disassemble(text)
                .join("")
        }
        result = result
            .replace(/[ ,.;'\n\r\t、。]/g, "")

        await Deno.writeTextFile(`udhr/${name}.txt`, result)
        console.log(name + " " + result.length)
    }

await pre("english")
await pre("german")
await pre("italian")
await pre("korean")
await pre("japanese")
await pre("chinese")
//await pre("zasokese")