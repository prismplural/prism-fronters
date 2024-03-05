const layouts = {
    default: [
        "default", "d", ""
    ],
    pluralkit: [
        "pluralkit", "pk"
    ]
}

const cards = {
    default: [
        "default", "small", "s", "d", ""
    ],
    full: [
        "full", "pluralkit", "pk", "f"
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

export function selectCard(params: URLSearchParams) {
    let card = "default";
    const l = params.get("card") || params.get("cards") || params.get("c")
    if (l) {
        Object.entries(cards).forEach(([key, value]) => {
            if (value.includes(l))
                card = key
        })
    }

    return card;
}

export function shortenLayout(layout: string) {
    let short = ""
    Object.entries(layouts).forEach(([key, value]) => {
        if (layout === key) short = value[value.length - 1]
    })
    if (short) short = `l=${short}`
    return short
}

export function shortenCard(card: string) {
    let short = ""
    Object.entries(cards).forEach(([key, value]) => {
        if (card === key) short = value[value.length - 1]
    })
    if (short) short = `c=${short}`
    return short
}

export function addUrlParams(linkParams: string[]) {
    return linkParams.length > 0 ? `?${linkParams.join("&")}` : ""
}