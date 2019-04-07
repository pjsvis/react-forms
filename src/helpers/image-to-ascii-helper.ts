import imageToAscii from "image-to-ascii";

imageToAscii(
"https://d2vqpl3tx84ay5.cloudfront.net/500x/tumblr_lsus01g1ik1qies3uo1_400.png",
{
    colored: false,
}, (err: any, converted: boolean) => {
    console.log(err || converted);
});

imageToAscii() /*?*/