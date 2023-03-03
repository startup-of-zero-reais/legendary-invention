import { Auth } from "../usecases/auth";

export class AuthFactory {
    static make() {
        return new Auth()
    }
}
