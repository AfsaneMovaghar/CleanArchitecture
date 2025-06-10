import { BpmsBroadcastEventTypes } from "./bpms-broadcast-event-types";


export class BpmsBroadcastEvent<T> {
  constructor(public type: BpmsBroadcastEventTypes, public data: T) {}
}
