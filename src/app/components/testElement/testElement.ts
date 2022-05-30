import {LitElement, html, CSSResult} from 'lit';
import {customElement} from 'lit/decorators.js';

import styles from './testElement.scss';

@customElement('test-element')
export default class TestElement extends LitElement{

    public static get styles(): CSSResult {
        return styles as CSSResult;
    }

    render() {
        return html`
            <div class="label">a test element</div>
            <slot>placeholder text</slot>
        `
    }
}