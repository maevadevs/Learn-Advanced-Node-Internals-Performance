/**
 * @file
 * This is an pseudo-code emulation of the implementation for understanding
 * how the event loop actually works in Node. The event loop is emulated with
 * the `while` loop.
 */

// STEP 1: INITIATOR
// *****************
// Executing a Node Application from the Terminal/Command Prompt: $ node app.js
// Node bootstraps from this point...

// Simulation of tasks
// -------------------
// New timers, OS tasks, and operations are recorded from running $ node app.js
// These are checked by the loop constantly
// As long as they are not empty, the event loop will not exit

const pendingTimers = []
const pendingOSTasks = []
const pendingLongOps = []

// STEP 2: CODE EXECUTION
// **********************
// Node executes all the contents of myFile.js right away

myFile.runAllContents() // Simulating running the file's contents...

// STEP 3: EVENT LOOP
// ******************
// After executing all the contents of the file, Node enters the event loop.
// Every execution of the loop body is called a 'tick'

// Event Loop Helper Function 
// --------------------------
// RULE: The event loop only execute when the call-stack is empty

function shouldContinue () {
  // Check 1: Is there any pending setTimeout, setInterval, setImmediate? => Continue
  // Check 2: Is there any pending OS tasks? (Server listening to port...) that is 
  //          ready to be executed for callbacks? => Continue
  // Check 3: Is there any long running operations still running that will be 
  //          ready to be executed for callbacks? => Continue
  return pendingTimers.length > 0 || 
    pendingOSTasks.length > 0 || 
    pendingLongOps.length > 0
}

while (shouldContinue()) {
  // Establish Order of Operations
  // -----------------------------
  // 1. Handle Callbacks: 
  //    - Check pendingTimers (setTimeout and setInterval)
  //    - Call relevant callbacks if ready
  // 2. Handling Callbacks: 
  //    - Check pendingOSTasks 
  //    - Call relevant callbacks if ready
  // 3. Handling Callbacks: 
  //    - Check pendingLongOps 
  //    - Call relevant callbacks if ready
  // 4. Event Listening Time: Pause execution and continue only when some events occur:
  //    - a new pending OS Task is done
  //    - a new pending long Op is done
  //    - a timer is about to be complete
  // ...
  // ...
  // 5. Handle Callbacks: Check pendingTimers (setImmediate) and call relevant callbacks
  // 6. Handle any 'close' events: The event loop is about to finish, cleanup codes
}
// -- Exiting the While Loop means Terminate process and back to the Terminal prompt --
