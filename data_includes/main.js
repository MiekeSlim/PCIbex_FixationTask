PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window

// PHP script that receives, stores (and will also output) the eye-tracking data
EyeTrackerURL("https://users.ugent.be/~mslim/PCIbexData/EyeTracker.php")
AddHost("https://users.ugent.be/~mslim/VW_DWR_Stimuli/images/");

/*
Sequence("Checks", "Welcome", "Consent", "WebcamSetUp", "CalibrationSetUp", "Instructions", randomize("Trials"), "QuestionnairePage", "Send", "Final")

// Check for L1
PennController("Checks",
    newImage("logo", "logo_UGent_EN_RGB_2400_color.png")
        .size("10vw")       
        .print("20vw","0vh")
    ,
    newImage("logo2", "icon_UGent_PP_EN_RGB_2400_color.png")
        .size("20vw")       
        .print("55vw","0vh")                           
    ,           
    newText("Consent", "Two short questions before we begin: <br><br> We will use your webcam to collect data on where you are looking on the screen. We will <b> not </b> collect any video data or any other type of data that may reveal your identity. Do you give us permission to use your webcam?<br><br>")
    ,
    newCanvas( "myCanvas", "60vw" , "20vh")
        .settings.add(0,0, getText("Consent"))
        .print("20vw", "20vh")
    ,    
    newButton("yesConsent", "Yes, I give my permission")
    ,
    newButton("noConsent", "No, I don't give my permission")
        .settings.before( getButton("yesConsent") )
        .print("20vw" , "32vh")
    ,
    newSelector("yesnoConsent")
        .settings.add( getButton("yesConsent") , getButton("noConsent"))
        .wait()
    ,
    getSelector("yesnoConsent")
        .settings.log()
        .test.selected(getButton("yesConsent") )
        .failure(
            newCanvas("NoPermision", "60vw" , "20vh").settings.add(0,0, newText("<br><br>Unfortunately you cannot participate in this study. Please close the experiment by closing the browser (you can ignore possible pop-up screens) <br><br>"))
                .print("20vw", "32vh")
            ,
            newButton("waitforever")
                .wait()
        )         
    ,          
    newText("Chrome", "This study only works well if you are using the Google Chrome browser on a laptop or desktop computer (so not on a mobile phone or tablet). Are you currently using <b> Google Chrome Desktop </b>? <br><br>")
    ,
    newCanvas( "myCanvas", "60vw" , "20vh")
        .settings.add(0,0, getText("Chrome"))
        .print("20vw", "40vh")
    ,    
    newButton("yesChrome", "Yes, I am currently using Chrome Desktop")
    ,
    newButton("noChrome", "No, I am using another browser/device")
        .settings.before( getButton("yesChrome") )
        .print("20vw" , "50vh")
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
            newCanvas("WrongBrowser", "60vw" , "20vh").settings.add(0,0, newText("<br><br>Unfortunately, this experiment only works on Google Chrome (which can be downloaded for free). Please close the experiment by closing the browser (you may ignore possible pop-up screens), and come back on Chrome.<br><br>"))
                .print("20vw" , "50vh")
            ,
            newButton("waitforever")
                .wait()
        )      
)
.setOption("hideProgressBar", true) 

// Welcome text
PennController("Welcome",
    newImage("logo", "logo_UGent_EN_RGB_2400_color.png")
        .size("10vw")       
        .print("20vw","0vh")
    ,
    newImage("logo2", "icon_UGent_PP_EN_RGB_2400_color.png")
        .size("20vw")       
        .print("55vw","0vh")                  
    ,        
    newText("WelcomeText", "<p>Welcome and thank you for participating in this experiment! </p><p> </p><p> Cognitive scientists often record eye movements to study human behaviour, because eye movements tell a lot about how we divide our attention and how we make decisions. In typical eye-tracking studies, we use expensive eye-tracking devices to record where people are looking on a computer screen. In this experiment, we will test whether we can also use consumer-grade webcams to collect eye-movement data to conduct cognitive research. We will <b> not </b> collect any video data or any other type of data that may reveal your identity: We only collect data on where on the screen your eyes are looking during the experiment. </p><p> </p><p> The task is very simple, and should take you roughly 5-10 minutes to complete: A cross (+) will appear at various positions on your screen. Please look closely at each cross that appears, untill it disappears. <br> <br>  Because we will use your webcam to follow your eye movements during this task, it is important that you are in a well-lit and quiet environment. Please turn off your mobile phone or other devices that may distract you during this task. Also, please close other websites that you may have open.</p> <p> If you have any questions about this experiment, feel free to get in touch with me (Mieke Slim) via email: mieke.slim@ugent.be</p>")
    ,  
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("WelcomeText"))       
        .print("20vw", "15vh")         
    ,
    newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000))    
    ,
    newVar("Subject")
        .settings.global()
        .set( getTextInput("Subject") )
    ,          
    newButton("Take me to the next page")
        .center()
        .print("40vw", "80vh")
        .wait()
)
.setOption("hideProgressBar", true) 

PennController("Consent",
    newImage("logo", "logo_UGent_EN_RGB_2400_color.png")
        .size("10vw")       
        .print("20vw","0vh")
    ,
    newImage("logo2", "icon_UGent_PP_EN_RGB_2400_color.png")
        .size("20vw")       
        .print("55vw","0vh")                  
    ,              
    newText("ConsentText", "<p>This experiment has been approved by the Ethical Comittee from the Faculty of Psychology and Educational Sciences at Ghent University. We request your consent for participation in this experiment. Therefore, please read the following carefully: </p > <p>I declare that I, as a participant in a research project in the Department of Experimental Psychology at Ghent University:<br><br> <ol> <li> have been informed about the research objectives, the questions and the tasks that I will encounter during the research and that I was given the opportunity to receive further information if desired<br><br> </li><li> will participate out of free will in the research project <br><br> </li><li> am aware that the researchers do not collect any personal information that may be used to identify my identity (such as video recordings). All the data that will be collected is completely anonymized; <br><br> </li><li> give informed consent to the researchers to store, process, and report my data in anonymized form <br><br> </li><li> am aware of the option to stop my participation in this research at any moment in time without having to provide a reason; <br><br> </li><li> know that participating or stopping my participation in the research has no negative consequences of any kind for me <br><br> </li><li> am aware of the option to ask the researcher(s) for a summary of the results after the study is finished and the results have been known; <br><br> </li><li> agree that my data may be used for further analysis by other researchers after complete anonymization; <br><br> </li><li> am aware that Ghent University is the responsible entity with regards to the personal information collected during the study. I am also aware that the data protection officer can give me more information about the protection of my personal information. Contact: Hanne Elsen (privacy@ugent.be).</li> </ol> <br>In case you give your informed consent to participate in this study, please click on the button below. If you do not give your informed consent, please close this experiment. </p>")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("ConsentText"))
        .print("20vw", "15vh")
    ,
    newButton("I have read the study information and give my informed consent. Continue to the next page")
            .center()
            .print("40vw", "80vh")
            .wait()
)
.setOption("hideProgressBar", true) 

*/

