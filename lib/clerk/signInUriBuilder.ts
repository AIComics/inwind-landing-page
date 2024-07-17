import * as process from "process"
import qs from "qs"

interface SignInParams extends Record<string, any> {
    redirect_url: string;
}

export default function signInUriBuilder(params?: Partial<SignInParams>) {
    return `${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_PAGE}?${qs.stringify({
        redirect_url: params?.redirect_url ?? window.location.href,
    })}`
};
