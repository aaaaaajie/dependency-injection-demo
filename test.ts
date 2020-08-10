const paths = [
    "./t1"
];
(async () => {
    const a = await import(paths[0])
    console.log(a)
})()
