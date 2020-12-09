# A simple fixation task using WebGazer.js in PCIbex

This repository contains code to implement a simple fixation task in PCIbex (Zehr & Schwarz, 2018). This script uses PCIbex's `eyetracker` element to record eye movement data. This element uses the WebGazer.js javascript library (Papoutsaki et al., 2016). For more information about collecting eye-tracking data with PCIbex, please see the [documentation](https://www.pcibex.net/wiki/eyetracker-element/) and [collecting eye-tracking data](https://www.pcibex.net/wiki/collecting-eye-tracking-data/) pages provided by PCIbex' developers. If you are not familiar with PCIbex, it is highl recommended that you check the [tutorial](https://www.pcibex.net/wiki/00-overview/) written by the PCIbex' developers. 

## main.js
The main.js is the main experimental script. The 'eyetrack part' begins on line 129 (before that, we provide the instructions and consent form etc.). Let's break down the functionality of this script:

```
newTrial("WebcamSetUp",
    newImage("logo", "logo_UGent_EN_RGB_2400_color.png")
        .size("10vw")       
        .print("20vw","00vh")
    ,
    newImage("logo2", "icon_UGent_PP_EN_RGB_2400_color.png")
        .size("20vw")       
        .print("55vw","2vh")                           
    ,               
    newText("WebcamInstructions", "<p> Before the task begins, we need to calibrate your webcam so the experiment can follow your eye movements. On the next page, a calibration procedure will start. First, you will see the webcam recording on the top left corner of your screen. Please make sure your face is fully visible, and that you sit centrally in front of your webcam by following these instructions:.</p>")
    ,
    newImage("Instructions", "Instructions.png")
        .size("60vw")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("WebcamInstructions"))
        .settings.add(0,"10vh", getImage("Instructions"))
        .print()
    ,
    newButton("Take me to the next page (which will appear in fullscreen)")
        .center()
        .print("center at 50vw", "80vh")    
        .wait( newEyeTracker("tracker").test.ready() ) 
    ,
    fullscreen()
)
.setOption("hideProgressBar", true) 
```
This chunk of code generates a page that provides the instructions on how to sit correctly in front of their webcams. More specifically, they will see [this image](https://users.ugent.be/~mslim/EyeTrackImgs/Instructions.png). Once they hit the 'take me to the next page' button, PCIbex will test whether the participant has given the browser permission to use the webcam (by using the `newEyeTracker("tracker").test.ready()` command). If the participant has granted acces to their webcams, the experiment will appear in fullscreen (through the `fullscreen()` command). 

One the next page, a calibration procedure will start. 

```
// Calibration page
newTrial("CalibrationSetUp",
    newText("CalibrationInstructions", "<p>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. <br><br> Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and look at the centre of your screen for three seconds. In these three seconds, the webcam eyetracker checks whether it's well calibrated.</p> <p> In case calibration fails, the procedure will be repeated. </p>")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("CalibrationInstructions"))
        .print()    
    ,
    newButton("Begin calibration")
        .center()
        .print("center at 50vw", "80vh")
        .wait( newEyeTracker("tracker").test.ready() )
        .remove()
    ,
    getEyeTracker("tracker").calibrate(5)
        .log()
)
.setOption("hideProgressBar", true) 
```
