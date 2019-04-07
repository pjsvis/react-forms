/**
 * ref: https://css-tricks.com/understanding-event-emitters/
 */
export interface Events {
  [key: string]: Function[];
}

export function emitter(e?: Events) {
  let events: Events = e || {};

  return {
    events,
    subscribe: (name: string, cb: Function) => {
      (events[name] || (events[name] = [])).push(cb);

      return {
        unsubscribe: () => {
          events[name] && events[name].splice(events[name].indexOf(cb) >>> 0, 1);
        }
      };
    },
      emit: (name: string, ...args: any[]) => {
      (events[name] || []).forEach(fn => fn(...args));
    }
  };
}