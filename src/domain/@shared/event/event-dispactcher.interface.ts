import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispacherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, EventHandlerInterface: EventHandlerInterface): void;
    unregister(eventName: string, EventHandlerInterface: EventHandlerInterface): void;
    unregisterAll(): void;
}