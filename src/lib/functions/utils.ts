const layouts = {
    default: [
        "default", "d", ""
    ],
    pluralkit: [
        "pluralkit", "pk"
    ]
}

export function selectLayout(params: URLSearchParams) {
    let layout = "default";
    const l = params.get("layout") || params.get("l")
    if (l) {
        Object.entries(layouts).forEach(([key, value]) => {
            if (value.includes(l))
                layout = key
        })
    }

    return layout;
}

export function shortenLayout(layout: string) {
    let short = ""
    Object.entries(layouts).forEach(([key, value]) => {
        if (layout === key) short = value[value.length - 1]
    })
    if (short) short = `l=${short}`
    return short
}