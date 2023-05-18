import Entity from '@/server/@shared/entity/entity.abstract';

type State = { id?: string; name: string };

export class Availability extends Entity {
	constructor(private readonly _state: State) {
		super(_state.id);
	}

	get name(): string {
		return this._state.name;
	}
}
