export function selectLayout(params: URLSearchParams) {
    const layouts = {
        default: [
            "default", "d", ""
        ],
        pluralkit: [
            "pluralkit", "pk"
        ]
    }
    
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