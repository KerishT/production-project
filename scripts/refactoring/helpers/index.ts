export function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];

    return layers.some((layer) => value.startsWith(layer));
}
