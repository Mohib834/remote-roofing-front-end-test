// Shows state
export type ShowsStateTypes = {
    show: {
        sid: string;
    } | null;
}

// User Auth state
export type User = {
    uid: string;
    wishlist: {
        tv: Array<string>;
        movie: Array<string>;
    };
    name: string;
} | null;

export type UserAuthStateTypes = {
    isLoading: boolean;
    user: User;
    snackbar: {
        message: string;
        color: "success" | "info" | "warning" | "error";
        open: boolean;
    };
}