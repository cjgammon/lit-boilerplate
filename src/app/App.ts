import './components/testElement';
import bus from './events/EventBus';
import UserEvent from './events/UserEvent';

export default class App {
    constructor() {
        console.log('hello app');
        window.addEventListener('resize', () => this.handle_RESIZE());
    }

    handle_RESIZE() {
        bus.dispatch(UserEvent.RESIZE);
    }
}