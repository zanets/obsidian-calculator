import { 
	App, 
	Modal, 
	Plugin, 
	PluginSettingTab, 
	Setting, 
	ItemView, 
	WorkspaceLeaf 
} from 'obsidian';


const PANE_NAME = "obs-cal-pane";

class PaneView extends ItemView {

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	public getDisplayText(): string {
		return "this is DisplayText";
	}

	public getViewType(): string {                                         
		return PANE_NAME;
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		
		container.createDiv();
		
	}

	public getIcon(): string {
		return 'documents';
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

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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
