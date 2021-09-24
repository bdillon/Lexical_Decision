// This is a PCIbex implementation of a simple Lexical Decision task for
// LINGUIST412 @ University of Massachusetts

// Brian Dillon, October 2021
// CC-BY

PennController.ResetPrefix(null); // Shorten command names (keep this)
PennController.DebugOff();

// Resources are hosted as ZIP files on a distant server

Sequence("instructions",
            randomize("main.trial") ,
             "send" , "end" );

newTrial("instructions",

    fullscreen(),
    
    newText(`<p>Welcome! In this experiment, we want you to decide as quickly as possible whether what you see is a word of English, or not.</p><p>
            If you think it IS a word, press the 'f' button.</p><p>
            If you think it IS NOT a word, press the 'j' button.</p><p>
            Try to respond as accurately and quickly as possible. If you wait more than 6 seconds, you will not be able to respond, and the experiment will move on.</p><p>
            `)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Click when you are ready to begin")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
);

Template( "My_Stimuli.csv",
    currentrow => 
    newTrial("main.trial",
    
    newText(`cross`,`+`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "48px")
            .print("center at 50%", "middle at 50%"),

    newText(`Reminder: Press F it is a word, press J if it is not a word.`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "bottom at 90%"),

    newTimer("wait", 1000)
        .start()
        .wait(),
        
    getText(`cross`).remove(),
    
    newTimer("wait", 500)
        .start()
        .wait(),
        
    newTimer("deadline", 6000)
        .start(),

    newVar("RT").global().set( v => Date.now() ),

    newText(currentrow.WORD)
    .css("font-family", "Helvetica, sans-serif")
    .css("font-size", "48px")
    .print("center at 50%", "middle at 50%"),

    newKey("cur.response", "F","J")
        .log("first")
        .callback( getTimer("deadline").stop()  )
        .callback( getVar("RT").set( v => Date.now() - v )),

    getTimer("deadline")
        .wait()  
    
    )
  .log( "Word"   , currentrow.WORD)
  .log( "Frequency"   , currentrow.FREQ)
  .log( "RT"   ,getVar("RT") )
);

SendResults("send");

newTrial("end",
    exitFullscreen()
    ,
    newText("The is the end of the experiment, you can now close this window. Thank you!")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "48px")
        .center()
        .print("center at 50%", "bottom at 80%")
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false);