//Webcam set-up and calibration
newTrial("WebcamSetUp",
    newImage("logo", "logo_UGent_EN_RGB_2400_color.png")
        .size("10vw")       
        .print("20vw","0vh")
    ,
    newImage("logo2", "icon_UGent_PP_EN_RGB_2400_color.png")
        .size("20vw")       
        .print("55vw","0vh")                  
    ,                
    newText("WebcamInstructions", "<p> Before the task begins, we need to calibrate your webcam so the experiment can follow your eye movements. On the next page, a calibration procedure will start. First, you will see the webcam recording on the top left corner of your screen. <br><br> Please make sure your face is fully visible. If you wear glasses, please make sure that they are not reflecting any ambient light.</p>")
    ,
    newImage("Instructions", "Instructions.png")
        .size("60vw")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("WebcamInstructions"))
        .settings.add(0,"20vh", getImage("Instructions"))
        .print()
    ,
    newButton("Take me to the next page (which will appear in fullscreen)")
        .center()
        .print("40vw", "80vh")       
        .wait( newEyeTracker("tracker").test.ready() ) 
    ,
    fullscreen()
)
.setOption("hideProgressBar", true) 

// Calibration page
newTrial("CalibrationSetUp",
    newText("CalibrationInstructions", "<p>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and look at it for three seconds so the algorithm can check whether it's well calibrated.</p> <p> In case calibration fails, the procedure will be repeated. </p>")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
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
    newVar("trialsLeftbeforeCalibration", 13)
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
                                .set(13)
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
            .add( "center at 50%" , "middle at 50%" , getText("fixationText").css("font-size", "25vh"))
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
