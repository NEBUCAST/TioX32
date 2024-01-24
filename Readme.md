# TioX32
This was meant to be a bridge for gain and phantom power control of TIO via X32. Sadly, the X32 does not allow for gain control on channels with card input. Instead, it digitally trims the signal. This behavior cannot be changed, thus rendering our idea useless (as is).

The easiest option for improving user experience over the stock "R Remote" app would be to rewrite it as a web app with mobile devices in mind (e.g., using sliders instead of encoders, making it platform-independent).

Another more complicated idea would be to make an encoder that dynamically maps to selected X32 channels ("selection by turning a channel's trim encoder"). This would require taking the channel mapping on the desk and in the Dante network into account. The latter would be the greater challenge to solve.