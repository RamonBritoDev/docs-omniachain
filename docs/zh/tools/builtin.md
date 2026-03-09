# 原生工具

OmniaChain 中包含的工具可供使用。

＃＃计算器

__代码_块_0__

支持：`+`、`-`、`*`、`/`、`**`、`sqrt`、`sin`、`cos`、`abs`、`log`、`pi`、`e`

##网络搜索

__代码_块_1__

使用 DuckDuckGo（没有 API 密钥）。返回结果的标题+片段。

## HTTP 请求

__代码_块_2__

支持所有具有自动重试功能的 HTTP 方法。

## 文件读/写

__代码_块_3__

## 执行代码

__代码_块_4__

！！！警告“安全”
    在子进程中执行并超时。对于生产，请与“权限”一起使用来控制访问。

## 浏览器导航

__代码_块_5__

！！！注意“要求”
    需要 Playwright: `pip installomniachain[browser] && playwright install chromium`

## 语音转文本

__代码_块_6__

使用可用的最佳后端转录音频。请参阅 [STT](../media/stt.md)。

## 文本转语音

__代码_块_7__

将文本转换为音频。 Edge TTS 是免费的。请参阅 [TTS](../media/tts.md)。

## 生成图像

__代码_块_8__

使用 DALL-E、Nano Banana、Stability 或 ComfyUI 生成图像。请参阅[图像生成](../media/image-gen.md)。