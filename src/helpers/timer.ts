import {format} from 'date-fns'
// Ref: https://medium.freecodecamp.org/here-are-some-practical-javascript-objects-that-have-encapsulation-fc4c1a79c655
// TODO: Put this lot in a component and to fetch allRequests
interface Callback<T> {
  (): Promise<T>;
}

/**
 *
 * @param fn NOTE: The callback function must return a promise
 * @param interval
 */
export function Timer(fn: Callback<string>, interval: number){
  let timerId: number;
  function startRecursiveTimer(){
    fn().then(function makeNewCall(){
      timerId = window.setTimeout(startRecursiveTimer, interval);
    });
  }
  function stop(){
    if(timerId){
      clearTimeout(timerId);
      timerId = 0;
    }
  }
  function start(){
    if(!timerId){
      startRecursiveTimer();
    }
  }
  return Object.freeze({
    start,
    stop
  });
  }

  const getTime = () => {
    return format (new Date(), 'HH:mm:ss')
  }
  const doStuff = (): Promise<string> => {
    // return a promise
    console.log(`Doing stuff at ${getTime()}`)
    return Promise.resolve('hello')
  }

  // Run the callback every 2 secs
  let timer = Timer(doStuff, 2000);
  timer.start();

  // Only run the timer whent the tab is visible
document.addEventListener("visibilitychange", toggleTimer);

function toggleTimer(){
   if(document.visibilityState === "hidden"){
     timer.stop();
   }
   if(document.visibilityState === "visible"){
     timer.start();
   }
}