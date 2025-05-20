// console.test()
console.test = function() {
    console.log("%cHello World!", "color: green; font-size: 20px;");
}

setInterval(function() {
    var currentTime = new Date();
    var logMessagePart1 = "%c" + currentTime.toISOString() + ": ";
    var logMessagePart2 = Math.random() < 0.01 ? "https://example.com" : "test message";

    console.log(logMessagePart1 + "%c" + logMessagePart2, "color: blue; font-size: 16px;", "color: red; font-size: 20px;");
}, 10000);
