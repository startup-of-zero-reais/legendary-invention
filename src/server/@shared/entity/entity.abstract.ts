import { randomUUID } from 'crypto';
import Notification from '../notification/notification';

export default abstract class Entity<T = string> {
	public _id: T;
	protected _createdAt: Date;
	protected _updatedAt: Date;
	public notification: Notification;

	constructor(id?: T, createdAt?: Date, updatedAt?: Date) {
		this.notification = new Notification();
		this._id = id || randomUUID() as any;
		this._createdAt = createdAt ? createdAt : new Date();
		this._updatedAt = updatedAt ? updatedAt : new Date();
	}
	get id(): T {
		return this._id;
	}
	get createdAt(): Date {
		return this._createdAt;
	}
	get updatedAt(): Date {
		return this._updatedAt;
	}
}
