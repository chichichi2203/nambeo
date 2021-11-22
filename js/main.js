 /**
     * Author 
     */

    var offsetX = $("#loveHeart").width() / 2;
    var offsetY = $("#loveHeart").height() / 2 - 55;
    // Cài đặt thời gian
    var together = new Date();
    together.setFullYear(2021, 04, 13);
    together.setHours(20);
    together.setMinutes(0);
    together.setSeconds(0);
    together.setMilliseconds(0);

    $('#startDate').text('*' + formatDate(together) + ','); // Thời gian làm quen
    $('#untilDate').text('*' + formatDate(new Date()) + '.'); // Hôm nay


    if (!document.createElement('canvas').getContext) {
        var msg = document.createElement("div");
        msg.id = "errorMsg";
        msg.innerHTML = "您的浏览器不支持 HTML5!<br/>推荐使用 Chrome 14+/IE 9+/Firefox 7+/Safari 4+ 等高版本的主流浏览器";
        document.body.appendChild(msg);
        $("#code").css("display", "none")
        $("#copyright").css("position", "absolute");
        $("#copyright").css("bottom", "10px");
        document.execCommand("stop");
    } else {

        
        setTimeout(function() {
            startHeartAnimation();
        }, 110000);

        // tính thời gian để yêu
        timeElapse(together);
        setInterval(function() {
            timeElapse(together);
        }, 500);

        // Điều chỉnh vị trí
        adjustCodePosition();
        $("#code").typewriter();

        //Dừng gõ âm thanh sau khi nhập
        setInterval(musicPaused(),90000);

        // Băng truyền hình ảnh
        photoAnimation();
    }