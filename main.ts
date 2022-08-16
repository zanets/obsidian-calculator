import { 
    App, 
    Modal, 
    Plugin, 
    PluginSettingTab, 
    Setting, 
    ItemView, 
    WorkspaceLeaf 
} from 'obsidian';

import DecimalPane from "./ui/Decimal.svelte";


const PANE_NAME = "obs-cal-pane";

class PaneView extends ItemView {
    decimalPane: DecimalPane;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    public getDisplayText(): string {
        return "Calclator";
    }

    public getViewType(): string {                                         
        return PANE_NAME;
    }

    async onOpen() {
        this.decimalPane = new DecimalPane({
            target: this.contentEl,
            props: {
                base: 10,
                staging: "0",
                express: ""
            }
        });
    }

    public getIcon(): string {
        return 'documents';
    }

    async onClose() {
        this.decimalPane.$destroy();
    }
}

export default class MyPlugin extends Plugin {

    public pane: PaneView;

    async onload() {

        this.registerView(
            PANE_NAME, 
            (leaf) => (this.pane = new PaneView(leaf))
        );


        if (this.app.workspace.layoutReady) {
            this.initLeaf();
        } else {
            this.registerEvent(
                this.app.workspace.on('layout-ready', this.initLeaf.bind(this))
            );
        }
    }

    private initLeaf(): void {
        if (this.app.workspace.getLeavesOfType(PANE_NAME).length) {
            return;
        }

        this.app.workspace.getRightLeaf(false).setViewState({
            type: PANE_NAME,
        });
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(PANE_NAME);
    }
}
