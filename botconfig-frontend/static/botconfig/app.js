var connecting = null
let options = new Map()
let connections = new Map()
var blockIDCount = 0

$(document).ready(function () {
    console.log("ready!")
    addNewBlock()
    moveBlock(0, 200, 200)
    addNewBlock()
})

function addNewBlock() {
    let template = $('#block-template').html()
    Mustache.parse(template)
    let blockID = blockIDCount++
    let rendered = Mustache.render(template, { blockID: blockID })
    let block = $(rendered).appendTo('#wrapper')
    block.css({ top: 0, left: 0 })
    options.set('' + blockID, []);
}

function addNewOption(e) {
    let blockID = e.target.id.substring(4)
    console.log('new element to block : ' + blockID)
    let template = $('#option-template').html()
    Mustache.parse(template)
    let opt = options.get(blockID)
    let optID = opt.length
    let rendered = Mustache.render(template, { blockID: blockID, optID: optID })
    $('#list-' + blockID).append(rendered);
    opt.push(
        {
            option: '',
            id: optID,
            connectedTo: null
        });
}

function move(e) {
    let blockId = e.target.id.substring(4)
    let x = $('#posX-' + blockId).val()
    let y = $('#posY-' + blockId).val()
    moveBlock(blockId, x, y)
}

function moveBlock(id, x, y) {
    $('#blk-' + id).css({ left: x + "px", top: y + "px", position: 'absolute' })
    drawConnections()
}
function connect(e) {
    let delimit = e.target.id.lastIndexOf('-')
    let blockID = e.target.id.substring(4, delimit)
    let optID = e.target.id.substring(delimit + 1)
    if (connecting === null) {
        connecting = { blockID: blockID, optID: optID }
        // Sever old connection
        $('#' + e.target.id).removeClass('disconnected connected').addClass('connecting')
    } else {
        connectBlocks(connecting, { blockID: blockID, optID: optID })
    }
}

function disconnectBlocks(a, b) {
    console.log('Disconnecting a[' + a + '] from b[' + b + ']')
    drawConnections()
}

function connectBlocks(a, b) {
    console.log('Connecting a[' + a.blockID + ',' + a.optID + '] to b[' + b.blockID + ',' + b.optID + ']')
    let opts = options.get(a.blockID)
    opts[parseInt(a.optID)].connectedTo = b
    connections.set(a, b)
    let conA = getConnector(a)
    let conB = getConnector(b)
    conA.removeClass('disconnected connecting').addClass('connected')
    conB.removeClass('disconnected connecting').addClass('connected')
    drawConnections()
    connecting = null;
}

function getConnector(connector) {
    return $('#con-' + connector.blockID + '-' + connector.optID)
}

function drawConnections() {
    let can = $('#can')[0]
    let ctx = can.getContext('2d')
    ctx.clearRect(0, 0, can.width, can.height)
    ctx.lineWidth = 2

    connections.forEach(function (item, key, map) {
        let a = getConnector(item)
        let b = getConnector(key)
        let ax = a.offset().left
        let ay = a.offset().top
        let bx = b.offset().left
        let by = b.offset().top
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.quadraticCurveTo(bx, ay, bx, by)
        ctx.stroke()
    })
}
