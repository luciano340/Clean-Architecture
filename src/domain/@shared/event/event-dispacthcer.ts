import EventDispacherInterface from "./event-dispactcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispacher implements EventDispacherInterface {

    private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {};

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if(this.eventHandlers[eventName]){
            this.eventHandlers[eventName].forEach((eh) => {
                eh.handle(event);
            })
        }
    }

    register(eventName: string, EventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(EventHandler);
    }

    unregister(eventName: string, EventHandlerInterface: EventHandlerInterface<EventInterface>): void {
        if(this.eventHandlers[eventName]){
            const index = this.eventHandlers[eventName].indexOf(EventHandlerInterface);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }
}