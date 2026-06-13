let link = "https://abosukkar.github.io/social/";

new QRCode(document.getElementById("qrcode"), {
    text: link,

    width: 260,
    height: 260,

    /* نفس لون الصورة */
    colorDark: "#000000",
    colorLight: "#ffffff",

    /* أسرع Scan */
    correctLevel: QRCode.CorrectLevel.M
});
