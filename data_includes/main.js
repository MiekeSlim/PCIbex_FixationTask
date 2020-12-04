
PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window

// PHP script that receives, stores (and will also output) the eye-tracking data
EyeTrackerURL("https://users.ugent.be/~mslim/PCIbexData/EyeTracker.php")
AddHost("https://users.ugent.be/~mslim/VW_DWR_Stimuli/images/");

Sequence("Checks", "Welcome", "WebcamSetUp", "CalibrationSetUp", "Instructions", randomize("Trials"), "QuestionnairePage", "Send", "Final")

// Check for L1
PennController("Checks",
    newText("Two short questions before we begin:")
        .print()
    ,
    newText("Consent", "<br><br> We will use your webcam to collect data on where you are looking on the screen. We will <b> not </b> collect any video data or any other type of data that may reveal your identity. Do you give us permission to use your webcam?<br><br>")
        .center()
    .print()
    ,
    newButton("yesConsent", "Yes")
    ,
    newButton("noConsent", "No")
        .settings.before( getButton("yesConsent") )
    .center()       
        .print()
    ,
    newSelector("yesnoConsent")
        .settings.add( getButton("yesConsent") , getButton("noConsent"))
        .wait()
    ,
    getSelector("yesnoConsent")
        .settings.log()
        .test.selected(getButton("yesConsent") )
        .failure(
            newText("<br><br> Please close the experiment by closing the browser (you may ignore possible pop-up screens) <br><br>")
                .print()
            ,
            newKey("SPACE")
            .wait()
        )         
    ,          
    newText("Chrome", "<br><br>Are you currently using <b> Google Chrome Desktop </b>? <br><br>")
        .print()
    ,
    newButton("yesChrome", "Yes")
    ,
    newButton("noChrome", "No")
        .settings.before( getButton("yesChrome") )
        .print()
    ,
    newSelector("yesnoChrome")
    .center()       
        .settings.add( getButton("yesChrome") , getButton("noChrome"))
        .wait()
    ,
    getSelector("yesnoChrome")
        .settings.log()
        .test.selected(getButton("yesChrome") )
        .failure(
            newText("<br><br>Unfortunately, this experiment only works on Google Chrome (which can be downloaded for free). Please close the experiment by closing the browser (you may ignore possible pop-up screens), and come back on Chrome.<br><br>")
                .print()
            ,
            newKey("SPACE")
            .wait()
        )
)

// Welcome page 
PennController("Welcome",
    newText("WelcomeText", "<p>Welcome and thank you for participating in this pilot! </p><p> </p><p> In this experiment, which should take roughly 5 minutes to finsih, a cross (+) will appear at various positions on your screen. The task is very simple: Please look at each cross that appears. <br> <br> We will use you webcam to follow your eye movements during this task. It is therefore important that you are in a well-lit and quiet environment. Please turn off your mobile phone or other devices that may distract you during this task. Also, please close other websites that you may have open.</p> <p> The purpose of this pilot is to test the accuracy of webcams to follow eye movements. If you have any questions about this experiment, you can contact me via email: mieke.slim@ugent.be </p>")
    ,
    newCanvas( "myCanvas", 600 , 300)
        .settings.add(0,0, getText("WelcomeText"))
        .print()         
    ,
    newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000))    
    ,
    newVar("Subject")
        .settings.global()
        .set( getTextInput("Subject") )
    ,           
    newButton("Take me to the next page")
        .center()
        .print()
        .wait()
)

//Webcam set-up and calibration
newTrial("WebcamSetUp", 
    newText("WebcamInstructions", "<p> Before the task begins, we need to calibrate your webcam so the experiment can follow your eye movements. On the next page, a calibration procedure will start. First, you will see the webcam recording on the top left corner of your screen. <br><br> Please make sure your face is fully visible. If you wear glasses, please make sure that they are not reflecting any ambient light.</p>")
    ,
    newImage("Instructions", "Instructions.png")
        .size(1200,300)
    ,
    newCanvas("myCanvas", 1200 , 500)
        .settings.add(0,0, getText("WebcamInstructions"))
        .settings.add(0,100, getImage("Instructions"))
        .print()
    ,
    newButton("Take me to the next page (which will appear in fullscreen)")
        .center()
        .print()        
        .wait( newEyeTracker("tracker").test.ready() ) 
    ,
    fullscreen()
)

// Calibration page
newTrial("CalibrationSetUp",
    newText("CalibrationInstructions", "<p>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and look at it for three seconds so the algorithm can check whether it's well calibrated.</p> <p> In case calibration fails, the procedure will be repeated. </p>")
    ,
    newCanvas("myCanvas", 1200 , 100)
        .settings.add(0,0, getText("CalibrationInstructions"))
        .print()    
    ,
    newButton("Begin calibration")
        .center()
        .print()
        .wait( newEyeTracker("tracker").test.ready() )
        .remove()
    ,
    getEyeTracker("tracker").calibrate(5)
        .log()
)

