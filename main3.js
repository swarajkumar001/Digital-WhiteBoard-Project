var ismousedown = false
window.onload = function () {
    const mysmooth = document.querySelector('#mysmooth')
    const mycolorlabel = document.querySelector('#mycolorlable')
    const mylabel = document.querySelector('#mylabel')
    const myrange = document.querySelector('#myrange')
    const mycolor = document.querySelector('#mycolor')
    const mycanvas = document.querySelector('#mycanvas')
    const context = mycanvas.getContext('2d')
    mycanvas.width = window.innerWidth
    mycanvas.height = window.innerHeight
    mycanvas.onmousedown = startDrawing
    mycanvas.onmousemove = keepDrawing
    mycanvas.onmouseup = stopDrawing
    mycolor.onchange = chooseColor
    myrange.oninput = setThickness
    mysmooth.oninput = setSmooth
    smoothingFactor = mysmooth.value
    var prevX, prevY
    function setSmooth(e) {
        smoothingFactor = e.target.value

    }
    
    function startDrawing(e) {
        ismousedown = true
        context.beginPath()
        context.lineWidth = myrange.value
        prevX = e.pageX - mycanvas.offsetLeft
        prevY = e.pageY - mycanvas.offsetTop
        context.moveTo(e.pageX - mycanvas.offsetLeft, e.pageY - mycanvas.offsetTop)
        console.log(e.pageX)
    }
 
    function keepDrawing(e) {
        if (ismousedown) {
            x = e.pageX - mycanvas.offsetLeft
            y = e.pageY - mycanvas.offsetTop
            context.lineCap = 'butt'
            context.lineJoin = 'butt'
            procX = (prevX+x)/2
            procY = (prevY+y)/2
            // context.lineTo(x,y)
            // context.quadraticCurveTo(e.pageX - mycanvas.offsetLeft, e.pageY-mycanvas.offsetTop)
            context.quadraticCurveTo( procX, procY,x,y)
            // context.quadraticCurveTo(x,y,procX, procY)

            prevX = x
            prevY = y
            context.stroke()
        }

    }
    function stopDrawing(e) {
        ismousedown = false
        context.closePath()
    }
    function chooseColor(event) {
        mycolorlabel.innerHTML = event.target.value
        context.strokeStyle = event.target.value
    }
    function setThickness(e) {
        mylabel.innerHTML = e.target.value
        context.lineWidth = e.target.value
    }
    // window.addEventListener('resize',()=>{
    //     mycanvas.width=window.innerWidth
    //     mycanvas.height=window.innerHeight
    // })
    window.onresize = makeResponsive
    function makeResponsive(e) {
        mycanvas.width = window.innerWidth
        mycanvas.height = window.innerHeight
    }
} 