rows = 10;
cols = 15;
blobCount = rows * cols;
blobSize = 40;

c.width = w = blockSize * cols;
c.height = h = blockSize * rows;

blobs = [];
i = blobCount;
while (i--) blobs[i] = { c: ~~(Math.random() * 5), x: ~~(i / rows), y: i % rows };

function drawItem(colour, isRect, x, y, width, height) {
    // Fill the background
    with (a) {
        fillStyle = "#"+"000f0ff0".substr(colour, 3);
        if (isRect) {
            fillRect(x, y, width, height);
        } else {
            (beginPath(), arc(x, y, w, 0, 0, 0), fill());
        }
    }
}

function draw() {
    // Fill the background
    drawItem(0, 1, 0, 0, w, h);
    
    // Draw blobs
    i = blobCount;
    while (i--) {
        blob = blobs[i];
        drawItem(blob.c, 0, blob.x, blob.y, blobSize / 2)
    }
}

draw();