// Experiment instructions
newTrial("Instructions", 
    newText("TaskInstructions", "<p>You're all set to start the experiment! Please look closely at all crosses that appear on the screen. <br> <br> Every now and then, you'll see a button in the middle of your screen. Click on this button and look at it for three seconds. The webcam will check whether it is still calibrated. If it is, the next trial will automatically start. Otherwise, the calibration procedure will be repeated. <br><br>  During the trials, you don't need to click on anything: Just look at the crosses! <br><br> The task should take roughly 3-5 minutes.</p>")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add(0,0, getText("TaskInstructions"))
        .print()    
    ,
    newButton("Go to the first trial").print().wait()
    ,
    newVar("trialsLeftbeforeCalibration", 9)
    .global()   
)

PennController.Template("FixationTrials.csv",
    row => PennController("Trials", 
        // The callback commands lets us log the X and Y coordinates of the estimated gaze-locations at each recorded moment in time (Thanks to Jeremy Zehr for helping us construct this command)
            newEyeTracker("tracker",1).callback( (x,y)=>{
                            getEyeTracker("tracker")._element.counts._Xs.push(x);
                            getEyeTracker("tracker")._element.counts._Ys.push(y);
                        })
                            ,
                            newFunction(()=>{
                                getEyeTracker("tracker")._element.counts._Xs = [];
                                getEyeTracker("tracker")._element.counts._Ys = [];
                        }).call()  
            ,
            getVar("trialsLeftbeforeCalibration")
                .test.is(0)
                .success(
                    newFunction( ()=>{
                        $("body").css({
                        width: '100vw',
                        height: '100vh',
                        cursor: 'default'
                           });
                    }).call()
                    ,
                    getEyeTracker("tracker").calibrate(5)
                    ,
                    newFunction( ()=>{
                        $("body").css({
                            width: '100vw',
                            height: '100vh',
                            cursor: 'none'
                           });
                        }).call()
                    ,
                    getVar("trialsLeftbeforeCalibration")
                                .set(9)
                    )
        ,   
        // Hide the cursor
        newFunction( ()=>{
            $("body").css({
            width: '100vw',
            height: '100vh',
            cursor: 'none'
           });
        }).call()
        ,
        newText("fixationText", "<p>+</p>")
                .settings.css("font-size", "25vh")
                    .settings.css("font-family", "avenir")
                    .settings.color("black")
        ,
        newCanvas("FixationCross", "25vh", "25vh") // Tracked canvases are slighlty larged than the fixation cross (note that we use 'vh' to determine the canvas width as well, so it's a square)
            .add("center at 50%" , "middle at 50%" , getText("fixationText").css("font-size", "5vh"))
            .print("center at 50%" , "middle at 50%")
        ,
        newTimer(500)
            .start()
            .wait()
        ,       
        newCanvas("trackedCanvas", "25vh", "25vh") // Tracked canvases are slighlty larged than the fixation cross (note that we use 'vh' to determine the canvas width as well, so it's a square)
            .add( "center at 50%" , "middle at 50%" , getText("fixationText") )
            .print(row.X_position, row.Y_position)
        ,             
        getEyeTracker("tracker")                 
            .add(getCanvas("trackedCanvas"))  
            .start()
            .log()                
        ,
        newTimer(1500)
            .start()
            .wait()
        ,
        getEyeTracker("tracker").stop() // Stop now to prevent collecting unnecessary data
        ,
        getVar("trialsLeftbeforeCalibration")
            .set( v => v-1)           
    )
    .setOption("hideProgressBar", true)
        .log( "Subject" , getVar("Subject") )           
    .log("Position", row.Position)
    .log("Xpos.absolute", row.X_position) // X position measured in pixels
    .log("Y.absolute", row.Y_position) // Y position measured in pixess
    .log("Xpos.relative", row.relXpos) // X position measured in percentage of screen
    .log("Ypos.relative", row.relYpos)  // Y position measured in percentage of screen   
    .log("Xpos", (row.relXpos * window.innerWidth))      // Log the X coordinate of the stimulus in px
    .log("Ypos", (row.relYpos * window.innerHeight))         // Log the Y coordinate of the stimulus in px  
    .log( "ViewportWidth" , window.innerWidth ) // Screensize: width
    .log( "ViewportHeight", window.innerHeight ) // Screensize: heigth          
)

PennController("QuestionnairePage",
          //show cursor     
   newFunction( ()=>{
           $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
       });
    }).call()
    ,                
    newHtml("Questionnaire", "Questionnaire.html")
        .settings.log()
        .print()
    ,
    newButton("continue", "Continue")
        .print()
        .wait(
            getHtml("Questionnaire").test.complete()
                .failure( getHtml("Questionnaire").warn() )
        )                      
              )
    .log( "Subject" , getVar("Subject") )

PennController.SendResults("Send");

newTrial("Final",
    exitFullscreen()
    ,
    newText("The is the end of the experiment, you can now close this window. Thank you! <br> If you have any questions, you can contact me via mieke.slim@ugent.be").print()
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false)
