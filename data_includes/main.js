PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window

newTrial("WebcamSetUp", 
    newText("WebcamInstructions", "<p> Before the task begins, we need to calibrate your webcam so the experiment can follow your eye movements. On the next page, a calibration procedure will start. First, you will see the webcam recording on the top left corner of your screen. <br><br> Please make sure your face is fully visible. If you wear glasses, please make sure that they are not reflecting any ambient light.</p>")
    ,
    newCanvas("myCanvas", 1200 , 500)
        .settings.add(0,0, getText("WebcamInstructions"))
        .print()
    ,
    newButton("Take me to the next page (which will appear in fullscreen)")
        .center()
        .print()        
        .wait() 
    ,
    fullscreen()
)


PennController.Template("FixationTrials.csv",
    row => PennController("Trials", 
        newText("fixationText", "<p>+</p>")
                    .settings.css("font-family", "avenir")
                    .settings.color("black")
        ,
        newCanvas("FixationCross", "100vw", "100vh") // Tracked canvases are slighlty larged than the fixation cross (note that we use 'vh' to determine the canvas width as well, so it's a square)
            .add("center at 50%", "middle at 50%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 95%", "center at 5%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 5%", "center at 5%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 95%", "center at 95%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 5%", "center at 95%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 95%", "center at 50%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 50%", "center at 95%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 5%", "center at 50%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 50%", "center at 5%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 50%", "center at 50%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 25%", "center at 25%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 75%", "center at 25%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 25%", "center at 75%", newText("<p>+</p>").css("font-size", "25vh"))
            .add("middle at 75%", "center at 75%", newText("<p>+</p>").css("font-size", "25vh"))
            .print(0,0)
            .wait()         
    )
    .setOption("hideProgressBar", true)  
)
