var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#decec5', '#8f7f80'],
                ['#b8abb3', '#523c59'],
                ['#e0e3d8', '#dbcccc']
            ]
        }
    }
});