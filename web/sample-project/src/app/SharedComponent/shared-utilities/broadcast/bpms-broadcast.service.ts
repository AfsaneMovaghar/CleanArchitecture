import { Injectable } from "@angular/core";
import { filter, Observable, Subject } from "rxjs";
import { BpmsBroadcastEvent } from "./bpms-broadcasrt-event";
import { BpmsBroadcastEventTypes } from "./bpms-broadcast-event-types";

@Injectable({
    providedIn: 'root',
  })
  export class BpmsBroadcastService {
    private eventBrocker: Subject<BpmsBroadcastEvent<any>> = new Subject<
    BpmsBroadcastEvent<any>
    >();
  
    getEvent<T>(eventType: BpmsBroadcastEventTypes): Observable<BpmsBroadcastEvent<T>> {
      return this.eventBrocker.pipe(filter((e) => e.type == eventType));
    }
  
    broadcast<T>(event: BpmsBroadcastEvent<T>) {
      return this.eventBrocker.next(event);
    }
  }