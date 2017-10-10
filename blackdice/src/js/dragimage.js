
function DragImage(src, x, y) {
    
    var that = this;
    var startX = x,
        startY = y;
    var drag = false;
    
    this.x = x;
    this.y = y;
    var img = new Image();
    img.src = src;
    this.update = function() {
        if (mousePressed ) {
            
                var left = that.x;
                var right = that.x + img.width;
                var top = that.y;
                var bottom = that.y + img.height;
                if (!drag) {
                    startX = mouseX - that.x;
                    startY = mouseY - that.y;
                }

                if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
                    if (!dragging){
            			dragging = true;
                        drag = true;
                        checkIfSent = true;
                    }
                    
                }
            
        } else {
             
            drag = false;
            checkIfSent = false;
        }

        if (drag) {
            that.x = getXPosition(mouseX);
            that.y = getYPosition(mouseY);
        }
        
        context.drawImage(img, that.x, that.y);
    }

}